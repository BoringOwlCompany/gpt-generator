export interface IConfig {
  gptApiKey: string;
  multiple: {
    articles: boolean;
    flashcards: boolean;
  };
  single: boolean;
  calendar: boolean;
  socialMediaPublisher: boolean;
}
