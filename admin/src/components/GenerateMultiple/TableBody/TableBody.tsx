import React from 'react';

import { Check } from '@strapi/icons';
import { Tr, Td, Tbody, Typography, Icon, Badge } from '@strapi/design-system';
import { EmptyBodyTable } from '@strapi/helper-plugin';
import { IGptCronCollection, IStatus } from '../../../../../shared';

interface IProps {
  isLoading: boolean;
  data: IGptCronCollection[] | undefined;
}

const TableBody = ({ data, isLoading }: IProps) => {
  if (isLoading || !data || !data.length)
    return <EmptyBodyTable colSpan={6} isLoading={isLoading} />;

  return (
    <Tbody>
      {data.map(({ id, keywords, language, status, titles, isDone }) => (
        <Tr key={id} style={{ cursor: 'pointer' }} onClick={console.log}>
          <Td>
            <Typography>{id}</Typography>
          </Td>
          <Td>
            <Typography>{keywords}</Typography>
          </Td>
          <Td>
            <Typography>{language}</Typography>
          </Td>
          <Td maxWidth="300px">
            <Typography ellipsis>{titles.map(({ title }) => title).join(', ')}</Typography>
          </Td>
          <Td>
            <Typography>{isDone && <Icon as={Check} />}</Typography>
          </Td>
          <Td>
            <Typography>
              <Badge style={{ width: 'fit-content' }} {...parseStatus(status)}>
                {status}
              </Badge>
            </Typography>
          </Td>
        </Tr>
      ))}
    </Tbody>
  );
};

const parseStatus = (status: IStatus) => {
  if (status === 'error')
    return {
      backgroundColor: 'danger600',
      textColor: 'neutral150',
    };
  if (status === 'success')
    return {
      backgroundColor: 'success600',
      textColor: 'neutral150',
    };
  if (status === 'idle')
    return {
      backgroundColor: 'neutral200',
      textColor: 'neutral600',
    };
  if (status === 'warning')
    return {
      backgroundColor: 'warning600',
      textColor: 'neutral150',
    };
};

export default TableBody;
