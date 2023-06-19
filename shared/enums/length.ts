export enum ELength {
  TEN_SECONDS = '10',
  TWENTY_SECONDS = '20',
  HALF_MINUTE = '30',
  ONE_MINUTE = '60',
  TWO_MINUTES = '120',
  FIVE_MINUTES = '300',
}

export const lengthPossibilities = [
  {
    value: ELength.TEN_SECONDS,
    label: '10 seconds',
  },
  {
    value: ELength.TWENTY_SECONDS,
    label: '20 seconds',
  },
  {
    value: ELength.HALF_MINUTE,
    label: '30 seconds',
  },
  {
    value: ELength.ONE_MINUTE,
    label: '1 minute',
  },
  {
    value: ELength.TWO_MINUTES,
    label: '2 minutes',
  },
  {
    value: ELength.FIVE_MINUTES,
    label: '5 minutes',
  },
];

export const filteredLengthPossibilitiesDown = (maxLength: ELength) =>
  lengthPossibilities.filter(({ value }) => parseInt(value) <= parseInt(maxLength));

export const filteredLengthPossibilitiesUp = (maxLength: ELength) =>
  lengthPossibilities.filter(({ value }) => parseInt(value) >= parseInt(maxLength));
