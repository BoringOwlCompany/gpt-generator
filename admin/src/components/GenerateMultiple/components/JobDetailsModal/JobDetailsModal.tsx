import React from 'react';
import {
  ModalLayout,
  ModalHeader,
  ModalBody,
  Typography,
  Grid,
  GridItem,
  TextInput,
  Flex,
  Badge,
  Box,
  Link,
  Tooltip,
} from '@strapi/design-system';

import { getLanguageCode, IGptCronCollection } from '../../../../../../shared';
import { dateFormatOptions, getStatusFromJobDetails, parseStatus } from '../../../../utils';

import * as S from './JobDetailsModal.styled';
import { mapJobDetailsData } from './mappers';

interface IProps {
  pickedRow: IGptCronCollection | undefined;
  handleClose: () => void;
}

const JobDetailsModal = ({ pickedRow, handleClose }: IProps) => {
  const { items, status, keywords } = mapJobDetailsData(pickedRow) || {};

  return (
    <ModalLayout onClose={handleClose} labelledBy="title">
      <ModalHeader color="white" labeledBy="">
        <Typography fontWeight="bold" as="h2" id="title">
          Job details
        </Typography>
      </ModalHeader>
      <ModalBody style={{ color: 'white' }}>
        <Grid gap={4} gridCols={12}>
          <GridItem col={6}>
            <TextInput label="Keywords" name="keywords" disabled={true} value={keywords} />
          </GridItem>
          <GridItem col={6}>
            <Flex direction="column" alignItems="start" gap={1}>
              <Typography variant="pi" fontWeight="bold">
                Status
              </Typography>
              <Badge {...parseStatus(status)}>{status}</Badge>
            </Flex>
          </GridItem>
          <GridItem col={12}>
            <Flex direction="column" alignItems="start" gap={1}>
              <Typography variant="pi" fontWeight="bold">
                Articles
              </Typography>
              <S.ArticlesBoxesWrapper>
                {items
                  ?.sort((a, b) => a.timestamp - b.timestamp)
                  .map(({ status, timestamp, title, log, link }) => {
                    const date = new Date(timestamp);
                    return (
                      <S.ArticleBox padding={4} key={timestamp}>
                        <Flex justifyContent="space-between">
                          <Flex direction="row" gap={2}>
                            <Typography variant="pi">
                              ({date.toLocaleString('en', dateFormatOptions)})
                            </Typography>
                            <Typography>
                              {status === 'success' && link ? (
                                <Link to={link}>{title}</Link>
                              ) : (
                                title
                              )}
                            </Typography>
                          </Flex>
                          <Box>
                            <Tooltip
                              description={
                                log && (
                                  <pre style={{ maxWidth: 500, whiteSpace: 'pre-wrap' }}>
                                    {JSON.stringify(log, null, 4)}
                                  </pre>
                                )
                              }
                            >
                              <Badge {...parseStatus(status)}>{status}</Badge>
                            </Tooltip>
                          </Box>
                        </Flex>
                      </S.ArticleBox>
                    );
                  })}
              </S.ArticlesBoxesWrapper>
            </Flex>
          </GridItem>
        </Grid>
      </ModalBody>
    </ModalLayout>
  );
};

export default JobDetailsModal;
