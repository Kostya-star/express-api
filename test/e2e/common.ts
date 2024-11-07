import { VIDEOS_ROUTES } from '../../src/const/routes';
import { IVideo } from '../../src/types/video';
import { req } from './helper';
import { VIDEO_VALIDATION_ERRORS } from '../../src/types/video-validation-errors'
import { AVAILABLE_RESOLUTIONS } from '../../src/types/video-resolutions';
import { HTTP_STATUS_CODES } from '../../src/types/http-status-codes';

export const mainRequestUrl = VIDEOS_ROUTES.main;
export const testVideo: IVideo = {
  author: 'Author',
  availableResolutions: [AVAILABLE_RESOLUTIONS.P360],
  canBeDownloaded: true,
  createdAt: '2011-10-05T14:48:00.100Z',
  id: 22,
  minAgeRestriction: 18,
  publicationDate: '2011-10-05T14:48:00.100Z',
  title: 'Title',
};

export async function checkVideoValidation(
  suiteName: string,
  video: any,
  errorMessage: VIDEO_VALIDATION_ERRORS,
  field: keyof IVideo,
  reqType: 'post' | 'put',
  url: string
) {
  it(suiteName, async () => {
    const res = await req[reqType](url).send(video);

    expect(res.status).toBe(HTTP_STATUS_CODES.BAD_REQUEST_400);
    expect(res.body.errorsMessages).toContainEqual({
      message: errorMessage,
      field,
    });
  });
}
