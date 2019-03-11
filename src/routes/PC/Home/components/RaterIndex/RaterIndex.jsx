import React, { Component } from 'react'
import { HashRouter,Route,Switch,Redirect} from 'react-router-dom';
import style from './RaterIndex.scss'

import AllCase from './components/AllCase'
import ChosenCase from './components/ChosenCase'
import Featured from './components/Featured'
import AuthBox from './components/AuthBox'
  
import topbg from 'assets/topbg.png'

export class RaterIndex extends Component {
constructor(props) {
  super(props);
  this.state = {
      navStatus:0,
  };
     this.refreshProps = this.refreshProps.bind(this);
     this.HandleNavStatus = this.HandleNavStatus.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
}
refreshProps(props) {
    let hash = window.location.hash.split('/');
    this.state.navStatus = hash[hash.length-1];
    this.setState(this.state);
}
HandleNavStatus(status){
    this.props.history.push('/pc/rateruser/'+status);
}
render() {
  return (
    <div className={style.UserIndexBox}>
        
        <AuthBox />
        <div className={[style.NavBanner,'childcenter'].join(' ')}>
            <div className={[style.BannerDetial,'childcenter'].join(' ')}>
                <div className={[style.GroupBox,'childcenter','childcontentstart'].join(' ')}>
                    <div className={[style.NavGroup,'childcenter'].join(' ')}>
                        <div onClick={this.HandleNavStatus.bind(this,'all')} className={[style.NavButton,this.state.navStatus == 'all'?style.ActNavButton:'','childcenter'].join(' ')}>所有案例</div>
                        <div onClick={this.HandleNavStatus.bind(this,'chosen')} className={[style.NavButton,this.state.navStatus == 'chosen'?style.ActNavButton:'','childcenter'].join(' ')}>通过案例</div>
                        <div onClick={this.HandleNavStatus.bind(this,'featured')} className={[style.NavButton,this.state.navStatus == 'featured'?style.ActNavButton:'','childcenter'].join(' ')}>精选案例</div>
                    </div>
                </div>
                <div className={[style.GroupBox,'childcenter','childcontentend'].join(' ')}>

                    {/* <div className={[style.HandleButtonGroup,'childcenter'].join(' ')}>
                        <div className={[style.Button,'childcenter'].join(' ')}>上传案例</div>
                        <div className={[style.Button,'childcenter'].join(' ')}>添加视频</div>
                    </div> */}

                </div>
            </div>
        </div>

        <div className={[style.DetialBox,'childcenter','childcolumn','childcontentstart'].join(' ')}>
            {/* <AllCase /> */}
            <Switch>
                <Route path='/pc/rateruser/all' component={AllCase} />
                <Route path='/pc/rateruser/chosen' component={ChosenCase} />
                <Route path='/pc/rateruser/featured' component={Featured} />
                <Redirect from="/pc/rateruser" to="/pc/rateruser/all" />
            </Switch>
        </div>

    </div>
   )
   }
}
export default RaterIndex