import express, { NextFunction, Request, Response } from 'express';
// import cors from 'cors';

// use alias
import 'module-alias/register';

import { videoRoutes } from './routes/videos-routes';
import { VIDEOS_ROUTES } from './const/routes';
import { errorBoundary } from './error-boundary';
import { mockDB } from './mockDB';
import { HTTP_STATUS_CODES } from './types/http-status-codes';

export const app = express();

// app.use(cors());
app.use(express.json());

app.use(VIDEOS_ROUTES.main, videoRoutes);

// testing. delete all data
app.delete(VIDEOS_ROUTES.testingAllData, (req: Request, res: Response, next: NextFunction) => {
  try {
    mockDB.videos = [];

    res.status(HTTP_STATUS_CODES.NO_CONTENT_204).end();
  } catch (err: any) {
    next(err);
  }
});

// centrialized error handler
app.use(errorBoundary);
