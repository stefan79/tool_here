import axios, { AxiosInstance, Method } from 'axios';
import { AppConfig } from '../config';

interface Position {
    lat: number;
    lng: number;
}

export interface GeoCodeItem {
    title: string;
    address: string;
    position: Position;
}

export interface DiscoverRequest {
    query: string;
    location: string;
}

export interface SearchRequest {
    query: string;
    at: string;
}

interface HereApiResponse<T> {
  data: {
    items?: T[];
  };
}

interface HereGeoCodeItem {
  title: string;
  address: {
    label: string;
  };
  position: Position;
}

export type HereClient = (method: Method, url: string, params: Record<string, unknown>) => Promise<HereApiResponse<HereGeoCodeItem>>;

export const geoCode = (client: HereClient) => (query: string): Promise<GeoCodeItem[]> => {
    return client("get", "/geocode", {
        q: query
    })
    .then(mapGeoCodeResponse);
};

export const discover = (client: HereClient) => (request: SearchRequest): Promise<GeoCodeItem[]> => {
    return client("get", '/discover', {
        q: request.query,
        at: request.at
    })
    .then((response) => {
        return Promise.resolve(response);
    })
    .then(mapDiscoveryResponse);
};

export const queryDiscover = (client: HereClient) => (request: DiscoverRequest): Promise<GeoCodeItem[]> => {
    return geoCode(client)(request.location)
    .then(mapGeoCodeToSearch(request.query))
    .then(discover(client));
};

const mapGeoCodeToSearch = (searchTerms: string) => (items: GeoCodeItem[]): Promise<SearchRequest> => {
    const result = {
        query: searchTerms,
        at: `${items[0].position.lat},${items[0].position.lng}`
    };

    return Promise.resolve(result);
};

const mapGeoCodeResponse = (response: HereApiResponse<HereGeoCodeItem>): Promise<GeoCodeItem[]> => {
    if (!response.data.items) {
        return Promise.reject(new Error("No items in response"));
    }
    return Promise.resolve(response.data.items.map((item: HereGeoCodeItem) => ({
        title: item.title,
        address: item.address.label,
        position: item.position
    })));
};

const mapDiscoveryResponse = (response: HereApiResponse<HereGeoCodeItem>): Promise<GeoCodeItem[]> => {
    if (!response.data.items) {
        return Promise.reject(new Error("No items in response"));
    }
    return Promise.resolve(response.data.items.map((item: HereGeoCodeItem) => ({
        title: item.title,
        address: item.address.label,
        position: item.position
    })));
};

const client = (config: AppConfig): HereClient => (method: Method, url: string, params: Record<string, unknown>) => {
    const axiosInstance: AxiosInstance = axios.create();
   //axiosInstance.interceptors.request.use(axiosLogger.requestLogger);
    return axiosInstance({
        method,
        url,
        baseURL: config.hereBaseUrl,
        params: {
            ...params,
            apiKey: config.hereApiKey
        }
    });
};

export interface HereApi {
    geoCode: (query: string) => Promise<GeoCodeItem[]>;
    discover: (request: DiscoverRequest) => Promise<GeoCodeItem[]>;
}

export const createHereClient = (config: AppConfig): HereApi => {
    const c = client(config);
    return {
        geoCode: geoCode(c),
        discover: queryDiscover(c),
    };
};
