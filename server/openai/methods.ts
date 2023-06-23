import openai from './openai';
import { ChatCompletionRequestMessage } from 'openai';
import { MODEL } from './requests.config';
import { Constant, IImagesRequest } from '../../shared';

export const createChatCompletion = async (messages: ChatCompletionRequestMessage[]) => {
  const apiKey = strapi.plugin(Constant.PLUGIN_NAME).config('gptApiKey');
  return openai(apiKey).createChatCompletion({
    model: MODEL,
    messages,
  });
};

export const createImages = async (data: IImagesRequest) => {
  const apiKey = strapi.plugin(Constant.PLUGIN_NAME).config('gptApiKey');
  return openai(apiKey).createImage({
    prompt: data?.prompt || data.title,
    size: '1024x1024',
    response_format: 'b64_json',
    n: parseInt(`${data?.numberOfImages || 4}`),
  });
};
