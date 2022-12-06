import { useEffect, useState } from "react";
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
import arrow from "./assets/arrow-2.svg";
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

const activities = [
  {
    src: coin1,
    name: "Bitcoin",
    time: "10:45:16 AM",
    value: "+1545,00",
    status: "Completed",
  },
  {
    src: coin3,
    name: "Ethereum",
    time: "09:15:31 AM",
    value: "+5649,00",
    status: "Painding",
  },
  {
    src: coin2,
    name: "LTC",
    time: "09:01:12 AM",
    value: "+4547,00",
    status: "Completed",
  },
];

function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`${import.meta.env.VITE_API_MOCK}/routes`);
      const res = await result.json();
      setData(res?.data?.[0]);
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="main-wrapper">
        <div className="menu">
          <div className="menu-header" />
          {data?.routes?.map((item) => (
            <div className="menu-item">
              <img src={item?.icon} alt="dash_img" />
              <div>{item?.name}</div>
            </div>
          ))}
        </div>
        <div className="content">
          <div className="content-header" />
          <div className="content-body">
            <div className="ranking-card">
              <div className="ranking-card-header">
                {data?.creditScoreRankingTitle}
              </div>
              <div className="ranking-card-body">
                <div className="score-wrapper">
                  <div>
                    {data?.creditScore
                      ?.slice(0, data?.creditScore?.length / 2)
                      .map((item, idx) => (
                        <div
                          className="score-item"
                          style={{ paddingBottom: idx === 0 ? 42 : 0 }}
                        >
                          <img src={score} />
                          <div className="score-detail-wrapper">
                            <div className="score-title">{item?.name}</div>
                            <div className="score-detail">
                              <div className="score">{item?.score}</div>
                              <div className="score-status">{item?.status}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                  <div>
                    {data?.creditScore
                      ?.slice(
                        data?.creditScore?.length / 2,
                        data?.creditScore?.length
                      )
                      .map((item, idx) => (
                        <div
                          className="score-item"
                          style={{ paddingBottom: idx === 0 ? 42 : 0 }}
                        >
                          <img src={score} />
                          <div className="score-detail-wrapper">
                            <div className="score-title">{item?.name}</div>
                            <div className="score-detail">
                              <div className="score">{item?.score}</div>
                              <div className="score-status">{item?.status}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="ranking-info">
                  <div className="ranking-info-header">
                    <div>{data?.creditScoreRanking}</div>
                    <img src={ranking} />
                  </div>
                  <div className="ranking-info-detail">
                    {data?.creditScoreRankingText}
                  </div>
                  <button className="btn-ranking" style={{ marginTop: 8 }}>
                    {data?.creditScoreRankingBtn}
                  </button>
                </div>
              </div>
            </div>
            <div className="coin-card-list">
              {listInfoCoin.map((item) => (
                <div className="coin-card">
                  <img src={item.src} alt="coin" className="coin-img" />
                  <div>
                    {item?.from}
                    <img src={arrow} alt="arrow" className="img-arrow" />
                    {item?.to}
                  </div>
                  <div className="coin-value">{item?.value}</div>
                  {item?.raise === true ? (
                    <div style={{ color: "#00DEA3" }}>
                      <img src={up} alt="up" style={{ marginRight: 4 }} />
                      {item.rate}%
                    </div>
                  ) : (
                    <div style={{ color: "#F23985" }}>
                      <img src={down} alt="up" style={{ marginRight: 4 }} />
                      {item?.rate}%
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="recent-wrapper">
              <div className="recent-wrapper-title">
                {data?.recentActivitiesTitle}
              </div>
              <table>
                <tr />
                {data?.recentActivities?.map((item) => (
                  <tr className="recent-row">
                    <td className="recent-img">
                      <img src={item.icon} alt="coin" />
                    </td>
                    <td className="recent-name">{item.name}</td>
                    <td className="recent-time">{item.time}</td>
                    <td className="recent-value">{item.value}</td>
                    <td
                      className="recent-status"
                      style={{
                        color:
                          item.status === "Completed" ? "#00DEA3" : "#4318FF ",
                      }}
                    >
                      {item.status}
                    </td>
                  </tr>
                ))}
              </table>
            </div>
          </div>
          <div className="footer">{data?.footer}</div>
        </div>
      </div>
    </>
  );
}

export default App;
