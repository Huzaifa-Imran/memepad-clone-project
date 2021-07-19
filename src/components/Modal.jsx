 import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useDispatch } from 'react-redux';
import { disconnectWallet } from '../store/reducer/web3_reducer';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: 'black',
    color: 'white',
    padding: theme.spacing(4, 10, 4),
  },
  paper_heading: {
    textAlign: 'center',
  },
  paper_subheading: {
    fontSize: '14px',
  },
}));

function ConnectModal(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.show}
        onClose={props.onHide}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.show}>
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
      </Modal>
    </div>
  );
}

export default ConnectModal;
