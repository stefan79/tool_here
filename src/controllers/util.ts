import { Request, Response } from 'express';

export const errorHandler = (req: Request, res: Response) => (error: any) => {
    //We are dealing with an Axios Error
    if(error.request){
        const url = `${error.request.method} ${error.request.baseUrl}${error.request.url}`
        res.status(500).json(
            {
                type: "Backend Request Failure",
                error: error.toJSON(),
                url,
                status: error.response.status,
                details: error.response.data
            }
        )
    } else {
        res.status(500).json(
            {
                type: "Unkown Error",
                error,
            }
        )
    }
}

export const serializeResponse = (req: Request, res: Response) => (data: any) => {
    res.status(200).json(data)
}