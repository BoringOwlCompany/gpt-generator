import utils from "@strapi/utils";
import { messages, MODEL } from './requests.config'
import { CreateChatCompletionResponse } from "openai";
import { IContentRequest, IFaqResponse, IParagraphResponse, IParagraphsResponse, ISeoResponse, ITitleRequest, ITitleResponse, ITitleWithParagraphRequest, Language } from "../../shared";
import openai from "./openai";

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

export const generateTitle = async (data: ITitleRequest): Promise<ITitleResponse> => {
  const completion = await openai.createChatCompletion({
    model: MODEL,
    messages: messages.title(data)
  });

  return tryParse(getContent(completion.data));
}
export const generateParagraphs = async (data: ITitleRequest): Promise<IParagraphsResponse> => {
  console.log(messages.paragraphs(data));
  const completion = await openai.createChatCompletion({
    model: MODEL,
    messages: messages.paragraphs(data)
  });

  return tryParse(getContent(completion.data));
}

export const generateParagraph = async (data: ITitleWithParagraphRequest): Promise<IParagraphResponse> => {
  const completion = await openai.createChatCompletion({
    model: MODEL,
    messages: messages.paragraph(data)
  });

  return tryParse(getContent(completion.data));
};

export const generateExcerpt = async (data: ITitleRequest): Promise<IParagraphResponse> => {
  console.log(messages.excerpt(data));
  const completion = await openai.createChatCompletion({
    model: MODEL,
    messages: messages.excerpt(data)
  });

  return tryParse(getContent(completion.data));
};

export const generateArticleSEO = async (data: IContentRequest): Promise<ISeoResponse> => {
  const completion = await openai.createChatCompletion({
    model: MODEL,
    messages: messages.seo(data)
  });

  return tryParse(getContent(completion.data));
};

export const generateArticleFaq = async (data: IContentRequest): Promise<IFaqResponse[]> => {
  const completion = await openai.createChatCompletion({
    model: MODEL,
    messages: messages.faq(data)
  });

  return tryParse(getContent(completion.data));
};
