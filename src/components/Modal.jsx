import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useDispatch, useSelector } from "react-redux";
import { disconnectWallet } from "../store/reducer/web3_reducer";
import "./Modal.css";
import stackingImg1 from "../images/staking-card-1.jpg";
import { RiShareBoxLine } from "react-icons/ri";
import { IoMdCopy } from "react-icons/io";
import { GrShare } from "react-icons/gr";
import { FaRegCopy } from "react-icons/fa";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(6, 8, 2),
  },
  paper_heading: {
    textAlign: "center",
  },
  paper_subheading: {
    fontSize: "14px",
  },
}));

function ConnectModal(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { address, shortAddress, accountUrl } = useSelector(
    (state) => state.web3
  );
  const [open, setOpen] = useState(false);
  const [copy, setCopy] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 3000);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {/* <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={true}
        onClose={props.onHide}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={true}>
          <div className={`${classes.paper} modal-screen`}>
            <div className={classes.paper_heading}>
              <div className="text-right close-btn">
                <button onClick={props.onHide}>x</button>
              </div>
              <h3 id="transition-modal-title">Wallet Connected</h3>
            </div>
            <div className="mode-main">
              <button
                className="mode"
                onClick={() => {
                  dispatch(disconnectWallet());
                  props.onHide();
                }}
              >
                Disconnect
              </button>
            </div>
          </div>
        </Fade>
      </Modal> */}

      <div className="disconnect-modal">
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={props.show}
          onClose={props.onClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={props.show}>
            <div className="">
              <div className="disconnect-inner-modal-main">
                <div className="jSaCuW-dis">
                  <div className="kNJaHk fdgtVi">
                    <h2 className="dRvZwz">Stake in Pool</h2>
                  </div>
                  <button
                    className="ilhSnp  htanym"
                    aria-label="Close the dialog"
                    scale="md"
                    onClick={props.onClose}
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
                <div className="disconnect-modal-content">
                  <div className="disconnect-modal-content-div-1">
                    <div className="dmc1">Connected with MetaMask</div>
                    <div className="dmc2">
                      <img src={stackingImg1} alt="small icon" />
                      <div>{shortAddress}</div>
                    </div>
                    <div className="dmc3">
                      <button
                        title="Copy Address to Clipboard"
                        className="mr-5"
                        onClick={copy ? null : copyAddress}
                      >
                        {" "}
                        <FaRegCopy className="mr-1" />
                        {copy ? "Copied" : "Copy Address"}
                      </button>
                      <div>
                        <RiShareBoxLine className="share-clr" />
                        <a href={accountUrl} rel="noreferrer" target="_blank">
                          View on Bscscan
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="disconnect-modal-content-div-2">
                    <button
                      onClick={() => {
                        dispatch(disconnectWallet());
                        props.onClose();
                      }}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Fade>
        </Modal>
      </div>
    </div>
  );
}

export default ConnectModal;
