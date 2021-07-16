import React, { useEffect, useState } from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar';
import stackingImg1 from '../../images/staking-card-1.jpg';
import './StackingCard.css';
import * as RiIcons from 'react-icons/ri';
import * as FiIcons from "react-icons/fa";
import { IoIosRefresh } from "react-icons/io";

function StackingCard(props) {
    const [showTotalStacked, setShowTotalStacked] = useState(false);
    const [banner, setBanner] = useState(null);
    const [title, setTitle] = useState(null);
    const [subtitle, setSubtitle] = useState(null);
    const [image, setImage] = useState(null)

    useEffect(() => {
        // console.log(props);
        setBanner(props.banner);
        setTitle(props.title);
        setSubtitle(props.subTitle);
        setImage(props.image);
    }, [props])

    return (
        <div className='staking-card-main'>
            <div className='staking-card'>
                {banner === 'completed' ?
                    (<div title="Finished" class="sc-bQCEYZ irmCui">
                        <div title="Finished">Finished</div>
                    </div>)
                    :
                    null}
                <div className="staking-card-first-div">
                    <div className='staking-text-1'>
                        <div>{title}</div>
                        <div>{subtitle}</div>
                    </div>
                    <div className='staking-img-1'>
                        <img src={image ? image : stackingImg1} alt="" />
                        <div className='staking-img-small-icon'>
                            <img src={stackingImg1} alt="" width='15' height='15' />
                        </div>
                    </div>
                </div>

                <div className="staking-card-second-div">
                    <div className='staking-text-2'>
                        <div>APY:</div>
                        <div></div>
                    </div>
                </div>

                <div className="staking-card-third-div">
                    <div className='staking-text-3'>
                        <div>Start earning</div>
                    </div>
                </div>

                <div className="staking-card-fourth-div">
                    <div className='staking-btn'>
                        <button>Unlock Wallet</button>
                    </div>
                </div>

                <div className="staking-card-fifth-div">
                    <div className='staking-btn-text'>
                        <button> <span><IoIosRefresh /></span> Manual</button>
                        {showTotalStacked
                            ?
                            (<button onClick={() => setShowTotalStacked(!showTotalStacked)} >Hide <span><RiIcons.RiArrowDropUpLine /></span></button>)
                            :
                            (<button onClick={() => setShowTotalStacked(!showTotalStacked)} >Details <span><RiIcons.RiArrowDropDownLine /></span></button>)
                        }
                    </div>
                </div>

                {showTotalStacked && (
                    <>
                        <div className="staking-card-sixth-div">
                            <div className='staking-text-4'>
                                <div>Total staked:</div>
                                <div></div>
                            </div>
                        </div>

                        <div className="staking-card-seventh-div">
                            <div className='staking-text-5'>
                                <div>
                                    <a href='https://bscscan.com/address/0x9C03Bb53fA47d35C869458C141eA16e31747c931' target="_blank" >
                                        <span>View Contract</span>
                                        <span><RiIcons.RiShareBoxLine /></span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </>
                )}


            </div>
        </div>
    )
}

export default StackingCard;
