import React, { Component } from 'react';
import { HashRouter,Route,Switch,Redirect} from 'react-router-dom';
// import style from  './App.scss';

import Home from 'routes/PC/Home'
import UserLogin from 'routes/PC/UserLogin'
import UserPWLogin from 'routes/PC/UserPWLogin'
import RaterLogin from 'routes/PC/RaterLogin'
import UserReg from 'routes/PC/UserReg'
import MobileHome from 'routes/Mobile'

class App extends Component {
  render() {
    return (
      <div style={{height: '100%'}}>
        <HashRouter >
          <div style={{height: '100%'}}>
              <Switch>
                  <Route path='/mobile' component={MobileHome} />
                  <Redirect from="/" to="/mobile" />
              </Switch>
          </div>
        </HashRouter>
        {/* <AnimateBackground /> */}
      </div>
    );
  }
}

export default App;
