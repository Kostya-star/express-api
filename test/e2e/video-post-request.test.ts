import { HTTP_STATUS_CODES } from '../../src/types/http-status-codes';
import {VIDEO_VALIDATION_ERRORS} from '../../src/types/video-validation-errors';
import { checkVideoValidation, mainRequestUrl, testVideo } from './common';
import { req } from './helper';

describe('VIDEO POST request', () => {
  it('status check and header', async () => {
    const { title, author, availableResolutions } = testVideo;
    const postTestVideo = { title, author, availableResolutions };

    const res = await req.post(mainRequestUrl).send(postTestVideo).expect('Content-Type', /json/);

    expect(res.status).toBe(HTTP_STATUS_CODES.SUCCESS_201);
  });
  it('returns correct response structure', async () => {
    const { title, author, availableResolutions } = testVideo;
    const postTestVideo = { title, author, availableResolutions };

    const res = await req.post(mainRequestUrl).send(postTestVideo);

    expect(res.body).toMatchObject(postTestVideo);
  });

  describe('VIDEO POST Validation', () => {
    checkVideoValidation(
      'with missing title',
      // @ts-ignore
      { ...testVideo, title: undefined },
      VIDEO_VALIDATION_ERRORS.NO_TITLE,
      'title',
      'post',
      mainRequestUrl
    );
    checkVideoValidation(
      'with wrong title type',
      // @ts-ignore
      { ...testVideo, title: 1234 },
      VIDEO_VALIDATION_ERRORS.TITLE_WRONG_FORMAT,
      'title',
      'post',
      mainRequestUrl
    );
    checkVideoValidation(
      'with exceeded title length',
      { ...testVideo, title: 'a'.repeat(50) },
      VIDEO_VALIDATION_ERRORS.TITLE_LENGTH,
      'title',
      'post',
      mainRequestUrl
    );

    checkVideoValidation(
      'with missing author',
      // @ts-ignore
      { ...testVideo, author: undefined },
      VIDEO_VALIDATION_ERRORS.NO_AUTHOR,
      'author',
      'post',
      mainRequestUrl
    );
    checkVideoValidation(
      'with wrong author type',
      // @ts-ignore
      { ...testVideo, author: 12345 },
      VIDEO_VALIDATION_ERRORS.AUTHOR_WRONG_FORMAT,
      'author',
      'post',
      mainRequestUrl
    );
    checkVideoValidation(
      'with exceeded author length',
      { ...testVideo, author: 'a'.repeat(30) },
      VIDEO_VALIDATION_ERRORS.AUTHOR_LENGTH,
      'author',
      'post',
      mainRequestUrl
    );
    checkVideoValidation(
      'with missing availableResolutions',
      // @ts-ignore
      { ...testVideo, availableResolutions: undefined },
      VIDEO_VALIDATION_ERRORS.NO_RESOLUTION,
      'availableResolutions',
      'post',
      mainRequestUrl
    );
    checkVideoValidation(
      'with wrong availableResolutions type',
      // @ts-ignore
      { ...testVideo, availableResolutions: 1234 },
      VIDEO_VALIDATION_ERRORS.RESOLUTION_WRONG_FORMAT,
      'availableResolutions',
      'post',
      mainRequestUrl
    );
    checkVideoValidation(
      'with wrong availableResolutions length',
      { ...testVideo, availableResolutions: [] },
      VIDEO_VALIDATION_ERRORS.RESOLUTION_LENGTH,
      'availableResolutions',
      'post',
      mainRequestUrl
    );
  });

  it('default values for unspecified fields', async () => {
    const { title, author, availableResolutions } = testVideo;
    const postTestVideo = { title, author, availableResolutions };

    const res = await req.post(mainRequestUrl).send(postTestVideo).expect('Content-Type', /json/);

    expect(res.status).toBe(HTTP_STATUS_CODES.SUCCESS_201);
    expect(res.body.canBeDownloaded).toBe(false);
    expect(res.body.minAgeRestriction).toBe(null);
  });
});
