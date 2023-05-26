import { Strapi } from '@strapi/strapi';
import { Service } from '.';
import {
  Constant,
  IGeneratedArticleResponse,
  IGptCronCollection,
  IStatus,
  IJobDetailsItem,
} from '../../shared';

export default ({ strapi }: { strapi: Strapi }) => ({
  async lookForItemsToGenerate() {
    const data: IGptCronCollection[] = await strapi.entityService.findMany(
      `plugin::${Constant.PLUGIN_NAME}.gpt-cron`
    );
    const itemsToGenerate: (IJobDetailsItem & { job: IGptCronCollection })[] = [];
    const currentTimestamp = Date.now();

    for (const job of data) {
      for (const item of job.details.items) {
        if (item.status === 'idle' && item.timestamp <= currentTimestamp + 1000 * 60 * 1) {
          await updateJobDetailsItem(job.id, item.timestamp, {
            status: 'loading',
          });
          itemsToGenerate.push({ ...item, job });
        }
      }
    }

    for (const currentItem of itemsToGenerate) {
      try {
        const data: IGeneratedArticleResponse = await strapi
          .plugin(Constant.PLUGIN_NAME)
          .service(Service.SINGLE_ARTICLE)
          .generateArticle({ ...currentItem, language: currentItem.job.language });

        const savedArticle = await strapi
          .plugin(Constant.PLUGIN_NAME)
          .service(Service.GENERAL)
          .saveArticle({ ...data, language: currentItem.job.language });

        await updateJobDetailsItem(currentItem.job.id, currentItem.timestamp, {
          status: 'success',
          articleId: savedArticle.id,
        });
      } catch (e) {
        const log = await logError('error', {
          jobId: currentItem.job.id,
          error: e?.details?.data?.response?.data || e?.details,
        });
        updateJobDetailsItem(currentItem.job.id, currentItem.timestamp, {
          status: 'error',
          log: log.message.error,
        });
      }
    }
  },
});

const updateJobDetailsItem = async (
  jobId: number,
  itemTimestamp: number,
  data: Partial<IJobDetailsItem>
) => {
  const job: IGptCronCollection = await strapi.entityService.findOne(
    `plugin::${Constant.PLUGIN_NAME}.gpt-cron`,
    jobId
  );
  const updatedItems = job.details.items.map((item) => {
    if (item.timestamp !== itemTimestamp) return item;

    return {
      ...item,
      ...data,
    };
  });

  await strapi.entityService.update(`plugin::${Constant.PLUGIN_NAME}.gpt-cron`, job.id, {
    data: {
      ...job,
      details: {
        ...job.details,
        items: updatedItems,
      },
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
