import { Router } from 'express';
import videosController from '@/controllers/videos-controllers'

export const videoRoutes = Router()

videoRoutes.get('/', videosController.getVideosController);
videoRoutes.get('/:id', videosController.getVideoByIdController);
videoRoutes.post('/', videosController.createVideoController);
videoRoutes.put('/:id', videosController.updateVideoController);
videoRoutes.delete('/:id', videosController.deleteVideoController);