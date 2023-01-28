using Microsoft.AspNetCore.Mvc;
using Services;

namespace translationApp.Controllers;

[ApiController]
[Route("[controller]")]
public class TranslateController : ControllerBase
{
    private readonly ILogger<TranslateController> _logger;

    public TranslateController(ILogger<TranslateController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public async Task<string> Translate(
        [FromQuery]string textToTranslate, 
        [FromQuery]string languageCode
        )
    {
        var translatedSpanishText = await TranslationService.Translate(textToTranslate, languageCode);

        return translatedSpanishText;
    }

}
