import { TwitterApi } from 'twitter-api-v2';

export const twitterClient = (clientId: string, clientSecret: string) =>
  new TwitterApi({
    clientId,
    clientSecret,
  });
