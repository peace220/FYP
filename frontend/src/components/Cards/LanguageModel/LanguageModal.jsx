import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faX
} from '@fortawesome/free-solid-svg-icons';
const LanguageChangeCard = (props) => {
  const { setModal } = props;
  const [active, setActive] = useState("English");

  const langs = [
    { lang: "English", code: "en" },
    { lang: "Chinese", code: "zh" },
    { lang: "Malay", code: "ms" },
  ];

  let changeHandler = (e) => {
    setActive(e.target.innerText || "");
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-40 z-10">
      <div className="bg-white w-47 sm:w-60 md:w-80 lg:w-90 p-5">
        <div className="flex justify-between">
          <span className="text-lg font-bold ">Choose a language</span>
          <button
            onClick={() => setModal(false)} // Replace with your close modal function
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
                 <FontAwesomeIcon icon={faX} />
          </button>
        </div>
        <div className="flex flex-wrap">
          {langs.map((lang, id) => (
            <div
              key={id}
              className={`min-w-80 md:min-w-150 text-base md:text-lg cursor-pointer m-2 ${
                active === lang.lang
                  ? "outline-solid outline-gray-500 outline-offset-2"
                  : ""
              }`}
              onClick={changeHandler}
            >
              {lang.lang}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageChangeCard;
