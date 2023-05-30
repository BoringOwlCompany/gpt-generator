import styled, { css } from 'styled-components';
import { Box } from '@strapi/design-system';

export const ItemsBoxesWrapper = styled(Box)`
  width: 100%;
`;

export const ItemBox = styled(Box)`
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
