import { IVideo } from '@/types/video';
import { AVAILABLE_RESOLUTIONS } from '@/types/video-resolutions';

interface DataBase {
  videos: IVideo[];
}

export const mockDB: DataBase = {
  videos: [
    {
      author: 'Author',
      availableResolutions: [AVAILABLE_RESOLUTIONS.P360],
      canBeDownloaded: true,
      createdAt: '2011-10-05T14:48:00.100Z',
      id: 22,
      minAgeRestriction: 18,
      publicationDate: '2011-10-05T14:48:00.100Z',
      title: 'Title',
    },
  ],
};
