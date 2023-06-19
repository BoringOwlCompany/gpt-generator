import { ESocialMediaProvider, socialMediaLengthRestrictions, timeToWords } from '../../../shared';

export const postPrompt = (length: string, socialMediaProvider: ESocialMediaProvider) => {
  const lengthRestriction = socialMediaLengthRestrictions[socialMediaProvider];
  const lengthPrompt = lengthRestriction
    ? `${lengthRestriction} znaków.`
    : `${timeToWords(length)} słów.`;

  return `Napisz mi wpis na ${socialMediaProvider} na temat danego artykułu. Niech to będzie zaproszenie do przeczytania go i dodaj na końcu hashtagi. Długość wpisu ma wynosić około ${lengthPrompt}. Nie pisz kto jest autorem tego artykułu.`;
};
