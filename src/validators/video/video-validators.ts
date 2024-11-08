import { availableResolutions, MAX_AGE_RESTRICTION, MIN_AGE_RESTRICTION, VIDEO_AUTHOR_LENGTH, VIDEO_TITLE_LENGTH } from '@/const/video/video';
import type { IVideo } from '@/types/video/video';
import { AVAILABLE_RESOLUTIONS } from '@/types/video/video-resolutions';
import { VIDEO_VALIDATION_ERRORS } from '@/types/video/video-validation-errors';
import { isIsoDate } from '@/util/isIsoDate';

interface ErrorItem {
  message: string;
  field: keyof IVideo;
}

interface ErrorsMessages {
  errorsMessages: ErrorItem[];
}

export function validateTitle(title: string | undefined, errors: ErrorsMessages) {
  if (!title) {
    pushError('title', VIDEO_VALIDATION_ERRORS.NO_TITLE, errors);
  } else if (typeof title !== 'string') {
    pushError('title', VIDEO_VALIDATION_ERRORS.TITLE_WRONG_FORMAT, errors);
  } else if (!title.trim()) {
    pushError('title', VIDEO_VALIDATION_ERRORS.NO_TITLE, errors);
  } else if (title.length > VIDEO_TITLE_LENGTH) {
    pushError('title', VIDEO_VALIDATION_ERRORS.TITLE_LENGTH, errors);
  }
}

export function validateAuthor(author: string | undefined, errors: ErrorsMessages) {
  if (!author) {
    pushError('author', VIDEO_VALIDATION_ERRORS.NO_AUTHOR, errors);
  } else if (typeof author !== 'string') {
    pushError('author', VIDEO_VALIDATION_ERRORS.AUTHOR_WRONG_FORMAT, errors);
  } else if (!author.trim()) {
    pushError('author', VIDEO_VALIDATION_ERRORS.NO_AUTHOR, errors);
  } else if (author.length > VIDEO_AUTHOR_LENGTH) {
    pushError('author', VIDEO_VALIDATION_ERRORS.AUTHOR_LENGTH, errors);
  }
}

export function validateResolutions(resolutions: AVAILABLE_RESOLUTIONS[] | undefined, errors: ErrorsMessages) {
  if (!resolutions) {
    pushError('availableResolutions', VIDEO_VALIDATION_ERRORS.NO_RESOLUTION, errors);
  } else if (!Array.isArray(resolutions)) {
    pushError('availableResolutions', VIDEO_VALIDATION_ERRORS.RESOLUTION_WRONG_FORMAT, errors);
  } else if (!resolutions.length || !resolutions.some(r => availableResolutions.includes(r))) {
    pushError('availableResolutions', VIDEO_VALIDATION_ERRORS.RESOLUTION_LENGTH, errors);
  }
}
export function validateCanBeDownloaded(canBeDownloaded: boolean | undefined, errors: ErrorsMessages) {
  if (typeof canBeDownloaded !== 'boolean') {
    pushError('canBeDownloaded', VIDEO_VALIDATION_ERRORS.CAN_BE_DOWNLOADED_WRONG_FORMAT, errors);
  }
}

export function validateAge(age: number | undefined | null, errors: ErrorsMessages) {
  if (typeof age !== 'number' && age !== null) {
    pushError('minAgeRestriction', VIDEO_VALIDATION_ERRORS.AGE_WRONG_FORMAT, errors);
  } else if (typeof age === 'number' && (age < MIN_AGE_RESTRICTION || age > MAX_AGE_RESTRICTION)) {
    pushError('minAgeRestriction', VIDEO_VALIDATION_ERRORS.AGE_NOT_ALLOWED, errors);
  }
}

export function validatePublicationDate(date: string | undefined, errors: ErrorsMessages) {
  if (!date || !isIsoDate(date)) {
    pushError('publicationDate', VIDEO_VALIDATION_ERRORS.PUBLICATION_DATE_WRONG_FORMAT, errors);
  }
}

export const validateVideoFields = (fields: Partial<IVideo>, fieldsToValidate: Readonly<(keyof IVideo)[]>): ErrorsMessages => {
  const errors: ErrorsMessages = {
    errorsMessages: [],
  };

  fieldsToValidate.forEach((field) => {
    switch (field) {
      case 'title':
        validateTitle(fields.title, errors);
        break;
      case 'author':
        validateAuthor(fields.author, errors);
        break;
      case 'availableResolutions':
        validateResolutions(fields.availableResolutions, errors);
        break;
      case 'canBeDownloaded':
        validateCanBeDownloaded(fields.canBeDownloaded, errors);
        break;
      case 'minAgeRestriction':
        validateAge(fields.minAgeRestriction, errors);
        break;
      case 'publicationDate':
        validatePublicationDate(fields.publicationDate, errors);
        break;
      default:
        console.warn(`Unhandled field in validation: ${field}`);
        break;
    }
  });

  return errors;
};

function pushError(field: keyof IVideo, message: VIDEO_VALIDATION_ERRORS, errors: ErrorsMessages) {
  errors.errorsMessages.push({ field, message });
}
