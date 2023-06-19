import { Constant, ECollection, ITitleResponse } from '../../../../../shared';
import { generateApi } from '../../../api';
import { IFirstStepForm } from '../../../components/GenerateMultiple/components/AddJobModal/AddJobModal';
import { cumulativeRequests } from '../../../utils/cumulativeRequests';
import { IGeneratorsProps } from '../useGpt';

export const useMultipleGenerator = ({
  setStatus,
  setStatusMessage,
  setProgress,
}: IGeneratorsProps) => {
  const generateItemsForMultipleGenerator = async (
    data: IFirstStepForm,
    collection: ECollection
  ) => {
    if (collection === ECollection.ARTICLE) return generateTitles(data);
    if (collection === ECollection.FLASHCARD) return generateQuestions(data);
  };

  const generateQuestions = async (data: IFirstStepForm): Promise<ITitleResponse[] | null> => {
    try {
      setStatus('loading');
      setStatusMessage('Generating questions...');
      setProgress(0);

      const { isError, result: allQuestions } = await cumulativeRequests(
        generateApi.generateQuestions,
        {
          args: Array.from({
            length: Math.ceil(data.numberOfItems / Constant.TITLES_TO_GENERATE_PER_REQUEST),
          }).map(() => ({
            language: data.language,
            keywords: data.tags.map(({ slug }) => slug).join(', '),
            numberOfItems: Constant.TITLES_TO_GENERATE_PER_REQUEST,
          })),
          onError: () => setStatus('error'),
          onSuccess: () => setProgress((prev) => prev + 1),
        }
      );

      if (isError) return null;

      setStatus('success');
      return allQuestions.flat(1).slice(0, data.numberOfItems);
    } catch (e) {
      setStatus('error');
      return null;
    }
  };

  const generateTitles = async (data: IFirstStepForm): Promise<ITitleResponse[] | null> => {
    try {
      setStatus('loading');
      setStatusMessage('Generating titles...');
      setProgress(0);

      const { isError, result: allTitles } = await cumulativeRequests(generateApi.generateTitles, {
        args: Array.from({
          length: Math.ceil(data.numberOfItems / Constant.TITLES_TO_GENERATE_PER_REQUEST),
        }).map(() => ({
          ...data,
          numberOfItems: Constant.TITLES_TO_GENERATE_PER_REQUEST,
        })),
        onError: () => setStatus('error'),
        onSuccess: () => setProgress((prev) => prev + 1),
      });

      if (isError) return null;

      setStatus('success');
      return allTitles.flat(1).slice(0, data.numberOfItems);
    } catch (e) {
      setStatus('error');
      return null;
    }
  };

  return { generateItemsForMultipleGenerator };
};
