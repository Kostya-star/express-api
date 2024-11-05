import { Router } from 'express';
import videosController from '@/controllers/videosController'

const router = Router()

router.post('/', videosController.createVideoController);
router.get('', videosController.getVideosController);

export default router