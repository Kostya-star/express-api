import { IVideo } from './video';

export type VideoPostType = Pick<IVideo, 'title' | 'author' | 'availableResolutions'>