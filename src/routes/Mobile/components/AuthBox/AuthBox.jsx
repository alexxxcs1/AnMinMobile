import React, { Component } from 'react'
import style from './AuthBox.scss'
import {api} from 'common/app'
  
export class AuthBox extends Component {
constructor(props) {
  super(props);
  this.state = {};
     this.refreshProps = this.refreshProps.bind(this);
     this.getAuth = this.getAuth.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
  this.getAuth();
}
refreshProps(props) {
  
}
getAuth(){
    api.wxisAuth(window.location.href).then(res=>{
        if (res.code == 203) {
            window.location.href = res.data;     
        }else if(res.code == 201){
            window.location.hash = '#/mobile/register';         
        }else{
            
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
export default AuthBox