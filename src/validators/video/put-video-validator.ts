import { VideoPostPayload } from '@/types/video/video-post-payload';
import { validateVideoFields } from './video-validators';
import { IVideo } from '@/types/video/video';

const fieldsToValidate: Readonly<Partial<keyof IVideo>[]> = [
  'title',
  'author',
  'availableResolutions',
  'canBeDownloaded',
  'minAgeRestriction',
  'publicationDate',
] as const;

// PUT Video Validator
export function putVideoValidator(fields: Partial<VideoPostPayload>) {
  return validateVideoFields(fields, fieldsToValidate);
}
