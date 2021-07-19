import React, { useEffect, useState } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import stackingImg1 from "../../images/staking-card-1.jpg";
import "./StackingCard.css";
import * as RiIcons from "react-icons/ri";
import * as FiIcons from "react-icons/fa";
import { useDispatch } from "react-redux";
import { IoIosRefresh } from "react-icons/io";
import { initWeb3 } from "../../store/reducer/web3_reducer";

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
  }, [props]);

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
                  {Math.round(pendingReward * 1000) / 1000}
                  <button onClick={() => {
                      dispatch(props.collectReward());
                  }}>Collect</button>
              </div>
              {/* Cannot calculate price of a token on testnet because pancakeswap only recognizes tokens on mainnet */}
              <div>~NaN USD</div>
            </div>
          </div>
        ) : (
          <div className="staking-card-third-div">
            <div className="staking-text-3">
              <div>Start earning</div>
            </div>
          </div>
        )}
        {enabled ? (
          <div className="staking-card-third-div">
          <div className="staking-text-3">
            <div>{props.symbol} Staked</div>
            <div>
                {Math.round(stakedAmount * 1000) / 1000}
                <button onClick={() => {
                    dispatch(props.collectReward());
                }}>+</button>
                <button onClick={() => {
                    dispatch(props.collectReward());
                }}>-</button>
            </div>
            {/* Cannot calculate price of a token on testnet because pancakeswap only recognizes tokens on mainnet */}
            <div>~NaN USD</div>
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
                <div>{Math.round(totalStakingTokens*1000)/1000}</div>
              </div>
            </div>

            <div className="staking-card-seventh-div">
              <div className="staking-text-5">
                <div>
                  <a
                    href={props.contractAddress}
                    target="_blank"
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
