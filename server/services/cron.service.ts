import { Strapi } from '@strapi/strapi';
import { Service } from '.';
import {
  Constant,
  IComponentTitle,
  IGeneratedArticleResponse,
  IGptCronCollection,
  IStatus,
} from '../../shared';

export default ({ strapi }: { strapi: Strapi }) => ({
  async lookForArticles() {
    const data: IGptCronCollection[] = await strapi.entityService.findMany(
      `plugin::${Constant.PLUGIN_NAME}.gpt-cron`
    );
    const titlesToGenerate: (IComponentTitle & { job: IGptCronCollection })[] = [];
    const currentTimestamp = Date.now();

    for (const job of data) {
      for (const title of job.titles) {
        if (title.status === 'idle' && title.timestamp <= currentTimestamp + 1000 * 60 * 5) {
          await updateJobTitle(job.id, title.timestamp, {
            status: 'loading',
          });
          titlesToGenerate.push({ ...title, job });
        }
      }
    }

    for (const currentTitle of titlesToGenerate) {
      try {
        const data: IGeneratedArticleResponse = await strapi
          .plugin(Constant.PLUGIN_NAME)
          .service(Service.SINGLE_ARTICLE)
          .generateArticle({ ...currentTitle, language: currentTitle.job.language });

        const savedArticle = await strapi
          .plugin(Constant.PLUGIN_NAME)
          .service(Service.GENERAL)
          .saveArticle({ ...data, language: currentTitle.job.language });

        await updateJobTitle(currentTitle.job.id, currentTitle.timestamp, {
          status: 'success',
          articleId: savedArticle.id,
        });
      } catch (e) {
        const log = await logError('error', {
          jobId: currentTitle.job.id,
          title: currentTitle.title,
          error: e?.details?.data?.response?.data || e?.details,
        });
        updateJobTitle(currentTitle.job.id, currentTitle.timestamp, {
          status: 'error',
          log: log.message.error,
        });
      }
    }
  },
});

const updateJobTitle = async (
  jobId: number,
  titleTimestamp: number,
  data: Partial<IComponentTitle>
) => {
  const job = await strapi.entityService.findOne(`plugin::${Constant.PLUGIN_NAME}.gpt-cron`, jobId);
  const updatedTitles = job.titles.map((title) => {
    if (title.timestamp !== titleTimestamp) return title;

    return {
      ...title,
      ...data,
    };
  });

  await strapi.entityService.update(`plugin::${Constant.PLUGIN_NAME}.gpt-cron`, job.id, {
    data: {
      ...job,
      titles: updatedTitles,
    },
  });
};

const logError = async (status: IStatus, message: any) => {
  return await strapi.entityService.create(`plugin::${Constant.PLUGIN_NAME}.gpt-cron-log`, {
    data: {
      status,
      message,
    },
  });
};
