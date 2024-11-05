import { VideoPostType } from '@/types/video-post';
import { videoPostValidator } from '@/validators/video-post-validator';
import { Request, Response } from 'express';
import VideoService from '@/services/video-service';

const getVideosController = (req: Request, res: Response) => {
  try {
    const videos = VideoService.getVideos();

    res.status(200).json({ videos });
  } catch (err) {
    console.error(err);
    res.status(500).json('Something went wrong...');
  }
};

const createVideoController = (req: Request<any, any, VideoPostType, any>, res: Response<any>) => {
  try {
    const { title, author, availableResolutions } = req.body;

    const newVideo = { title, author, availableResolutions };

    const { errorsMessages } = videoPostValidator(newVideo);

    if (errorsMessages.length) {
      console.error({ errorsMessages });
      res.status(400).json({ errorsMessages });
      return;
    }

    const video = VideoService.createVideo(newVideo);

    res.status(201).json({ video });
  } catch (err) {
    console.error(err);
    res.status(500).json('Something went wrong...');
  }
};

export default {
  getVideosController,
  createVideoController,
};
