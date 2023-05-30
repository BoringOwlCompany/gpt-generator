import {
  IContentRequest,
  ITitleRequest,
  IJobDetailsRequest,
  ITitleWithParagraphRequest,
  IVideoScriptSceneDetailsRequest,
  IVideoScriptScenesRequest,
} from '../../../../shared';
import {
  articleContentPrompt,
  excerptJsonPrompt,
  excerptPrompt,
  faqJsonPrompt,
  faqPrompt,
  paragraphJsonPrompt,
  paragraphPrompt,
  paragraphsJsonPrompt,
  paragraphsPrompt,
  seoJsonPrompt,
  seoPrompt,
  developerPrompt,
  titleJsonPrompt,
  titlePrompt,
  titlesJsonPrompt,
  titlesPrompt,
  videoScriptSceneDetailsJsonPrompt,
  videoScriptSceneDetailsPrompt,
  videoScriptScenesJsonPrompt,
  videoScriptScenesPrompt,
  directorPrompt,
  questionsPrompt,
  questionsJsonPrompt,
} from '../../prompts';
import { ChatCompletionRequestMessage } from 'openai';

interface IMessages {
  title: (props: ITitleRequest) => ChatCompletionRequestMessage[];
  paragraphs: (props: ITitleRequest) => ChatCompletionRequestMessage[];
  paragraph: (props: ITitleWithParagraphRequest) => ChatCompletionRequestMessage[];
  excerpt: (props: ITitleRequest) => ChatCompletionRequestMessage[];
  seo: (props: IContentRequest) => ChatCompletionRequestMessage[];
  faq: (props: IContentRequest) => ChatCompletionRequestMessage[];
  titles: (props: IJobDetailsRequest) => ChatCompletionRequestMessage[];
  videoScriptScenes: (props: IVideoScriptScenesRequest) => ChatCompletionRequestMessage[];
  videoScriptSceneDetails: (
    props: IVideoScriptSceneDetailsRequest
  ) => ChatCompletionRequestMessage[];
}

export const messagesArticles: IMessages = {
  title: ({ language, title }) => [
    {
      role: 'system',
      content: developerPrompt(language),
    },
    {
      role: 'user',
      content: titlePrompt(title) + titleJsonPrompt,
    },
  ],

  paragraphs: ({ language, title }) => [
    {
      role: 'system',
      content: developerPrompt(language),
    },

    {
      role: 'user',
      content: paragraphsPrompt(title) + paragraphsJsonPrompt,
    },
  ],

  paragraph: ({ language, title, paragraph }) => [
    {
      role: 'system',
      content: developerPrompt(language),
    },
    {
      role: 'user',
      content: paragraphPrompt(title, paragraph) + paragraphJsonPrompt,
    },
  ],

  excerpt: ({ language, title }) => [
    {
      role: 'system',
      content: developerPrompt(language),
    },
    {
      role: 'user',
      content: excerptPrompt(title) + excerptJsonPrompt,
    },
  ],

  seo: ({ content, language }) => [
    {
      role: 'system',
      content: developerPrompt(language),
    },
    {
      role: 'assistant',
      content: articleContentPrompt(content),
    },
    {
      role: 'user',
      content: seoPrompt + seoJsonPrompt,
    },
  ],

  faq: ({ content, language }) => [
    {
      role: 'system',
      content: developerPrompt(language),
    },
    {
      role: 'assistant',
      content: articleContentPrompt(content),
    },
    {
      role: 'user',
      content: faqPrompt + faqJsonPrompt,
    },
  ],

  titles: ({ keywords, numberOfItems, language }) => [
    {
      role: 'system',
      content: developerPrompt(language),
    },
    {
      role: 'user',
      content: titlesPrompt(keywords, numberOfItems) + titlesJsonPrompt,
    },
  ],

  videoScriptScenes: ({ articleContent, language, length }) => [
    {
      role: 'system',
      content: directorPrompt(language),
    },
    {
      role: 'assistant',
      content: articleContentPrompt(articleContent),
    },
    {
      role: 'user',
      content: videoScriptScenesPrompt(length) + videoScriptScenesJsonPrompt,
    },
  ],

  videoScriptSceneDetails: ({ articleContent, language, length, scene }) => [
    {
      role: 'system',
      content: directorPrompt(language),
    },
    {
      role: 'assistant',
      content: articleContentPrompt(articleContent),
    },
    {
      role: 'user',
      content: videoScriptSceneDetailsPrompt(scene, length) + videoScriptSceneDetailsJsonPrompt,
    },
  ],
};
