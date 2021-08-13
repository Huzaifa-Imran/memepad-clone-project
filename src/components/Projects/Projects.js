import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import rocketImg from "../../images/bg.5c8963a7.svg";
import "./Projects.css";
import Cards from "../Cards/Cards";
import { Link } from "react-router-dom";
import UpcomingCards from "../UpcomingCards/UpcomingCards";
import { useDispatch, useSelector } from "react-redux";
import { loadLaunchInfo } from "../../store/reducer/launch_reducer";
import { projIds } from "../../store/reducer/launch_reducer/projectInitialStates";

function Projects(props) {
  const allProjects = useSelector((state) => state.launch);
  const connected = useSelector((state) => state.web3.connected);
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      if (connected) {
        for (let i = 0; i < projIds.length; ++i) {
          dispatch(loadLaunchInfo(projIds[i]));
        }
      }
    }, 10000);
    return () => {
      clearInterval(interval);
    };
  });
  const liveLaunches = [],
    completedLaunches = [],
    upcomingLaunches = [];

  projIds.forEach((val) => {
    const launchCard = (
      <Col lg={4} md={6}>
        <Link key={val} to={`/dashboard/projects/${val}`}>
          <Cards projDetails={allProjects[val]} />
        </Link>
      </Col>
    );
    if (allProjects[val].isFinished) completedLaunches.push(launchCard);
    else if (allProjects[val].startTime * 1000 < Date.now())
      liveLaunches.push(launchCard);
    else upcomingLaunches.push(launchCard);
  });
  return (
    <div>
      <div className="project-banner-container">
        <div className="banner-container-content">
          <div>
            <h2>Launchpad Projects</h2>
            <p>View upcoming projects and our past launches</p>
          </div>
          <div className="banner-img">
            <img src={rocketImg} alt="Rocket" />
          </div>
        </div>
      </div>
      <Container fluid>
        <Row>
          <Col>
            <div>
              <h2 className="projects-launchTitle">Upcoming Launches</h2>
            </div>
          </Col>
        </Row>
      </Container>
      <Container fluid>
        <Row className="p-4">
          {/* <Col lg={4} md={6}>
                        <div>
                            <div className='memepad-card'>
                                <div className='memepad-card-1st-div'>
                                    <img src={simulancer} alt="" />
                                </div>
                                <div className='second-third-div-background'>
                                    <div className='memepad-card-2nd-div'>
                                        <div className="img-txt">
                                            <div>
                                                <img src={simulancerSmall} alt="" width='60' height='60' />
                                                <span className='small-2nd-div-img'>
                                                    <img src={eth} alt="" width='20' height='20' />
                                                </span>
                                            </div>
                                            <div className='only-text mt-2' >
                                                <div>Simlancer</div>
                                                <span>SIM</span>
                                            </div>
                                        </div>
                                        <div className="">
                                            <div className='label'>Progress</div>
                                            <div>{progressInstance}</div>
                                            <div className='progress-num'>
                                                <div className='stats-label'>
                                                    {`${now}%`}
                                                </div>
                                                <div className='stats-label'>
                                                    {`${289.6} / ${bnb}.BNB`}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='memepad-card-3rd-div'>
                                        <div>
                                            <div className='stats-label'>Total Raise</div>
                                            <div className='stats-num'>{Number(bnb)}</div>
                                        </div>
                                        <div>
                                            <div className='stats-label'>SIM For Sale</div>
                                            <div className='stats-num'>{236000000}</div>
                                        </div>
                                        <div>
                                            <div className='stats-label'>Buying Coin</div>
                                            <div className='stats-num'>BNB</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col> */}
          <Col lg={4} md={6}>
            <UpcomingCards />
          </Col>
          <Col lg={4} md={6}>
            <UpcomingCards />
          </Col>
          {upcomingLaunches}
        </Row>
      </Container>

      <Container fluid>
        <Row>
          <Col>
            <div>
              <h2 className="projects-launchTitle">LIVE Launches</h2>
            </div>
          </Col>
        </Row>
      </Container>
      <Container fluid>
        <Row className="p-4">{liveLaunches}</Row>
      </Container>

      <Container fluid>
        <Row>
          <Col>
            <div>
              <h2 className="projects-launchTitle">Completed Launches</h2>
            </div>
          </Col>
        </Row>
      </Container>
      <Container fluid>
        <Row className="p-4">
          {/* <Col lg={4} md={6}>
                        <div>
                            <div className='memepad-card'>
                                <div className='memepad-card-1st-div'>
                                    <img src={simulancer} alt="" />
                                </div>
                                <div className='second-third-div-background'>
                                    <div className='memepad-card-2nd-div'>
                                        <div className="img-txt">
                                            <div>
                                                <img src={simulancerSmall} alt="" width='60' height='60' />
                                                <span className='small-2nd-div-img'>
                                                    <img src={eth} alt="" width='20' height='20' />
                                                </span>
                                            </div>
                                            <div className='only-text mt-2' >
                                                <div>Simlancer</div>
                                                <span>SIM</span>
                                            </div>
                                        </div>
                                        <div className="">
                                            <div className='label'>Progress</div>
                                            <div>{progressInstance}</div>
                                            <div className='progress-num'>
                                                <div className='stats-label'>
                                                    {`${now}%`}
                                                </div>
                                                <div className='stats-label'>
                                                    {`${289.6} / ${bnb}.BNB`}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='memepad-card-3rd-div'>
                                        <div>
                                            <div className='stats-label'>Total Raise</div>
                                            <div className='stats-num'>{Number(bnb)}</div>
                                        </div>
                                        <div>
                                            <div className='stats-label'>SIM For Sale</div>
                                            <div className='stats-num'>{236000000}</div>
                                        </div>
                                        <div>
                                            <div className='stats-label'>Buying Coin</div>
                                            <div className='stats-num'>BNB</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col> */}
          {/* <Col lg={4} md={6}>
            <Link
              to={{ pathname: "/dashboard/projects/rhino", param1: "Hello" }}
            >
              <Cards
                bnb={289.6}
                outOfBNB={337}
                label="completed"
                name={"Booty Club"}
                symbol={"BOOTY"}
                image={Simlancer}
                smallImage={SmallSimlancer}
              />
            </Link>
          </Col> */}
          {/* <Col lg={4} md={6}>
            <Link to="/dashboard/projects/safedot">
              <Cards
                bnb={129.1}
                outOfBNB={150}
                label="completed"
                name={"SafeDot"}
                symbol={"SAFEDOT"}
                image={Safedot}
                smallImage={SmallSafedot}
              />
            </Link>
          </Col> */}

          {completedLaunches}
        </Row>
      </Container>
    </div>
  );
}

export default Projects;
