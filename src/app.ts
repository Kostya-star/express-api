import express from 'express';
// import cors from 'cors';

// use alias
import 'module-alias/register';

import { videoRoutes } from './routes/videos-routes';
import { VIDEOS_ROUTES } from './const/routes';
import { errorBoundary } from './error-boundary';

export const app = express();

// app.use(cors());
app.use(express.json());

app.use(VIDEOS_ROUTES.main, videoRoutes);

// centrialized error handler
app.use(errorBoundary);
