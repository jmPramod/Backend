import { Redis } from 'ioredis';

require('dotenv').config();
export const connectRedis = () => {
  if (process.env.RedishUrl) {
    console.log('redis connected success!!');
    return process.env.RedishUrl;
  }
  throw new Error('Redis connection failed !!');
};
