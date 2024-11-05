import { VIDEO_AUTHOR_LENGTH, VIDEO_TITLE_LENGTH } from './video';

export const videoPostErrorsList = {
  noTitle: 'Field title is not provided',
  titleWrongFormat: 'Field title should be a string',
  titleLength: `Field title max length is ${VIDEO_TITLE_LENGTH} symbols`,

  noAuthor: 'Field author is not provided',
  authorWrongFormat: 'Field author should be a string',
  authorLength: `Field author max length is ${VIDEO_AUTHOR_LENGTH} symbols`,

  noResolution: 'Field availableResolutions is not provided',
  resolutionWrongFormat: 'Field availableResolutions should be an array',
  resolutionLength: 'availableResolutions field array should contain at least one resolution',
} as const;
