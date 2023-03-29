import styled from "styled-components";
import { ProgressBar } from "@strapi/design-system";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;

  button {
    width: fit-content;
    align-self: flex-end;
  }
`;

export const Progress = styled(ProgressBar)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  border-radius: 0;

  ::before{
    border-radius: 0;
    background-color: green;
    transition: width .3s ease-in-out;
  }
`