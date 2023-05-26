import {
  getLanguageCode,
  IPagination,
  ERelationalCollection,
  IRelationalCollectionResponse,
  IResponse,
  Language,
} from '../../../../shared';
import { useStatus } from '../../hooks';
import { request } from '@strapi/helper-plugin';
import { useEffect, useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';

interface IOptions {
  collection: ERelationalCollection;
  language: Language;
  omitIds?: number[];
}

export const useRelation = ({ collection, language, omitIds = [] }: IOptions) => {
  const { isError, isRefetching, isLoading, isSuccess, setStatus } = useStatus();

  const [data, setData] = useState<IRelationalCollectionResponse[]>([]);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 400);
  const [refetchFlag, setRefetchFlag] = useState(false);
  const [pagination, setPagination] = useState<IPagination>({
    page: 1,
    pageSize: 15,
    pageCount: 1,
    total: 0,
  });

  const hasNextPage = data.length < pagination.total;

  const fetch = async (
    page: number,
    onSuccess: (data: IResponse<IRelationalCollectionResponse[]>) => void
  ) => {
    setStatus('loading');
    const idsFilters = omitIds.length
      ? omitIds.reduce(
          (acc, id, index) => ({ ...acc, [`filters[$and][${index + 1}][id][$not]`]: id }),
          {}
        )
      : {};

    try {
      const data: IResponse<IRelationalCollectionResponse[]> = await request(
        `/content-manager/collection-types/${collection}`,
        {
          params: {
            page: page,
            pageSize: pagination.pageSize,
            sort: 'slug:ASC',
            'filters[$and][0][slug][$containsi]': search,
            locale: getLanguageCode(language),
            ...idsFilters,
          },
        }
      );

      onSuccess(data);
    } catch (e) {
      setStatus('error');
    }
  };

  const searchFor = (value: string) => setSearch(value);
  const refetch = () => setRefetchFlag((prev) => !prev);

  const fetchNextPage = () => {
    if (!hasNextPage) return;
    fetch(pagination.page + 1, (data) => {
      setData((prev) => [...prev, ...data.results]);
      setPagination(data.pagination);
      setStatus('success');
    });
  };

  useEffect(() => {
    fetch(1, (data) => {
      setData(data.results);
      setPagination(data.pagination);
      setStatus('success');
    });
  }, [language, debouncedSearch, refetchFlag, JSON.stringify(omitIds)]);

  return {
    data,
    hasNextPage,
    searchFor,
    fetchNextPage,
    refetch,
    isError,
    isRefetching,
    isLoading,
    isSuccess,
  };
};
