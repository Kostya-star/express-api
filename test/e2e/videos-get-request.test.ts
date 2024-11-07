import { mainRequestUrl, testVideo } from './common';
import { req } from './helper';

describe('GET request', () => {
  it('status check', async () => {
    const res = await req.get(mainRequestUrl);
    expect(res.status).toBe(200);
  });
  it('response check', async () => {
    const res = await req.get(mainRequestUrl);

    const videos = res.body;

    expect(Array.isArray(videos)).toBe(true);
    expect(videos).toEqual(expect.arrayContaining([testVideo]));
    expect(videos.length).toBeGreaterThan(0);
  });
});
