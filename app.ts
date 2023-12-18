import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errorMiddlewear } from './middlewear/error';
export const app = express();
require('dotenv').config();

//BODY-PARSER MIDDLEWARE
app.use(express.json({ limit: '50mb' }));
//COOKIES-PARSER MIDDLEWARE
app.use(cookieParser());
//ADDING CORS
app.use(
  cors({
    origin: process.env.origin,
  })
);
//TESTING API WORKS
app.get('/test', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    msg: 'API Testing successfull ',
  });
});
//unknownRoute
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(
    `Route ${req.originalUrl} not Found !! status code=404  `
  );
  //   err.statusCode = 404;
  next(err);
});
app.use(errorMiddlewear);
