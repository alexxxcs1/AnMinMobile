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
    api.raterIsLogin().then(res=>{
        console.log(res);
        if (res.code != 200) {
            window.location.hash = '#/rlogin'
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