import { Response } from 'express';

export const sendSuccess = (res: Response, data: any, message = 'Operation successful', statusCode = 200) => {
  res.status(statusCode).json({
    success: true,
    data,
    message,
  });
};

export const sendPaginatedSuccess = (res: Response, data: any[], pagination: any, message = 'Operation successful') => {
  res.status(200).json({
    success: true,
    data,
    pagination,
    message,
  });
};
