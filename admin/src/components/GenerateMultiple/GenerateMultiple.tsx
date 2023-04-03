import React from 'react';

import { CarretDown, CarretUp, Plus } from '@strapi/icons';
import {
  BaseHeaderLayout,
  Table,
  Thead,
  Tr,
  Th,
  Button,
  Box,
  Typography,
  Flex,
  IconButton,
} from '@strapi/design-system';
import { PageSizeURLQuery, PaginationURLQuery } from '@strapi/helper-plugin';
import { AddJobModal } from './components';
import { useModal, useSort } from '../../hooks';
import { useGptCronCollection } from '../../api';
import TableBody from './TableBody';

const GenerateMultiple = () => {
  const [isModalOpened, handleCloseModal, handleOpenModal] = useModal();
  const { data, refetch, pagination, isLoading } = useGptCronCollection();
  const { field, direction, setSort } = useSort();

  const sortProps = (currentField: string) => {
    const props = {
      style: { cursor: 'pointer' },
      onClick: () => setSort(currentField),
    };
    if (currentField !== field) return props;

    return {
      ...props,
      action: (
        <IconButton
          label={`Sort on ${currentField}`}
          icon={direction.current === 'ASC' ? <CarretUp /> : <CarretDown />}
          noBorder
        />
      ),
    };
  };

  return (
    <Box>
      {isModalOpened && <AddJobModal handleDone={refetch} handleClose={handleCloseModal} />}

      <Box>
        <BaseHeaderLayout
          primaryAction={
            <Button onClick={handleOpenModal} startIcon={<Plus />}>
              Add new job
            </Button>
          }
          title="Generate multiple articles"
          subtitle={`${pagination.total} entries found`}
          as="h2"
        />
      </Box>
      <Box padding={8}>
        <Table colCount={7} rowCount={10}>
          <Thead>
            <Tr>
              <Th {...sortProps('id')}>
                <Typography variant="sigma">ID</Typography>
              </Th>
              <Th {...sortProps('keywords')}>
                <Typography variant="sigma">Keywords</Typography>
              </Th>
              <Th {...sortProps('language')}>
                <Typography variant="sigma">Language</Typography>
              </Th>
              <Th>
                <Typography variant="sigma">Titles</Typography>
              </Th>
              <Th {...sortProps('isDone')}>
                <Typography variant="sigma">Is done</Typography>
              </Th>
              <Th {...sortProps('status')}>
                <Typography variant="sigma">Status</Typography>
              </Th>
            </Tr>
          </Thead>
          <TableBody data={data} isLoading={isLoading} />
        </Table>
        <Box paddingTop={4}>
          <Flex alignItems="flex-end" justifyContent="space-between">
            <PageSizeURLQuery />
            <PaginationURLQuery pagination={pagination} />
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default GenerateMultiple;
