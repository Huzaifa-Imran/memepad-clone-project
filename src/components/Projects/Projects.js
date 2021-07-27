import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import rocketImg from '../../images/bg.5c8963a7.svg';
import Simlancer from '../../images/simlancer.jpg';
import SmallSimlancer from '../../images/smallSimlancer.jpg';
import Safedot from '../../images/safedot.png';
import SmallSafedot from '../../images/smallSafe.jpg';
import GetBooty from '../../images/getbooty.png';
import SmallGetBooty from '../../images/smallBooty.png';
import ElonDoge from '../../images/elon-doge.png';
import SmallElonDoge from '../../images/smallElon.png';
import eth from '../../images/bscAvatar.4144c399.png';
import ProgressBar from 'react-bootstrap/ProgressBar';
import './Projects.css';
import Cards from '../Cards/Cards';
import CompletedCards from '../CompletedCards/CompletedCards';
import { Link } from 'react-router-dom';

function Projects(props) {
    const [bnb, setBnb] = useState(337.0)

    const now = 86;

    const progressInstance = <ProgressBar now={now} label={`${now}%`} srOnly />;

    return (
        <div>
            <div className='project-banner-container'>
                <div className='banner-container-content'>
                    <div>
                        <h2>Launchpad Projects</h2>
                        <p>View upcoming projects and our past launches</p>
                    </div>
                    <div className='banner-img'>
                        <img src={rocketImg} alt="Rocket" />
                    </div>
                </div>
            </div>
            <Container fluid>
                <Row>
                    <Col>
                        <div>
                            <h2 className='projects-launchTitle'>Upcoming Launches</h2>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Container fluid>
                <Row className='p-4'>
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
                        <Cards bnb={0} outOfBNB={0} label='comingSoon' />
                    </Col>
                    <Col lg={4} md={6}>
                        <Cards bnb={0} outOfBNB={0} label='comingSoon' />
                    </Col>
                </Row>
            </Container>

            <Container fluid>
                <Row>
                    <Col>
                        <div>
                            <h2 className='projects-launchTitle'>Completed Launches</h2>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Container fluid>
                <Row className='p-4'>
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
                        <Link to='/dashboard/projects/details'>
                            <CompletedCards
                                bnb={289.6}
                                outOfBNB={337}
                                label='completed'
                                image={Simlancer}
                                smallImage={SmallSimlancer}
                            />
                        </Link>
                    </Col>
                    <Col lg={4} md={6}>
                        <Link to='/dashboard/projects/details'>
                            <CompletedCards
                                bnb={129.1}
                                outOfBNB={150}
                                label='completed'
                                image={Safedot}
                                smallImage={SmallSafedot}
                            />
                        </Link>
                    </Col>

                    <Col lg={4} md={6}>
                        <Link to='/dashboard/projects/details'>
                            <CompletedCards
                                bnb={222.2}
                                outOfBNB={234}
                                label='completed'
                                image={GetBooty}
                                smallImage={SmallGetBooty}
                            />
                        </Link>
                    </Col>

                    <Col lg={4} md={6}>
                        <Link to='/dashboard/projects/details'>
                            <CompletedCards
                                bnb={130.6}
                                outOfBNB={132}
                                label='completed'
                                image={ElonDoge}
                                SmallImage={SmallElonDoge}
                            />
                        </Link>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Projects
