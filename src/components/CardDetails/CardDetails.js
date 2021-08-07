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
import {
  IoIosArrowRoundBack,
  IoIosArrowRoundDown,
  IoMdClose,
} from "react-icons/io";
import ProgressBar from "react-bootstrap/ProgressBar";
import successImg from "../../images/outlined_tick_done_icon.svg";
import bnbImage from "../../images/bscAvatar.4144c399.png";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import { TiTick } from "react-icons/ti";
import { useSnackbar } from "notistack";
import { redeemTokens, swapTokens } from "../../store/reducer/launch_reducer";

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
  const projectDetails = useSelector(
    (state) => state.launch[props.match.params.projId]
  );
  const { connected, balance } = useSelector((state) => state.web3);
  const dispatch = useDispatch();
  const [timerDays, setTimerDays] = useState("00");
  const [timerHours, setTimerHours] = useState("00");
  const [timerMinutes, setTimerMinutes] = useState("00");
  const [timerSeconds, setTimerSeconds] = useState("00");
  const [distance, setDistance] = useState(0);
  const [copy, setCopy] = useState(false);
  const [showSwapInterface, setShowSwapInterface] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [fromValue, setFromValue] = useState("0");


  const copyAddress = () => {
    navigator.clipboard.writeText(projectDetails.address);
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 3000);
  };

  const snackbarAction = (key) => (
    <React.Fragment>
      <div
        aria-label="close"
        color="inherit"
        onClick={() => closeSnackbar(key)}
        className="notification-btn"
      >
        <IoMdClose />
      </div>
    </React.Fragment>
  );

  let intervalRef = useRef();
  const startTimer = () => {
    if (projectDetails.startTime * 1000 < Date.now()) {
      setDistance(0);
      return;
    }
    intervalRef.current = setInterval(() => {
      const distance = projectDetails.startTime * 1000 - Date.now();
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance <= 0) {
        clearInterval(intervalRef.current);
        setDistance(0);
      } else {
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
        setDistance(distance);
      }
    }, 1000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  const showFinalSnackbar = (successMessage, errorMessage, payload) => {
    if (payload["error"] == null) {
      enqueueSnackbar(
        <div className="MuiSnackbarContent-message">
          <div className="MuiSnackbarContent-message-1"></div>
          <div className="MuiSnackbarContent-message-2">
            <div>Transaction Completed!</div>
            <div>{successMessage}</div>
          </div>
        </div>,
        { variant: "success", action: snackbarAction }
      );
    } else {
      enqueueSnackbar(
        <div className="MuiSnackbarContent-message">
          <div className="MuiSnackbarContent-message-1"></div>
          <div className="MuiSnackbarContent-message-2">
            <div>Transaction Failed!</div>
            <div>{errorMessage}</div>
            <div></div>
          </div>
        </div>,
        { variant: "error", action: snackbarAction }
      );
    }
  };
  const showPendingSnackbar = (message) => {
    enqueueSnackbar(
      <div className="MuiSnackbarContent-message">
        <div className="MuiSnackbarContent-message-1"></div>
        <div className="MuiSnackbarContent-message-2">
          <div>Transaction Pending</div>
        </div>
      </div>,
      { variant: "info", action: snackbarAction }
    );
  };

  const fixDecimals = (val, dec) => {
    if (!val) return 0;
    const decimals = String(val).split(".")[1];
    if (decimals && decimals.length > dec) return Number(val.toFixed(dec));
    return Number(val);
  };

  const now =
    (projectDetails.soldAmount / projectDetails.totalRewardTokens) * 100;
  const progressInstance = <ProgressBar now={now} label={`${now}%`} srOnly />;

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
        <Col lg={8} md={12} sm={12} className="">
          <div className="details-second-left-div">
            <img src={projectDetails.image} alt="" />
            <div className="pool-about-content">
              <h3 class="pool-about-heading">Project Overview</h3>
              <div class="pool-about-text">{projectDetails.description}</div>
              <div class="pool-about-separator"></div>
              <h3 class="pool-about-heading">Pool Detail</h3>
              <div class="pool-about-sale">
                <span class="pool-about-dot"></span>
                {projectDetails.isFinished
                  ? "Sale Finished"
                  : distance <= 0
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
                      <div class="pool-about-dataValue">
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
                      <div
                        title={projectDetails.address}
                        class="pool-about-dataValue"
                      >
                        {projectDetails.address}
                        <button
                          title="Copy Address to Clipboard"
                          onClick={copy ? null : copyAddress}
                          className="address-copy-btn"
                        >
                          <FaRegCopy />
                          {copy ? "Copied" : ""}
                        </button>
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

        <Col lg={4} md={12} sm={12} className="">
          <div className="details-second-right-div">
            <div className="sale-card">
              {!showSwapInterface && (
                <>
                  <h2>
                    {projectDetails.isFinished
                      ? "Sale Ended"
                      : distance > 0
                      ? "Sale Countdown"
                      : "Sale Live NOW"}
                  </h2>
                  {!distance ? (
                    <div>
                      <h1 className="when-zero">
                        <div class="launch-icon">
                          <img src={projectDetails.smallImage} alt="launch" />
                        </div>
                        {fixDecimals(
                          (projectDetails.soldAmount /
                            projectDetails.totalRewardTokens) *
                            100,
                          0
                        )}
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
                            0
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
                        <div className="info-row info-row-color mt-3">
                          <p>My Allocation</p>
                          <p>{projectDetails.myAllocation} BNB</p>
                        </div>
                        <div className="info-row info-row-color mt-3">
                          <p>Max BNB Swap</p>
                          <p>
                            {(
                              projectDetails.maxSwap * projectDetails.tokenRate
                            ).toLocaleString("fullwide", {
                              useGrouping: false,
                              maximumFractionDigits: 20,
                            })}{" "}
                            BNB
                          </p>
                        </div>
                        <button onClick={() => setShowSwapInterface(true)}>
                          {`PURCHASE ${projectDetails.symbol.toUpperCase()}`}
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => dispatch(connectWallet())}>
                        Connect Wallet
                      </button>
                    )}
                  </section>
                </>
              )}

              {showSwapInterface && (
                <div className="details-second-right-div-not-using">
                  <div className="swap-card">
                    <section>
                      <div className="swap-interface-first-div">
                        <div onClick={() => setShowSwapInterface(false)}>
                          <IoIosArrowRoundBack />
                        </div>
                        <div>Swap Coins</div>
                      </div>
                      <div className="swap-interface-second-div">
                        <span>
                          Max. Allocation is {projectDetails.maxSwap}{" "}
                          {projectDetails.symbol}
                        </span>
                      </div>
                    </section>

                    <section>
                      <div className="swap-interface-third-div mt-3">
                        <div className="from-available">
                          <div>From</div>
                          <div>Avaialble: {fixDecimals(balance, 4)}</div>
                        </div>
                        <div className="num-max-icon">
                          <div className="swap-from-num">
                            <input
                              type="number"
                              value={fromValue}
                              onChange={(e) => {
                                let val = e.target.value;
                                const max = Math.min(
                                  projectDetails.maxSwap * projectDetails.tokenRate -
                                    projectDetails.myAllocation,
                                  balance
                                );
                                if (Number(val) > max)
                                  val = max.toLocaleString("fullwide", {
                                    useGrouping: false,
                                    maximumFractionDigits: 20,
                                  });
                                else if (Number(val) < 0) val = 0;
                                setFromValue(String(val));
                              }}
                            />
                          </div>
                          <div className="max-btn-bnb-icon">
                            <button
                              onClick={() => {
                                const max = Math.min(
                                  projectDetails.maxSwap * projectDetails.tokenRate -
                                    projectDetails.myAllocation,
                                  balance
                                );
                                setFromValue(
                                  max.toLocaleString("fullwide", {
                                    useGrouping: false,
                                    maximumFractionDigits: 20,
                                  })
                                );
                              }}
                            >
                              MAX
                            </button>
                            <div>
                              <span className="ml-2 swap-interface-small-icon">
                                <img
                                  src={bnbImage}
                                  alt="bnb"
                                  width="20"
                                  height="20"
                                />
                              </span>
                              <span className="swap-after-img-txt">BNB</span>
                            </div>
                          </div>
                        </div>
                        <div></div>
                      </div>
                    </section>
                    <div className="down-arrow">
                      <IoIosArrowRoundDown />
                    </div>
                    <section>
                      <div className="swap-interface-third-div">
                        <div className="from-available">
                          <div>Purchase</div>
                          <div>
                            Remaining:{" "}
                            {fixDecimals(
                              projectDetails.totalRewardTokens -
                                projectDetails.soldAmount,
                              2
                            )}
                          </div>
                        </div>
                        <div className="num-max-icon">
                          <div className="swap-purchase-num-last">
                            <input
                              type="number"
                              value={(
                                (1 / projectDetails.tokenRate) *
                                Number(fromValue)
                              ).toLocaleString("fullwide", {
                                useGrouping: false,
                                maximumFractionDigits: 3,
                              })}
                              disabled
                            />
                          </div>
                          <div>
                            <div>
                              <span className="swap-interface-small-icon">
                                <img
                                  src={projectDetails.smallImage}
                                  alt="bnb"
                                  width="20"
                                  height="20"
                                />
                              </span>
                              <span className="swap-after-img-txt">
                                {projectDetails.symbol}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div></div>
                      </div>
                    </section>
                    <div className="swap-interface-price">
                      <p className="">
                        Price{" "}
                        {(1 / projectDetails.tokenRate).toLocaleString(
                          "fullwide",
                          {
                            useGrouping: false,
                            maximumFractionDigits: 2,
                          }
                        )}{" "}
                        {projectDetails.symbol} per BNB
                      </p>
                    </div>
                    <section className="swap-btn">
                      <button
                        disabled={fromValue <= 0}
                        onClick={() => {
                          // setShowNotification(true);
                          showPendingSnackbar();
                          dispatch(
                            swapTokens({
                              id: props.match.params.projId,
                              amount: fromValue,
                            })
                          ).then((val) => {
                            setFromValue("0");
                            showFinalSnackbar(
                              "Tokens swapped successfully!",
                              "Failed to swap tokens!",
                              val
                            );
                          });
                        }}
                      >
                        Swap
                      </button>
                    </section>
                  </div>
                </div>
              )}
              {connected && (
                <>
                  <p className="info-row-allocation">My Allocations</p>
                  <div className="launch-icon">
                    <div className="launch-icon-first-div">
                      <img
                        src={projectDetails.smallImage}
                        alt={projectDetails.smallImage}
                      />
                      <span>{projectDetails.myAllocation} BNB</span>
                    </div>
                    <div className="launch-icon-last-btn">
                      {
                        <button
                          disabled={projectDetails.redeemed}
                          onClick={() => {
                            showPendingSnackbar();
                            dispatch(
                              redeemTokens({ id: props.match.params.projId })
                            ).then((val) =>
                              showFinalSnackbar(
                                "Tokens redeemed successfully!",
                                "Failed to redeem tokens!",
                                val
                              )
                            );
                          }}
                        >
                          {projectDetails.redeemed ? (
                            <div>
                              Claimed <br /> {projectDetails.symbol}
                            </div>
                          ) : (
                            <div>
                              Redeem <br /> Now
                            </div>
                          )}
                        </button>
                      }
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </Col>
      </Row>
      {/* <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={showNotification}
        autoHideDuration={3000}
        onClose={handleClose}
        message={
          <div className="MuiSnackbarContent-message">
            <div className="MuiSnackbarContent-message-1">
              <div className="MuiSnackbarContent-message-1-icon">
                <TiTick />
              </div>
            </div>
            <div className="MuiSnackbarContent-message-2">
              <div>Swap Successed!</div>
              <div>You swapped</div>
              <div>{0.00907982111376496} successfully</div>
            </div>
          </div>
        }
        key={horizontal + vertical}
        action={
          <React.Fragment>
            <div
              aria-label="close"
              color="inherit"
              onClick={handleClose}
              className="notification-btn"
            >
              <IoMdClose />
            </div>
          </React.Fragment>
        }
      /> */}
    </Container>
  );
}

export default CardDetails;
