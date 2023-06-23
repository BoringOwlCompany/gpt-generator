import { Configuration, OpenAIApi } from 'openai';

const openai = (apiKey: string) => {
  const config = new Configuration({ apiKey });
  return new OpenAIApi(config);
};

export default openai;
