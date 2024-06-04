import { Request, Response, NextFunction } from 'express';
import {generateFailResponse, generateSuccessResponse} from "../common/response";

declare global {
  namespace Express {
    interface Response {
      sendSuccess(data: any, message?: string): void;
      sendError(status: number, data: any, message?: string): void;
    }
  }
}

const responseMiddleWare = (req: Request, res: Response, next: NextFunction) => {
  res.sendSuccess = (data, message = 'success') => {
    const response = generateSuccessResponse(data, message);
    res.json(response);
  };

  res.sendError = (status, data, message = 'error') => {
    const response = generateFailResponse(status, data, message);
    res.json(response);
  };

  next();
};

export default responseMiddleWare;
