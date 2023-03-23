export const articlePrompt = (title: string) =>
  `Napisz od 3 do 5 akapitów na bloga na temat: "${title}". Zwróć w postaci JSON: {content: "Tutaj treść artykułu (każdy akapit owrapuj tagiem <p> z HTML'a i dodaj nagłówki akapitów z tagiem <h2>)", excerpt: "Tutaj krótki wstęp do artykułu (maksymalnie 300 znaków)"} i nie dopisuj nic więcej`;
