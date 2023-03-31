import { GptCron } from './cron.schema';
import { GptCronLogs } from './cronLogs.schema';

export default {
  'gpt-cron': { schema: GptCron },
  'gpt-cron-logs': { schema: GptCronLogs },
};