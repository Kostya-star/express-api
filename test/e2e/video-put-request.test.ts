import { VIDEOS_ROUTES } from '../../src/const/routes';
import { videoErrorsMessages } from '../../src/const/video-errors-messages';
import { checkVideoValidation, testVideo } from './common';
import { req } from './helper';

const putRequestUrl = `${VIDEOS_ROUTES.main}/${testVideo.id}`;
describe('PUT request', () => {
  const validPayload = {
    title: 'Updated Video Title',
    author: 'Updated Author',
    availableResolutions: ['P144', 'P720'],
    canBeDownloaded: true,
    minAgeRestriction: 16,
    publicationDate: '2011-10-05T14:48:00.100Z',
  };

  it('should successfully update a video with valid data', async () => {
    const res = await req.put(putRequestUrl).send(validPayload);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('title', validPayload.title);
    expect(res.body).toHaveProperty('author', validPayload.author);
    expect(res.body).toHaveProperty('availableResolutions');
    expect(res.body.availableResolutions).toEqual(validPayload.availableResolutions);
    expect(res.body).toHaveProperty('canBeDownloaded', validPayload.canBeDownloaded);
    expect(res.body).toHaveProperty('minAgeRestriction', validPayload.minAgeRestriction);
    expect(res.body).toHaveProperty('publicationDate', validPayload.publicationDate);
  });

  describe('PUT validation', () => {
    checkVideoValidation(
      'should return 400 when title missing',
      // @ts-ignore
      { ...validPayload, title: undefined },
      videoErrorsMessages.noTitle,
      'title',
      'put',
      putRequestUrl
    );
    checkVideoValidation(
      'should return 400 if title is empty',
      // @ts-ignore
      { ...validPayload, title: '' },
      videoErrorsMessages.noTitle,
      'title',
      'put',
      putRequestUrl
    );
    checkVideoValidation('should return 400 if author is empty', { ...validPayload, author: '' }, videoErrorsMessages.noAuthor, 'author', 'put', putRequestUrl);
    checkVideoValidation(
      'should return 400 if availableResolutions is empty',
      { ...validPayload, availableResolutions: [] },
      videoErrorsMessages.resolutionLength,
      'availableResolutions',
      'put',
      putRequestUrl
    );
    checkVideoValidation(
      'should return 400 if availableResolutions contains invalid resolution format',
      // @ts-ignore
      { ...validPayload, availableResolutions: ['P1083330p'] },
      videoErrorsMessages.resolutionLength,
      'availableResolutions',
      'put',
      putRequestUrl
    );
    checkVideoValidation(
      'should return 400 if minAgeRestriction is below the allowed range',
      { ...validPayload, minAgeRestriction: 0 },
      videoErrorsMessages.ageNotAllowed,
      'minAgeRestriction',
      'put',
      putRequestUrl
    );
    checkVideoValidation(
      'should return 400 if publicationDate is not in ISO format',
      { ...validPayload, publicationDate: '2024-13-06' },
      videoErrorsMessages.publicationDateWrongFormat,
      'publicationDate',
      'put',
      putRequestUrl
    );
  });

  it('should successfully update video even when some fields are null (if allowed)', async () => {
    const res = await req.put(putRequestUrl).send({ ...validPayload, minAgeRestriction: null });

    expect(res.status).toBe(201);

    expect(res.body).toHaveProperty('minAgeRestriction', null);
  });
});
