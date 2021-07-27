import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import poolImg from "../../images/bg.9f4bcc65.png";
import img1 from "../../images/smallSafe.jpg";
import img2 from "../../images/smallElon.png";
import StackingCard from "../StackingCard/StackingCard";
import { useSelector } from "react-redux";
import { approveTokens } from "../../store/reducer/web3_reducer";
import { collectReward } from "../../store/reducer/staking_reducer";
import memepad from "../../store/reducer/web3_reducer/memepad.json";
import "./Staking.css";

function Staking() {
  const [switchBtnToggle, setSwitchBtnToggle] = useState(true);
  const { connected, enabled } = useSelector((state) => state.web3);
  const { pendingReward, stakedAmount, rewardPerYear, totalStakingTokens } = useSelector((state) => state.staking);

  return (
    <div className="staking-wrapper">
      <div className="project-banner-container">
        <div className="banner-container-content">
          <div>
            <h2>MemePad Staking Pools</h2>
            <p>Get rewarded by staking LP or $MEPAD tokens.</p>
          </div>
          <div className="banner-img">
            <img src={poolImg} alt="" />
          </div>
        </div>
      </div>

      <div className="staking-cards-container">
        <Container fluid>
          <Row>
            <Col>
              <div className="switch-btn">
                <nav>
                  <ul>
                    <li>
                      <button
                        onClick={() => setSwitchBtnToggle(!switchBtnToggle)}
                        className={`${
                          switchBtnToggle
                            ? "switch-btn-toggle"
                            : "switch-btn-toggle-disable"
                        }`}
                      >
                        <span>Live</span>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setSwitchBtnToggle(!switchBtnToggle)}
                        className={`${
                          switchBtnToggle
                            ? "switch-btn-toggle-disable"
                            : "switch-btn-toggle"
                        }`}
                      >
                        <span>Completed</span>
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </Col>
          </Row>
        </Container>
        <Container fluid>
          {/*Live */}

          {switchBtnToggle && (
            <Row className="p-4">
              <Col lg={4} md={6}>
                <StackingCard
                  title="MemePad Staking"
                  subTitle="Stake MEPAD, Earn MEPAD"
                  symbol="MEPAD"
                  contractAddress={memepad.stakingAddress}
                  connected={!connected}
                  enabled={enabled}
                  pendingReward={pendingReward}
                  stakedAmount={stakedAmount}
                  totalStakingTokens={totalStakingTokens}
                  rewardPerYear={rewardPerYear}
                  approveTokens={approveTokens}
                  collectReward={collectReward}
                />
              </Col>
              <Col lg={4} md={6}></Col>
              <Col lg={4} md={6}></Col>
            </Row>
          )}

          {/* Completed */}

          {!switchBtnToggle && (
            <Row className="p-4">
              <Col lg={4} md={6}>
                <StackingCard
                  title="SafeDot Pool"
                  subTitle="Stake MEPAD, Earn sDOT"
                  banner="completed"
                  disabled={true}
                />
              </Col>
              <Col lg={4} md={6}>
                <StackingCard
                  title="ElonDoge Pool"
                  subTitle="Stake MEPAD, Earn EDOGE"
                  banner="completed"
                  image={img1}
                  disabled={true}
                />
              </Col>
              <Col lg={4} md={6}>
                <StackingCard
                  title="MemePad Old Pool"
                  subTitle="Old Staking Pool"
                  banner="completed"
                  image={img2}
                  disabled={true}
                />
              </Col>
            </Row>
          )}
        </Container>
      </div>
    </div>
  );
}

export default Staking;
