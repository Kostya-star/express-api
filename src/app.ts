// import { app } from './app';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

// use alias
import 'module-alias/register';

import videosRoutes from '@/routes/videosRoutes';
import { VIDEOS_ROUTES } from '@/const/routes';
import { ErrorService } from './services/error-service';

export const app = express();

// app.use(cors());
app.use(express.json());

app.use(VIDEOS_ROUTES.main, videosRoutes);

interface CustomError {
  message: string;
  statusCode: number;
}

// centrialized error handler
app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  if (err instanceof ErrorService) {
    res.status(err.statusCode).json({ message: err.message });
  }

  res.status(500).json({ message: 'Internal server error' });
});

// app.get('/', (req, res) => {
//   res.status(200).json({sms: 'hi there!'});
// });
