import utils from "@strapi/utils";
import { CreateChatCompletionResponse } from "openai";
import { IFaqResponse, IParagraphResponse, IParagraphsResponse, ISeoResponse, ITitleResponse } from "../../shared";
import openai from "./openai";
import {
  excerptPrompt,
  faqPrompt,
  paragraphPrompt,
  paragraphsPrompt,
  systemPrompt,
  titleAndDescriptionPrompt,
  titlePrompt,
} from "./prompts";
const { ApplicationError } = utils.errors;

const getContent = (completion: CreateChatCompletionResponse) =>
  completion.choices[0].message?.content || "";

const tryParse = (stringified: string) => {
  try {
    return JSON.parse(stringified);
  } catch (e) {
    throw new ApplicationError(
      "Failed parsing openai response to JSON. Check the prompt",
      {
        data: stringified,
      }
    );
  }
};

export const generateTitle = async (
  title: string,
  language: string
): Promise<ITitleResponse> => {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo-0301",
    messages: [
      {
        role: "system",
        content: systemPrompt(language),
      },
      {
        role: "user",
        content: titlePrompt(title),
      },
    ],
  });

  return tryParse(getContent(completion.data));
}
export const generateParagraphs = async (
  title: string,
  language: string
): Promise<IParagraphsResponse> => {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo-0301",
    messages: [
      {
        role: "system",
        content: systemPrompt(language),
      },
      {
        role: "user",
        content: paragraphsPrompt(title),
      },
    ],
  });

  return tryParse(getContent(completion.data));
}

export const generateParagraph = async (
  title: string,
  paragraph: string,
  language: string
): Promise<IParagraphResponse> => {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo-0301",
    messages: [
      {
        role: "system",
        content: systemPrompt(language),
      },
      {
        role: "user",
        content: paragraphPrompt(title, paragraph),
      },
    ],
  });

  return tryParse(getContent(completion.data));
};

export const generateExcerpt = async (
  title: string,
  language: string
): Promise<IParagraphResponse> => {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo-0301",
    messages: [
      {
        role: "system",
        content: systemPrompt(language),
      },
      {
        role: "user",
        content: excerptPrompt(title),
      },
    ],
  });

  return tryParse(getContent(completion.data));
};

export const generateArticleSEO = async (
  article: string,
  language: string
): Promise<ISeoResponse> => {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo-0301",
    messages: [
      {
        role: "system",
        content: systemPrompt(language),
      },
      {
        role: "assistant",
        content: `Napisales artykuł: "${article}"`,
      },
      {
        role: "user",
        content: titleAndDescriptionPrompt,
      },
    ],
  });

  return tryParse(getContent(completion.data));
};

export const generateArticleFaq = async (
  article: string,
  language: string
): Promise<IFaqResponse[]> => {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo-0301",
    messages: [
      {
        role: "system",
        content: systemPrompt(language),
      },
      {
        role: "assistant",
        content: `Napisales artykuł: "${article}"`,
      },
      {
        role: "user",
        content: faqPrompt,
      },
    ],
  });

  return tryParse(getContent(completion.data));
};
