import React, { useState } from 'react';

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
  VisuallyHidden,
  BaseCheckbox,
} from '@strapi/design-system';
import { PageSizeURLQuery, PaginationURLQuery } from '@strapi/helper-plugin';
import { AddJobModal } from './components';
import { useModal, useSort } from '../../hooks';
import { useGptCronCollection, useGptCronCollectionDelete } from '../../api';
import TableBody from './TableBody';
import JobDetailsModal from './components/JobDetailsModal';

const GenerateMultiple = () => {
  const [isFormModalOpened, handleCloseFormModal, handleOpenFormModal] = useModal({
    confirmClose: true,
  });
  const [isDetailsModalOpen, handleCloseDetailsModal, handleOpenDetailsModal] = useModal();
  const [pickedRowId, setPickedRowId] = useState<number | null>(null);
  const [selectedRows, setSelectedRows] = useState<boolean[]>([]);
  const { data, refetch, pagination, isLoading } = useGptCronCollection({
    onSuccess: (length) => setSelectedRows(new Array(length).fill(false)),
  });
  const {
    isLoading: isDeleteLoading,
    deleteCron,
    deleteBatchCron,
    deleteItemId,
    isBatchLoading,
  } = useGptCronCollectionDelete({
    onSuccess: refetch,
  });
  const { field, direction, setSort } = useSort();

  const handlePickRow = (id: number) => {
    setPickedRowId(id);
    handleOpenDetailsModal();
  };

  const handleSelectAllRows = () => {
    if (selectedRows.every((row) => row)) {
      setSelectedRows(new Array(selectedRows.length).fill(false));
    } else {
      setSelectedRows(new Array(selectedRows.length).fill(true));
    }
  };

  const handleSelectRow = (index: number) => {
    setSelectedRows((prev) => {
      const newRows = [...prev];
      newRows[index] = !newRows[index];
      return newRows;
    });
  };
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

  const pickedRow = data?.find(({ id }) => id === pickedRowId);

  const numberOfSelectedRows = selectedRows.filter((row) => row).length;
  return (
    <Box>
      {isFormModalOpened && <AddJobModal handleDone={refetch} handleClose={handleCloseFormModal} />}
      {isDetailsModalOpen && (
        <JobDetailsModal pickedRow={pickedRow} handleClose={handleCloseDetailsModal} />
      )}
      <Box>
        <BaseHeaderLayout
          primaryAction={
            <Button onClick={handleOpenFormModal} startIcon={<Plus />}>
              Add new job
            </Button>
          }
          title="Generate multiple articles"
          subtitle={`${pagination.total} entries found`}
          as="h2"
        />
      </Box>

      <Box padding={8}>
        {numberOfSelectedRows > 0 && data && (
          <Button
            onClick={() =>
              deleteBatchCron(
                selectedRows.reduce((prev, cur) => {
                  if (cur) {
                    return [...prev, data[selectedRows.indexOf(cur)].id];
                  }
                  return prev;
                }, [] as number[])
              )
            }
            style={{ marginBottom: '8px' }}
          >
            Delete {numberOfSelectedRows} jobs
          </Button>
        )}
        <Table colCount={8}>
          <Thead>
            <Tr>
              <Th>
                <BaseCheckbox
                  onChange={handleSelectAllRows}
                  value={selectedRows.length > 0 && selectedRows.every((row) => row)}
                  indeterminate={
                    selectedRows.some((row) => row) && !selectedRows.every((row) => row)
                  }
                />
              </Th>
              <Th {...sortProps('id')}>
                <Typography variant="sigma">ID</Typography>
              </Th>
              <Th {...sortProps('createdAt')}>
                <Typography variant="sigma">Created at</Typography>
              </Th>
              <Th {...sortProps('keywords')}>
                <Typography variant="sigma">Keywords</Typography>
              </Th>
              <Th {...sortProps('language')}>
                <Typography variant="sigma">Language</Typography>
              </Th>
              <Th>
                <Typography variant="sigma">Progress</Typography>
              </Th>
              <Th>
                <Typography variant="sigma">Titles</Typography>
              </Th>
              <Th>
                <Typography variant="sigma">Is done</Typography>
              </Th>
              <Th>
                <Typography variant="sigma">Status</Typography>
              </Th>
              <Th>
                <VisuallyHidden>Actions</VisuallyHidden>
              </Th>
            </Tr>
          </Thead>
          <TableBody
            data={data}
            isLoading={isLoading || isBatchLoading}
            handlePickRow={handlePickRow}
            selectedRows={selectedRows}
            selectRow={handleSelectRow}
            actions={(id) => (
              <Button
                loading={id === deleteItemId && isDeleteLoading}
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.stopPropagation();
                  deleteCron(id);
                }}
              >
                Delete
              </Button>
            )}
          />
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
