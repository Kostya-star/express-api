import { VideoPostPayload } from '@/types/video/video-post-payload';
import { validateVideoFields } from './video-validators';
import { IVideo } from '@/types/video/video';

const fieldsToValidate: Readonly<Partial<keyof IVideo>[]> = ['title', 'author', 'availableResolutions'] as const;

// POST Video Validator
export function postVideoValidator(fields: Partial<VideoPostPayload>) {
  return validateVideoFields(fields, fieldsToValidate);
}
