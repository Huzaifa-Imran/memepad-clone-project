import React, { useEffect, useState } from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar';
import eth from '../../images/bscAvatar.4144c399.png';
import whenNoBanner from '../../images/whenNoBanner.png';
import whenNoSmallImage from '../../images/whenNoSmallImage.png';
import '../Projects/Projects.css';


function Cards(props) {

    const [bnb, setBnb] = useState(null)
    const [outOfBNB, setOutOfBNB] = useState(null);
    const [label, setLabel] = useState(null);

    const now = (bnb / outOfBNB) * 100;

    const progressInstance = <ProgressBar now={now} label={`${now}%`} srOnly />;

    useEffect(() => {
        // console.log(props);
        setBnb(props.bnb);
        setOutOfBNB(props.outOfBNB);
        setLabel(props.label);
    }, [props])

    return (
        <div>
            <div className={`memepad-card mt-3 ${label === 'comingSoon' && "memepad-card-disable"}`}>



                <div className='card-label-container'>
                    <div className='memepad-card-1st-div'>
                        <img src={whenNoBanner} alt="" />
                    </div>
                    <div className={`status-label-img ${label === 'comingSoon' && "label-bg-color-black"}`}>
                        <span></span>
                        <span>COMING SOON</span>
                    </div>
                </div>




                <div className='second-third-div-background p-2'>
                    <div className='memepad-card-2nd-div'>
                        <div className="img-txt">
                            <div>
                                <img src={whenNoSmallImage} alt="" width='60' height='60' />
                                <span className='small-2nd-div-img'>
                                    <img src={eth} alt="" width='20' height='20' />
                                </span>
                            </div>
                            <div className='only-text mt-2' >
                                <div>Simlancer</div>
                                <span>SIM</span>
                            </div>
                        </div>
                        <div className="mt-2">
                            <div className='label'>Progress</div>
                            <div>{progressInstance}</div>
                            <div className='progress-num'>
                                <div className='stats-label'>
                                    {`${bnb ? Math.round(now) : '0'}%`}
                                </div>
                                <div className='stats-label'>
                                    {`${bnb} / ${outOfBNB}.BNB`}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='memepad-card-3rd-div'>
                        <div>
                            <div className='stats-label'>Total Raise</div>
                            <div className='stats-num'>{outOfBNB} BNB</div>
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
    )
}

export default Cards
