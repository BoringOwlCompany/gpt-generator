import { AxiosError } from 'axios';
import { AxiosResponse } from 'openai/node_modules/axios';
import utils from '@strapi/utils';
import { CreateChatCompletionResponse } from 'openai';

const { ApplicationError } = utils.errors;

const getContent = (completion: AxiosResponse<CreateChatCompletionResponse, any>) =>
  completion.data.choices[0].message?.content || '';

export const tryParse = (completion: AxiosResponse<CreateChatCompletionResponse, any>) => {
  const stringified = getContent(completion);

  try {
    return JSON.parse(stringified);
  } catch (e) {
    throw new ApplicationError('Failed parsing openai response to JSON. Check the prompt', {
      data: { stringified },
      message: 'Failed parsing openai response to JSON. Check the prompt',
    });
  }
};

export const tryCatch = async <T>(cb: () => T) => {
  try {
    return await cb();
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      let message = e.response ? e.response.data?.message || e.response.data : e.message;
      throw new ApplicationError('Application error', {
        data: message,
      });
    }

    throw new ApplicationError('Application error', {
      data: e,
    });
  }
};
