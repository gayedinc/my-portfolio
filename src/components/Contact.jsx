import React from 'react';
import { useTranslation } from 'react-i18next';
import { StarSvg, GithubSvg, LinkedinSvg } from "../Svg";

export default function Contacts() {
  const { t } = useTranslation();

  return (
    <>
      <div className="contact-page">
        <div className='headtext'>
          <h1 onClick={() => (window.location.href = "#/contact")}>{t('contact')}</h1>
          <div className="star-icon">
            <StarSvg />
          </div>
        </div>
        <div className="contact-content">
          <p>{t('contaxt_text')}</p>
          <div className="footer">
            <button onClick={() =>
              window.location.href =
              "mailto:gayedinc190@gmail.com?subject=Frontend%20Development&body=Hello%20Gaye,"
            }>{t('send_email')}
            </button>
            <div className="cv">
              <h1>
                <a href="assets/doc/NihatDuysakCv-Tr.pdf" download>{t('download_cv')}</a>
              </h1>
            </div>
            <div className="profiles">
              <ul>
                <li>
                  <a href="https://github.com/gayedinc"><GithubSvg /></a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/gayedinc/"><LinkedinSvg /></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}