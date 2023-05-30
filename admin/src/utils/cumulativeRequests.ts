import { Constant } from '../../../shared';

interface IProps<T> {
  args: T[];
  onError?: () => void;
  onSuccess?: () => void;
}

export const cumulativeRequests = async <T extends (...args: D[]) => Promise<any>, D>(
  func: T,
  { args, onSuccess, onError }: IProps<D>
) => {
  const requestsChunks = chunkArray(args);
  const result: Awaited<ReturnType<T>>[] = [];

  let isError = false;

  for (const requestChunk of requestsChunks) {
    try {
      const promises = requestChunk.map((arg) =>
        func(arg).then((res) => {
          onSuccess?.();
          return res;
        })
      );
      const chunkResults = await Promise.all(promises);
      result.push(...chunkResults);
    } catch (e) {
      isError = true;
      onError?.();
    }
  }

  return { result, isError };
};

const chunkArray = <T>(
  array: Array<T>,
  chunkSize = Constant.NUMBER_OF_MAXIMUM_CUMULATIVE_REQUESTS
) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};
