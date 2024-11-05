// import { app } from './app';

import express from 'express';
import cors from 'cors';

// use alias
import 'module-alias/register';

import videosRoutes from '@/routes/videosRoutes';
import { VIDEOS_ROUTES } from '@/const/routes';

export const app = express();

// app.use(cors());
app.use(express.json());

app.use(VIDEOS_ROUTES.main, videosRoutes);

// app.get('/', (req, res) => {
//   res.status(200).json({sms: 'hi there!'});
// });
