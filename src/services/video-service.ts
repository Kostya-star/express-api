import { mockDB } from '@/mockDB';
import { IVideo } from '@/types/video/video';
import { VideoPostPayload } from '@/types/video/video-post-payload';
import { VideoPutPayload } from '@/types/video/video-put-payload';
import { HttpErrorService } from './error-service';
import { HTTP_ERROR_RESPONSES } from '@/types/http-error-responses';
import { HTTP_STATUS_CODES } from '@/types/http-status-codes';

const getAllVideos = (): IVideo[] => {
  return mockDB.videos;
};

const getVideoById = (videoId: string): IVideo => {
  const video = mockDB.videos.find((video) => video.id === +videoId);

  if (!video) {
    throw HttpErrorService(HTTP_ERROR_RESPONSES.NOT_FOUND_404, HTTP_STATUS_CODES.NOT_FOUND_404);
  }

  return video;
};

const createVideo = (newVideo: VideoPostPayload): IVideo => {
  const createdAt = new Date();
  const addDay = createdAt.getTime() + 24 * 60 * 60 * 1000;
  const publicationDate = new Date(addDay).toISOString(); // Add 1 day

  const video: IVideo = {
    ...newVideo,
    id: Date.now(),
    canBeDownloaded: false,
    minAgeRestriction: null,
    createdAt: createdAt.toISOString(),
    publicationDate,
  };

  mockDB.videos = [...mockDB.videos, video];

  return video;
};

const updateVideo = (videoId: string, payload: VideoPutPayload): IVideo => {
  const videoToUpdate = mockDB.videos.find((video) => video.id === +videoId);

  if (!videoToUpdate) {
    throw HttpErrorService(HTTP_ERROR_RESPONSES.NOT_FOUND_404, HTTP_STATUS_CODES.NOT_FOUND_404);
  }

  videoToUpdate.title = payload.title;
  videoToUpdate.author = payload.author;
  videoToUpdate.availableResolutions = payload.availableResolutions;
  videoToUpdate.canBeDownloaded = payload.canBeDownloaded;
  videoToUpdate.minAgeRestriction = payload.minAgeRestriction;
  videoToUpdate.publicationDate = payload.publicationDate;

  return videoToUpdate;
};

const deleteVideo = (videoId: string) => {
  const videoToDelete = mockDB.videos.find((video) => video.id === +videoId);

  if (!videoToDelete) {
    throw HttpErrorService(HTTP_ERROR_RESPONSES.NOT_FOUND_404, HTTP_STATUS_CODES.NOT_FOUND_404);
  }

  mockDB.videos = mockDB.videos.filter((video) => video.id !== videoToDelete.id);
};

const deleteAllVideos = () => {
  mockDB.videos = [];
};

export default {
  getAllVideos,
  getVideoById,
  createVideo,
  updateVideo,
  deleteAllVideos,
  deleteVideo,
};
