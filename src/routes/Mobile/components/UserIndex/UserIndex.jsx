import React, { Component } from 'react'
import { HashRouter,Route,Switch,Redirect} from 'react-router-dom';
import style from './UserIndex.scss'
import AllCase from './components/AllCase'
import ChosenCase from './components/ChosenCase'
import Rule from './components/Rule'
  
export class UserIndex extends Component {
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
    this.props.history.push('/mobile/user/'+status);
}
render() {
  return (
    <div className={style.UserIndexBox}>
        <div className={[style.TopNavBox,'childcenter'].join(' ')}>
            <div className={[style.NavButton,'childcenter',this.state.navStatus=='all'?style.MatchNav:''].join(' ')} onClick={this.HandleNav.bind(this,'all')}>
                所有案例
            </div>
            <div className={[style.NavButton,'childcenter',this.state.navStatus=='chosen'?style.MatchNav:''].join(' ')} onClick={this.HandleNav.bind(this,'chosen')}>
                入选案例
            </div>
            <div className={[style.NavButton,'childcenter',this.state.navStatus=='rule'?style.MatchNav:''].join(' ')} onClick={this.HandleNav.bind(this,'rule')}>
                活动规则
            </div>
        </div>
        <div className={style.DetialBox}>
            <Switch>
                <Route path='/mobile/user/all' component={AllCase} />
                <Route path='/mobile/user/chosen' component={ChosenCase} />
                <Route path='/mobile/user/rule' component={Rule} />
                <Redirect from="/mobile/user" to="/mobile/user/all" />
            </Switch>
        </div>
    </div> 
   )
   }
}
export default UserIndex