import { MAX_AGE_RESTRICTION, MIN_AGE_RESTRICTION, VIDEO_AUTHOR_LENGTH, VIDEO_TITLE_LENGTH } from '@/const/video';

export enum VIDEO_VALIDATION_ERRORS {
  NO_TITLE = 'Field title is not provided',
  TITLE_WRONG_FORMAT = 'Field title should be a string',
  TITLE_LENGTH = `Field title max length is ${VIDEO_TITLE_LENGTH} symbols`,

  NO_AUTHOR = 'Field author is not provided',
  AUTHOR_WRONG_FORMAT = 'Field author should be a string',
  AUTHOR_LENGTH = `Field author max length is ${VIDEO_AUTHOR_LENGTH} symbols`,

  NO_RESOLUTION = 'Field availableResolutions is not provided',
  RESOLUTION_WRONG_FORMAT = 'Field availableResolutions should be an array',
  RESOLUTION_LENGTH = 'availableResolutions field array should contain at least one resolution',

  CAN_BE_DOWNLOADED_WRONG_FORMAT = 'Field canBeDownloaded should be a boolean',

  AGE_WRONG_FORMAT = 'Field minAgeRestriction should be a number or null',
  AGE_NOT_ALLOWED = `Min age is ${MIN_AGE_RESTRICTION} and max age is ${MAX_AGE_RESTRICTION}`,

  PUBLICATION_DATE_WRONG_FORMAT = 'Field publicationDate should be an ISO string date',
}
