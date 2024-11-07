import { HTTP_ERROR_RESPONSES } from '@/types/http-error-responses';
import { HTTP_STATUS_CODES } from '@/types/http-status-codes';

export interface HttpError {
  message: string;
  statusCode: number;
}

export function HttpErrorService(message: HTTP_ERROR_RESPONSES, statusCode: HTTP_STATUS_CODES): HttpError {
  return { message, statusCode };
}

// export class ErrorService extends Error {
//   statusCode: number;

//   constructor(message: string, statusCode: number) {
//     super(message);
//     this.statusCode = statusCode;
//     this.name = this.constructor.name;
//     Error.captureStackTrace(this, this.constructor);
//   }
// }
