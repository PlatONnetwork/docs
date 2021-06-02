/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

class Footer extends React.Component {
  expectUrl(docName, language) {
    const docUrl = this.props.config.expectUrl[language][docName]
    return docUrl;
  }

  render() {
    return (
      <footer className="nav-footer" id="footer">
        <section className="sitemap">
          <a href={this.expectUrl('PlatON', this.props.language)} className="nav-home">
            {this.props.config.footerIcon && (
              <img
                src={this.props.config.baseUrl + this.props.config.footerIcon}
                alt={this.props.config.title}
                width="66"
                height="58"
              />
            )}
          </a>
          <div>
            <a href={this.expectUrl('PlatON', this.props.language)}>
            PlatON network
            </a>
            <a href={this.expectUrl('Foundation', this.props.language)}>
            LatticeX.Foundation
            </a>
            <a href={this.expectUrl('Forum', this.props.language)}>
            Forum
            </a>
          </div>
          <div className="gitstar">
            <a class="github-button" href="https://github.com/PlatONnetwork/PlatON-Go" data-color-scheme="no-preference: light; light: light; dark: light;" data-icon="octicon-star" data-size="small" data-show-count="true" aria-label="Star PlatONnetwork/PlatON-Go on GitHub">Star</a>
            {this.props.config.twitterUsername && (
              <div className="social">
                <a
                  href={`https://twitter.com/${this.props.config.twitterUsername}`}
                  className="twitter-follow-button">
                  Follow @{this.props.config.twitterUsername}
                </a>
              </div>
            )}
            {this.props.config.facebookAppId && (
              <div className="social">
                <div
                  className="fb-like"
                  data-href={this.props.config.url}
                  data-colorscheme="dark"
                  data-layout="standard"
                  data-share="true"
                  data-width="225"
                  data-show-faces="false"
                />
              </div>
            )}
          </div>
        </section>
        <section className="copyright">{this.props.config.copyright}</section>
      </footer>
    );
  }
}

module.exports = Footer;
