import React from "react";

import { GenerateArticle } from "../../components";
import { IComponentProps } from "../../types";

const ArticleContent = (props: IComponentProps) => {
  return <GenerateArticle {...props} />;
};

export default ArticleContent;
