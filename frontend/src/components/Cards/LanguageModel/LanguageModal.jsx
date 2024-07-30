import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

const LanguageChangeCard = ({ setModal }) => {
  const { i18n, t } = useTranslation();
  const [active, setActive] = useState(i18n.language);

  const langs = [
    { code: "en", name: "English" },
    { code: "zh", name: "Chinese" },
    { code: "ms", name: "Malay" },
  ];

  const changeHandler = (e) => {
    const selectedLang = e.target.getAttribute("data-code");
    setActive(selectedLang);
    i18n.changeLanguage(selectedLang);
    localStorage.setItem("language", selectedLang);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-40 z-10">
      <div className="bg-white w-47 sm:w-60 md:w-80 lg:w-90 p-5">
        <div className="flex justify-between">
          <span className="text-lg font-bold">{t("language.chooseLanguage")}</span>
          <button
            onClick={() => setModal(false)}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <FontAwesomeIcon icon={faX} />
          </button>
        </div>
        <div className="flex flex-wrap">
          {langs.map((lang, id) => (
            <div
              key={id}
              data-code={lang.code}
              className={`min-w-80 md:min-w-150 text-base md:text-lg cursor-pointer m-2 ${
                active === lang.code
                  ? "outline-solid outline-gray-500 outline-offset-2"
                  : ""
              }`}
              onClick={changeHandler}
            >
              {lang.name} 
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageChangeCard;
