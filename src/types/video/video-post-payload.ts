import { IVideo } from './video';

export type VideoPostPayload = Pick<IVideo, 'title' | 'author' | 'availableResolutions'>;
