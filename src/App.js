import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
  useLocation,
  Redirect,
} from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import { useState, useEffect } from "react";
import * as RiIcons from "react-icons/ri";
import Projects from "./components/Projects/Projects";
import Staking from "./components/Staking/Staking";
import "./App.css";
import Footer from "./components/Footer/Footer";
import CardDetails from "./components/CardDetails/CardDetails";
import TermsAndCondition from "./components/TermsAndCondition/TermsAndCondition";
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy";
import { useDispatch, useSelector } from "react-redux";
import { initWeb3 } from "./store/reducer/web3_reducer";
import Header from "./components/Header/Header";
import ConnectModal from "./components/Modal";

function App(props) {
  const [toggle, setToggle] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [title, setTitle] = useState(null);
  const dispatch = useDispatch();
  const connected = useSelector((state) => state.web3.connected);
  const smallAddress = useSelector((state) => state.web3.bscScan.transaction);

  useEffect(() => {
    console.log(window.location.pathname);
    if (window.location.pathname === "/projects") {
      setTitle("Projects");
    } else if (window.location.pathname === "/staking") {
      setTitle("Staking");
    }
  }, [window.location.pathname]);

  return (
    <Router>
      <div className="d-flex" id="wrapper">
        <div
          className={`bg-sidebar ${toggle ? "t-btn" : "t-btn-block"}`}
          id="sidebar-wrapper"
        >
          <Sidebar />
        </div>

        <div id="page-content-wrapper">
          {/* <Header/> */}

          <nav className="navbar navbar-expand-lg nav-fixed-1025 nav-header">
            <div className="header-left-div">
              <span
                className={`menu-btn mx-3 `}
                id="menu-toggle"
                onClick={() => setToggle(!toggle)}
              >
                <RiIcons.RiMenu2Line />
              </span>
              {/* {window.location.pathname === '/projects' && (
                <span className='header-title'>Projects</span>
              )}
              {window.location.pathname === '/staking' && (
                <span className='header-title'>Staking</span>
              )} */}
              <span className="header-title">{title}</span>
            </div>
            <div className="ml-auto nav-btn mr-4">
              <button
                onClick={
                  connected
                    ? () => {
                        setModalShow(true);
                      }
                    : () => {
                        dispatch(initWeb3());
                      }
                }
                className="user-btn"
              >
                {connected ? smallAddress : "Connect Wallet"}
              </button>
            </div>
          </nav>

          <div className="content-container-main">
            <Switch>
              <Route exact path="/">
                <Redirect to="/staking" component={Staking} />
              </Route>
              <Route path="/staking" exact component={Staking} />
              <Route path="/projects" exact component={Projects} />
              <Route path="/projects/details" exact component={CardDetails} />
              <Route path="/terms" exact component={TermsAndCondition} />
              <Route path="/privacy" exact component={PrivacyPolicy} />
            </Switch>
          </div>
          <Footer />
        </div>
      </div>
      <ConnectModal show={modalShow} onHide={() => setModalShow(false)} />
    </Router>
  );
}

export default App;
