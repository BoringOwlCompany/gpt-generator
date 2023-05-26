import React, { FormHTMLAttributes } from 'react';
import * as S from './FormWrapper.styled';

const FormWrapper = ({ children, ...props }: FormHTMLAttributes<HTMLFormElement>) => {
  return <S.Wrapper {...props}>{children}</S.Wrapper>;
};

export default FormWrapper;
