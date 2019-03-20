import React, { Component } from 'react'
import style from './RaterAuthBox.scss'
import {api} from 'common/app'
  
export class RaterAuthBox extends Component {
constructor(props) {
  super(props);
  this.state = {};
     this.refreshProps = this.refreshProps.bind(this);
     this.isLogin = this.isLogin.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
  this.isLogin();
}
refreshProps(props) {
  
}
isLogin(){
  api.raterIsLogin().then(res=>{
    if (res.code === 200) {
      if (window.location.hash=='#/mobile/raterlogin') {
        window.location.hash = '#/mobile/rateruser';
      }
    }else{
      window.location.hash = '#/mobile/raterlogin';
    }
  },err=>{

  })
}
render() {
  return (
    <div style={{display:'none'}}>
    
    </div>
   )
   }
}
export default RaterAuthBox