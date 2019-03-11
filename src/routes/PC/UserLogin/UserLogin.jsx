import React, { Component } from 'react'
import { HashRouter,Route,Switch,Redirect} from 'react-router-dom';
import style from './UserLogin.scss'
import {api} from 'common/app'

import wxloginbot from 'assets/wxloginbot.png'
  
export class UserLogin extends Component {
constructor(props) {
  super(props);
  this.state = {};
     this.refreshProps = this.refreshProps.bind(this);
     this.GotoScanQR = this.GotoScanQR.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
}
refreshProps(props) {
  
}
GotoScanQR(){
  api.getWeixinLoginUrl().then(res=>{
    if (res.code == 200) {
      window.location.href = res.data;
    }else{
      console.log(res.msg);
    }
  },err=>{

  })
}
render() {
  return (
    <div className={[style.LoginBox,'childcenter'].join(' ')}>
          
          <div className={[style.bkgbox,'childcenter'].join(' ')}>
            <div className={[style.LoginButton,'childcenter'].join(' ')} onClick={this.GotoScanQR}>
              使用微信登录
            </div>
            <img src={wxloginbot} alt=""/>
          </div>
    </div>
   )
   }
}
export default UserLogin