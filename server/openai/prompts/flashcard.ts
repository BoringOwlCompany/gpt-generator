export const questionsPrompt = (keywords: string, numberOfQuestions: number) =>
  `Wymyśl mi ${numberOfQuestions} pytań na podstawie tych słów kluczowych: ${keywords}. Nie musisz używać wszystkich w każdym pytaniu.`;

export const answersPrompt = (question: string) =>
  `Wymyśl mi jedną poprawną odpowiedź i 3 błędne odpowiedzi do pytania: ${question}. Niech odpowiedzi nie przekraczają 300 znaków.`;
