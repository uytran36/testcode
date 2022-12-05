import { useState } from "react";
import "./App.css";
import dash from "./assets/dash.svg";
import ref from "./assets/ref.svg";
import rev from "./assets/rev.svg";
import app from "./assets/app.svg";
import acc from "./assets/acc.svg";
import score from "./assets/score.svg";
import ranking from "./assets/ranking.svg";
import coin1 from "./assets/coin1.png";
import coin2 from "./assets/coin2.png";
import coin3 from "./assets/coin3.png";
import coin4 from "./assets/coin4.png";
import arrow from "./assets/arrow-2.png";
import up from "./assets/Yes.png";
import down from "./assets/No.png";

const listInfoCoin = [
  {
    from: "BTC",
    src: coin1,
    value: 9784.79,
    rate: 7.2,
    raise: true,
  },
  {
    from: "LTC",
    src: coin2,
    value: 8741.19,
    rate: 5.2,
    raise: false,
  },
  {
    from: "ETM",
    src: coin3,
    value: 4567.16,
    rate: 6.5,
    raise: true,
  },
  {
    from: "BNB",
    src: coin4,
    value: 6547.79,
    rate: 9.5,
    raise: true,
  },
];
function App() {
  return (
    <>
      <div className="main-wrapper">
        <div className="menu">
          <div className="menu-header" />
          <div className="menu-item">
            <img src={dash} alt="dash_img" />
            <div>Dashboard</div>
          </div>
          <div className="menu-item">
            <img src={ref} alt="ref_img" />
            <div>Refer & Earn</div>
          </div>
          <div className="menu-item">
            <img src={rev} alt="rev_img" />
            <div>Revenue</div>
          </div>
          <div className="menu-item">
            <img src={acc} alt="acc_img" />
            <div>My Account</div>
          </div>
          <div className="menu-item">
            <img src={app} alt="app_img" />
            <div>My Applications</div>
          </div>
        </div>
        <div className="content">
          <div className="content-header" />
          <div className="content-body">
            <div className="ranking-card">
              <div className="ranking-card-header">Credit Score Ranking</div>
              <div className="ranking-card-body">
                <div className="score-wrapper">
                  <div>
                    {[0, 1].map((v) => (
                      <div
                        className="score-item"
                        style={{ paddingBottom: v === 0 ? 42 : 0 }}
                      >
                        <img src={score} />
                        <div className="score-detail-wrapper">
                          <div className="score-title">Your Credit Score</div>
                          <div className="score-detail">
                            <div className="score">942</div>
                            <div className="score-status">Good</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div>
                    {[0, 1].map((v) => (
                      <div
                        className="score-item"
                        style={{ paddingBottom: v === 0 ? 42 : 0 }}
                      >
                        <img src={score} />
                        <div className="score-detail-wrapper">
                          <div className="score-title">Your Credit Score</div>
                          <div className="score-detail">
                            <div className="score">942</div>
                            <div className="score-status">Good</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="ranking-info">
                  <div className="ranking-info-header">
                    <div>Credit Score Ranking</div>
                    <img src={ranking} />
                  </div>
                  <div className="ranking-info-detail">
                    In publishing and graphic design, Lorem ipsum is a
                    placeholder text commonly used to demonstrate the visual
                    form of a document or a typeface without relying on
                    meaningful content.
                  </div>
                  <button className="btn-ranking">See More...</button>
                </div>
              </div>
            </div>
            <div className="coin-card-list">
              {listInfoCoin.map((item) => (
                <div className="coin-card">
                  <img src={item.src} alt="coin" />
                  <div>
                    {item.from}
                    <img src={arrow} alt="arrow" />
                    USD
                  </div>
                  {item.value}
                  {item.raise === true ? (
                    <div>
                      <img src={up} alt="up" />
                      {item.rate}%
                    </div>
                  ) : (
                    <div>
                      <img src={down} alt="up" />
                      {item.rate}%
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
