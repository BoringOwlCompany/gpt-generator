import React from 'react';

import { Check } from '@strapi/icons';
import {
  Tr,
  Td,
  Tbody,
  Typography,
  Icon,
  ProgressBar,
  Badge,
  BaseCheckbox,
} from '@strapi/design-system';
import { EmptyBodyTable } from '@strapi/helper-plugin';
import { IGptCronCollection } from '../../../../../shared';
import styled from 'styled-components';
import { dateFormatOptions, parseStatus } from '../../../utils';
import { mapTableData } from './mappers';

const Progress = styled(ProgressBar)`
  :before {
    background-color: ${({ theme }) => theme.colors.primary500};
  }
`;

interface IProps {
  data: IGptCronCollection[] | undefined;
  isLoading: boolean;
  selectedRows: number[];
  actions?: (id: number) => React.ReactNode;
  handlePickRow: (id: number) => void;
  selectRow: (index: number) => void;
}

const TableBody = ({
  data,
  isLoading,
  selectedRows,
  actions,
  handlePickRow,
  selectRow,
}: IProps) => {
  const collectionData = mapTableData(data);

  if (isLoading || !collectionData || !collectionData.length)
    return <EmptyBodyTable colSpan={8} isLoading={isLoading} />;

  return (
    <Tbody>
      {collectionData.map(
        ({
          createdAt,
          id,
          language,
          itemsDetails,
          status,
          numberOfItems,
          isDone,
          numberOfFinishedItems,
        }) => {
          const date = new Date(createdAt);
          return (
            <Tr key={id} style={{ cursor: 'pointer' }} onClick={() => handlePickRow(id)}>
              <Td>
                <BaseCheckbox
                  value={selectedRows.includes(id)}
                  onClick={(e: React.MouseEvent<HTMLInputElement>) => {
                    e.stopPropagation();
                    selectRow(id);
                  }}
                />
              </Td>
              <Td>
                <Typography>{id}</Typography>
              </Td>
              <Td>
                <Typography>{date.toLocaleString('en', dateFormatOptions)}</Typography>
              </Td>
              <Td maxWidth="300px">
                <Typography ellipsis>{itemsDetails}</Typography>
              </Td>
              <Td>
                <Typography>{language}</Typography>
              </Td>
              <Td>
                <Typography variant="pi">
                  {numberOfFinishedItems} / {numberOfItems}
                  <Progress
                    backgroundColor="success600"
                    value={(numberOfFinishedItems / numberOfItems) * 100}
                  />
                </Typography>
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
              {actions && <Td>{actions(id)}</Td>}
            </Tr>
          );
        }
      )}
    </Tbody>
  );
};

export default TableBody;
