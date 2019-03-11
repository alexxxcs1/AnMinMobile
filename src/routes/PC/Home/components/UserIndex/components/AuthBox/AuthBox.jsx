import React, { Component } from 'react'
import style from './AuthBox.scss'

import {api} from 'common/app'
  
export class AuthBox extends Component {
constructor(props) {
  super(props);
  this.state = {};
     this.refreshProps = this.refreshProps.bind(this);
     this.isAuth = this.isAuth.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
}
refreshProps(props) {
  this.isAuth();
}
isAuth(){
    api.userIsLogin().then(res=>{
        if (res.code == 201) {
          window.location.hash = '#/ulogin'
        }else if (res.code == 202) {
          window.location.hash = '#/userregister'
        }
    },err=>{

    });
}
render() {
  return (
    <div style={{display:'none'}}>
    
    </div>
   )
   }
}
export default AuthBox