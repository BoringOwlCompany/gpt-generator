import { useEffect, useState } from 'react';
import { request, useQueryParams } from '@strapi/helper-plugin';
import { useStatus } from '../../hooks';
import { Constant, IGptCronCollection, IGptCronResponse, IPagination } from '../../../../shared';

export const useGptCronCollection = () => {
  const [{ query }] = useQueryParams();
  const [refetchFlag, setRefetchFlag] = useState(false);
  const { isError, isLoading, isSuccess, setStatus } = useStatus();

  const [data, setData] = useState<IGptCronCollection[]>();
  const [pagination, setPagination] = useState<IPagination>({
    page: 1,
    pageSize: 10,
    pageCount: 1,
    total: 0,
    ...query,
  });

  const refetch = () => setRefetchFlag((prev) => !prev);

  useEffect(() => {
    const fetch = async () => {
      setStatus('loading');

      try {
        const data: IGptCronResponse = await request(
          `/content-manager/collection-types/plugin::${Constant.PLUGIN_NAME}.gpt-cron?page=${
            query?.page || 1
          }&pageSize=${query?.pageSize || 10}&sort=${query?.sort || 'id:DESC'}`
        );

        setData(data.results);
        setPagination(data.pagination);
        setStatus('success');
      } catch (e) {
        setStatus('error');
      }
    };

    fetch();
  }, [query?.page, query?.pageSize, query?.sort, refetchFlag]);

  return { data, refetch, pagination, isError, isLoading, isSuccess };
};
