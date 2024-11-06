import { VideoPostPayload } from '@/types/video-post-payload';
import { postVideoValidator } from '@/validators/video/post-video-validator';
import { Request, Response } from 'express';
import VideoService from '@/services/video-service';
import { IVideo } from '@/types/video';
import { VideoPutPayload } from '@/types/video-put-payload';
import { putVideoValidator } from '@/validators/video/put-video-validator';

const getVideosController = (req: Request, res: Response) => {
  try {
    const videos = VideoService.getVideos();

    res.status(200).json({ videos });
  } catch (err) {
    console.error(err);
    res.status(500).json('Something went wrong...');
  }
};

const createVideoController = (req: Request<any, any, Partial<VideoPostPayload>, any>, res: Response<any>) => {
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

    res.status(201).json({ video });
  } catch (err) {
    console.error(err);
    res.status(500).json('Something went wrong...');
  }
};

const updateVideoController = (req: Request<{ id: string }, any, Partial<VideoPutPayload>, any>, res: Response<any>) => {
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

    res.status(201).json({ video });
  } catch (err) {
    console.error(err);
    res.status(500).json('Something went wrong...');
  }
};

export default {
  getVideosController,
  createVideoController,
  updateVideoController,
};
