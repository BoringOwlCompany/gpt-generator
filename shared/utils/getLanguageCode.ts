import { Language } from '../enums';

export const getLanguageCode = (language: Language) => {
  if (language === Language.PL) return 'pl';
  if (language === Language.EN) return 'en';
  if (language === Language.DE) return 'de';

  return 'en';
};
