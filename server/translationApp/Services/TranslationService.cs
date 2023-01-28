namespace Services
{
    public static class TranslationService 
    {
        public static Uri translationUri = new Uri("https://google-translate1.p.rapidapi.com/language/translate/v2");
        public static string apiKey = "20af78d55cmshb69db86ace733b6p14e6cajsn638189f1946a";

        public static async Task<string> Translate(string textToTranslate, string languageCode)
        {
            var translatedText = "";
            using (var client = new HttpClient())
            {
                var request = new HttpRequestMessage
                {
                    Method = HttpMethod.Post,
                    RequestUri = translationUri,
                    Headers =
                    {
                        { "X-RapidAPI-Key", apiKey },
                        { "X-RapidAPI-Host", "google-translate1.p.rapidapi.com" },
                    },
                    Content = new FormUrlEncodedContent(new Dictionary<string, string>
                    {
                        { "q", textToTranslate },
                        { "target", languageCode },
                        { "source", "en" },
                    }),
                };
                
                using (var response = await client.SendAsync(request))
                {
                    response.EnsureSuccessStatusCode();
                    translatedText = await response.Content.ReadAsStringAsync();
                }
            }

            return translatedText;
        }
    }
}