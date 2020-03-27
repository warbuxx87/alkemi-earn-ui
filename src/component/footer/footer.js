import React from 'react';

// add i18n.
import { IntlProvider, FormattedMessage } from 'react-intl';
import en_US from '../../language/en_US.js';
import zh_CN from '../../language/zh_CN';

const Footer = () => {
    return (
        <IntlProvider locale={'en'} messages={navigator.language === 'zh-CN' ? zh_CN : en_US} >
            <div className='footer'>
                <div className='footer-left'>
                    <div className='footer-left-res'>
                        <span className='title'>
                            <FormattedMessage id='Resource' />
                        </span>
                        <span className='content-new'>
                            <a href='https://github.com/project-alkemi' target='_blank' rel="noopener noreferrer">GitHub</a>
                        </span>
                        <span className='content-new'>
                            <a href='https://docs.alkemi.network/faq' target='_blank' rel="noopener noreferrer">GitHub</a>
                        </span>
                    </div>

                    <div className='footer-left-pro'>
                        <span className='title title-special'>
                            <FormattedMessage id='Products' />
                        </span>
                        <span className='content-new'>
                            <a href='https://markets.alkemi.network/' target='_blank' rel="noopener noreferrer">Markets</a>
                        </span>
                        <span className='content-new'>
                            <a href='https://monitor.alkemi.network/' target='_blank' rel="noopener noreferrer">Monitor</a>
                        </span>
                    </div>
                </div>

                <div className='footer-right'>
                    <a href='https://twitter.com/AlkemiOfficial' target='_blank' rel="noopener noreferrer">
                        <img src={'images/twitter.svg'} alt='' />
                    </a>
                    <a href='https://medium.com/alkemi' target='_blank' rel="noopener noreferrer">
                        <img src={'images/medium.svg'} alt='' />
                    </a>
                    <a href='https://t.me/project-alkemi' target='_blank' rel="noopener noreferrer">
                        <img src={'images/telegram.svg'} alt='' />
                    </a>
                    <div className='clear'></div>

                    <div className='footer-right-fixed'>
                        <div className='fixed1'>
                            {
                                // this.state.cur_language
                            }
                        </div>
                        <span className='fixed-img'>
                            {/* <img src={'images/up.svg'} alt='' /> */}
                        </span>
                        <div className='fixed2'>
                            <ul>
                                <li onClick={() => { this.setState({ cur_language: '中文' }) }}>{'中文'}</li>
                                <li onClick={() => { this.setState({ cur_language: 'English' }) }}>{'English'}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='clear'></div>
            </div>
        </IntlProvider>
    )
}

export default Footer;
