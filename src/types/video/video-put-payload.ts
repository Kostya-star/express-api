import { IVideo } from './video';

export type VideoPutPayload = Omit<IVideo, 'id' | 'createdAt'>;
