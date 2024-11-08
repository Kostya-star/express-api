import { HTTP_STATUS_CODES } from '../../src/types/http-status-codes';
import { mainRequestUrl, testVideo } from './common';
import { req } from './helper';

const videoGetByIdUrl = `${mainRequestUrl}/${testVideo.id}`;

describe('VIDEO GET video by id request', () => {
  it('status check', async () => {
    const res = await req.get(videoGetByIdUrl);
    expect(res.status).toBe(HTTP_STATUS_CODES.SUCCESS_200);
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

    expect(res.status).toBe(HTTP_STATUS_CODES.NOT_FOUND_404);
  });
});
