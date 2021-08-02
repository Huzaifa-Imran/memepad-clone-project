import React, { useEffect, useState } from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar';
import eth from '../../images/bscAvatar.4144c399.png';
import whenNoBanner from '../../images/whenNoBanner.png';
import whenNoSmallImage from '../../images/whenNoSmallImage.png';
import '../Projects/Projects.css';

function Cards(props) {
    const projDetails = props.projDetails;

    const fixDecimals = (val, dec) => {
        if (!val) return 0;
        const decimals = String(val).split(".")[1];
        if (decimals && decimals.length > dec)
          return Number(val.toFixed(dec));
        return val;
      };

      const now = ( projDetails.soldAmountInBnb / projDetails.totalTokensInBnb) * 100;
      const progressInstance = (
          <ProgressBar now={now} label={`${now}%`} srOnly />
      );

    return (
        <div>
            <div className='memepad-card mt-4'>

                <div className='card-label-container'>
                    <div className='memepad-card-1st-div'>
                        <img src={!projDetails.image ? whenNoBanner : projDetails.image} alt="" />
                    </div>
                    <div className="status-label-img label-bg-color-green">
                        <span></span>
                        <span>{projDetails.isFinished ? "COMPLETED" : "LIVE"}</span>
                    </div>
                </div>

                <div className='second-third-div-background p-2'>
                    <div className='memepad-card-2nd-div'>
                        <div className="img-txt">
                            <div>
                                <img src={!projDetails.smallImage ? whenNoSmallImage : projDetails.smallImage} alt="" width='60' height='60' />
                                <span className='small-2nd-div-img'>
                                    <img src={eth} alt="" width='20' height='20' />
                                </span>
                            </div>
                            <div className='only-text mt-2' >
                                <div>{projDetails.name}</div>
                                <span>{projDetails.symbol}</span>
                            </div>
                        </div>
                        <div className="mt-3">
                            <div className='label'>
                                Sale Completion
                            </div>
                            <div>{progressInstance}</div>
                            <div className='progress-num'>
                                <div className='stats-label'>
                                    {`${fixDecimals(now, 0)}%`}
                                </div>
                                <div className='stats-label'>
                                    {`${fixDecimals(projDetails.soldAmountInBnb, 1)} / ${fixDecimals(projDetails.totalTokensInBnb, 1)} BNB`}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className='memepad-card-3rd-div'>
                        <div>
                            <div className='stats-num'>$0.00001</div>
                            <div className='stats-label'>Initial price</div>
                        </div>
                        <div>
                            <div className='stats-num'>$0.00000</div>
                            <div className='stats-label'>ATH <span className='green-span'>0.01%</span> </div>
                        </div>
                        <div>
                            <div className='stats-num'>N/A</div>
                            <div className='stats-label'>Price <span className='red-span'>0.00%</span> </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Cards;
