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
import { dateFormatOptions, getStatusFromTitles, parseStatus } from '../../../../utils';
import styled, { css } from 'styled-components';

const ArticlesBoxesWrapper = styled(Box)`
  width: 100%;
`;

const ArticleBox = styled(Box)`
  ${({ theme }) => css`
    border: 1px solid ${theme.colors.neutral200};
    border-bottom-width: 0px;
    width: 100%;

    &:first-of-type {
      border-radius: 4px 4px 0 0;
    }

    &:last-of-type {
      border-radius: 0 0 4px 4px;
      border-bottom-width: 1px;
    }
  `}
`;

interface IProps {
  pickedRow: IGptCronCollection | undefined;
  handleClose: () => void;
}

const JobDetailsModal = ({ pickedRow, handleClose }: IProps) => {
  const status = getStatusFromTitles(pickedRow?.titles);

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
            <TextInput
              label="Keywords"
              name="keywords"
              disabled={true}
              value={pickedRow?.keywords}
            />
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
              <ArticlesBoxesWrapper>
                {pickedRow?.titles
                  .sort((a, b) => a.timestamp - b.timestamp)
                  .map(({ status, timestamp, title, log, articleId }) => {
                    const date = new Date(timestamp);
                    return (
                      <ArticleBox padding={4}>
                        <Flex justifyContent="space-between">
                          <Flex direction="row" gap={2}>
                            <Typography variant="pi">
                              ({date.toLocaleString('en', dateFormatOptions)})
                            </Typography>
                            <Typography>
                              {status === 'success' && articleId ? (
                                <Link
                                  to={`/content-manager/collectionType/api::article.article/${articleId}?plugins[i18n][locale]=${getLanguageCode(
                                    pickedRow.language
                                  )}`}
                                >
                                  {title}
                                </Link>
                              ) : (
                                title
                              )}
                            </Typography>
                          </Flex>
                          <Box>
                            <Tooltip description={log && <pre>{JSON.stringify(log, null, 4)}</pre>}>
                              <Badge {...parseStatus(status)}>{status}</Badge>
                            </Tooltip>
                          </Box>
                        </Flex>
                      </ArticleBox>
                    );
                  })}
              </ArticlesBoxesWrapper>
            </Flex>
          </GridItem>
        </Grid>
      </ModalBody>
    </ModalLayout>
  );
};

export default JobDetailsModal;
