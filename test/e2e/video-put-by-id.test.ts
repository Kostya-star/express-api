import { VIDEOS_ROUTES } from '../../src/const/routes';
import { checkVideoValidation, testVideo } from './common';
import { req } from './helper';
import { VIDEO_VALIDATION_ERRORS } from '../../src/types/video/video-validation-errors';
import { AVAILABLE_RESOLUTIONS } from '../../src/types/video/video-resolutions';
import { HTTP_STATUS_CODES } from '../../src/types/http-status-codes';

const putRequestUrl = `${VIDEOS_ROUTES.main}/${testVideo.id}`;
describe('VIDEO PUT request', () => {
  const validPayload = {
    title: 'Updated Video Title',
    author: 'Updated Author',
    availableResolutions: [AVAILABLE_RESOLUTIONS.P144, AVAILABLE_RESOLUTIONS.P720],
    canBeDownloaded: true,
    minAgeRestriction: 16,
    publicationDate: '2011-10-05T14:48:00.100Z',
  };
  // @ts-ignore
  it('should successfully update a video with valid data', async () => {
    const res = await req.put(putRequestUrl).send(validPayload);

    expect(res.status).toBe(HTTP_STATUS_CODES.NO_CONTENT_204);
  });

  describe('VIDEO PUT validation', () => {
    checkVideoValidation(
      'should return 400 when title missing',
      // @ts-ignore
      { ...validPayload, title: undefined },
      VIDEO_VALIDATION_ERRORS.NO_TITLE,
      'title',
      'put',
      putRequestUrl
    );
    checkVideoValidation(
      'should return 400 if title is empty',
      // @ts-ignore
      { ...validPayload, title: '' },
      VIDEO_VALIDATION_ERRORS.NO_TITLE,
      'title',
      'put',
      putRequestUrl
    );
    checkVideoValidation(
      'should return 400 if author is empty',
      { ...validPayload, author: '' },
      VIDEO_VALIDATION_ERRORS.NO_AUTHOR,
      'author',
      'put',
      putRequestUrl
    );
    checkVideoValidation(
      'should return 400 if availableResolutions is empty',
      { ...validPayload, availableResolutions: [] },
      VIDEO_VALIDATION_ERRORS.RESOLUTION_LENGTH,
      'availableResolutions',
      'put',
      putRequestUrl
    );
    checkVideoValidation(
      'should return 400 if availableResolutions contains invalid resolution format',
      // @ts-ignore
      { ...validPayload, availableResolutions: ['P1083330p'] },
      VIDEO_VALIDATION_ERRORS.RESOLUTION_LENGTH,
      'availableResolutions',
      'put',
      putRequestUrl
    );
    checkVideoValidation(
      'should return 400 if minAgeRestriction is below the allowed range',
      { ...validPayload, minAgeRestriction: 0 },
      VIDEO_VALIDATION_ERRORS.AGE_NOT_ALLOWED,
      'minAgeRestriction',
      'put',
      putRequestUrl
    );
    checkVideoValidation(
      'should return 400 if publicationDate is not in ISO format',
      { ...validPayload, publicationDate: '2024-13-06' },
      VIDEO_VALIDATION_ERRORS.PUBLICATION_DATE_WRONG_FORMAT,
      'publicationDate',
      'put',
      putRequestUrl
    );
  });
  // @ts-ignore
  it('should successfully update video even when some fields are null (if allowed)', async () => {
    const res = await req.put(putRequestUrl).send({ ...validPayload, minAgeRestriction: null });

    expect(res.status).toBe(HTTP_STATUS_CODES.NO_CONTENT_204);
  });
});
