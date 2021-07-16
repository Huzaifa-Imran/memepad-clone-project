import React, { useEffect, useState } from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar';
import eth from '../../images/bscAvatar.4144c399.png';
import whenNoBanner from '../../images/whenNoBanner.png';
import whenNoSmallImage from '../../images/whenNoSmallImage.png';
import '../Projects/Projects.css';

function CompletedCards(props) {

    const [bnb, setBnb] = useState(null)
    const [outOfBNB, setOutOfBNB] = useState(null);
    const [label, setLabel] = useState(null);
    const [image, setImage] = useState(null);
    const [smallImage, setSmallImage] = useState(null);

    const now = (bnb / outOfBNB) * 100;

    const progressInstance = (
        <ProgressBar now={now} label={`${now}%`} srOnly />
    );
    
    useEffect(() => {
        // console.log(props);
        setBnb(props.bnb);
        setOutOfBNB(props.outOfBNB);
        setLabel(props.label);
        setImage(props.image);
        setSmallImage(props.smallImage);
    }, [props])

    return (
        <div>
            <div className='memepad-card mt-4'>

                <div className='card-label-container'>
                    <div className='memepad-card-1st-div'>
                        <img src={!image ? whenNoBanner : image} alt="" />
                    </div>
                    <div className={`status-label-img ${label === 'completed' && "label-bg-color-green"}`}>
                        <span></span>
                        <span>COMPLETED</span>
                    </div>
                </div>






                <div className='second-third-div-background p-2'>
                    <div className='memepad-card-2nd-div'>
                        <div className="img-txt">
                            <div>
                                <img src={!smallImage ? whenNoSmallImage : smallImage} alt="" width='60' height='60' />
                                <span className='small-2nd-div-img'>
                                    <img src={eth} alt="" width='20' height='20' />
                                </span>
                            </div>
                            <div className='only-text mt-2' >
                                <div>Simlancer</div>
                                <span>SIM</span>
                            </div>
                        </div>
                        <div className="mt-3">
                            <div className='label'>
                                Sale Completion
                            </div>
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
                            <div className='stats-num'>$0.00000</div>
                            <div className='stats-label'>Initial price</div>
                        </div>
                        <div>
                            <div className='stats-num'>$0.00000</div>
                            <div className='stats-label'>ATH <span className='green-span'>546.01%</span> </div>
                        </div>
                        <div>
                            <div className='stats-num'>N/A</div>
                            <div className='stats-label'>Price <span className='red-span'>0.00%</span> </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompletedCards;
