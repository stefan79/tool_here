import { Request, Response } from 'express';
import { AxiosError } from 'axios';
import { errorHandler, serializeResponse } from './util';

describe('Controller utilities', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let jsonSpy: jest.Mock;
  let statusSpy: jest.Mock;

  beforeEach(() => {
    jsonSpy = jest.fn();
    statusSpy = jest.fn().mockReturnThis();
    mockRequest = {};
    mockResponse = {
      status: statusSpy,
      json: jsonSpy,
    };
  });

  describe('errorHandler', () => {
    it('should handle AxiosError correctly', () => {
      const axiosError = new AxiosError();
      axiosError.request = {
        method: 'GET',
        baseUrl: 'https://api.example.com',
        url: '/endpoint'
      };
      axiosError.response = {
        status: 404,
        statusText: 'Not Found',
        headers: {},
        config: {} as any,
        data: { message: 'Not found' }
      };

      errorHandler(mockRequest as Request, mockResponse as Response)(axiosError);

      expect(statusSpy).toHaveBeenCalledWith(500);
      expect(jsonSpy).toHaveBeenCalledWith(expect.objectContaining({
        type: 'Backend Request Failure',
        status: 404,
        details: { message: 'Not found' },
        url: 'GET https://api.example.com/endpoint'
      }));
    });

    it('should handle generic Error correctly', () => {
      const error = new Error('Something went wrong');

      errorHandler(mockRequest as Request, mockResponse as Response)(error);

      expect(statusSpy).toHaveBeenCalledWith(500);
      expect(jsonSpy).toHaveBeenCalledWith({
        type: 'Unkown Error',
        error: error,
      });
    });
  });

  describe('serializeResponse', () => {
    it('should serialize successful response with 200 status', () => {
      const data = { message: 'Success' };

      serializeResponse(mockRequest as Request, mockResponse as Response)(data);

      expect(statusSpy).toHaveBeenCalledWith(200);
      expect(jsonSpy).toHaveBeenCalledWith(data);
    });
  });
});
