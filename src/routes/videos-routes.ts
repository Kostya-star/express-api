import { Router } from 'express';
import videosController from '@/controllers/videos-controllers'

export const videoRoutes = Router()

videoRoutes.get('/', videosController.getAllVideos);
videoRoutes.get('/:id', videosController.getVideoById);
videoRoutes.post('/', videosController.createVideo);
videoRoutes.put('/:id', videosController.updateVideoById);
videoRoutes.delete('/:id', videosController.deleteVideoById);