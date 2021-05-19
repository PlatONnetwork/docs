import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useLocation } from '@docusaurus/router';

function useAlternatePageUtils() {
  const {
    siteConfig: { baseUrl, url },
    i18n: { defaultLocale, currentLocale }
  } = useDocusaurusContext();
  const { pathname } = useLocation();
  const baseUrlUnlocalized =
    currentLocale === defaultLocale ? baseUrl : baseUrl.replace(`/${currentLocale}/`, `/${defaultLocale}/`);

  const pathnameSuffix = pathname.replace(baseUrl, '');

  function getLocalizedBaseUrl(locale) {
    return locale === defaultLocale
      ? `${baseUrlUnlocalized}`
      : `${baseUrlUnlocalized.replace(`/${defaultLocale}/`, `/${locale}/`)}`;
  }
  // TODO support correct alternate url when localized site is deployed on another domain
  function createUrl({ locale, fullyQualified }) {
    return `${fullyQualified ? url : ''}${getLocalizedBaseUrl(locale)}${pathnameSuffix}`;
  }
  return { createUrl };
}

export default useAlternatePageUtils;
