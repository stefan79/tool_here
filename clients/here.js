const axios = require('axios');
const AxiosLogger = require('axios-logger');

const geoCode = (client) => (query) => {
    return client("get", "/geocode", {
        q: query
    })
    .then(mapGeoCodeResponse)
};

const discover = (client) => (request) => {
    return client("get", '/discover', {
        q: request.query,
        at: request.at
    })
    .then((response) => {
        console.log("Dump Data :", response.data)
        console.log("Dump Reqeust:", response.request)
        return Promise.resolve(response)

    })
    .then(mapDiscoveryReponse)
}

const queryDiscover = (client) => (request) => {
    return geoCode(client)(request.location)
    .then(mapGeoCodeToSearch (client) (request.query))
    .then(discover(client))
}

const mapGeoCodeToSearch = (client) => (searchTerms) => (items) => {
    const result = {
        query: searchTerms,
        at: items[0].position.lat+","+items[0].position.lng
    }

    return Promise.resolve(result)
    
}

const mapGeoCodeResponse = (response) => {
    if (!response.data.items) {
        return Promise.reject(new Error("No items in response"))
    } else {
        return Promise.resolve(response.data.items.map(item => ({
            title: item.title,
            address: item.address.label,
            position: item.position
        })))
    }
}

const mapDiscoveryReponse = (response) => {
    if (!response.data.items) {
        return Promise.reject(new Error("No items in response"))
    } else {
        return Promise.resolve(response.data.items.map(item => ({
            title: item.title,
            address: item.address.label,
            position: item.position
        })))
    }
}


const client = (config) => (method, url, params) => {
    const axiosInstance = axios.create();
    axiosInstance.interceptors.request.use(AxiosLogger.requestLogger);
    return axiosInstance({
        method: method,
        url: url,
        baseURL: config.HERE_BASE_URL,
        params: {
            ...params,
            apiKey: config.HERE_API_KEY
        }
    });
};

module.exports = function(config) {
    const c = client(config);
    return {
        geoCode: geoCode(c),
        discover: queryDiscover(c),
    };
};
