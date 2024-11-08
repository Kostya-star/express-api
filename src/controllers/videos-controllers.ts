import { NextFunction, Request, Response } from 'express';
import { VideoPostPayload } from '@/types/video/video-post-payload';
import { postVideoValidator } from '@/validators/video/post-video-validator';
import VideoService from '@/services/video-service';
import { VideoPutPayload } from '@/types/video/video-put-payload';
import { putVideoValidator } from '@/validators/video/put-video-validator';
import { HTTP_STATUS_CODES } from '@/types/http-status-codes';

const getAllVideos = (req: Request, res: Response, next: NextFunction) => {
  try {
    const videos = VideoService.getAllVideos();

    res.status(HTTP_STATUS_CODES.SUCCESS_200).json(videos);
  } catch (err: any) {
    next(err);
  }
};

const getVideoById = (req: Request<{ id: string }, void, void, void>, res: Response, next: NextFunction) => {
  try {
    const videoId = req.params.id;
    const video = VideoService.getVideoById(videoId);

    res.status(HTTP_STATUS_CODES.SUCCESS_200).json(video);
  } catch (err: any) {
    next(err);
  }
};

const createVideo = (req: Request<void, void, Partial<VideoPostPayload>, void>, res: Response, next: NextFunction) => {
  try {
    const { title, author, availableResolutions } = req.body;

    const newVideo = { title, author, availableResolutions };

    const { errorsMessages } = postVideoValidator(newVideo);

    if (errorsMessages.length) {
      console.error({ errorsMessages });
      res.status(HTTP_STATUS_CODES.BAD_REQUEST_400).json({ errorsMessages });
      return;
    }

    const video = VideoService.createVideo(newVideo as VideoPostPayload);

    res.status(HTTP_STATUS_CODES.SUCCESS_201).json(video);
  } catch (err: any) {
    next(err);
  }
};

const updateVideoById = (req: Request<{ id: string }, void, Partial<VideoPutPayload>, void>, res: Response, next: NextFunction) => {
  try {
    const videoId = req.params.id;
    const payload = req.body;

    const { errorsMessages } = putVideoValidator(payload);

    if (errorsMessages.length) {
      console.error({ errorsMessages });
      res.status(HTTP_STATUS_CODES.BAD_REQUEST_400).json({ errorsMessages });
      return;
    }

    VideoService.updateVideo(videoId, payload as VideoPutPayload);

    res.status(HTTP_STATUS_CODES.NO_CONTENT_204).end();
  } catch (err: any) {
    next(err);
  }
};

const deleteVideoById = (req: Request<{ id: string }, void, void, void>, res: Response, next: NextFunction) => {
  try {
    const videoId = req.params.id;

    VideoService.deleteVideo(videoId);

    res.status(HTTP_STATUS_CODES.NO_CONTENT_204).end();
  } catch (err: any) {
    next(err);
  }
};

export default {
  getAllVideos,
  getVideoById,
  createVideo,
  updateVideoById,
  deleteVideoById,
};
