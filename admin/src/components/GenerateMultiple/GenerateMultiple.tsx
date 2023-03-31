import React, { useState } from 'react';

import { Plus } from '@strapi/icons';
import {
  Avatar,
  BaseHeaderLayout,
  Table,
  VisuallyHidden,
  Tbody,
  Thead,
  Tr,
  Th,
  Td,
  Button,
  Box,
  Typography,
} from '@strapi/design-system';
import { AddJobModal } from './components';

const GenerateMultiple = () => {
  const [modalOpened, setModalOpened] = useState(false);

  const entry = {
    cover: 'https://avatars.githubusercontent.com/u/3874873?v=4',
    description:
      'Chez Léon is a human sized Parisian z Léon is a human sized Parisianz Léon is a human sized Parisianz Léon is a human sized Parisianz Léon is a human sized Parisianz Léon is a human sized Parisian z Léon is a human sized Parisianz Léon is a human sized Parisianz Léon is a human sized Parisian',
    category: 'French cuisine',
    contact: 'Leon Lafrite',
  };
  const entries = [];
  for (let i = 0; i < 5; i++) {
    entries.push({
      ...entry,
      id: i,
    });
  }

  return (
    <Box>
      {modalOpened && <AddJobModal handleClose={() => setModalOpened(false)} />}
      <Box background="neutral100">
        <BaseHeaderLayout
          primaryAction={
            <Button onClick={() => setModalOpened(true)} startIcon={<Plus />}>
              Add new job
            </Button>
          }
          title="Generate multiple articles"
          as="h2"
        />
      </Box>
      <Box padding={8} background="neutral100">
        <Table colCount={7} rowCount={10}>
          <Thead>
            <Tr>
              <Th>
                <Typography variant="sigma">ID</Typography>
              </Th>
              <Th>
                <Typography variant="sigma">Cover</Typography>
              </Th>
              <Th>
                <Typography variant="sigma">Description</Typography>
              </Th>
              <Th>
                <Typography variant="sigma">Categories</Typography>
              </Th>
              <Th>
                <Typography variant="sigma">Contact</Typography>
              </Th>
              <Th>
                <VisuallyHidden>Actions</VisuallyHidden>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {entries.map((entry) => (
              <Tr key={entry.id} style={{ cursor: 'pointer' }} onClick={console.log}>
                <Td>
                  <Typography textColor="neutral800">{entry.id}</Typography>
                </Td>
                <Td>
                  <Avatar src={entry.cover} alt={entry.contact} />
                </Td>
                <Td maxWidth="300px">
                  <Typography textColor="neutral800" ellipsis>
                    {entry.description}
                  </Typography>
                </Td>
                <Td>
                  <Typography textColor="neutral800">{entry.category}</Typography>
                </Td>
                <Td>
                  <Typography textColor="neutral800">{entry.contact}</Typography>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default GenerateMultiple;
