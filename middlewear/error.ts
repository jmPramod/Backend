import { NextFunction, Request, Response } from 'express';
import ErrorHandeler from '../utils/errorHandeling';

export const errorMiddlewear = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Something went wrong!!';

  //Wrong mongo Db ID error
  if (err.name === 'CastError') {
    const message = `Resource Not found. Invalid ${err.path}!!`;
    err = new ErrorHandeler(message, 400);
  }
  //Duplicate key error'
  if (err.code === 1100) {
    const message = `Duplicate ${Object.keys(err.keyValue)}Key !!`;
    err = new ErrorHandeler(message, 400);
  }
  //Wrong JWT error
  if (err.name === 'JsonWebTokenError') {
    const message = `json web token is invalid , try again  !!`;
    err = new ErrorHandeler(message, 400);
  }

  //JWT Expire
  if (err.name === 'TokenExpiredError') {
    const message = `json web token has Expired , try again  !!`;
    err = new ErrorHandeler(message, 400);
  }

  res.status(err.statusCode).json({ success: false, message: err.message });
};
