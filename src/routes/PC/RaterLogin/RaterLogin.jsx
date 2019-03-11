import React, { Component } from "react";
import style from "./RaterLogin.scss";
import {api} from 'common/app'

import topbg from "assets/topbg.png";
import logo from "assets/logo.png";
import earth from "assets/earth.png";

export class RaterLogin extends Component {
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
    this.Login = this.Login.bind(this);
    this.HandleInputChange = this.HandleInputChange.bind(this);
  }
  componentWillReceiveProps(nextprops) {
    this.refreshProps(nextprops);
  }
  componentDidMount() {
    this.refreshProps(this.props);
    this.setbgBoxOffset();
  }
  refreshProps(props) {}
  setbgBoxOffset(){
      // console.log(this.refs.boxbg.offsetTop,this.refs.boxbg.offsetLeft);
      // this.state.bgboxoffset.top = -this.refs.boxbg.offsetTop + 'px';
      // this.setState(this.state);
  }
  Login(){
    if (this.state.username&&this.state.userpw) {
      api.raterLogin(this.state.username,this.state.userpw).then(res=>{
        if (res.code == 200) {
          this.props.history.push('/pc/rateruser')
        }else{
          alert(res.msg)
        }
      },err=>{
  
      })
    }else{
      alert('请输入正确的账号及密码')
    }
    
  }
  HandleInputChange(type,e){
    this.state[type] = e.target.value;
    this.setState(this.state);
  }
  render() {
    return (
      <div className={[style.RaterLoginBox, "childcenter"].join(" ")}>
        <img src={topbg} className={style.Topbkg} alt="" />
        <div className={[style.LoginBox,'childcenter'].join(' ')} >
        {/* style={{backgroundImage:'url('+topbg+')'}} */}
          <div
            className={[style.LoginForm, "childcenter", "childcolumn"].join(
              " "
            )}>
            <div className={style.TitleBox}>
              <div className={[style.TextRow, "childcenter"].join(" ")}>
                <img src={logo} className={style.logo}/> 全国婴幼儿牛奶蛋白过敏膳食管理规范化培训项目
              </div>
              <div className={[style.TextRow, "childcenter"].join(" ")}>
                2019青年讲者优秀病例征文平台
              </div>
              <div className={[style.TextRow, "childcenter"].join(" ")}>
                欢迎登录
              </div>
            </div>

            <div
              className={[
                style.FormInputGroup,
                "childcenter",
                "childcolumn"
              ].join(" ")}>
              <div className={[style.InputBox, "childcenter"].join(" ")}>
                <div
                  className={[
                    style.InputName,
                    "childcenter",
                    "childcontentstart"
                  ].join(" ")}>
                  账号
                </div>
                <div className={style.InputValue}>
                  <input onChange={this.HandleInputChange.bind(this,'username')} type="text" />
                </div>
              </div>
              <div className={[style.InputBox, "childcenter"].join(" ")}>
                <div
                  className={[
                    style.InputName,
                    "childcenter",
                    "childcontentstart"
                  ].join(" ")}>
                  密码
                </div>
                <div className={style.InputValue}>
                  <input onChange={this.HandleInputChange.bind(this,'userpw')} type="password" />
                </div>
              </div>
            </div>

            <div className={[style.LoginButton, "childcenter"].join(" ")} onClick={this.Login}>
              确定
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
export default RaterLogin;
