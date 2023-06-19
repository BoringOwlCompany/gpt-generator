import { TwitterApi } from 'twitter-api-v2';

export const twitterClient = new TwitterApi({
  clientId: process.env.TWITTER_CLIENT_ID as string,
  clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
});
