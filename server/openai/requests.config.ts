import { IContentRequest, ITitleRequest, ITitleWithParagraphRequest } from "../../shared";
import { articleContentPrompt, excerptJsonPrompt, excerptPrompt, faqJsonPrompt, faqPrompt, paragraphJsonPrompt, paragraphPrompt, paragraphsJsonPrompt, paragraphsPrompt, seoJsonPrompt, seoPrompt, systemPrompt, titleJsonPrompt, titlePrompt } from "./prompts";
import { ChatCompletionRequestMessage } from 'openai'

export const MODEL = "gpt-3.5-turbo-0301"

interface IMessages {
  title: (props: ITitleRequest) => ChatCompletionRequestMessage[]
  paragraphs: (props: ITitleRequest) => ChatCompletionRequestMessage[]
  paragraph: (props: ITitleWithParagraphRequest) => ChatCompletionRequestMessage[]
  excerpt: (props: ITitleRequest) => ChatCompletionRequestMessage[]
  seo: (props: IContentRequest) => ChatCompletionRequestMessage[]
  faq: (props: IContentRequest) => ChatCompletionRequestMessage[]
}

export const messages: IMessages = {
  title: ({ language, title }) => [
    {
      role: "system",
      content: systemPrompt(language),
    },
    {
      role: "user",
      content: titlePrompt(title) + titleJsonPrompt,
    },
  ],

  paragraphs: ({ language, title }) => [
    {
      role: "system",
      content: systemPrompt(language),
    },

    {
      role: "user",
      content: paragraphsPrompt(title) + paragraphsJsonPrompt,
    },
  ],

  paragraph: ({ language, title, paragraph }) => [
    {
      role: "system",
      content: systemPrompt(language),
    },
    {
      role: "user",
      content: paragraphPrompt(title, paragraph) + paragraphJsonPrompt,
    },
  ],

  excerpt: ({ language, title }) => [
    {
      role: "system",
      content: systemPrompt(language),
    },
    {
      role: "user",
      content: excerptPrompt(title) + excerptJsonPrompt,
    },
  ],

  seo: ({ content, language }) => [
    {
      role: "system",
      content: systemPrompt(language),
    },
    {
      role: "assistant",
      content: articleContentPrompt(content),
    },
    {
      role: "user",
      content: seoPrompt + seoJsonPrompt,
    },
  ],

  faq: ({ content, language }) => [
    {
      role: "system",
      content: systemPrompt(language),
    },
    {
      role: "assistant",
      content: articleContentPrompt(content),
    },
    {
      role: "user",
      content: faqPrompt + faqJsonPrompt,
    },
  ],
}