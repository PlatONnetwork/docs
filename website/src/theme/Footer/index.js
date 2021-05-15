/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { useThemeConfig } from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';
import ThemedImage from '@theme/ThemedImage';

function FooterLink({ to, href, label, prependBaseUrlToHref, ...props }) {
  const toUrl = useBaseUrl(to);
  const normalizedHref = useBaseUrl(href, {
    forcePrependBaseUrl: true
  });
  return (
    <Link
      className="footer__link-item"
      {...(href
        ? {
            href: prependBaseUrlToHref ? normalizedHref : href
          }
        : {
            to: toUrl
          })}
      {...props}
    >
      {label}
    </Link>
  );
}

const FooterLogo = ({ sources, alt }) => <ThemedImage className="footer__logo" alt={alt} sources={sources} />;

let isLoaded = false
function GitStar() {
  useEffect(() => {
    if (!isLoaded) {
      let script = document.createElement('script');
      script.src = 'https://buttons.github.io/buttons.js';
      document.body.appendChild(script);
      isLoaded = true;
    }
  }, []);
  return (
    <div className="gitstar">
      <a
        className="github-button"
        href="https://github.com/PlatONnetwork/PlatON-Go"
        data-color-scheme="no-preference: light; light: light; dark: light;"
        data-icon="octicon-star"
        data-size="small"
        data-show-count="true"
        aria-label="Star PlatONnetwork/PlatON-Go on GitHub"
      >
        Star
      </a>
    </div>
  );
}
function Footer() {
  const { footer } = useThemeConfig();
  const { copyright, links = [], logo = {} } = footer || {};
  const { i18n } = useDocusaurusContext();
  const sources = {
    light: useBaseUrl(logo.src),
    dark: useBaseUrl(logo.srcDark || logo.src)
  };

  if (!footer) {
    return null;
  }
  if (i18n.currentLocale !== 'en') {
    links.map((link) => {
      link.items.map((item) => {
        item.hrefzh && (item.href = item.hrefzh);
      });
    });
  }

  return (
    <footer
      className={clsx('footer', {
        'footer--dark': footer.style === 'dark'
      })}
    >
      <div className="container">
        {links && links.length > 0 && (
          <div className="row footer__links">
            {links.map((linkItem, i) => (
              <div key={i} className="col footer__col">
                {linkItem.title != null ? <h4 className="footer__title">{linkItem.title}</h4> : null}
                {linkItem.items != null && Array.isArray(linkItem.items) && linkItem.items.length > 0 ? (
                  <ul className="footer__items">
                    {linkItem.items.map((item, key) =>
                      item.html ? (
                        <li
                          key={key}
                          className="footer__item" // Developer provided the HTML, so assume it's safe.
                          // eslint-disable-next-line react/no-danger
                          dangerouslySetInnerHTML={{
                            __html: item.html
                          }}
                        />
                      ) : item.img ? (
                        <li key={item.href || item.to} className="footer__item">
                          <a href={item.href} target="_blank" className="footer-logo-home" rel="noreferrer noopener">
                            <img src={useBaseUrl(item.img)} width="66" height="58" />
                          </a>
                        </li>
                      ) : (
                        <li key={item.href || item.to} className="footer__item">
                          <FooterLink {...item} />
                        </li>
                      )
                    )}
                  </ul>
                ) : null}
              </div>
            ))}
            <GitStar />
          </div>
        )}
        {(logo || copyright) && (
          <div className="footer__bottom text--center">
            {logo && (logo.src || logo.srcDark) && (
              <div className="margin-bottom--sm">
                {logo.href ? (
                  <Link href={logo.href} className={styles.footerLogoLink}>
                    <FooterLogo alt={logo.alt} sources={sources} />
                  </Link>
                ) : (
                  <FooterLogo alt={logo.alt} sources={sources} />
                )}
              </div>
            )}
            {copyright ? (
              <div
                className="footer__copyright" // Developer provided the HTML, so assume it's safe.
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: copyright
                }}
              />
            ) : null}
          </div>
        )}
      </div>
    </footer>
  );
}

export default Footer;
