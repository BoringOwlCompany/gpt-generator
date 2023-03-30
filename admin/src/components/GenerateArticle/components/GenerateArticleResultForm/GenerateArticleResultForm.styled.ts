import styled from "styled-components";

export const Container = styled.form`
  > div:first-of-type {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
  }
`;

export const ImagesContainer = styled.div`
  margin-block: 4px;
  display: grid;
  gap: 1rem;
  width: 100%;
  grid-template-columns: repeat(4, 1fr);
`