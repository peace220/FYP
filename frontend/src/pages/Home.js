import React from "react";
import Layout from "./Layout/Layout1.jsx";
import TTSButton from "../components/Buttons/TTSButton.jsx";
import { useThemedStyles } from "../hooks/ThemeContrast.jsx";
import { useTranslation } from 'react-i18next';

function Home() {
  const { backgroundColor, textColor, cardBackground } = useThemedStyles();
  const { t } = useTranslation();

  return (
    <Layout>
      <div className={`min-h-screen ${backgroundColor}`}>
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h1 className={`text-5xl font-bold mb-6 text-center ${textColor}`}>
            {t('welcomeTitle')}
          </h1>
          <div className="flex">
            <p>
              {t('welcome')}
            </p>
            <TTSButton text={t('welcome')} className="mb-8 mx-auto block" />
          </div>

          <div>
            <h2 className={`text-3xl font-semibold mb-6 ${textColor}`}>
              {t('getStarted')}
            </h2>
            <p className={`mb-4 ${textColor}`}>
              {t('getStartedText')}
            </p>
          </div>
          <div className="mb-16">
            <h2 className={`text-3xl font-semibold mb-6 ${textColor}`}>
              {t('features')}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {t('featuresList', { returnObjects: true }).map((feature, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-lg shadow-lg ${cardBackground}`}
                >
                  <h3 className={`text-xl font-semibold mb-2 ${textColor}`}>
                    {feature.title}
                  </h3>
                  <p className={textColor}>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <h2 className={`text-3xl font-semibold mb-6 ${textColor}`}>
              {t('benefits')}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {t('benefitsList', { returnObjects: true }).map((benefit, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-lg shadow-lg ${cardBackground}`}
                >
                  <h3 className={`text-xl font-semibold mb-2 ${textColor}`}>
                    {benefit.title}
                  </h3>
                  <p className={textColor}>{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
