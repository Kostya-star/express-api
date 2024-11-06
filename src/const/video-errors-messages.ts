import { MAX_AGE_RESTRICTION, MIN_AGE_RESTRICTION, VIDEO_AUTHOR_LENGTH, VIDEO_TITLE_LENGTH } from './video';

export const videoErrorsMessages = {
  noTitle: 'Field title is not provided',
  titleWrongFormat: 'Field title should be a string',
  titleLength: `Field title max length is ${VIDEO_TITLE_LENGTH} symbols`,

  noAuthor: 'Field author is not provided',
  authorWrongFormat: 'Field author should be a string',
  authorLength: `Field author max length is ${VIDEO_AUTHOR_LENGTH} symbols`,

  noResolution: 'Field availableResolutions is not provided',
  resolutionWrongFormat: 'Field availableResolutions should be an array',
  resolutionLength: 'availableResolutions field array should contain at least one resolution',

  canBeDownloadedWrongFormat: 'Field canBeDownloaded should be a boolean',

  ageWrongFormat: 'Field minAgeRestriction should be a number or null',
  ageNotAllowed: `Min age is ${MIN_AGE_RESTRICTION} and max age is ${MAX_AGE_RESTRICTION}`,

  publicationDateWrongFormat: 'Field publicationDate should be an ISO string date',
} as const;
