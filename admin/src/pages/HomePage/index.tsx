import React from "react";

import { GenerateArticle } from "../../components";
import { IComponentProps } from "../../types";

const HomePage = (props: IComponentProps) => {
  return <GenerateArticle {...props} />;
};

export default HomePage;
