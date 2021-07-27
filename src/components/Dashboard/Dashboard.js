import React from 'react'
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
import { initWeb3 } from "../../store/reducer/web3_reducer";
import ConnectModal from "../../components/Modal";
import '../../UpdatedSidebar.css';
import logo from '../../images/mempad-logo.svg';
import SidebarNew from "../../components/sidebar/SidebarNew";

function Dashboard(props) {
    const [modalShow, setModalShow] = useState(false);
    const [title, setTitle] = useState(null);
    const dispatch = useDispatch();
    const connected = useSelector((state) => state.web3.connected);
    const smallAddress = useSelector((state) => state.web3.bscScan.transaction);
    const [showSidebar, setShowSidebar] = useState(true);
    let location = useLocation();

    useEffect(() => {
        if (location.pathname === "/dashboard/projects") {
            setTitle("Projects");
        } else if (location.pathname === "/dashboard/staking") {
            setTitle("Staking");
        }
    }, [location])


    return (
        <div className='main-layout'>
            <aside className={`sidebar-container ${showSidebar && "sidebar-toggle"}`}>
                <div className='sidebar-body'>
                    <SidebarNew />
                </div>
            </aside>
            <div className="layout-content">
               
                <header className='header-container'>
                    <button className="Hamburger_container__3wFvX Header_hamburger2" onClick={() => setShowSidebar(!showSidebar)}>
                        <span className={`Hamburger_dash__20BhT ${!showSidebar && "hamburger-first-child"}`}></span>
                        <span className={`Hamburger_dash__20BhT ${!showSidebar && "middle-hamburger-hide"}`}></span>
                        <span className={`Hamburger_dash__20BhT ${!showSidebar && "hamburger-last-child"}`}></span>
                    </button>
                    <div className='header-logo-container'>
                        <a href="/"><img src={logo} class="Header_logo__3_D65" alt="logo" /></a>
                    </div>
                    <strong className="Header_title__2eSkT">{title}</strong>
                    <div className="Header_wallet__1DOlJ">
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
                </header>
                <div className="content-container-main">
                    <Switch>
                        <Route exact path="/dashboard">
                            <Redirect to="/dashboard/staking" component={Staking} />
                        </Route>
                        <Route path="/dashboard/staking" exact component={Staking} />
                        <Route path="/dashboard/projects" exact component={Projects} />
                        <Route path="/dashboard/projects/details" exact component={CardDetails} />
                        <Route path="/dashboard/terms" exact component={TermsAndCondition} />
                        <Route path="/dashboard/privacy" exact component={PrivacyPolicy} />
                    </Switch>
                </div>
                <Footer />
            </div>
            <ConnectModal show={modalShow} onHide={() => setModalShow(false)} />
        </div>
    )
}

export default Dashboard;