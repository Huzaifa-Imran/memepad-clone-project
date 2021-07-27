import React, { useEffect, useState } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import Form from 'react-bootstrap/Form'
import stackingImg1 from "../../images/staking-card-1.jpg";
import "./StackingCard.css";
import * as RiIcons from "react-icons/ri";
import * as FiIcons from "react-icons/fa";
import { useDispatch } from "react-redux";
import { IoIosRefresh } from "react-icons/io";
import { initWeb3 } from "../../store/reducer/web3_reducer";

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(6, 8, 2),
  },
}));

function StackingCard(props) {
  const [showTotalStacked, setShowTotalStacked] = useState(false);
  const [banner, setBanner] = useState(null);
  const [title, setTitle] = useState(null);
  const [subtitle, setSubtitle] = useState(null);
  const [image, setImage] = useState(null);
  const [enabled, setEnabled] = useState(false);
  const [connected, setConnected] = useState(false);
  const [pendingReward, setPendingReward] = useState(0);
  const [totalStakingTokens, setTotalStakingTokens] = useState(0);
  const [rewardPerYear, setRewardPerYear] = useState(0);
  const [stakedAmount, setStakedAmount] = useState(0)
  const dispatch = useDispatch();

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [showCollectModal, setShowCollectModal] = useState(false);
  const [showUnstakeModal, setShowUnstakeModal] = useState(false);
  const [UnstakeOpen, setUnstakeOpen] = React.useState(false);
  const [showStakeModal, setShowStakeModal] = useState(false);
  const [StakeOpen, setStakeOpen] = React.useState(false);
  const [rangeValue, setRangeValue] = useState(0.0);
  // const [value, setValue] = React.useState(30);

  const handleChange = (event, newValue) => {
    setRangeValue(newValue);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenUnstake = () => {
    setUnstakeOpen(true);
  };

  const handleCloseUnstake = () => {
    setUnstakeOpen(false);
  };

  const handleOpenStake = () => {
    setStakeOpen(true);
  };

  const handleCloseStake = () => {
    setStakeOpen(false);
  };

  useEffect(() => {
    // console.log(props);
    setBanner(props.banner);
    setTitle(props.title);
    setSubtitle(props.subTitle);
    setImage(props.image);
    setEnabled(props.enabled);
    setConnected(props.connected);
    setPendingReward(props.pendingReward);
    setTotalStakingTokens(props.totalStakingTokens);
    setRewardPerYear(props.rewardPerYear);
    setStakedAmount(props.stakedAmount);
  }, [props, rangeValue]);

  const APR = Math.round((rewardPerYear / totalStakingTokens) * 100);

  //   if(props.disabled)
  //     setConnected(false);

  return (
    <div className="staking-card-main">

      <div className="staking-card">
        {banner === "completed" ? (
          <div title="Finished" class="sc-bQCEYZ irmCui">
            <div title="Finished">Finished</div>
          </div>
        ) : null}
        <div className="staking-card-first-div">
          <div className="staking-text-1">
            <div>{title}</div>
            <div>{subtitle}</div>
          </div>
          <div className="staking-img-1">
            <img src={image ? image : stackingImg1} alt="" />
            <div className="staking-img-small-icon">
              <img src={stackingImg1} alt="" width="15" height="15" />
            </div>
          </div>
        </div>
        <div className="staking-card-second-div">
          <div className="staking-text-2">
            <div>APY:</div>
            <div>
              {connected ? APR : ""}
              {connected ? "%" : ""}
            </div>
          </div>
        </div>




        {connected ? (
          <div className="staking-card-third-div">
            <div className="staking-text-3">
              <div>{props.symbol} Earned</div>
              <div>
                <div className='staking-num-and-btns-top'>
                  <div>
                    {/* <div>{Math.round(pendingReward * 1000) / 1000}</div> */}
                    <div>349,836.053</div>
                    <div>~27.693.56 USD</div>
                  </div>
                  <div>
                    <button onClick={() => {
                      dispatch(props.collectReward());
                      setShowCollectModal(true);
                      handleOpen();
                    }}
                    >Collect</button>
                  </div>
                </div>
              </div>
              {/* Cannot calculate price of a token on testnet because pancakeswap only recognizes tokens on mainnet */}
              {/* <div>~NaN USD</div> */}
            </div>
          </div>
        ) : (
          <div className="staking-card-third-div">
            <div className="staking-text-3">
              <div>Start earning</div>
            </div>
          </div>
        )}













        {!enabled ? (
          <div className="staking-card-third-div">
            <div className="staking-text-3">
              <div>{props.symbol} Staked</div>
              <div className='staking-num-and-btns'>
                <div>
                  {/* <div>{Math.round(stakedAmount * 1000) / 1000}</div> */}
                  <div>349,836.053</div>
                  <div>~27.693.56 USD</div>
                </div>
                <div>
                  <button className='staking-minus-btn' onClick={() => {
                    dispatch(props.collectReward());
                    setShowUnstakeModal(true);
                    handleOpenUnstake();
                  }}
                  >-</button>
                  <button className='staking-plus-btn' onClick={() => { 
                    dispatch(props.collectReward());
                    setShowStakeModal(true);
                    handleOpenStake();
                    }}>
                    +</button>
                </div>
              </div>
              {/* Cannot calculate price of a token on testnet because pancakeswap only recognizes tokens on mainnet */}
              {/* <div>~NaN USD</div> */}
            </div>
          </div>
        ) : (
          <div className="staking-card-fourth-div">
            <div className="staking-btn">
              <button disabled={props.disabled}
                onClick={
                  connected
                    ? () => {
                      dispatch(props.approveTokens());
                    }
                    : () => {
                      dispatch(initWeb3());
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
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open}>
                <div className=''>
                  <div className="sc-jRQAMF sc-jUotMc ffYIDR OndnD">
                    <div className="sc-hOGjNT jSaCuW">
                      <div className="sc-jRQAMF sc-gKckTs sc-dtMiey iODQYo kNJaHk fdgtVi">
                        <h2 className="sc-gsDJrp sc-iwjezw dPBltW dRvZwz">
                          {props.symbol} Harvest
                        </h2>
                      </div>
                      <button
                        className="sc-hKwCoD ilhSnp sc-eCImvq htanym"
                        aria-label="Close the dialog"
                        scale="md"
                        onClick={() => {
                          handleClose();
                        }}
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
                          <div className="">1,389.436 {props.symbol}</div>
                          <div>~109.99 USD</div>
                        </div>
                      </div>
                      <div className="collect-modal-content-div-2">
                        <button>Confirm</button>
                      </div>
                      <div className="collect-modal-content-div-3">
                        <button onClick={() => {
                          handleClose();
                        }}>Close Window</button>
                      </div>
                    </div>
                  </div>
                </div>

              </Fade>
            </Modal>
          </div>
        )}

        {showUnstakeModal && (
          <div className="unstake-btn-modal">
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={UnstakeOpen}
              onClose={handleCloseUnstake}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={UnstakeOpen}>
                <div className=''>
                  <div className="unstake-OndnD">
                    <div className=" jSaCuW">
                      <div className="kNJaHk fdgtVi">
                        <h2 className="dRvZwz">
                          Unstake
                        </h2>
                      </div>
                      <button
                        className="ilhSnp  htanym"
                        aria-label="Close the dialog"
                        scale="md"
                        onClick={() => {
                          handleCloseUnstake();
                        }}
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
                        <div className="umc1">Unstake:</div>
                        <div className="umc2">
                          <img src={stackingImg1} alt="" />
                          {props.symbol}
                        </div>
                      </div>
                      <div className="unstake-modal-content-div-2">
                        <div className="umc3">{rangeValue}</div>
                        <div className="umc4">~27670.00 USD</div>
                      </div>
                      <div className="unstake-modal-content-div-3">
                        <div className="umc5">
                          Balance: 349836.0533
                        </div>
                      </div>
                      <div className="unstake-modal-content-div-4">
                        <div className="umc6">
                          <div>{rangeValue}</div>
                          <Slider
                            value={rangeValue}
                            onChange={handleChange}
                            aria-labelledby="continuous-slider"
                            min={0.0}
                            max={349836.0533}
                          />
                        </div>
                      </div>
                      <div className="unstake-modal-content-div-5">
                        <button onClick={() => setRangeValue(0.25 * 349836.0533)}>25%</button>
                        <button onClick={() => setRangeValue(0.50 * 349836.0533)}>50%</button>
                        <button onClick={() => setRangeValue(0.75 * 349836.0533)}>75%</button>
                        <button onClick={() => setRangeValue(349836.0533)}>MAX</button>
                      </div>
                      <div className="unstake-modal-content-div-6">
                        <button disabled={rangeValue === 0 ? true : false} >Confirm</button>
                      </div>
                    </div>
                  </div>
                </div>

              </Fade>
            </Modal>
          </div>
        )}

        {showStakeModal && (
          <div className="unstake-btn-modal">
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={StakeOpen}
              onClose={handleCloseStake}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={StakeOpen}>
                <div className=''>
                  <div className="unstake-OndnD">
                    <div className=" jSaCuW">
                      <div className="kNJaHk fdgtVi">
                        <h2 className="dRvZwz">
                          Stake in Pool
                        </h2>
                      </div>
                      <button
                        className="ilhSnp  htanym"
                        aria-label="Close the dialog"
                        scale="md"
                        onClick={() => {
                          handleCloseStake();
                        }}
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
                        <div className="umc1">Stake:</div>
                        <div className="umc2">
                          <img src={stackingImg1} alt="" />
                          {props.symbol}
                        </div>
                      </div>
                      <div className="unstake-modal-content-div-2">
                        <div className="umc3">{rangeValue}</div>
                        <div className="umc4">~27670.00 USD</div>
                      </div>
                      <div className="unstake-modal-content-div-3">
                        <div className="umc5">
                          Balance: 349836.0533
                        </div>
                      </div>
                      <div className="unstake-modal-content-div-4">
                        <div className="umc6">
                          <div>{rangeValue}</div>
                          <Slider
                            value={rangeValue}
                            onChange={handleChange}
                            aria-labelledby="continuous-slider"
                            min={0.0}
                            max={349836.0533}
                          />
                        </div>
                      </div>
                      <div className="unstake-modal-content-div-5">
                        <button onClick={() => setRangeValue(0.25 * 349836.0533)}>25%</button>
                        <button onClick={() => setRangeValue(0.50 * 349836.0533)}>50%</button>
                        <button onClick={() => setRangeValue(0.75 * 349836.0533)}>75%</button>
                        <button onClick={() => setRangeValue(349836.0533)}>MAX</button>
                      </div>
                      <div className="unstake-modal-content-div-6">
                        <button disabled={rangeValue === 0 ? true : false} >Confirm</button>
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
                <div>{Math.round(totalStakingTokens * 1000) / 1000}</div>
              </div>
            </div>

            <div className="staking-card-seventh-div">
              <div className="staking-text-5">
                <div>
                  <a
                    href={props.contractAddress}
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
