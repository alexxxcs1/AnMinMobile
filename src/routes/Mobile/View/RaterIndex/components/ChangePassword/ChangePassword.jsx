import React, { Component } from 'react'
import style from './ChangePassword.scss'
import DarkBox from 'components/DarkBox'
import scoretitle from 'assets/scoretitle.png'

import {api} from 'common/app'
  
export class ChangePassword extends Component {
constructor(props) {
  super(props);
  this.state = {
    formdata:{
        oldpassword:'',
        newpassword:'',
        password:'',
    }
  };
     this.refreshProps = this.refreshProps.bind(this);
     this.HandleInputChange = this.HandleInputChange.bind(this);
     this.ChangeConfirm = this.ChangeConfirm.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
}
refreshProps(props) {
  
}
HandleInputChange(type,e){
    this.state.formdata[type] = e.target.value;
    this.setState(this.state);
}
ChangeConfirm(){
  if (this.state.formdata.oldpassword&&this.state.formdata.newpassword&&this.state.formdata.password) {
      if (this.state.formdata.newpassword !== this.state.formdata.password) {
          alert('新密码和确认密码不一致');
          return;
      }
      api.raterChangePassword(
          this.state.formdata.oldpassword,
          this.state.formdata.newpassword,
          this.state.formdata.password
      ).then(res=>{
          console.log(res);
          if (res.code === 200) {
              window.location.hash = '/mobile/raterlogin'
          }
          alert(res.msg);
      },err=>{
          console.log(err);
          
      })
  }else{
      alert('请确认所有信息填写完整');
  }
  
}
render() {
  return (
    <DarkBox >
        <div className={style.ChangePassword}>
          <div className={style.TitleImage}>
            <img src={scoretitle} alt=""/>
          </div>
          <div className={[style.FormBody,'childcenter childcolumn'].join(' ')}>
            <div className={style.InputBox}>
              <input type="password" placeholder={'在这里输入原密码'} value={this.state.formdata.oldpassword} onChange={this.HandleInputChange.bind(this,'oldpassword')}/>
            </div>
            <div className={style.InputBox}>
              <input type="password" placeholder={'在这里输入新密码'} value={this.state.formdata.newpassword} onChange={this.HandleInputChange.bind(this,'newpassword')}/>
            </div>
            <div className={style.InputBox}>
              <input type="password" placeholder={'再次输入新密码'} value={this.state.formdata.password} onChange={this.HandleInputChange.bind(this,'password')}/>
            </div>
            <div className={[style.ConfirmButton,'childcenter'].join(' ')} onClick={this.ChangeConfirm}>确认</div>
          </div>
          
        </div>
    </DarkBox>
   )
   }
}
export default ChangePassword