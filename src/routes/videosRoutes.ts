import { Router } from 'express';
import videosController from '@/controllers/videosController'

const router = Router()

router.get('/', videosController.getVideosController);
router.post('/', videosController.createVideoController);
router.put('/:id', videosController.updateVideoController);
router.delete('/:id', videosController.deleteVideoController);

export default router