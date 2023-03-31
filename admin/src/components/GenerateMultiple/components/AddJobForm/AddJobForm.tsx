import React from 'react';
import { ITitleResponse } from '../../../../../../shared';
import * as S from './AddJobForm.styled';

interface IProps {
  titles: ITitleResponse[];
}

const AddJobForm = ({ titles }: IProps) => {
  return (
    <S.Wrapper>
      <div>Result form</div>
    </S.Wrapper>
  );
};

export default AddJobForm;
