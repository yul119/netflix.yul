import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';

import authRoute from './routes/authRoute';
import userRoute from './routes/userRoute';
import listRoute from './routes/listRoute';
import movieRoute from './routes/movieRoute';
import { MONGODB_URL } from './constant';

dotenv.config();
const app = express();

/////////////////////////////////////////////
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

/////////////////////////////////////////////
const URL = MONGODB_URL;
mongoose.connect(
  URL,
  {
    autoIndex: false,
  },
  (err) => {
    if (err) throw err;
    console.log('Mongodb connection.');
  }
);

/////////////////////////////////////////////
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/list', listRoute);
app.use('/api/movie', movieRoute);

/////////////////////////////////////////////
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
