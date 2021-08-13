import React from "react";
import { Route, Switch, useLocation, Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import Projects from "../../components/Projects/Projects";
import Staking from "../../components/Staking/Staking";
import "../../App.css";
import Footer from "../../components/Footer/Footer";
import CardDetails from "../../components/CardDetails/CardDetails";
import TermsAndCondition from "../../components/TermsAndCondition/TermsAndCondition";
import PrivacyPolicy from "../../components/PrivacyPolicy/PrivacyPolicy";
import { useDispatch, useSelector } from "react-redux";
import {
  connectWallet,
  fetchBalance,
  initWeb3,
} from "../../store/reducer/web3_reducer";
import ConnectModal from "../../components/Modal";
import "../../UpdatedSidebar.css";
import logo from "../../images/mempad-logo.svg";
import SidebarNew from "../../components/sidebar/SidebarNew";
import { projIds } from "../../store/reducer/launch_reducer/projectInitialStates";
import { loadLaunchInfo } from "../../store/reducer/launch_reducer";
import connectLogo from '../../images/connect-logo.svg';

function Dashboard(props) {
  const [modalShow, setModalShow] = useState(false);
  const [title, setTitle] = useState(null);
  const dispatch = useDispatch();
  const { connected, shortAddress, balance } = useSelector(
    (state) => state.web3
  );
  const [showSidebar, setShowSidebar] = useState(true);
  let location = useLocation();

  const getToggleStatus = (props) => {
    setShowSidebar(!showSidebar);
  };

  useEffect(() => {
    if (location.pathname === "/dashboard/projects") {
      setTitle("Projects");
    } else if (location.pathname === "/dashboard/staking") {
      setTitle("Staking");
    }
    const interval = setInterval(() => {
      if (connected) dispatch(fetchBalance());
    }, 3000);
    const interval2 = setInterval(() => {
      if (connected) {
        for (let i = 0; i < projIds.length; ++i) {
          dispatch(loadLaunchInfo(projIds[i]));
        }
      }
    }, 10000);
    return () => {
      clearInterval(interval);
      clearInterval(interval2);
    };
  });

  const fixDecimals = (val, dec = 0) => {
    if (!val || val == Infinity) return 0;
    return val.toLocaleString("fullwide", {
      useGrouping: false,
      maximumFractionDigits: dec,
    });
  };

  const logoElement = <img src={connectLogo} alt='Connect Logo' />;

  return (
    <div className="main-layout">
      <aside className={`sidebar-container ${showSidebar && "sidebar-toggle"}`}>
        <div className="sidebar-body">
          <SidebarNew getToggleStatus={getToggleStatus} />
        </div>
      </aside>
      <div className="layout-content">
        <header className="header-container">
          <button
            className="Hamburger_container__3wFvX Header_hamburger2"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            <span
              className={`Hamburger_dash__20BhT ${!showSidebar && "hamburger-first-child"
                }`}
            ></span>
            <span
              className={`Hamburger_dash__20BhT ${!showSidebar && "middle-hamburger-hide"
                }`}
            ></span>
            <span
              className={`Hamburger_dash__20BhT ${!showSidebar && "hamburger-last-child"
                }`}
            ></span>
          </button>
          <div className="header-logo-container">
            <a href="/">
              <img src={logo} className="Header_logo__3_D65" alt="logo" />
            </a>
          </div>
          <strong className="Header_title__2eSkT">{title}</strong>
          <div className="Header_wallet__1DOlJ">
            {connected ? (
              <span className='header-wallet-balance'>
                ${fixDecimals(balance, 4)}BNB
              </span>
            )
            :
            null}
            <button
              onClick={
                connected
                  ? () => {
                    setModalShow(true);
                  }
                  : () => {
                    dispatch(connectWallet());
                  }
              }
              className="user-btn"
            >
              {/* {!connected ? shortAddress : "Connect Wallet"} */}
              {connected ? <span>{shortAddress} <img src={connectLogo} alt="Connect Logo" width='25' height='25' /> </span> : "Connect Wallet"}
            </button>
          </div>
        </header>
        <div className="content-container-main">
          <Switch>
            <Route exact path="/dashboard">
              <Redirect to="/dashboard/staking" component={Staking} />
            </Route>
            <Route path="/dashboard/staking" exact component={Staking} />
            <Route path="/dashboard/projects" exact component={Projects} />
            <Route
              path="/dashboard/projects/:projId"
              exact
              component={CardDetails}
            />
            <Route
              path="/dashboard/terms"
              exact
              component={TermsAndCondition}
            />
            <Route path="/dashboard/privacy" exact component={PrivacyPolicy} />
          </Switch>
        </div>
        <Footer />
      </div>
      <ConnectModal show={modalShow} onClose={() => setModalShow(false)} />
    </div>
  );
}

export default Dashboard;
