import { Strapi } from '@strapi/strapi';
import { ICalendarItem, IRange } from '../../shared';
import moment from 'moment';

export default ({ strapi }: { strapi: Strapi }) => ({
  async getCalendarItems(range: IRange): Promise<ICalendarItem[]> {
    const articles = await this.fetchArticles(range);
    const parsed = articles.map((article) => ({
      id: article.id,
      start: new Date(article.content.publishDate || article.publishedAt || article.createdAt),
      end: new Date(article.content.publishDate || article.publishedAt || article.createdAt),
      title: article.content.title,
      isPublished: !!article.publishedAt,
      allDay: true,
    }));

    return parsed;
  },

  async fetchArticles(range: IRange) {
    const { end, start } = parseRange(range);
    return await strapi.db.query(`api::article.article`).findMany({
      populate: ['content'],
      where: {
        $or: [
          {
            $and: [
              {
                content: {
                  publishDate: {
                    $notNull: true,
                  },
                },
              },
              {
                content: {
                  publishDate: {
                    $gte: start,
                    $lte: end,
                  },
                },
              },
            ],
          },
          {
            $and: [
              {
                publishedAt: {
                  $notNull: true,
                },
              },
              {
                publishedAt: {
                  $gte: start,
                  $lte: end,
                },
                content: {
                  publishDate: {
                    $null: true,
                  },
                },
              },
            ],
          },
          {
            createdAt: {
              $gte: start,
              $lte: end,
            },
          },
        ],
      },
    });
  },
});

const parseRange = (range: IRange) => {
  const startMoment = moment(range.start);
  const endMoment = moment(range.end);
  return {
    start: startMoment.format('YYYY-MM-DD'),
    end: endMoment.format('YYYY-MM-DD'),
  };
};
