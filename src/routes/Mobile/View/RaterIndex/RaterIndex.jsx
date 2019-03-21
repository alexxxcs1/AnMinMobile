import React, { Component } from 'react'
import { HashRouter,Route,Switch,Redirect} from 'react-router-dom';
import style from './RaterIndex.scss'
import AllCase from './Views/AllCase'
import ChosenCase from './Views/ChosenCase'
import RaterAuthBox from '../../components/RaterAuthBox';
  
export class RaterIndex extends Component {
constructor(props) {
  super(props);
  this.state = {
    navStatus:null,
  };
  this.refreshProps = this.refreshProps.bind(this);
  this.HandleNav = this.HandleNav.bind(this);
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
HandleNav(status){
    this.props.history.push('/mobile/rateruser/'+status);
}
render() {
  return (
    <div className={style.RaterIndexBox}>
        <RaterAuthBox />
        <div className={[style.TopNavBox,'childcenter'].join(' ')}>
            <div className={style.NavButtonOutBox}>
              <div className={[style.NavButton,'childcenter',this.state.navStatus==='all'?style.MatchNav:''].join(' ')} onClick={this.HandleNav.bind(this,'all')}>
                  所有案例
              </div>
            </div>
            <div className={style.NavButtonOutBox}>
              <div className={[style.NavButton,'childcenter',this.state.navStatus==='chosen'?style.MatchNav:''].join(' ')} onClick={this.HandleNav.bind(this,'chosen')}>
                  入选案例
              </div>
            </div>
            {/* <div className={[style.NavButton,'childcenter',this.state.navStatus==='rule'?style.MatchNav:''].join(' ')} onClick={this.HandleNav.bind(this,'rule')}>
                精选案例
            </div> */}
        </div>
        <div className={style.DetialBox}>
            <Switch>
                <Route path='/mobile/rateruser/all' component={AllCase} />
                <Route path='/mobile/rateruser/chosen' component={ChosenCase} />
                <Redirect from="/mobile/rateruser" to="/mobile/rateruser/all" />
            </Switch>
        </div>
    </div> 
   )
   }
}
export default RaterIndex