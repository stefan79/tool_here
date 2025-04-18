import { Request, Response } from 'express';
import { AxiosError } from 'axios';

export const errorHandler = (req: Request, res: Response) => (error: AxiosError | Error) => {
    //We are dealing with an Axios Error
    if(error instanceof AxiosError){
        const url = `${error.request.method} ${error.request.baseUrl}${error.request.url}`
        res.status(500).json(
            {
                type: "Backend Request Failure",
                error: error.toJSON(),
                url,
                status: error.response?.status,
                details: error.response?.data
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

export const serializeResponse = <T>(req: Request, res: Response) => (data: T) => {
    res.status(200).json(data)
}