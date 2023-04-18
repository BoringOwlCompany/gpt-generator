import openai from './openai';
import { ChatCompletionRequestMessage } from 'openai';
import { MODEL } from './requests.config';
import { IImagesRequest } from '../../shared';

export const createChatCompletion = async (messages: ChatCompletionRequestMessage[]) => {
  return openai.createChatCompletion({
    model: MODEL,
    messages,
  });
};

export const createImages = async (data: IImagesRequest) => {
  return openai.createImage({
    prompt: data?.prompt || data.title,
    size: '1024x1024',
    response_format: 'b64_json',
    n: parseInt(`${data?.numberOfImages || 4}`),
  });
};
