import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS_CODES } from './types/http-status-codes';
import { HttpError } from './services/error-service';
import { HTTP_ERROR_RESPONSES } from './types/http-error-responses';

// Note: keep all 4 parameters here. That's how Express recognizes it's the error handler, even if
// we don't use next
export function errorBoundary(err: HttpError, req: Request, res: Response, next: NextFunction) {
  console.error(err);

  if (err.message && err.statusCode) {
    res.status(err.statusCode).json({ message: err.message });
    return;
  }

  res.status(HTTP_STATUS_CODES.SERVER_ERROR_500).json({ message: HTTP_ERROR_RESPONSES.SERVER_ERROR_500 });
}
