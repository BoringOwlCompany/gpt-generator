import styled from "styled-components";

export const FaqWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 1rem;

  > div {
    grid-column: span 1;
  }
`;
