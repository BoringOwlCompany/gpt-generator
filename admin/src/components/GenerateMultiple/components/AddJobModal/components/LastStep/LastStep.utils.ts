import { ECollection, ELength } from '../../../../../../../../shared';

export const getCollectionSpecificFields = (collection: ECollection, details: string) => {
  if (collection === ECollection.ARTICLE)
    return {
      title: details,
      image: { isActive: false, prompt: '' },
      videoScript: { isActive: false, length: ELength.ONE_MINUTE },
    };

  if (collection === ECollection.FLASHCARD)
    return {
      question: details,
    };

  return {};
};

export const addMinutesToTime = (minutes: number) => 1000 * 60 * minutes;

export const getRoundedHour = () => {
  const date = new Date();
  date.setMinutes(Math.ceil(date.getMinutes() / 5) * 5);
  return date;
};
