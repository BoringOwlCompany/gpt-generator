import { tryCatch, tryParse } from '../utils';
import { createChatCompletion } from '../../methods';
import { messagesSocialMedia } from './messages';
import { IGeneratePostContentRequest } from '../../../../shared';

const generatePost = async (data: IGeneratePostContentRequest) => {
  const completion = await tryCatch(() => createChatCompletion(messagesSocialMedia.post(data)));
  return tryParse(completion);
};

export const openaiSocialMedia = {
  generatePost,
};
