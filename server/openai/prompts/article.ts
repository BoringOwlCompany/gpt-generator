export const titlePrompt = (title: string) =>
  `Napisz mi tytuł do artykułu na temat: ${title}. Zwróć w postaci tablicy JSON: { title: "tytuł akapitu pierszego" }`;

export const paragraphsPrompt = (title: string) =>
  `Napisz mi tytuły od 4 do 5 akapitów na bloga do artykułu o tytule: ${title}. Zwróć w postaci tablicy JSON: [{ paragraph: "tytuł akapitu pierszego" }, { paragraph: "tytuł akapitu drugiego" }]`;

export const paragraphPrompt = (title: string, paragraph: string) =>
  `Napisz mi kilka zdań do artykułu o tytule głównym: ${title} i tytule akapitu: ${paragraph}. Zwróć w postaci JSON: { paragraph: "Tutaj treść bez nagłówków" }`;

export const excerptPrompt = (title: string) =>
  `Napisz mi na około 300 znaków wstęp do artykułu na temat: ${title}. Zwróć w postaci JSON: { excerpt: "Tutaj wstęp" }`;