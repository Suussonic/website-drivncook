import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  fr: {
    translation: {
      'Newsletter': 'Newsletter',
      'Votre email': 'Votre email',
      'S’inscrire': 'S’inscrire',
      'Inscription réussie !': 'Inscription réussie !',
      'Erreur lors de l’inscription.': 'Erreur lors de l’inscription.',
      'Cet email est déjà inscrit.': 'Cet email est déjà inscrit.'
    }
  },
  en: {
    translation: {
      'Newsletter': 'Newsletter',
      'Votre email': 'Your email',
      'S’inscrire': 'Subscribe',
      'Inscription réussie !': 'Successfully subscribed!',
      'Erreur lors de l’inscription.': 'Subscription error.',
      'Cet email est déjà inscrit.': 'This email is already subscribed.'
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'fr',
  fallbackLng: 'fr',
  interpolation: { escapeValue: false }
});

export default i18n;
