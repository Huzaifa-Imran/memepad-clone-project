import React, { useEffect, useRef, useState } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import Form from "react-bootstrap/Form";
import "./StackingCard.css";
import smallMepad from "../../images/staking-card-1.jpg";
import * as RiIcons from "react-icons/ri";
import * as FiIcons from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { IoIosRefresh } from "react-icons/io";
import { connectWallet, initWeb3 } from "../../store/reducer/web3_reducer";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Slider from "@material-ui/core/Slider";
import CountUp from "react-countup";
import {
  approveMepadTokens,
  stakeMepad,
  withdrawAndCollectReward,
} from "../../store/reducer/staking_reducer";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(6, 8, 2),
  },
}));

function StackingCard(props) {
  const [previousReward, setPreviousReward] = useState(0);
  const stakeDetails = useSelector((state) => state.staking[props.stakeId], (left, right) => {
    if(left.pendingReward != right.pendingReward)
      setPreviousReward(right.pendingReward);
    return false;
  });
  const { connected } = useSelector((state) => state.web3);
  const { mepadTokens } = useSelector((state) => state.staking);
  const [showTotalStacked, setShowTotalStacked] = useState(false);
  const dispatch = useDispatch();

  const classes = useStyles();
  const [showCollectModal, setShowCollectModal] = useState(false);
  const [showStakingModal, setShowStakingModal] = useState(null);
  const [rangeValue, setRangeValue] = useState(0.0);

  const handleChange = (event, newValue) => {
    setRangeValue(newValue);
  };

  const handleCloseCollect = () => {
    setShowCollectModal(false);
  };

  const handleCloseStaking = () => {
    setShowStakingModal(null);
  };

  const fixDecimals = (val, dec) => {
    if (!val) return 0;
    const decimals = String(val).split(".")[1];
    if (decimals && decimals.length > dec) return Number(val.toFixed(dec));
    return val;
  };

  const APR = fixDecimals(
    (stakeDetails.rewardPerYear / stakeDetails.totalStakingTokens) * 100,
    2
  );

  const modalValues =
    showStakingModal === "Stake" ? mepadTokens : stakeDetails.stakedAmount;

  //   if(props.disabled)
  //     setConnected(false);

  return (
    <div className="staking-card-main">
      <div className="staking-card">
        {props.disabled && (
          <div class="sc-bQCEYZ irmCui">
            <div>Finished</div>
          </div>
        )}
        <div className="staking-card-first-div">
          <div className="staking-text-1">
            <div>{stakeDetails.title}</div>
            <div>{stakeDetails.subTitle}</div>
          </div>
          <div className="staking-img-1">
            <img src={stakeDetails.image} alt="" />
            <div className="staking-img-small-icon">
              <img src={smallMepad} alt="" width="15" height="15" />
            </div>
          </div>
        </div>
        <div className="staking-card-second-div">
          <div className="staking-text-2">
            <div>APY:</div>

            <div
              className={`staking-text-4-last-child ${
                APR === 0 && "staking-text-2-last-child-non-valued"
              }`}
            >
              {/* {!props.disabled && APR > 0 && `${APR}%`} */}
              <span className={`${APR === 0 && "d-none"}`}>
                <CountUp duration={1} end={APR} />%
              </span>
            </div>
          </div>
        </div>

        {connected ? (
          <div className="staking-card-third-div">
            <div className="staking-text-3">
              <div>{stakeDetails.symbol} Earned</div>
              <div>
                <div className="staking-num-and-btns-top">
                  <div>
                    <div>
                      <CountUp
                        duration={1}
                        start={previousReward}
                        end={fixDecimals(stakeDetails.pendingReward, 3)}
                      />
                    </div>
                    <div>~27.693.56 USD</div>
                  </div>
                  <div className="staking-collect-btn">
                    <button
                      // disabled={
                      //   fixDecimals(stakeDetails.pendingReward, 0) === 0
                      // }

                      disabled={stakeDetails.pendingReward === 0}
                      onClick={() => {
                        setShowCollectModal(true);
                      }}
                    >
                      Collect
                    </button>
                  </div>
                </div>
              </div>
              {/* Cannot calculate price of a token on testnet because pancakeswap only recognizes tokens on mainnet */}
            </div>
          </div>
        ) : (
          <div className="staking-card-third-div">
            <div className="staking-text-3">
              <div>Start earning</div>
            </div>
          </div>
        )}

        {stakeDetails.enabled ? (
          <div className="staking-card-third-div">
            <div className="staking-text-3">
              <div>{stakeDetails.symbol} Staked</div>
              <div className="staking-num-and-btns">
                <div>
                  <div>
                    <CountUp
                      duration={1}
                      end={fixDecimals(stakeDetails.stakedAmount, 3)}
                    />
                  </div>
                  <div>~27.693.56 USD</div>
                </div>
                <div>
                  <button
                    className="staking-minus-btn"
                    onClick={() => {
                      setRangeValue(0.0);
                      setShowStakingModal("Unstake");
                    }}
                  >
                    -
                  </button>
                  <button
                    className="staking-plus-btn"
                    onClick={() => {
                      setRangeValue(0.0);
                      setShowStakingModal("Stake");
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="staking-card-fourth-div">
            <div className="staking-btn">
              <button
                disabled={props.disabled}
                onClick={
                  connected
                    ? () => {
                        dispatch(approveMepadTokens(props.stakeId));
                      }
                    : () => {
                        dispatch(connectWallet());
                      }
                }
              >
                {connected ? "Enable" : "Unlock Wallet"}
              </button>
            </div>
          </div>
        )}

        {showCollectModal && (
          <div className="collect-btn-modal">
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={showCollectModal}
              onClose={handleCloseCollect}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={showCollectModal}>
                <div className="">
                  <div className="sc-jRQAMF sc-jUotMc ffYIDR OndnD">
                    <div className="sc-hOGjNT jSaCuW">
                      <div className="sc-jRQAMF sc-gKckTs sc-dtMiey iODQYo kNJaHk fdgtVi">
                        <h2 className="sc-gsDJrp sc-iwjezw dPBltW dRvZwz">
                          {stakeDetails.symbol} Harvest
                        </h2>
                      </div>
                      <button
                        className="sc-hKwCoD ilhSnp sc-eCImvq htanym"
                        aria-label="Close the dialog"
                        scale="md"
                        onClick={handleCloseCollect}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          color="primary"
                          width="20px"
                          xmlns="http://www.w3.org/2000/svg"
                          className="sc-bdvvaa dqTYWn"
                        >
                          <path d="M18.3 5.70997C17.91 5.31997 17.28 5.31997 16.89 5.70997L12 10.59L7.10997 5.69997C6.71997 5.30997 6.08997 5.30997 5.69997 5.69997C5.30997 6.08997 5.30997 6.71997 5.69997 7.10997L10.59 12L5.69997 16.89C5.30997 17.28 5.30997 17.91 5.69997 18.3C6.08997 18.69 6.71997 18.69 7.10997 18.3L12 13.41L16.89 18.3C17.28 18.69 17.91 18.69 18.3 18.3C18.69 17.91 18.69 17.28 18.3 16.89L13.41 12L18.3 7.10997C18.68 6.72997 18.68 6.08997 18.3 5.70997Z" />
                        </svg>
                      </button>
                    </div>
                    <div className="collect-modal-content">
                      <div className="collect-modal-content-div-1">
                        <div className="cmc-1">Harvesting:</div>
                        <div className="cmc-2">
                          <div className="">
                            {fixDecimals(stakeDetails.pendingReward, 3)}{" "}
                            {stakeDetails.symbol}
                          </div>
                          <div>~27670.00 USD</div>
                        </div>
                      </div>
                      <div className="collect-modal-content-div-2">
                        <button
                          onClick={() => {
                            dispatch(
                              withdrawAndCollectReward({
                                amount: 0,
                                id: props.stakeId,
                              })
                            );
                            handleCloseCollect();
                          }}
                        >
                          Confirm
                        </button>
                      </div>
                      <div className="collect-modal-content-div-3">
                        <button onClick={handleCloseCollect}>
                          Close Window
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Fade>
            </Modal>
          </div>
        )}

        {showStakingModal && (
          <div className="unstake-btn-modal">
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={showStakingModal !== null}
              onClose={handleCloseStaking}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={showStakingModal !== null}>
                <div className="">
                  <div className="unstake-OndnD">
                    <div className=" jSaCuW">
                      <div className="kNJaHk fdgtVi">
                        <h2 className="dRvZwz">{showStakingModal}</h2>
                      </div>
                      <button
                        className="ilhSnp  htanym"
                        aria-label="Close the dialog"
                        scale="md"
                        onClick={handleCloseStaking}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          color="primary"
                          width="20px"
                          xmlns="http://www.w3.org/2000/svg"
                          className="sc-bdvvaa dqTYWn"
                        >
                          <path d="M18.3 5.70997C17.91 5.31997 17.28 5.31997 16.89 5.70997L12 10.59L7.10997 5.69997C6.71997 5.30997 6.08997 5.30997 5.69997 5.69997C5.30997 6.08997 5.30997 6.71997 5.69997 7.10997L10.59 12L5.69997 16.89C5.30997 17.28 5.30997 17.91 5.69997 18.3C6.08997 18.69 6.71997 18.69 7.10997 18.3L12 13.41L16.89 18.3C17.28 18.69 17.91 18.69 18.3 18.3C18.69 17.91 18.69 17.28 18.3 16.89L13.41 12L18.3 7.10997C18.68 6.72997 18.68 6.08997 18.3 5.70997Z" />
                        </svg>
                      </button>
                    </div>
                    <div className="unstake-modal-content">
                      <div className="unstake-modal-content-div-1">
                        <div className="umc1">{showStakingModal}:</div>
                        <div className="umc2">
                          <img src={stakeDetails.image} alt="" />
                          {stakeDetails.symbol}
                        </div>
                      </div>
                      <div className="unstake-modal-content-div-2">
                        <div className="umc3">{rangeValue}</div>
                        <div className="umc4">~27670.00 USD</div>
                      </div>
                      <div className="unstake-modal-content-div-3">
                        <div className="umc5">Balance: {modalValues}</div>
                      </div>
                      <div className="unstake-modal-content-div-4">
                        <div className="umc6">
                          <div>{rangeValue}</div>
                          <Slider
                            value={rangeValue}
                            onChange={handleChange}
                            aria-labelledby="continuous-slider"
                            min={0.0}
                            max={modalValues}
                          />
                        </div>
                      </div>
                      <div className="unstake-modal-content-div-5">
                        <button
                          onClick={() => setRangeValue(0.25 * modalValues)}
                        >
                          25%
                        </button>
                        <button
                          onClick={() => setRangeValue(0.5 * modalValues)}
                        >
                          50%
                        </button>
                        <button
                          onClick={() => setRangeValue(0.75 * modalValues)}
                        >
                          75%
                        </button>
                        <button onClick={() => setRangeValue(modalValues)}>
                          MAX
                        </button>
                      </div>
                      <div className="unstake-modal-content-div-6">
                        <button
                          disabled={rangeValue === 0 ? true : false}
                          onClick={() => {
                            dispatch(
                              showStakingModal == "Stake"
                                ? withdrawAndCollectReward({
                                    amount: rangeValue,
                                    id: props.stakeId,
                                  })
                                : stakeMepad({
                                    amount: rangeValue,
                                    id: props.stakeId,
                                  })
                            );
                            handleCloseStaking();
                          }}
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Fade>
            </Modal>
          </div>
        )}

        <div className="staking-card-fifth-div">
          <div className="staking-btn-text">
            <button>
              {" "}
              <span>
                <IoIosRefresh />
              </span>{" "}
              Manual
            </button>
            {showTotalStacked ? (
              <button onClick={() => setShowTotalStacked(!showTotalStacked)}>
                Hide{" "}
                <span>
                  <RiIcons.RiArrowDropUpLine />
                </span>
              </button>
            ) : (
              <button onClick={() => setShowTotalStacked(!showTotalStacked)}>
                Details{" "}
                <span>
                  <RiIcons.RiArrowDropDownLine />
                </span>
              </button>
            )}
          </div>
        </div>
        {showTotalStacked && (
          <>
            <div className="staking-card-sixth-div">
              <div className="staking-text-4">
                <div>Total staked:</div>
                <div
                  className={`staking-text-4-last-child ${
                    stakeDetails.totalStakingTokens === 0 &&
                    "staking-text-4-last-child-non-valued"
                  }`}
                >
                  {!props.disabled && (
                    <>
                      {/* stakeDetails.totalStakingTokens > 0 &&
                    fixDecimals(stakeDetails.totalStakingTokens, 3) */}
                      <span
                        className={`${
                          stakeDetails.totalStakingTokens === 0 && "d-none"
                        }`}
                      >
                        <CountUp
                          duration={1}
                          end={
                            stakeDetails.totalStakingTokens > 0 &&
                            fixDecimals(stakeDetails.totalStakingTokens, 3)
                          }
                        />
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="staking-card-seventh-div">
              <div className="staking-text-5">
                <div>
                  <a
                    href={stakeDetails.stakingUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>View Contract</span>
                    <span>
                      <RiIcons.RiShareBoxLine />
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default StackingCard;
