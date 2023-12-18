import mongoose from 'mongoose';

require('dotenv').config();
const mongoDbUrl: string = process.env.MongoURL || '';
export const connectDataBase = async () => {
  try {
    await mongoose.connect(mongoDbUrl);
    console.log('mongo db connected success');
  } catch (err) {
    console.log('mongo db connection failed !!');
  }
};
