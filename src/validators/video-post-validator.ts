import { AvailableResolutions, VIDEO_AUTHOR_LENGTH, VIDEO_TITLE_LENGTH } from '@/const/video';
import { videoPostErrorsList } from '@/const/video-post-errors-list';
import type { IVideo } from '@/types/video';
import type { VideoPostType } from '@/types/video-post';

interface ErrorItem {
  message: string;
  field: keyof IVideo;
}

interface ErrorResp {
  errorsMessages: ErrorItem[];
}

export const videoPostValidator = ({ title, author, availableResolutions }: Partial<VideoPostType>): ErrorResp => {
  const errors: ErrorResp = {
    errorsMessages: [],
  };

  if (!title) {
    pushError('title', videoPostErrorsList.noTitle);
  } else if (typeof title !== 'string') {
    pushError('title', videoPostErrorsList.titleWrongFormat);
  } else if (!title.trim()) {
    pushError('title', videoPostErrorsList.noTitle);
  } else if (title.length > VIDEO_TITLE_LENGTH) {
    pushError('title', videoPostErrorsList.titleLength);
  }

  if (!author) {
    pushError('author', videoPostErrorsList.noAuthor);
  } else if (typeof author !== 'string') {
    pushError('author', videoPostErrorsList.authorWrongFormat);
  } else if (!author.trim()) {
    pushError('author', videoPostErrorsList.noAuthor);
  } else if (author.length > VIDEO_AUTHOR_LENGTH) {
    pushError('author', videoPostErrorsList.authorLength);
  }

  if (!availableResolutions) {
    pushError('availableResolutions', videoPostErrorsList.noResolution);
  } else if (!Array.isArray(availableResolutions)) {
    pushError('availableResolutions', videoPostErrorsList.resolutionWrongFormat);
  } else if (!AvailableResolutions.filter((r) => availableResolutions.some((res) => res === r)).length) {
    pushError('availableResolutions', videoPostErrorsList.resolutionLength);
  }

  return errors;

  function pushError(field: 'title' | 'author' | 'availableResolutions', message: string) {
    errors.errorsMessages.push({ field, message });
  }
};
