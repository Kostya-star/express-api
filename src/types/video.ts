import { AvailableResolutions } from '@/const/video';

export type AvailableResolutionsType = (typeof AvailableResolutions)[number];

export interface IVideo {
  id: number;
  title: string;
  author: string;
  canBeDownloaded: boolean;
  minAgeRestriction: number | null;
  createdAt: string;
  publicationDate: string;
  availableResolutions: AvailableResolutionsType[] | null;
}
