import styled from 'styled-components';
import { ProgressBar } from '@strapi/design-system';

export const Progress = styled(ProgressBar)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  border-radius: 0;

  ::before {
    border-radius: 0;
    background-color: ${({ theme }) => theme.colors.success500};
    transition: width 0.3s ease-in-out;
  }
`;
