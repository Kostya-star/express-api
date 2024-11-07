import { VideoPostPayload } from '@/types/video-post-payload';
import { postVideoValidator } from '@/validators/video/post-video-validator';
import { Request, Response } from 'express';
import VideoService from '@/services/video-service';
import { VideoPutPayload } from '@/types/video-put-payload';
import { putVideoValidator } from '@/validators/video/put-video-validator';

const getVideosController = (req: Request, res: Response) => {
  try {
    const videos = VideoService.getVideos();

    res.status(200).json(videos);
  } catch (err: any) {
    console.error(err);
    res.status(500).json(err.message);
  }
};

const getVideoByIdController = (req: Request<{ id: string }, void, void, void>, res: Response) => {
  try {
    const videoId = req.params.id;
    const videos = VideoService.getVideoById(videoId);

    res.status(200).json(videos);
  } catch (err: any) {
    console.error(err);
    res.status(500).json(err.message);
  }
};

const createVideoController = (req: Request<void, void, Partial<VideoPostPayload>, void>, res: Response) => {
  try {
    const { title, author, availableResolutions } = req.body;

    const newVideo = { title, author, availableResolutions };

    const { errorsMessages } = postVideoValidator(newVideo);

    if (errorsMessages.length) {
      console.error({ errorsMessages });
      res.status(400).json({ errorsMessages });
      return;
    }

    const video = VideoService.createVideo(newVideo as VideoPostPayload);

    res.status(201).json(video);
  } catch (err: any) {
    console.error(err);
    res.status(500).json(err.message);
  }
};

const updateVideoController = (req: Request<{ id: string }, void, Partial<VideoPutPayload>, void>, res: Response) => {
  try {
    const videoId = req.params.id;
    const payload = req.body;

    const { errorsMessages } = putVideoValidator(payload);

    if (errorsMessages.length) {
      console.error({ errorsMessages });
      res.status(400).json({ errorsMessages });
      return;
    }

    const video = VideoService.updateVideo(videoId, payload as VideoPutPayload);

    res.status(201).json(video);
  } catch (err: any) {
    console.error(err);
    res.status(500).json(err.message);
  }
};

const deleteVideoController = (req: Request<{ id: string }, void, void, void>, res: Response) => {
  try {
    const videoId = req.params.id;

    const video = VideoService.deleteVideo(videoId);

    res.status(200).json({ video });
  } catch (err: any) {
    console.error(err);
    res.status(500).json(err.message);
  }
};
export default {
  getVideosController,
  getVideoByIdController,
  createVideoController,
  updateVideoController,
  deleteVideoController,
};
