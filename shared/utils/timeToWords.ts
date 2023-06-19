export const timeToWords = (time: string) => {
  try {
    return Math.round((parseInt(time) * 183) / 60);
  } catch {
    return 0;
  }
};
