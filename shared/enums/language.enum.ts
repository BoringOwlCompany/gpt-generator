export enum Language {
  PL = 'Polish',
  EN = 'English',
  DE = 'German',
}

export const languagesOptions = Object.values(Language).map((lang) => ({
  label: lang,
  value: lang,
}));
