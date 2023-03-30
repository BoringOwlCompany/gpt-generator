const titleObject = { title: "Tutaj tytuł artykułu" }
const paragraphsObject = [{ paragraph: "Tytuł akapitu pierwszego" }, { paragraph: "Tytuł akapitu drugiego" }];
const paragraphObject = { paragraph: "Tutaj treść akapitu bez nagłówków" }
const excerptObject = { excerpt: "Tutaj wstęp" }
const seoObject = { title: "Tutaj tytuł", description: "Tutaj opis" }
const faqObject = [{ question: "Tutaj pytanie pierwsze", answer: "Tutaj odpowiedź do pytania pierwszego" }, { question: "Tutaj pytanie drugie", answer: "Tutaj odpowiedź do pytania drugiego" }]

export const jsonPrompt = (structure: string) => `Zwróć w postaci JSON: ${structure}. Nie dopisuj nic więcej, tak żeby odpowiedź można było sparsować funkcją JSON.parse. Nie używaj cudzysłowów w tekście. Nie dodawaj nigdzie znaków kończących linie.`

export const titleJsonPrompt = jsonPrompt(JSON.stringify(titleObject));
export const paragraphJsonPrompt = jsonPrompt(JSON.stringify(paragraphObject));
export const paragraphsJsonPrompt = jsonPrompt(JSON.stringify(paragraphsObject));
export const excerptJsonPrompt = jsonPrompt(JSON.stringify(excerptObject));
export const seoJsonPrompt = jsonPrompt(JSON.stringify(seoObject));
export const faqJsonPrompt = jsonPrompt(JSON.stringify(faqObject));