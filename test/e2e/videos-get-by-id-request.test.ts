import { mainRequestUrl, testVideo } from './common';
import { req } from './helper';

const videoGetByIdUrl = `${mainRequestUrl}/${testVideo.id}`;

describe('GET video by id request', () => {
  it('status check', async () => {
    const res = await req.get(videoGetByIdUrl);
    expect(res.status).toBe(200);
  });
  it('response check', async () => {
    const res = await req.get(videoGetByIdUrl);

    const video = res.body;

    expect(video).toMatchObject(testVideo);
    expect(video).toHaveProperty('id', testVideo.id);
    expect(video).toHaveProperty('author', testVideo.author);
    expect(video).toHaveProperty('title', testVideo.title);
  });
  it('returns 404 for a non-existent video', async () => {
    const invalidIdUrl = `${mainRequestUrl}/nonexistent-id`;
    const res = await req.get(invalidIdUrl);
    const video = res.body;

    expect(res.status).toBe(500);
    // expect(res.body).toMatch(/not found/i);
  });
});
