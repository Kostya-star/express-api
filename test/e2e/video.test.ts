import { req } from './helper';
// import {setDB} from '../src/db/db'
// import {dataset1} from './datasets'
import { VIDEOS_ROUTES } from '../../src/const/routes';
import { videoPostErrorsList } from '../../src/const/video-post-errors-list';
import type { VideoPostType } from '../../src/types/video-post';
import type { IVideo } from '../../src/types/video';

const testVideo: IVideo = {
  author: 'sds',
  availableResolutions: ['P1080'],
  canBeDownloaded: false,
  createdAt: 'sds',
  id: 22,
  minAgeRestriction: null,
  publicationDate: '3434',
  title: '222',
};

describe('VIDEOS', () => {
  describe('GET request', () => {
    it('status check', async () => {
      const res = await req.get(VIDEOS_ROUTES.main);
      expect(res.status).toBe(200);
    });
    it('response check', async () => {
      const res = await req.get(VIDEOS_ROUTES.main);

      const videos = res.body.videos;

      expect(res.body).toHaveProperty('videos');
      expect(Array.isArray(videos)).toBe(true);
      expect(videos).toEqual(expect.arrayContaining([testVideo]));
      expect(videos.length).toBeGreaterThan(0);
    });
  });

  describe('POST request', () => {
    it('status check and header', async () => {
      const { title, author, availableResolutions } = testVideo;
      const postTestVideo = { title, author, availableResolutions };

      const res = await req.post(VIDEOS_ROUTES.main).send(postTestVideo).expect('Content-Type', /json/);

      expect(res.status).toBe(201);
    });
    it('returns correct response structure', async () => {
      const { title, author, availableResolutions } = testVideo;
      const postTestVideo = { title, author, availableResolutions };

      const res = await req.post(VIDEOS_ROUTES.main).send(postTestVideo);

      expect(res.body.video).toMatchObject(postTestVideo);
    });

    describe('POST Validation', () => {
      // const { title, author, availableResolutions } = testVideo;

      checkPostValidation(
        'with missing title',
        // @ts-ignore
        { ...testVideo, title: undefined },
        videoPostErrorsList.noTitle,
        'title'
      );
      checkPostValidation(
        'with wrong title type',
        // @ts-ignore
        { ...testVideo, title: 1234 },
        videoPostErrorsList.titleWrongFormat,
        'title'
      );
      checkPostValidation(
        'with exceeded title length',
        { ...testVideo, title: 'a'.repeat(50) },
        videoPostErrorsList.titleLength,
        'title'
      );

      checkPostValidation(
        'with missing author',
        // @ts-ignore
        { ...testVideo, author: undefined },
        videoPostErrorsList.noAuthor,
        'author'
      );
      checkPostValidation(
        'with wrong author type',
        // @ts-ignore
        { ...testVideo, author: 12345 },
        videoPostErrorsList.authorWrongFormat,
        'author'
      );
      checkPostValidation(
        'with exceeded author length',
        { ...testVideo, author: 'a'.repeat(30) },
        videoPostErrorsList.authorLength,
        'author'
      );
      
      checkPostValidation(
        'with missing availableResolutions',
        // @ts-ignore
        { ...testVideo, availableResolutions: undefined },
        videoPostErrorsList.noResolution,
        'availableResolutions'
      );
      checkPostValidation(
        'with wrong availableResolutions type',
        // @ts-ignore
        { ...testVideo, availableResolutions: 1234 },
        videoPostErrorsList.resolutionWrongFormat,
        'availableResolutions'
      );
      checkPostValidation(
        'with wrong availableResolutions length',
        { ...testVideo, availableResolutions: [] },
        videoPostErrorsList.resolutionLength,
        'availableResolutions'
      );
    });

    it('default values for unspecified fields', async () => {
      const { title, author, availableResolutions } = testVideo;
      const postTestVideo = { title, author, availableResolutions };
    
      const res = await req
        .post(VIDEOS_ROUTES.main)
        .send(postTestVideo)
        .expect('Content-Type', /json/);
    
      expect(res.status).toBe(201);
      expect(res.body.video.canBeDownloaded).toBe(false);
      expect(res.body.video.minAgeRestriction).toBe(null);
    });
  });
});

async function checkPostValidation(
  suiteName: string,
  video: VideoPostType,
  errorMessage: typeof videoPostErrorsList[keyof typeof videoPostErrorsList],
  field: 'title' | 'author' | 'availableResolutions'
) {
  it(suiteName, async () => {
    const res = await req.post(VIDEOS_ROUTES.main).send(video);

    expect(res.status).toBe(400);
    expect(res.body.errorsMessages).toContainEqual({
      message: errorMessage,
      field,
    });
  });
}
