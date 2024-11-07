import express, { Request, Response, NextFunction } from 'express';
// import cors from 'cors';

// use alias
import 'module-alias/register';

import videosRoutes from '@/routes/videosRoutes';
import { VIDEOS_ROUTES } from '@/const/routes';
import { HTTP_STATUS_CODES } from './types/http-status-codes';
import { HttpError } from './services/error-service';
import { HTTP_ERROR_RESPONSES } from './types/http-error-responses';

export const app = express();

// app.use(cors());
app.use(express.json());

app.use(VIDEOS_ROUTES.main, videosRoutes);

// centrialized error handler
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  if (err.message && err.statusCode) {
    res.status(err.statusCode).json({ message: err.message });
  }

  res.status(HTTP_STATUS_CODES.SERVER_ERROR_500).json({ message: HTTP_ERROR_RESPONSES.SERVER_ERROR_500 });
});

// app.get('/', (req, res) => {
//   res.status(200).json({sms: 'hi there!'});
// });
