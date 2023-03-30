import React from "react";

import { GenerateArticle } from "../../components";
import { IComponentProps } from "../../types";

const HomePage = (props: IComponentProps) => {
  console.log(props);
  // props.onChange({ target: { name: "content.image", value: 1 } });
  return <GenerateArticle {...props} />;
};

export default HomePage;
