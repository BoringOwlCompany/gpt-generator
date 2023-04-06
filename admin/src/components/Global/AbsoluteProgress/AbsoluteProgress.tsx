import React from 'react';
import * as S from './AbsoluteProgress.styled';

interface IProps {
  max: number;
  value: number;
  show?: boolean;
}

const AbsoluteProgress = ({ show = true, max, value }: IProps) => {
  return show ? <S.Progress size="S" value={(100 / max) * value} /> : null;
};

export default AbsoluteProgress;
