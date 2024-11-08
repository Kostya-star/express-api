import { VIDEOS_ROUTES } from '../../src/const/routes';
import { HTTP_STATUS_CODES } from '../../src/types/http-status-codes';
import { req } from './helper';

describe('VIDEO DELETE ALL request', () => {
  it('should successfully delete all videos', async () => {
    const res = await req.delete(VIDEOS_ROUTES.testingAllData);

    expect(res.status).toBe(HTTP_STATUS_CODES.NO_CONTENT_204);
    const getRes = await req.get(VIDEOS_ROUTES.main);
    expect(getRes.body).toEqual([]);
  });
});
