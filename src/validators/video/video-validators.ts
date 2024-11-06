import { AvailableResolutions, MAX_AGE_RESTRICTION, MIN_AGE_RESTRICTION, VIDEO_AUTHOR_LENGTH, VIDEO_TITLE_LENGTH } from '@/const/video';
import { videoErrorsMessages } from '@/const/video-errors-messages';
import type { AvailableResolutionsType, IVideo } from '@/types/video';
import { isIsoDate } from '@/util/isIsoDate';

interface ErrorItem {
  message: string;
  field: keyof IVideo;
}

interface Errors {
  errorsMessages: ErrorItem[];
}

type ErrorMessages = (typeof videoErrorsMessages)[keyof typeof videoErrorsMessages];

export function validateTitle(title: string | undefined, errors: Errors) {
  if (!title) {
    pushError('title', videoErrorsMessages.noTitle, errors);
  } else if (typeof title !== 'string') {
    pushError('title', videoErrorsMessages.titleWrongFormat, errors);
  } else if (!title.trim()) {
    pushError('title', videoErrorsMessages.noTitle, errors);
  } else if (title.length > VIDEO_TITLE_LENGTH) {
    pushError('title', videoErrorsMessages.titleLength, errors);
  }
}

export function validateAuthor(author: string | undefined, errors: Errors) {
  if (!author) {
    pushError('author', videoErrorsMessages.noAuthor, errors);
  } else if (typeof author !== 'string') {
    pushError('author', videoErrorsMessages.authorWrongFormat, errors);
  } else if (!author.trim()) {
    pushError('author', videoErrorsMessages.noAuthor, errors);
  } else if (author.length > VIDEO_AUTHOR_LENGTH) {
    pushError('author', videoErrorsMessages.authorLength, errors);
  }
}

export function validateResolutions(resolutions: AvailableResolutionsType[] | undefined, errors: Errors) {
  if (!resolutions) {
    pushError('availableResolutions', videoErrorsMessages.noResolution, errors);
  } else if (!Array.isArray(resolutions)) {
    pushError('availableResolutions', videoErrorsMessages.resolutionWrongFormat, errors);
  } else if (!AvailableResolutions.filter((r) => resolutions.some((res) => res === r)).length) {
    pushError('availableResolutions', videoErrorsMessages.resolutionLength, errors);
  }
}
export function validateCanBeDownloaded(canBeDownloaded: boolean | undefined, errors: Errors) {
  if (typeof canBeDownloaded !== 'boolean') {
    pushError('canBeDownloaded', videoErrorsMessages.canBeDownloadedWrongFormat, errors);
  }
}

export function validateAge(age: number | undefined | null, errors: Errors) {
  if (typeof age !== 'number' && age !== null) {
    pushError('minAgeRestriction', videoErrorsMessages.ageWrongFormat, errors);
  } else if (typeof age === 'number' && (age < MIN_AGE_RESTRICTION || age > MAX_AGE_RESTRICTION)) {
    pushError('minAgeRestriction', videoErrorsMessages.ageNotAllowed, errors);
  }
}

export function validatePublicationDate(date: string | undefined, errors: Errors) {
  if (!date || !isIsoDate(date)) {
    pushError('publicationDate', videoErrorsMessages.publicationDateWrongFormat, errors);
  }
}

export const validateVideoFields = (fields: Partial<IVideo>, fieldsToValidate: Readonly<(keyof IVideo)[]>): Errors => {
  const errors: Errors = {
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

function pushError(field: keyof IVideo, message: ErrorMessages, errors: Errors) {
  errors.errorsMessages.push({ field, message });
}
