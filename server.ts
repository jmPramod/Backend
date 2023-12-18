import { connectDataBase } from './utils/db';

const { app } = require('./app');
require('dotenv').config();
connectDataBase();
//CREATE SERVER
app.listen(process.env.PORT, () => {
  console.log('server running on 4000');
});
