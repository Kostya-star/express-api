import { mockDB } from '@/mockDB';
import { IVideo } from '@/types/video';
import { VideoPostType } from '@/types/video-post';

const getVideos = (): IVideo[] => {
  return mockDB.videos;
};

const createVideo = (newVideo: VideoPostType): IVideo => {
  const createdAt = new Date();
  const publicationDate = new Date(createdAt.getTime() + 24 * 60 * 60 * 1000).toISOString(); // Add 1 day

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

export default {
  getVideos,
  createVideo,
};
