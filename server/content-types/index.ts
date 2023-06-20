import { GptCron } from './cron.schema';
import { GptCronLogs } from './cronLogs.schema';
import { GptSocialMediaTokens } from './socialMediaTokens.schema';
import { GptSocialMediaPosts } from './socialMediaPosts.schema';

export default {
  'gpt-cron': { schema: GptCron },
  'gpt-cron-log': { schema: GptCronLogs },
  'gpt-social-media-token': { schema: GptSocialMediaTokens },
  'gpt-social-media-post': { schema: GptSocialMediaPosts },
};
