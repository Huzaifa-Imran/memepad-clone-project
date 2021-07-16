import React, { useRef, useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import './CardDetails.css';
import { useHistory } from 'react-router';
import whenNoBanner from '../../images/whenNoBanner.png'
import Telegram from '../../images/telegram-small.svg';
import Twitter from '../../images/twitter-small.svg';
import Bsc from '../../images/bscscan-small.png';
import Medium from '../../images/medium-small.svg';
import BigCard from '../../images/details-card.jpg';
import { Link } from 'react-router-dom';

const smallRedirects = [
    {
        image: Twitter,
        name: 'Twitter',
        link: ''
    },
    {
        image: Telegram,
        name: 'Telegram',
        link: ''
    },
    {
        image: Medium,
        name: 'Medium',
        link: ''
    },
    {
        image: Bsc,
        name: 'BscScan',
        link: ''
    },
]

function CardDetails(props) {
    const history = useHistory();
    console.log(history, props)

    const [timerDays, setTimerDays] = useState('00');
    const [timerHours, setTimerHours] = useState('00');
    const [timerMinutes, setTimerMinutes] = useState('00');
    const [timerSeconds, setTimerSeconds] = useState('00');
    const [distance, setDistance] = useState(false);

    let interval = useRef();

    const startTimer = () => {
        const countDownDate = new Date('2021', '07', '12');

        interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = countDownDate - now;


            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (distance < 0) {
                clearInterval(interval.current);
                setDistance(true);
            }
            else {
                setTimerDays(days);
                setTimerHours(hours);
                setTimerMinutes(minutes);
                setTimerSeconds(seconds);
            }
        }, 1000);
    }

    useEffect(() => {
        startTimer();
        return () => {
            clearInterval(interval.current);
        }
    }, [])


    return (
        <Container fluid>
            <Row>
                <Col lg={12} md={12}>
                    <div className='details-breadcrumb'>
                        <Link to='/projects'>Projects</Link>
                        <span>&gt;</span>
                        <span>Title</span>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col lg={12} md={12}>
                    <div className='details-first-div'>
                        <div className='mr-4' >
                            <img src={whenNoBanner} alt="" />

                        </div>

                        <div className='card-details' >
                            <div>Title <span>( subtitle )</span></div>
                            <div> <Link to='/https://rhino-coin.com'>https://rhino-coin.com</Link> </div>
                            <div className='redirect-links-main'>
                                {smallRedirects.map((v, i) => {
                                    return (
                                        <a href={v.link} target='_blank' rel="noreferrer">
                                            <span className='redirect-links mr-2' key={i}>
                                                <img className='redirect-links-img' src={v.image} alt={v.name} />
                                                {v.name}
                                            </span>
                                        </a>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col lg={7} md={12}>
                    <div className='details-second-left-div'>
                        <img src={BigCard} alt="" />
                        <div className='pool-about-content' >
                            <h3 class="pool-about-heading">Project Overview</h3>
                            <div class="pool-about-text">
                                RhinoCoin is set to become the biggest contest token. The project aims to help projects,
                                products, and services gain visibility by rewarding holders for promotional activities (upvote, like, retweet, etc)!
                            </div>
                            <div class="pool-about-separator"></div>
                            <h3 class="pool-about-heading">Pool Detail</h3>
                            <div class="pool-about-sale">
                                <span class="pool-about-dot">

                                </span>
                                Live in 0d:0h:0m
                            </div>

                            <div class="pool-about-row">
                                <div>
                                    <h4 class="pool-about-cell-heading">Pool Information</h4>
                                    <ul class="pool-about-dataList">
                                        <li class="pool-about-dataListItem">
                                            <div class="pool-about-dataLabel">Token Distribution</div>
                                            <div title="14/07/2021, 4:00 PM UTC" class="pool-about-dataValue">14/07/2021, 4:00 PM UTC</div>
                                        </li>
                                        <li class="pool-about-dataListItem"><div class="pool-about-dataLabel">Audit Status</div>
                                            <div title="N/A" class="pool-about-dataValue">N/A</div>
                                        </li>
                                        <li class="pool-about-dataListItem">
                                            <div class="pool-about-dataLabel">Total Sale Amount</div>
                                            <div title="$64,320.00" class="pool-about-dataValue">$64,320.00</div>
                                        </li>
                                        <li class="pool-about-dataListItem">
                                            <div class="pool-about-dataLabel">Available for Purchase</div>
                                            <div title="250,000,000,000,000.00 RHINO" class="pool-about-dataValue">250,000,000,000,000.00 RHINO</div>
                                        </li>
                                        <li class="pool-about-dataListItem"><div class="pool-about-dataLabel">Initial Market Cap</div>
                                            <div title="$78,000" class="pool-about-dataValue">$78,000</div>
                                        </li>
                                        <li class="pool-about-dataListItem">
                                            <div class="pool-about-dataLabel">KYC Required</div>
                                            <div title="No" class="pool-about-dataValue">No</div>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 class="pool-about-cell-heading">Token Information</h4>
                                    <ul class="pool-about-dataList">
                                        <li class="pool-about-dataListItem">
                                            <div class="pool-about-dataLabel">Name</div>
                                            <div title="RhinoCoin" class="pool-about-dataValue">RhinoCoin</div>
                                        </li>
                                        <li class="pool-about-dataListItem">
                                            <div class="pool-about-dataLabel">Symbol</div>
                                            <div title="RHINO" class="pool-about-dataValue">RHINO</div>
                                        </li>
                                        <li class="pool-about-dataListItem">
                                            <div class="pool-about-dataLabel">Address</div>
                                            <div class="pool-about-dataValue">Not Provided Yet</div>
                                        </li>
                                        <li class="pool-about-dataListItem">
                                            <div class="pool-about-dataLabel">Blockchain</div>
                                            <div title="Binance Smart Chain" class="pool-about-dataValue">Binance Smart Chain</div>
                                        </li>
                                        <li class="pool-about-dataListItem">
                                            <div class="pool-about-dataLabel">Initial Supply</div>
                                            <div title="775,000,000,000,000.00" class="pool-about-dataValue">775,000,000,000,000.00</div>
                                        </li>
                                        <li class="pool-about-dataListItem"><div class="pool-about-dataLabel">Total Supply</div>
                                            <div title="1,000,000,000,000,000.00" class="pool-about-dataValue">1,000,000,000,000,000.00</div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>
                </Col>
                <Col lg={5} md={12} sm={12}>
                    <div className='details-second-right-div'>
                        <div className="sale-card">
                            <h2>Sale Countdown</h2>
                            {distance === true ? (
                                <h1 className='when-zero'>
                                    <div class="launch-icon">
                                        <img src='' alt="" />
                                    </div>0% RHINO Sold
                                </h1>
                            )
                                :
                                (
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
                                        <div className="count-progress-bar">
                                            <div className="count-progress-bar-filter" >
                                            </div>
                                        </div>
                                        {/* {distance ? (distance/100) : null} */}
                                    </div>
                                )
                            }
                            <section>
                                <div className='info-row mt-3' >
                                    <p>RhinoCoin <br /> Price:</p>
                                    <p>0.000000000000804000000 <br /> BNB</p>
                                </div>
                                <div className='info-row' >
                                    <p>RhinoCoin <br /> Sold:</p>
                                    <p>N/A RHINO</p>
                                </div>
                                <div className='info-row' >
                                    <p>Total Raise</p>
                                    <p>201 BNB</p>
                                </div>
                            </section>
                            <section className='btn-container'>
                                <button>connect wallet</button>
                            </section>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default CardDetails;