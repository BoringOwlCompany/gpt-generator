import type { IMockResults } from "../../../../mock";

export enum ResultAction {
  SET_CONTENT = "SET_CONTENT",
  SET_INTRODUCTION = "SET_INTRODUCTION",
  SET_SEO_TITLE = "SET_SEO_TITLE",
  SET_SEO_DESCRIPTION = "SET_SEO_DESCRIPTION",
}

export type IResultAction = {
  type: keyof typeof ResultAction;
  payload: string;
};

export const resultReducer = (state: IMockResults, action: IResultAction) => {
  switch (action.type) {
    case ResultAction.SET_CONTENT:
      return { ...state, content: action.payload };
    case ResultAction.SET_INTRODUCTION:
      return { ...state, introduction: action.payload };
    case ResultAction.SET_SEO_TITLE:
      return { ...state, seo: { ...state.seo, title: action.payload } };
    case ResultAction.SET_SEO_DESCRIPTION:
      return { ...state, seo: { ...state.seo, description: action.payload } };
    default:
      return state;
  }
};
