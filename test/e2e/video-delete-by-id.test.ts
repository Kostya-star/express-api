import { VIDEOS_ROUTES } from '../../src/const/routes';
import { HTTP_ERROR_RESPONSES } from '../../src/types/http-error-responses';
import { HTTP_STATUS_CODES } from '../../src/types/http-status-codes';
import { req } from './helper';

const deleteRequestUrl = (videoId: string) => `${VIDEOS_ROUTES.main}/${videoId}`;

describe('VIDEO DELETE request', () => {
  it('should successfully delete a video with valid ID', async () => {
    const videoId = '22';
    const res = await req.delete(deleteRequestUrl(videoId));

    expect(res.status).toBe(HTTP_STATUS_CODES.NO_CONTENT_204);
    const getRes = await req.get(deleteRequestUrl(videoId));
    expect(getRes.status).toBe(HTTP_STATUS_CODES.NOT_FOUND_404);
  });

  it('should return 404 if the video does not exist or the id is invalid', async () => {
    const nonExistentVideoId = 'nonExistentVideoId';
    const res = await req.delete(deleteRequestUrl(nonExistentVideoId));

    expect(res.status).toBe(HTTP_STATUS_CODES.NOT_FOUND_404);
    expect(res.body).toHaveProperty('message', HTTP_ERROR_RESPONSES.NOT_FOUND_404);
  });
});
