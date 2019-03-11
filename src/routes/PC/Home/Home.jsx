import React, { Component } from 'react'
import { HashRouter,Route,Switch,Redirect} from 'react-router-dom';
import style from './Home.scss'
import PropTypes from "prop-types";

import TopBanner from 'components/TopBanner'
import UserIndex from './components/UserIndex'
import RaterIndex from './components/RaterIndex'

import topbg from "assets/topbg.png";

import AlertBox from 'components/AlertBox'


export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AlertShow:false,
      AlertOption:null,
    };
    this.HandleAlertOption = this.HandleAlertOption.bind(this);
  }
  getChildContext() {
    return {
      HandleAlertOption: this.HandleAlertOption
    };
  }
  componentDidMount()
  {
    window.document.title = '安敏·健行“真知灼见”Talent Show 青年讲者优秀案例征文比赛';
  }
  HandleAlertOption(boolean,option){
    this.state.AlertShow = boolean;
    this.state.AlertOption = option;
    this.setState(this.state);
  }
  render() {
    return (
      <div className={style.HomeBox}>
          {this.state.AlertShow?<AlertBox Option={this.state.AlertOption}/>:''}
          <TopBanner />
          {/* <UserIndex /> */}
          <Switch>
            <Route path='/pc/user' component={UserIndex} />
            <Route path='/pc/rateruser' component={RaterIndex} />
          </Switch>
          <div className={style.BkgBox}>
            <img src={topbg} className={style.Topbkg} alt="" />
          </div>
          
      </div>
    )
  }
}
Home.childContextTypes = {
  HandleAlertOption: PropTypes.func
};
export default Home
