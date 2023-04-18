import { IGeneratedArticleResponse } from '../../../../../../shared';

export enum ResultAction {
  SET_TITLE = 'SET_TITLE',
  SET_SLUG = 'SET_SLUG',
  SET_CONTENT = 'SET_CONTENT',
  SET_EXCERPT = 'SET_EXCERPT',
  SET_SEO_TITLE = 'SET_SEO_TITLE',
  SET_SEO_DESCRIPTION = 'SET_SEO_DESCRIPTION',
  SET_FAQ_QUESTION = 'SET_FAQ_QUESTION',
  SET_FAQ_ANSWER = 'SET_FAQ_ANSWER',
}

export type IResultActionsContent = {
  type:
    | ResultAction.SET_TITLE
    | ResultAction.SET_SLUG
    | ResultAction.SET_CONTENT
    | ResultAction.SET_EXCERPT
    | ResultAction.SET_SEO_TITLE
    | ResultAction.SET_SEO_DESCRIPTION;
  payload: string;
};

export type IResultActionsFaq = {
  type: ResultAction.SET_FAQ_QUESTION | ResultAction.SET_FAQ_ANSWER;
  payload: {
    index: number;
    value: string;
  };
};

export type IAction = IResultActionsContent | IResultActionsFaq;

export const resultReducer = (state: IGeneratedArticleResponse, action: IAction) => {
  switch (action.type) {
    case ResultAction.SET_TITLE:
      return {
        ...state,
        article: { ...state.article, title: action.payload },
      };
    case ResultAction.SET_SLUG:
      return {
        ...state,
        article: { ...state.article, slug: action.payload },
      };
    case ResultAction.SET_CONTENT:
      return {
        ...state,
        article: { ...state.article, content: action.payload },
      };
    case ResultAction.SET_EXCERPT:
      return {
        ...state,
        article: { ...state.article, excerpt: action.payload },
      };
    case ResultAction.SET_SEO_TITLE:
      return { ...state, seo: { ...state.seo, title: action.payload } };
    case ResultAction.SET_SEO_DESCRIPTION:
      return { ...state, seo: { ...state.seo, description: action.payload } };
    case ResultAction.SET_FAQ_QUESTION:
      return {
        ...state,
        faq: state.faq.map((faq, index) => {
          if (index === action.payload.index) {
            return { ...faq, question: action.payload.value };
          }
          return faq;
        }),
      };
    case ResultAction.SET_FAQ_ANSWER:
      return {
        ...state,
        faq: state.faq.map((faq, index) => {
          if (index === action.payload.index) {
            return { ...faq, answer: action.payload.value };
          }
          return faq;
        }),
      };

    default:
      return state;
  }
};
