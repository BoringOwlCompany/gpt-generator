import { useCallback, useState } from 'react';
import { request } from '@strapi/helper-plugin';
import { useStatus } from '../../hooks';
import { Constant } from '../../../../shared';

interface IUseGptCronCollectionDeleteProps {
  onSuccess?: (id?: number) => void;
}

export const useGptCronCollectionDelete = ({
  onSuccess,
}: IUseGptCronCollectionDeleteProps = {}) => {
  const { isError, isLoading, isSuccess, setStatus } = useStatus();
  const batchStatus = useStatus();

  const [deleteItemId, setDeleteItemId] = useState<number | null>(null);

  const deleteBatchCron = useCallback(async (ids: number[]) => {
    batchStatus.setStatus('loading');

    const requests = ids.map((id) =>
      request(`/content-manager/collection-types/plugin::${Constant.PLUGIN_NAME}.gpt-cron/${id}`, {
        method: 'delete',
      })
    );
    try {
      await Promise.all(requests);
      onSuccess?.();
      batchStatus.setStatus('success');
    } catch (e) {
      batchStatus.setStatus('error');
    }
  }, []);

  const deleteCron = useCallback(async (id: number) => {
    setDeleteItemId(id);
    setStatus('loading');

    try {
      await request(
        `/content-manager/collection-types/plugin::${Constant.PLUGIN_NAME}.gpt-cron/${id}`,
        { method: 'delete' }
      );
      onSuccess?.(id);
      setStatus('success');
    } catch (e) {
      setStatus('error');
    } finally {
      setDeleteItemId(null);
    }
  }, []);

  return {
    deleteCron,
    deleteBatchCron,
    isError,
    isLoading,
    isSuccess,
    deleteItemId,
    isBatchLoading: batchStatus.isLoading,
    isBatchError: batchStatus.isError,
    isBatchSuccess: batchStatus.isSuccess,
  };
};
