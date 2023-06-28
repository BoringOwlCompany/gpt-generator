const titleObject = { title: 'Tutaj tytuł artykułu' };
const paragraphsObject = [
  { paragraph: 'Tytuł akapitu pierwszego' },
  { paragraph: 'Tytuł akapitu drugiego' },
];
const paragraphObject = { paragraph: 'Tutaj treść akapitu bez nagłówków' };
const excerptObject = { excerpt: 'Tutaj wstęp' };
const seoObject = { title: 'Tutaj tytuł', description: 'Tutaj opis' };
const faqObject = [
  { question: 'Tutaj pytanie pierwsze', answer: 'Tutaj odpowiedź do pytania pierwszego' },
  { question: 'Tutaj pytanie drugie', answer: 'Tutaj odpowiedź do pytania drugiego' },
];
const titlesObject = [{ title: 'Tutaj tytuł pierwszy' }, { title: 'Tutaj tytuł drugi' }];
const videoScriptScenesObject = [
  {
    scene: 'Tutaj tytuł 1 sceny.',
    length: 'Tutaj czas trwania 1 sceny (w sekundach, sama liczba).',
  },
  {
    scene: 'Tutaj tytuł 2 sceny.',
    length: 'Tutaj czas trwania 2 sceny (w sekundach, sama liczba).',
  },
];
const videoScriptSceneDetailsObject = {
  camera: 'Tutaj co przedstawia kamera',
  voiceover: 'Tutaj treść do powiedzenia',
};
const questionsObject = [{ title: 'Tutaj pytanie pierwsze' }, { title: 'Tutaj pytanie drugie' }];
const answersObject = {
  correctAnswer: 'Tutaj poprawna odpowiedź',
  falseAnswers: ['Pierwsza błędna odpowiedź', 'Druga błędna odpowiedź', 'Trzecia błędna odpowiedź'],
};
const postObject = {
  post: 'Tutaj wpis',
};

export const jsonPrompt = <T extends object>(structure: T) =>
  ` [no prose] Odpowiedź zwróć w postaci JSON: ${JSON.stringify(structure)}`;

export const titleJsonPrompt = jsonPrompt(titleObject);
export const paragraphJsonPrompt = jsonPrompt(paragraphObject);
export const paragraphsJsonPrompt = jsonPrompt(paragraphsObject);
export const excerptJsonPrompt = jsonPrompt(excerptObject);
export const seoJsonPrompt = jsonPrompt(seoObject);
export const faqJsonPrompt = jsonPrompt(faqObject);
export const titlesJsonPrompt = jsonPrompt(titlesObject);
export const videoScriptScenesJsonPrompt = jsonPrompt(videoScriptScenesObject);
export const videoScriptSceneDetailsJsonPrompt = jsonPrompt(videoScriptSceneDetailsObject);
export const questionsJsonPrompt = jsonPrompt(questionsObject);
export const answersJsonPrompt = jsonPrompt(answersObject);
export const postJsonPrompt = jsonPrompt(postObject);
