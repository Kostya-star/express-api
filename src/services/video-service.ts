import { mockDB } from '@/mockDB';
import { IVideo } from '@/types/video';
import { VideoPostPayload } from '@/types/video-post-payload';
import { VideoPutPayload } from '@/types/video-put-payload';

const getVideos = (): IVideo[] => {
  return mockDB.videos;
};

const createVideo = (newVideo: VideoPostPayload): IVideo => {
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

const updateVideo = (videoId: string, payload: VideoPutPayload): IVideo => {
  const videoToUpdate = mockDB.videos.find((video) => video.id === +videoId);

  if (!videoToUpdate) {
    throw new Error(`Video with ID ${videoId} does not exist.`);
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
    throw new Error(`Video with ID ${videoId} does not exist.`);
  }

  mockDB.videos = mockDB.videos.filter(video => video.id !== videoToDelete.id) 
};

export default {
  getVideos,
  createVideo,
  updateVideo,
  deleteVideo,
};
