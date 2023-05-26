import styled from 'styled-components';

export const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;

  & > button {
    width: fit-content;
    align-self: flex-end;
  }
`;
