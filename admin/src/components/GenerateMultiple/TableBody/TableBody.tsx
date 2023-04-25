import React, { ChangeEvent } from 'react';

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
import { dateFormatOptions, getStatusFromTitles, parseStatus } from '../../../utils';

const Progress = styled(ProgressBar)`
  :before {
    background-color: ${({ theme }) => theme.colors.primary500};
  }
`;

interface IProps {
  isLoading: boolean;
  data: IGptCronCollection[] | undefined;
  handlePickRow: (id: number) => void;
  actions?: (id: number) => React.ReactNode;
  selectedRows: boolean[];
  selectRow: (index: number) => void;
}

const TableBody = ({
  data,
  actions,
  isLoading,
  handlePickRow,
  selectRow,
  selectedRows,
}: IProps) => {
  if (isLoading || !data || !data.length)
    return <EmptyBodyTable colSpan={8} isLoading={isLoading} />;

  return (
    <Tbody>
      {data.map(({ createdAt, id, keywords, language, titles }, index) => {
        const date = new Date(createdAt);
        const finishedTitles = titles.filter(
          ({ status }) => status !== 'idle' && status !== 'loading'
        );
        const status = getStatusFromTitles(titles);
        const isDone = titles.every(({ status }) => status !== 'idle' && status !== 'loading');

        return (
          <Tr key={id} style={{ cursor: 'pointer' }} onClick={() => handlePickRow(id)}>
            <Td>
              <BaseCheckbox
                value={selectedRows[index]}
                onClick={(e: React.MouseEvent<HTMLInputElement>) => {
                  e.stopPropagation();
                  selectRow(index);
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
              <Typography ellipsis>{keywords}</Typography>
            </Td>
            <Td>
              <Typography>{language}</Typography>
            </Td>
            <Td>
              <Typography variant="pi">
                {finishedTitles.length}/{titles.length}
                <Progress
                  backgroundColor="success600"
                  value={(finishedTitles.length / titles.length) * 100}
                  max={titles.length}
                />
              </Typography>
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
            {actions && <Td>{actions(id)}</Td>}
          </Tr>
        );
      })}
    </Tbody>
  );
};

export default TableBody;
