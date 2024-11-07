import { AVAILABLE_RESOLUTIONS } from './video-resolutions';

export interface IVideo {
  id: number;
  title: string;
  author: string;
  canBeDownloaded: boolean;
  minAgeRestriction: number | null;
  createdAt: string;
  publicationDate: string;
  availableResolutions: AVAILABLE_RESOLUTIONS[];
}
