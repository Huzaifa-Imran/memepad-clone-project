import { BrowserRouter as Router, Route, Switch, useHistory, useLocation, Redirect } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';
import { useState, useEffect } from 'react'
import * as RiIcons from 'react-icons/ri';
import Projects from './components/Projects/Projects';
import Staking from './components/Staking/Staking';
import './App.css'
import Footer from './components/Footer/Footer';
import CardDetails from './components/CardDetails/CardDetails';
import TermsAndCondition from './components/TermsAndCondition/TermsAndCondition';
import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy';
import Header from './components/Header/Header';

function App(props) {
  const [toggle, setToggle] = useState(false);
  const [title, setTitle] = useState(null)

  useEffect(() => {
    console.log(window.location.pathname)
    if (window.location.pathname === '/projects') {
      setTitle('Projects');
    }
    else if (window.location.pathname === '/staking') {
      setTitle('Staking');
    }
  }, [window.location.pathname])


  return (
    <Router>
      <div className='d-flex' id="wrapper">



        <div className={`bg-sidebar ${toggle ? 't-btn' : 't-btn-block'}`} id="sidebar-wrapper">
          <Sidebar />
        </div>




        <div id="page-content-wrapper">
          {/* <Header/> */}

          <nav className="navbar navbar-expand-lg nav-fixed-1025 nav-header">
            <div className='header-left-div' >
              <span className={`menu-btn mx-3 `} id="menu-toggle" onClick={() => setToggle(!toggle)}><RiIcons.RiMenu2Line /></span>
              {/* {window.location.pathname === '/projects' && (
                <span className='header-title'>Projects</span>
              )}
              {window.location.pathname === '/staking' && (
                <span className='header-title'>Staking</span>
              )} */}
              <span className='header-title'>{title}</span>
            </div>
            <div className='ml-auto nav-btn mr-4'>
              <button className="user-btn">
                Connect Wallet
              </button>

            </div>
          </nav>


          <div className='content-container-main' >
            <Switch>
              <Route exact path="/">
                <Redirect to="/staking" component={Staking} />
              </Route>
              <Route path='/staking' exact component={Staking} />
              <Route path='/projects' exact component={Projects} />
              <Route path='/projects/details' exact component={CardDetails} />
              <Route path='/terms' exact component={TermsAndCondition} />
              <Route path='/privacy' exact component={PrivacyPolicy} />
            </Switch>
          </div>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
