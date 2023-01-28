import React, { useState } from "react";
import "./TranslationPage.css";
import translateApiCall from "../Api/transalationApi";

const TranslationPage = () => {
  const [textToTranslate, setTextToTranslate] = useState("");
  const [spanishText, setSpanishText] = useState("");
  const [frenchText, setFrenchText] = useState("");
  const [numberOfTranslations, setNumberOfTranslations] = useState(0);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const [spanishTranslation, frenchTranslation] = await Promise.all([
        translateApiCall(textToTranslate, "es", (error) => {
          alert(error);
        }),
        translateApiCall(textToTranslate, "fr", (error) => {
          alert(error);
        }),
      ]);

      if (!!spanishTranslation && !!frenchTranslation) {
        setSpanishText(spanishTranslation);
        setFrenchText(frenchTranslation);
        setNumberOfTranslations((prevNum) => prevNum + 1);
      }
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className="translation_page">
      <form onSubmit={handleSubmit} className="translation_form">
        <button
          type="submit"
          className="translate_button"
          disabled={!textToTranslate}
        >
          Translate
        </button>
        <>
          <div className="text_area">
            <div className="language_name">English</div>
            <input
              type="text"
              value={textToTranslate}
              onChange={(e) => setTextToTranslate(e.target.value)}
            />
          </div>
          <div className="text_area">
            <div className="language_name">Spanish</div>
            <input value={spanishText} disabled />
          </div>
          <div className="text_area">
            <div className="language_name">French</div>
            <input value={frenchText} disabled />
          </div>
        </>
      </form>
      <div>Number of Translations: {numberOfTranslations}</div>
    </div>
  );
};

export default React.memo(TranslationPage);
