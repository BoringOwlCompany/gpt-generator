import openai from './openai';
import { ChatCompletionRequestMessage } from 'openai';
import { MODEL } from './requests.config';
import { IImagesRequest } from '../../shared';
import { getService } from '../utils';

export const createChatCompletion = async (messages: ChatCompletionRequestMessage[]) => {
  const { gptApiKey } = getService('generalService').getConfig();
  return openai(gptApiKey).createChatCompletion({
    model: MODEL,
    messages,
  });
};

export const createImages = async (data: IImagesRequest) => {
  const { gptApiKey } = getService('generalService').getConfig();
  return openai(gptApiKey).createImage({
    prompt: data?.prompt || data.title,
    size: '1024x1024',
    response_format: 'b64_json',
    n: parseInt(`${data?.numberOfImages || 4}`),
  });
};
