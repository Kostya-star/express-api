import { VIDEOS_ROUTES } from '../../src/const/routes';
import { videoErrorsMessages } from '../../src/const/video-errors-messages';
import { IVideo } from '../../src/types/video';
import { req } from './helper';

export const postRequestUrl = VIDEOS_ROUTES.main;
export const testVideo: IVideo = {
  author: 'Author',
  availableResolutions: ['P360'],
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
  errorMessage: (typeof videoErrorsMessages)[keyof typeof videoErrorsMessages],
  field: keyof IVideo,
  reqType: 'post' | 'put',
  url: string
) {
  it(suiteName, async () => {
    const res = await req[reqType](url).send(video);

    expect(res.status).toBe(400);
    expect(res.body.errorsMessages).toContainEqual({
      message: errorMessage,
      field,
    });
  });
}
