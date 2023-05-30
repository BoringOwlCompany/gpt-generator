import React from 'react';
import { Icon } from '@strapi/design-system';
import { Cross } from '@strapi/icons';
import { IFinalForm } from '../../LastStep.types';
import { TextInput, TitleOptions } from '../../../../../../../Global';
import { useFieldArray, UseFieldArrayRemove, useFormContext } from 'react-hook-form';
import { dateFormatOptions } from '../../../../../../../../utils';
import { addMinutesToTime } from '../../LastStep.utils';

interface IProps {
  disabled: boolean;
  index: number;
  remove: UseFieldArrayRemove;
}

export const FlashcardItemOptions = ({ index, disabled }: IProps) => {
  const { control, watch } = useFormContext<IFinalForm>();
  const { remove } = useFieldArray({
    name: 'items',
    control,
  });

  const { firstItemGenerationTime, interval } = watch();
  const itemGenerationTime = new Date(
    firstItemGenerationTime.getTime() + addMinutesToTime(parseInt(interval) * index)
  );

  return (
    <>
      <TextInput<IFinalForm>
        label={`Question ${index + 1}`}
        name={`items.${index}.question`}
        hint={itemGenerationTime.toLocaleString('en', dateFormatOptions)}
        disabled={disabled}
        endAction={
          <Icon
            style={{ cursor: 'pointer' }}
            onClick={() => remove(index)}
            as={Cross}
            colors={(theme: any) => ({
              path: {
                fill: theme.colors.danger600,
              },
            })}
          />
        }
      />
    </>
  );
};
