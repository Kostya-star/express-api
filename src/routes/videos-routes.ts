import { Router } from 'express';
import videosController from '@/controllers/videos-controllers'

const router = Router()

router.get('/', videosController.getVideosController);
router.get('/:id', videosController.getVideoByIdController);
router.post('/', videosController.createVideoController);
router.put('/:id', videosController.updateVideoController);
router.delete('/:id', videosController.deleteVideoController);

export default router