import { ECollection, VideoLength } from '../../../../../../../../shared';

export const getCollectionSpecificFields = (collection: ECollection) => {
  if (collection === ECollection.ARTICLE)
    return {
      image: { isActive: false, prompt: '' },
      videoScript: { isActive: false, length: VideoLength.ONE_MINUTE },
    };

  return {};
};

export const addMinutesToTime = (minutes: number) => 1000 * 60 * minutes;

export const getRoundedHour = () => {
  const date = new Date();
  date.setMinutes(Math.ceil(date.getMinutes() / 5) * 5);
  return date;
};
