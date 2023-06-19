import { IGeneratePostContentRequest } from '../../../../shared';
import { developerPrompt, postPrompt, articleContentPrompt, postJsonPrompt } from '../../prompts';
import { ChatCompletionRequestMessage } from 'openai';

interface IMessages {
  post: (props: IGeneratePostContentRequest) => ChatCompletionRequestMessage[];
}

export const messagesSocialMedia: IMessages = {
  post: ({ collectionContent, language, prefferedLength, socialMediaProvider }) => [
    {
      role: 'system',
      content: developerPrompt(language),
    },
    {
      role: 'assistant',
      content: articleContentPrompt(collectionContent),
    },
    {
      role: 'user',
      content: postPrompt(prefferedLength, socialMediaProvider) + postJsonPrompt,
    },
  ],
};
