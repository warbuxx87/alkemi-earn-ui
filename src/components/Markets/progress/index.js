import React from 'react';
import { Progress } from 'antd';
import 'antd/dist/antd.css';
import './progress.scss';

//import BTC from '../../../assets/images/BTC.svg';
import imBTC from '../../../assets/images/imBTC.svg';
import HBTC from '../../../assets/images/HBTC.svg';
import USDx from '../../../assets/images/USDx.svg';
import UUDD from '../../../assets/images/UUDD.svg';
import USDT from '../../../assets/images/USDT.svg';
import WETH from '../../../assets/images/WETH.svg';
import UUTT from '../../../assets/images/USDT.svg';
import WBTC from '../../../assets/images/WBTC.svg';
import DAI from '../../../assets/images/DAI.svg';
// png
import usdc from '../../../assets/images/usdc.png';
import tusd from '../../../assets/images/tusd.png';
import pax from '../../../assets/images/pax.png';


export default class MyProgress extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            token: {
                WETH: WETH,
                UUDD: UUDD,
                imBTC: imBTC,
                USDT: USDT,
                USDx: USDx,
                HBTC: HBTC,
                USDC: usdc,
                TUSD: tusd,
                UUTT: UUTT,
                PAX: pax,
                WBTC: WBTC,
                DAI: DAI
            }
        }
    }


    render() {
        return (
            <div className='percent-wrap'>
                <div className='percent-top'>
                    <img src={this.state.token[this.props.symbol]} alt='' />
                    <span className='token'>{this.props.symbol}</span>
                    <span className='percent-num'>
                        {
                            this.props.type === 'supply' ?
                                this.props.percentage_supply : this.props.percentage_borrow
                        }
                        %
                    </span>
                </div>
                <div className='percent-bottom'>
                    <Progress
                        percent={this.props.type === 'supply' ? this.props.percentage_supply : this.props.percentage_borrow}
                        status="active"
                        showInfo={false}
                    />
                </div>
            </div>
        )
    }
}

