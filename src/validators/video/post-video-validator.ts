import { VideoPostPayload } from '@/types/video-post-payload';
import { validateVideoFields } from './video-validators';
import { IVideo } from '@/types/video';

const fieldsToValidate: Readonly<Partial<keyof IVideo>[]> = ['title', 'author', 'availableResolutions'] as const;

// POST Video Validator
export function postVideoValidator(fields: Partial<VideoPostPayload>) {
  return validateVideoFields(fields, fieldsToValidate);
}
