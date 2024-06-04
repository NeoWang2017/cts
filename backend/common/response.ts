import {ApiResponse} from "./interface";

export const generateSuccessResponse = (data: any, message = 'success'): ApiResponse => {
  return {
    success: true,
    status: 200,
    data,
    message
  }
};

export const generateFailResponse = (status: number, data: any, message = 'fail'): ApiResponse => {
  return {
    success: false,
    errorMessage: message,
    data,
    status,
  }
};
