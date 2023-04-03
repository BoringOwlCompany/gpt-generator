import { useQueryParams } from '@strapi/helper-plugin';

export const useSort = () => {
  const [{ query }, setQuery] = useQueryParams();

  const sort = query?.sort;

  const field = sort?.split(':')[0];
  const direction = parseDirection(sort);

  const setSort = (newField: string) => {
    if (field === newField) setQuery({ sort: `${newField}:${direction.opposite}` });
    else setQuery({ sort: `${newField}:ASC` });
  };

  return { sort, field, direction, setSort };
};

const parseDirection = (sort: string | undefined) => {
  if (sort && sort.includes('DESC'))
    return {
      current: 'DESC',
      opposite: 'ASC',
    };

  return {
    current: 'ASC',
    opposite: 'DESC',
  };
};
