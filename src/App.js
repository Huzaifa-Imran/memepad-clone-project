import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';
import { useState } from 'react'
import * as RiIcons from 'react-icons/ri';
import Projects from './components/Projects/Projects';
import Staking from './components/Staking/Staking';
import './App.css'

function App() {
  const [toggle, setToggle] = useState(false);

  return (
    <Router>
      <div className='d-flex' id="wrapper">



        <div class={`bg-sidebar ${toggle ? 't-btn' : 't-btn-block'}`} id="sidebar-wrapper">
          <Sidebar />
        </div>




        <div id="page-content-wrapper">
          <nav className="navbar navbar-expand-lg nav-fixed-1025 nav-header">
            <div className='header-left-div' >
              <span className={`menu-btn mx-3 `} id="menu-toggle" onClick={() => setToggle(!toggle)}><RiIcons.RiMenu2Line /></span>
              <span className='header-title'>Projects</span>
            </div>
            <div className='ml-auto nav-btn mr-4'>
              <button className="user-btn">
                Connect Wallet
              </button>

            </div>
          </nav>
          <div className='content-container-main' >
            <Switch>
              <Route path='/projects' exact component={Projects} />
              <Route path='/staking' exact component={Staking} />
              {/* <Route path='/leasing' exact component={LeasingLanding} />
                <Route path='/assets' exact component={AssetsDefi} />
                <Route path='/defi' exact component={AssetsDefi} />
                <Route path='/issue_nft' exact component={IssueNft} /> */}
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
