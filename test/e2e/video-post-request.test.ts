import { videoErrorsMessages } from '../../src/const/video-errors-messages';
import { checkVideoValidation, mainRequestUrl, testVideo } from './common';
import { req } from './helper';

describe('POST request', () => {
  it('status check and header', async () => {
    const { title, author, availableResolutions } = testVideo;
    const postTestVideo = { title, author, availableResolutions };

    const res = await req.post(mainRequestUrl).send(postTestVideo).expect('Content-Type', /json/);

    expect(res.status).toBe(201);
  });
  it('returns correct response structure', async () => {
    const { title, author, availableResolutions } = testVideo;
    const postTestVideo = { title, author, availableResolutions };

    const res = await req.post(mainRequestUrl).send(postTestVideo);

    expect(res.body).toMatchObject(postTestVideo);
  });

  describe('POST Validation', () => {
    checkVideoValidation(
      'with missing title',
      // @ts-ignore
      { ...testVideo, title: undefined },
      videoErrorsMessages.noTitle,
      'title',
      'post',
      mainRequestUrl
    );
    checkVideoValidation(
      'with wrong title type',
      // @ts-ignore
      { ...testVideo, title: 1234 },
      videoErrorsMessages.titleWrongFormat,
      'title',
      'post',
      mainRequestUrl
    );
    checkVideoValidation(
      'with exceeded title length',
      { ...testVideo, title: 'a'.repeat(50) },
      videoErrorsMessages.titleLength,
      'title',
      'post',
      mainRequestUrl
    );

    checkVideoValidation(
      'with missing author',
      // @ts-ignore
      { ...testVideo, author: undefined },
      videoErrorsMessages.noAuthor,
      'author',
      'post',
      mainRequestUrl
    );
    checkVideoValidation(
      'with wrong author type',
      // @ts-ignore
      { ...testVideo, author: 12345 },
      videoErrorsMessages.authorWrongFormat,
      'author',
      'post',
      mainRequestUrl
    );
    checkVideoValidation(
      'with exceeded author length',
      { ...testVideo, author: 'a'.repeat(30) },
      videoErrorsMessages.authorLength,
      'author',
      'post',
      mainRequestUrl
    );
    checkVideoValidation(
      'with missing availableResolutions',
      // @ts-ignore
      { ...testVideo, availableResolutions: undefined },
      videoErrorsMessages.noResolution,
      'availableResolutions',
      'post',
      mainRequestUrl
    );
    checkVideoValidation(
      'with wrong availableResolutions type',
      // @ts-ignore
      { ...testVideo, availableResolutions: 1234 },
      videoErrorsMessages.resolutionWrongFormat,
      'availableResolutions',
      'post',
      mainRequestUrl
    );
    checkVideoValidation(
      'with wrong availableResolutions length',
      { ...testVideo, availableResolutions: [] },
      videoErrorsMessages.resolutionLength,
      'availableResolutions',
      'post',
      mainRequestUrl
    );
  });

  it('default values for unspecified fields', async () => {
    const { title, author, availableResolutions } = testVideo;
    const postTestVideo = { title, author, availableResolutions };

    const res = await req.post(mainRequestUrl).send(postTestVideo).expect('Content-Type', /json/);

    expect(res.status).toBe(201);
    expect(res.body.canBeDownloaded).toBe(false);
    expect(res.body.minAgeRestriction).toBe(null);
  });
});
