import utils from "@strapi/utils";
import { CreateChatCompletionResponse } from "openai";
import { IArticleResponse, IFaqResponse, ISeoResponse } from "../../shared";
import openai from "./openai";
import {
  articlePrompt,
  faqPrompt,
  systemPrompt,
  titleAndDescriptionPrompt,
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

export const generateArticle = async (
  title: string,
  language: string
): Promise<IArticleResponse> => {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo-0301",
    messages: [
      {
        role: "system",
        content: systemPrompt(language),
      },
      {
        role: "user",
        content: articlePrompt(title),
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
