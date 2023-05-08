export const generateContentHtml = (paragraphTitle: string, paragraphContent: string) =>
  `<h2>${paragraphTitle}</h2><p>${paragraphContent}</p>`;

export const generateVideoScriptHtml = (
  sceneTitle: string,
  sceneLength: string,
  camera: string,
  voiceover: string
) =>
  `<h3>${sceneTitle}(${sceneLength}s)</h3> <p><ul><li>camera: ${camera}</li><li>voiceover: ${voiceover}</li></ul></p>`;
