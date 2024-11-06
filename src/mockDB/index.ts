import { IVideo } from '@/types/video';
import { VideoPostPayload } from '@/types/video-post-payload';

interface DataBase {
  videos: IVideo[];
}

export const mockDB: DataBase = {
  videos: [
    {
      author: 'sds',
      availableResolutions: ['P1080'],
      canBeDownloaded: false,
      createdAt: 'sds',
      id: 22,
      minAgeRestriction: null,
      publicationDate: '3434',
      title: '222',
    },
  ],
};
