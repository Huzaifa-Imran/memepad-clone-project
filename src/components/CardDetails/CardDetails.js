import React, { useRef, useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import "./CardDetails.css";
import { useHistory } from "react-router";
import whenNoBanner from "../../images/whenNoBanner.png";
import Telegram from "../../images/telegram-small.svg";
import Twitter from "../../images/twitter-small.svg";
import Bsc from "../../images/bscscan-small.png";
import Medium from "../../images/medium-small.svg";
import BigCard from "../../images/details-card.jpg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { connectWallet } from "../../store/reducer/web3_reducer";
import { FaRegCopy } from "react-icons/fa";
import ProgressBar from 'react-bootstrap/ProgressBar';

const smallRedirects = [
  {
    image: Twitter,
    name: "Twitter",
    link: "",
  },
  {
    image: Telegram,
    name: "Telegram",
    link: "",
  },
  {
    image: Medium,
    name: "Medium",
    link: "",
  },
  {
    image: Bsc,
    name: "BscScan",
    link: "",
  },
];

function CardDetails(props) {
  // const history = useHistory();
  // console.log(history, props)
  const projectDetails = useSelector(
    (state) => state.launch[props.match.params.projId]
  );
  const connected = useSelector((state) => state.web3.connected);
  const dispatch = useDispatch();
  const [timerDays, setTimerDays] = useState("00");
  const [timerHours, setTimerHours] = useState("00");
  const [timerMinutes, setTimerMinutes] = useState("00");
  const [timerSeconds, setTimerSeconds] = useState("00");
  const [distance, setDistance] = useState(0);

  let interval = useRef();
  const startTimer = () => {
    if (projectDetails.startTime * 1000 < Date.now()) {
      setDistance(0);
      return;
    }
    interval = setInterval(() => {
      const distance = projectDetails.startTime * 1000 - Date.now();

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance <= 0) {
        clearInterval(interval.current);
        setDistance(0);
      } else {
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(interval.current);
    };
  }, []);

  const fixDecimals = (val, dec) => {
    if (!val) return 0;
    const decimals = String(val).split(".")[1];
    if (decimals && decimals.length > dec)
      return Number(val.toFixed(dec));
    return Number(val);
  };

  const now = (projectDetails.soldAmount / projectDetails.totalRewardTokens) * 100;
  const progressInstance = (
    <ProgressBar now={now} label={`${now}%`} srOnly />
  );

  return (
    <Container fluid>
      <Row>
        <Col lg={12} md={12}>
          <div className="details-breadcrumb">
            <Link to="/dashboard/projects">Projects</Link>
            <span>&gt;</span>
            <span>{projectDetails.name}</span>
          </div>
        </Col>
      </Row>
      <Row>
        <Col lg={12} md={12}>
          <div className="details-first-div">
            <div className="mr-4">
              <img src={projectDetails.smallImage} alt="" />
            </div>

            <div className="card-details">
              <div>
                {projectDetails.name} <span> {projectDetails.symbol} </span>
              </div>
              <div>
                {" "}
                <Link to={projectDetails.link}>{projectDetails.link}</Link>{" "}
              </div>
              <div className="redirect-links-main">
                {smallRedirects.map((v, i) => {
                  return (
                    <a href={v.link} target="_blank" rel="noreferrer">
                      <span className="redirect-links mr-2" key={i}>
                        <img
                          className="redirect-links-img"
                          src={v.image}
                          alt={v.name}
                        />
                        {v.name}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col lg={8} md={12} sm={12} className=''>
          <div className="details-second-left-div">
            <img src={projectDetails.image} alt="" />
            <div className="pool-about-content">
              <h3 class="pool-about-heading">Project Overview</h3>
              <div class="pool-about-text">
                {projectDetails.description}
              </div>
              <div class="pool-about-separator"></div>
              <h3 class="pool-about-heading">Pool Detail</h3>
              <div class="pool-about-sale">
                <span class="pool-about-dot"></span>
                {projectDetails.isFinished
                  ? "Sale Finished"
                  : !distance
                    ? "Live Now"
                    : `Live in ${timerDays}d:${timerHours}h:${timerMinutes}m`}
              </div>

              <div class="pool-about-row">
                <div>
                  <h4 class="pool-about-cell-heading">Pool Information</h4>
                  <ul class="pool-about-dataList">
                    <li class="pool-about-dataListItem">
                      <div class="pool-about-dataLabel">Token Distribution</div>
                      <div
                        title="14/07/2021, 4:00 PM UTC"
                        class="pool-about-dataValue"
                      >
                        {new Date(
                          projectDetails.startTime * 1000
                        ).toUTCString()}
                      </div>
                    </li>
                    <li class="pool-about-dataListItem">
                      <div class="pool-about-dataLabel">Audit Status</div>
                      <div class="pool-about-dataValue">
                        {projectDetails.auditStatus}
                      </div>
                    </li>
                    <li class="pool-about-dataListItem">
                      <div class="pool-about-dataLabel">Total Sale Amount</div>
                      <div class="pool-about-dataValue">
                        ${fixDecimals(projectDetails.saleInUsd, 2)}
                      </div>
                    </li>
                    <li class="pool-about-dataListItem">
                      <div class="pool-about-dataLabel">
                        Available for Purchase
                      </div>
                      <div
                        title="250,000,000,000,000.00 RHINO"
                        class="pool-about-dataValue"
                      >
                        {fixDecimals(projectDetails.totalRewardTokens, 2)}{" "}
                        {projectDetails.symbol}
                      </div>
                    </li>
                    <li class="pool-about-dataListItem">
                      <div class="pool-about-dataLabel">Initial Market Cap</div>
                      <div title="$78,000" class="pool-about-dataValue">
                        ${fixDecimals(projectDetails.marketCap, 2)}
                      </div>
                    </li>
                    <li class="pool-about-dataListItem">
                      <div class="pool-about-dataLabel">KYC Required</div>
                      <div title="No" class="pool-about-dataValue">
                        {projectDetails.kyc}
                      </div>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 class="pool-about-cell-heading">Token Information</h4>
                  <ul class="pool-about-dataList">
                    <li class="pool-about-dataListItem">
                      <div class="pool-about-dataLabel">Name</div>
                      <div class="pool-about-dataValue">
                        {projectDetails.name}
                      </div>
                    </li>
                    <li class="pool-about-dataListItem">
                      <div class="pool-about-dataLabel">Symbol</div>
                      <div class="pool-about-dataValue">
                        {projectDetails.symbol}
                      </div>
                    </li>
                    <li class="pool-about-dataListItem">
                      <div class="pool-about-dataLabel">Address</div>
                      <div class="pool-about-dataValue">
                        {projectDetails.address}
                        <button onClick={() => { navigator.clipboard.writeText(projectDetails.address) }} className='address-copy-btn'><FaRegCopy /></button>
                      </div>
                    </li>
                    <li class="pool-about-dataListItem">
                      <div class="pool-about-dataLabel">Blockchain</div>
                      <div class="pool-about-dataValue">
                        Binance Smart Chain
                      </div>
                    </li>
                    <li class="pool-about-dataListItem">
                      <div class="pool-about-dataLabel">Initial Supply</div>
                      <div class="pool-about-dataValue">
                        {fixDecimals(projectDetails.initialSupply, 2)}
                      </div>
                    </li>
                    <li class="pool-about-dataListItem">
                      <div class="pool-about-dataLabel">Total Supply</div>
                      <div class="pool-about-dataValue">
                        {fixDecimals(projectDetails.totalSupply, 2)}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col lg={4} md={12} sm={12} className=''>
          <div className="details-second-right-div">
            <div className="sale-card">
              <h2>
                {projectDetails.isFinished
                  ? "Sale Ended"
                  : distance
                    ? "Sale Countdown"
                    : "Sale Live NOW"}
              </h2>
              {!distance ? (
                <div>
                  <h1 className="when-zero">
                    <div class="launch-icon">
                      <img src={projectDetails.smallImage} alt="launch" />
                    </div>
                    {((projectDetails.soldAmount /
                      projectDetails.totalRewardTokens) *
                      100).toFixed(0)}
                    % {projectDetails.symbol} Sold
                    <div className="count-progress-bar">
                      {/* <div className="count-progress-bar-filter"></div> */}
                    <div>{progressInstance}</div>
                    </div>
                  </h1>




                  <div class="percentage-remaining-bnb-main mt-2">
                    <div class="percentage-remaining-bnb-left">
                      {fixDecimals(
                        (projectDetails.soldAmount * 100) /
                        projectDetails.totalRewardTokens,
                        2
                      )}
                      %
                    </div>
                    <div class="percentage-remaining-bnb-right">
                      {`${fixDecimals(projectDetails.soldAmountInBnb, 2)} / 
                      ${fixDecimals(projectDetails.totalTokensInBnb, 2)} BNB`}
                    </div>
                  </div>







                </div>
              ) : (
                <div className="countdown-progress">
                  <section className="countdown-day">
                    <div className="countdown-item">
                      <h3>{timerDays}</h3>
                      <p>Days</p>
                    </div>
                    <div className="countdown-item">
                      <h3>{timerHours}</h3>
                      <p>Hours</p>
                    </div>
                    <div className="countdown-item">
                      <h3>{timerMinutes}</h3>
                      <p>Minutes</p>
                    </div>
                    <div className="countdown-item">
                      <h3>{timerSeconds}</h3>
                      <p>Seconds</p>
                    </div>
                  </section>
                </div>
              )}
              <section>
                <div className="info-row mt-3">
                  <p>
                    {projectDetails.symbol} <br /> Price:
                  </p>
                  <p>
                    {Number(projectDetails.tokenRate).toLocaleString(
                      "fullwide",
                      { useGrouping: false, maximumFractionDigits: 20 }
                    )}{" "}
                    <br /> BNB
                  </p>
                </div>
                <div className="info-row mt-3">
                  <p>
                    {projectDetails.symbol} <br /> Sold:
                  </p>
                  <p>
                    {projectDetails.soldAmount} {projectDetails.symbol}
                  </p>
                </div>
                <div className="info-row mt-3">
                  <p>Total Raise</p>
                  <p>
                    {Number(projectDetails.totalTokensInBnb).toFixed(0)} BNB
                  </p>
                </div>
              </section>
              <section className="btn-container">
                {connected ? (
                  <div>
                    <div className="info-row mt-3">
                      <p>My Allocation</p>
                      <p>{projectDetails.myAllocation} BNB</p>
                    </div>
                    <div className="info-row mt-3">
                      <p>Max BNB Swap</p>
                      <p>{projectDetails.maxSwap} BNB</p>
                    </div>

                    <p>My Allocation</p>
                    <div class="launch-icon">
                      <img src={projectDetails.smallImage} alt="" />
                      <p>{projectDetails.myAllocation} BNB</p>
                    </div>
                  </div>
                ) : (
                  <button onClick={() => dispatch(connectWallet())}>
                    Connect Wallet
                  </button>
                )}
              </section>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default CardDetails;
