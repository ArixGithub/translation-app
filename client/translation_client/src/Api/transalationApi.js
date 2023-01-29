export default async function translateApiCall(
  textToTranslate,
  languageCode,
  handleError
) {
  return fetch(
    `/Translate?textToTranslate=${textToTranslate}&languageCode=${languageCode}`
  )
    .then((response) => {
      if (!response.ok) {
        throw response.statusText;
      }
    })
    .then((response) => response.json())
    .then((response) => response.translations[0].translatedText)
    .catch((error) => {
      handleError(error);
    });
}
