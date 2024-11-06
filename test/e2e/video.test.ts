import { req } from './helper';
// import {setDB} from '../src/db/db'
// import {dataset1} from './datasets'
import { VIDEOS_ROUTES } from '../../src/const/routes';
import { videoErrorsMessages } from '../../src/const/video-errors-messages';
import type { VideoPostPayload } from '../../src/types/video-post-payload';
import type { IVideo } from '../../src/types/video';

const testVideo: IVideo = {
  author: 'Author',
  availableResolutions: ['P360'],
  canBeDownloaded: true,
  createdAt: '2011-10-05T14:48:00.100Z',
  id: 22,
  minAgeRestriction: 18,
  publicationDate: '2011-10-05T14:48:00.100Z',
  title: 'Title',
};

describe('VIDEOS', () => {
  // describe('GET request', () => {
  //   it('status check', async () => {
  //     const res = await req.get(VIDEOS_ROUTES.main);
  //     expect(res.status).toBe(200);
  //   });
  //   it('response check', async () => {
  //     const res = await req.get(VIDEOS_ROUTES.main);

  //     const videos = res.body.videos;

  //     expect(res.body).toHaveProperty('videos');
  //     expect(Array.isArray(videos)).toBe(true);
  //     expect(videos).toEqual(expect.arrayContaining([testVideo]));
  //     expect(videos.length).toBeGreaterThan(0);
  //   });
  // });

  // describe('POST request', () => {
  //   it('status check and header', async () => {
  //     const { title, author, availableResolutions } = testVideo;
  //     const postTestVideo = { title, author, availableResolutions };

  //     const res = await req.post(VIDEOS_ROUTES.main).send(postTestVideo).expect('Content-Type', /json/);

  //     expect(res.status).toBe(201);
  //   });
  //   it('returns correct response structure', async () => {
  //     const { title, author, availableResolutions } = testVideo;
  //     const postTestVideo = { title, author, availableResolutions };

  //     const res = await req.post(VIDEOS_ROUTES.main).send(postTestVideo);

  //     expect(res.body.video).toMatchObject(postTestVideo);
  //   });

  //   describe('POST Validation', () => {
  //     // const { title, author, availableResolutions } = testVideo;

  //     checkPostValidation(
  //       'with missing title',
  //       // @ts-ignore
  //       { ...testVideo, title: undefined },
  //       videoErrorsMessages.noTitle,
  //       'title'
  //     );
  //     checkPostValidation(
  //       'with wrong title type',
  //       // @ts-ignore
  //       { ...testVideo, title: 1234 },
  //       videoErrorsMessages.titleWrongFormat,
  //       'title'
  //     );
  //     checkPostValidation('with exceeded title length', { ...testVideo, title: 'a'.repeat(50) }, videoErrorsMessages.titleLength, 'title');

  //     checkPostValidation(
  //       'with missing author',
  //       // @ts-ignore
  //       { ...testVideo, author: undefined },
  //       videoErrorsMessages.noAuthor,
  //       'author'
  //     );
  //     checkPostValidation(
  //       'with wrong author type',
  //       // @ts-ignore
  //       { ...testVideo, author: 12345 },
  //       videoErrorsMessages.authorWrongFormat,
  //       'author'
  //     );
  //     checkPostValidation('with exceeded author length', { ...testVideo, author: 'a'.repeat(30) }, videoErrorsMessages.authorLength, 'author');

  //     checkPostValidation(
  //       'with missing availableResolutions',
  //       // @ts-ignore
  //       { ...testVideo, availableResolutions: undefined },
  //       videoErrorsMessages.noResolution,
  //       'availableResolutions'
  //     );
  //     checkPostValidation(
  //       'with wrong availableResolutions type',
  //       // @ts-ignore
  //       { ...testVideo, availableResolutions: 1234 },
  //       videoErrorsMessages.resolutionWrongFormat,
  //       'availableResolutions'
  //     );
  //     checkPostValidation(
  //       'with wrong availableResolutions length',
  //       { ...testVideo, availableResolutions: [] },
  //       videoErrorsMessages.resolutionLength,
  //       'availableResolutions'
  //     );
  //   });

  //   it('default values for unspecified fields', async () => {
  //     const { title, author, availableResolutions } = testVideo;
  //     const postTestVideo = { title, author, availableResolutions };

  //     const res = await req.post(VIDEOS_ROUTES.main).send(postTestVideo).expect('Content-Type', /json/);

  //     expect(res.status).toBe(201);
  //     expect(res.body.video.canBeDownloaded).toBe(false);
  //     expect(res.body.video.minAgeRestriction).toBe(null);
  //   });
  // });

  describe('PUT request', () => {
    const validPayload = {
      title: 'Updated Video Title',
      author: 'Updated Author',
      availableResolutions: ['P144', 'P720'],
      canBeDownloaded: true,
      minAgeRestriction: 16,
      publicationDate: '2011-10-05T14:48:00.100Z',
    };

    const putRequest = `${VIDEOS_ROUTES.main}/${testVideo.id}`;

    it('should successfully update a video with valid data', async () => {
      const response = await req.put(putRequest).send(validPayload);

      expect(response.status).toBe(201);
      expect(response.body.video).toHaveProperty('title', validPayload.title);
      expect(response.body.video).toHaveProperty('author', validPayload.author);
      expect(response.body.video).toHaveProperty('availableResolutions');
      expect(response.body.video.availableResolutions).toEqual(validPayload.availableResolutions);
      expect(response.body.video).toHaveProperty('canBeDownloaded', validPayload.canBeDownloaded);
      expect(response.body.video).toHaveProperty('minAgeRestriction', validPayload.minAgeRestriction);
      expect(response.body.video).toHaveProperty('publicationDate', validPayload.publicationDate);
    });

    describe('PUT validation', () => {
      checkVideoValidation(
        'should return 400 when title missing',
        // @ts-ignore
        { ...validPayload, title: undefined },
        videoErrorsMessages.noTitle,
        'title',
        'put',
        putRequest
      );
      checkVideoValidation(
        'should return 400 if title is empty',
        // @ts-ignore
        { ...validPayload, title: '' },
        videoErrorsMessages.noTitle,
        'title',
        'put',
        putRequest
      );
      checkVideoValidation('should return 400 if author is empty', { ...validPayload, author: '' }, videoErrorsMessages.noAuthor, 'author', 'put', putRequest);
      checkVideoValidation(
        'should return 400 if availableResolutions is empty',
        { ...validPayload, availableResolutions: [] },
        videoErrorsMessages.resolutionLength,
        'availableResolutions',
        'put',
        putRequest
      );
      checkVideoValidation(
        'should return 400 if availableResolutions contains invalid resolution format',
        // @ts-ignore
        { ...validPayload, availableResolutions: ['P1083330p'] },
        videoErrorsMessages.resolutionLength,
        'availableResolutions',
        'put',
        putRequest
      );
      checkVideoValidation(
        'should return 400 if minAgeRestriction is below the allowed range',
        { ...validPayload, minAgeRestriction: 0 },
        videoErrorsMessages.ageNotAllowed,
        'minAgeRestriction',
        'put',
        putRequest
      );
      checkVideoValidation(
        'should return 400 if publicationDate is not in ISO format',
        { ...validPayload, publicationDate: '2024-13-06' },
        videoErrorsMessages.publicationDateWrongFormat,
        'publicationDate',
        'put',
        putRequest
      );
    });

    it('should successfully update video even when some fields are null (if allowed)', async () => {
      const response = await req.put(putRequest).send({ ...validPayload, minAgeRestriction: null });

      expect(response.status).toBe(201);

      expect(response.body.video).toHaveProperty('minAgeRestriction', null);
    });
  });
});

async function checkVideoValidation(
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
