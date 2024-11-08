import { VIDEOS_ROUTES } from '../../src/const/routes';
import { HTTP_ERROR_RESPONSES } from '../../src/types/http-error-responses';
import { HTTP_STATUS_CODES } from '../../src/types/http-status-codes';
import { req } from './helper';

const mainRquestUrl = VIDEOS_ROUTES.main;

describe('VIDEO DELETE ALL request', () => {
  it('should successfully delete all videos', async () => {
    const res = await req.delete(mainRquestUrl);

    expect(res.status).toBe(HTTP_STATUS_CODES.NO_CONTENT_204);
    const getRes = await req.get(mainRquestUrl);
    expect(getRes.body).toEqual([]);
  });
});
