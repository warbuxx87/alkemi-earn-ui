import React from "react";
import "antd/dist/antd.css";
import "./history.scss";
import { Button, Input } from "antd";
import { Pagination } from "antd";

// add i18n.
import { IntlProvider, FormattedMessage } from "react-intl";
import en_US from "../../language/en_US";
import fr_FR from "../../language/fr_FR";
import zh_CN from "../../language/zh_CN";

import {
  open_it_onetherscan,
  to_ethscan_with_account,
  i_want_received_token,
  i_want_send_token,
  change_page,
  get_main_data_timer,
  format_num_K,
  get_history,
  change_page_history,
  handle_list_click,
  format_Shortfall
} from "./utils";

import back from "../../assets/images/back.svg";

class History extends React.Component {
  constructor(porps) {
    super(porps);
    this.state = {
      net_type: "main",
      data: [
        {
          key: 0,
          shortfallWeth: "0.00",
          address: "...",
          Supply: "0.00",
          Borrow: "0.00",
          collateralRate: "0.00%"
        }
      ],
      index: 0,
      decimals: {
        USDx: 18,
        WETH: 18,
        USDT: 6
      },
      max_liquidate: {
        USDx: {},
        WETH: {},
        USDT: {}
      },
      amount_to_liquidate: "",
      data_is_ok: false,
      is_btn_enable: true,
      pageNumber: 1,
      pageSize: 15,
      cur_language: navigator.language === "zh-CN" ? "中文" : "English"
    };
  }

  componentDidMount = () => {
    get_main_data_timer(this);
    get_history(this);

    this.update_list_timer = setInterval(() => {
      get_main_data_timer(this);
      get_history(this);
    }, 1000 * 15);
  };

  render() {
    return (
      <div>
        <IntlProvider
          locale={"en"}
          messages={this.state.cur_language === "中文" ? zh_CN : en_US}
        >
          <React.Fragment>
            <div className="main-body">

              <div className="main-body-left">

                {!this.state.show_history && (
                  <>
                    <div className="main-body-list">
                      <table>
                        <thead>
                          <tr>
                            <th>
                              <FormattedMessage id="Shortfall" /> (ETH)
                            </th>
                            <th>
                              <FormattedMessage id="Account" />
                            </th>
                            <th>
                              <FormattedMessage id="Supply_Balance" />
                              ($)
                            </th>
                            <th>
                              <FormattedMessage id="Borrow_Balance" />
                              ($)
                            </th>
                            <th>
                              <FormattedMessage id="Collateralization_ratio" />
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.data.map(item => {
                            return (
                              <tr
                                key={item.key}
                                onClick={() => {
                                  handle_list_click(this, item.key);
                                }}
                                className={
                                  this.state.index === item.key ? "active" : ""
                                }
                              >
                                <td>
                                  {format_num_K(
                                    format_Shortfall(item.shortfallWeth)
                                  )}
                                </td>
                                <td>
                                  {item.address.slice(0, 4) +
                                    "..." +
                                    item.address.slice(-4)}
                                </td>
                                <td>{format_num_K(item.Supply)}</td>
                                <td>{format_num_K(item.Borrow)}</td>
                                <td>{item.collateralRate}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    <div className="page">
                      <Pagination
                        showQuickJumper
                        pageSize={this.state.pageSize}
                        defaultCurrent={this.state.pageNumber}
                        total={this.state.totalSize ? this.state.totalSize : 0}
                        onChange={(page, pageSize) => {
                          change_page(this, page, pageSize);
                        }}
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="clear"></div>
            </div>
          </React.Fragment>
        </IntlProvider>
      </div>
    );
  }
}

export default History;
