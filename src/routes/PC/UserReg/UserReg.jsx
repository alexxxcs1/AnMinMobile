import React, { Component } from "react";
import style from "./UserReg.scss";
import {api} from 'common/app'

import topbg from "assets/topbg.png";
import logo from "assets/logo.png";
import earth from "assets/earth.png";
import mobileregisterqr from "assets/mobileregisterqr.png";

let isRegTimer;
export class UserReg extends Component {
  constructor(props) {
    super(props);
    this.state = {
        username:'',
        userpw:'',
        bgboxoffset:{
            top:0,
            right:0
        }
    };
    this.refreshProps = this.refreshProps.bind(this);
    this.setbgBoxOffset = this.setbgBoxOffset.bind(this);
    this.HandleInputChange = this.HandleInputChange.bind(this);
  }
  componentWillReceiveProps(nextprops) {
    this.refreshProps(nextprops);
  }
  componentDidMount() {
    this.refreshProps(this.props);
    this.setbgBoxOffset();
    // isRegTimer = setInterval(() => {
    //   this.getUserIsReg();
    // }, 500);
  }
  refreshProps(props) {}
  setbgBoxOffset(){
      // console.log(this.refs.boxbg.offsetTop,this.refs.boxbg.offsetLeft);
      // this.state.bgboxoffset.top = -this.refs.boxbg.offsetTop + 'px';
      // this.setState(this.state);
  }
  getUserIsReg(){
    api.userIsLogin().then(res=>{
      if (res.code == 201) {
        window.location.hash = '#/ulogin'
      }else if (res.code == 202) {
        window.location.hash = '#/userregister'
      }else if(res.code == 200){
        window.location.hash = '#/pc/user/rule'
      }
    },err=>{

    });
  }
  HandleInputChange(type,e){
    this.state[type] = e.target.value;
    this.setState(this.state);
  }
  componentWillUnmount(){
    clearInterval(isRegTimer);
  }
  render() {
    return (
      <div className={[style.UserRegBox, "childcenter"].join(" ")}>
        <img src={topbg} className={style.Topbkg} alt="" />
        <div className={[style.LoginBox,'childcenter'].join(' ')} >
        {/* style={{backgroundImage:'url('+topbg+')'}} */}
          <div
            className={[style.LoginForm, "childcenter", "childcolumn"].join(
              " "
            )}>
            <div className={style.TitleBox}>
              <div className={[style.TextRow, "childcenter"].join(" ")}>
                <img src={logo} className={style.logo}/>  
                <div className={'childcenter childcolumn'}>
                  <span>2019全国婴幼儿牛奶蛋白过敏膳食管理规范化培训项目</span>
                  <span>真知灼见·青年讲者优秀临床案例征集比赛</span>
                </div>
              </div>
              <div className={[style.TextRow, "childcenter"].join(" ")}>
                2019青年讲者优秀病例征文平台
              </div>
              
            </div>
            <div className={[style.TipsGroup,'childcenter childcolumn'].join(' ')}>
              <span>您尚未在平台注册</span>
              <span>请使用微信扫描二维码进行注册</span>
            </div>
            <div className={style.RegQR}>
              <img src={mobileregisterqr} alt=""/>
            </div>

          </div>

          <div className={[style.BackgroundBox,'childcenter childcolumn childcontentend'].join(' ')}>
            <img src={earth} className={style.Earth} alt=""/>
          </div>
          {/* <img className={style.boxbg} src={topbg} ref='boxbg' style={{'--bodywidth':window.document.body.clientWidth + 'px'}} />    */}
        </div>
      </div>
    );
  }
}
export default UserReg;
