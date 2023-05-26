export const titlesPrompt = (keywords: string, numberOfTitle: number) =>
  `Wymyśl mi ${numberOfTitle} tytułów na bloga na podstawie tych słów kluczowych: ${keywords}. Nie musisz używać wszystkich w każdym tytule.`;

export const titlePrompt = (title: string) => `Napisz mi tytuł do artykułu na temat: ${title}.`;

export const paragraphsPrompt = (title: string) =>
  `Mam artykuł o tytule: ${title}. Napisz mi 5 tytułów akapitów do niego.`;

export const paragraphPrompt = (title: string, paragraph: string) =>
  `Napisz mi kilka zdań akapitu do artykułu: ${title}. Tytuł akapitu: ${paragraph}.`;

export const excerptPrompt = (title: string) =>
  `Napisz mi na około 300 znaków wstęp do artykułu na temat: ${title}.`;

export const seoPrompt = `Wygeneruj dwa pola dla SEO odnośnie tego artykułu czyli Tytuł i Opis.`;
export const faqPrompt = `Napisz mi 3 pytania odpowiedziami do tego artykułu, nie przekraczaj 200 znaków na pytanie jak i odpowiedź.`;

export const videoScriptScenesPrompt = (length: string) =>
  `Potrzebuje scenariusz do filmu na media społecznościowe na podstawie danego artykułu. Daj mi propozycje na sceny do tego filmu i podaj czas ich trwania. Łącznie cały film ma trwać ${length} sekund. Jeśli łącznie sceny nie będą miały ${length} sekund, wymyśl kolejne. Pierwsza scena powinna być wstępem do filmu, a ostatnia podsumowaniem. `;

export const videoScriptSceneDetailsPrompt = (scene: string, length: string) =>
  `Napisz szczegóły do sceny do filmu na podstawie danego artykułu. Tytuł sceny to ${scene}. Potrzebuje informacje odnośnie tego co ma pokazywać kamera (krótki opis) oraz treść do przeczytania. Tekst ma mieć około ${Math.round(
    (parseInt(length) * 183) / 60
  )} słów. W treści napisz tylko informacje stricte powiązane z tytułem sceny: ${scene}, nie pisz żadnych wprowadzeń.`;

export const articleContentPrompt = (content: string) => `Napisales artykuł: "${content}."`;
