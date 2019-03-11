import React, { Component } from "react";
import style from "./Register.scss";
import MobileTipAlert from "components/MobileTipAlert";
import CitySelect from "components/CitySelect";

import logo from "assets/logo.png";
import Success from "assets/Success.png";
import Error from "assets/Error.png";

import { api } from "common/app";

let timmer;
let jumpertimmer;

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      InformedConsentStatus: false,
      RegisterResult: {
        alertshow: false,
        result: null,
        value: ""
      },
      formdata:{
        name:'',
        province:'',
        city:'',
        district:'',
        tel:'',
        code:'',
      }
    };
    this.refreshProps = this.refreshProps.bind(this);
    this.HandleInformedConsent = this.HandleInformedConsent.bind(this);
    this.HandleSubmit = this.HandleSubmit.bind(this);
    this.onInputFocus = this.onInputFocus.bind(this);
    this.onInputBlur = this.onInputBlur.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.HandleAlertShow = this.HandleAlertShow.bind(this);
    this.onCitySelect = this.onCitySelect.bind(this);
  }
  componentWillReceiveProps(nextprops) {
    this.refreshProps(nextprops);
  }
  componentDidMount() {
    this.refreshProps(this.props);
  }
  refreshProps(props) {}
  HandleInformedConsent() {
    this.state.InformedConsentStatus = !this.state.InformedConsentStatus;
    this.setState(this.state);
  }
  onInputFocus(){
    clearTimeout(timmer);
  }
  onInputBlur() {
    timmer = setTimeout(() => {
      document.documentElement.scrollTop = 0;
      window.pageYOffset = 0;
      document.body.scrollTop = 0;
    }, 500);
  }
  onInputChange(type,e){
    if (e.target.value.length>11&&type == 'tel') {
      e.target.value = e.target.value.slice(0,11);
    }
    this.state.formdata[type] = e.target.value;
    this.setState(this.state);
  }
  HandleSubmit() {
      let values = '';
      console.log(Boolean(this.state.formdata.name));
      
      switch (false) {
        case Boolean(this.state.formdata.name):
          values = '姓名';
          break;
        case Boolean(this.state.formdata.tel):
          values = '电话';
          break;
        case Boolean(this.state.formdata.province):
          values = '省市区';
          break;
        case Boolean(this.state.formdata.city):
          values = '省市区';
          break;
        case Boolean(this.state.formdata.district):
          values = '省市区';
          break;
        case Boolean(this.state.formdata.code):
          values = '邀请码';
          break;
      }
      if (values == '') {
        api.userRegister(
          this.state.formdata.name,
          this.state.formdata.province,
          this.state.formdata.city,
          this.state.formdata.district,
          this.state.formdata.tel,
          this.state.formdata.code,
          ).then(res=>{
          console.log(res);
          if (res.code == 200) {
            this.state.RegisterResult = {
              alertshow: true,
              result: true,
              value: res.msg
            };
            let self = this;
            jumpertimmer = setTimeout(() => {
              self.props.history.push('/mobile/user/all')
            }, 1000);
          }else{
            this.state.RegisterResult = {
              alertshow: true,
              result: false,
              value: res.msg
            };
          }
          this.setState(this.state)
        },err=>{
    
        });
      }else{
        this.state.RegisterResult = {
          alertshow: true,
          result:false,
          value: values+"不能为空"
        };
      }
    this.setState(this.state);
  }
  HandleAlertShow(boolean) {
    this.state.RegisterResult.alertshow = boolean;
    this.setState(this.state);
  }
  onCitySelect(Province,City,Region){
    console.log(Province,City,Region);
    this.state.formdata.province = Province;
    this.state.formdata.city = City;
    this.state.formdata.district = Region;
    this.setState(this.state);
  }
  componentWillUnmount(){
    clearTimeout(timmer);
    clearTimeout(jumpertimmer);
  }
  render() {
    return (
      <div className={[style.ContentBox].join(" ")}>
        {this.state.RegisterResult.alertshow ? (
          <div className={[style.FixLayer, "childcenter"].join(" ")}>
            {this.state.RegisterResult.result == true ? (
              <MobileTipAlert onClose={this.HandleAlertShow.bind(this, false)}>
                <div
                  className={[
                    style.AlertInfoBox,
                    "childcenter",
                    "childcolumn"
                  ].join(" ")}>
                  <img src={Success} className={style.Status} alt="" />
                  <div
                    className={[
                      style.TextLayer,
                      "childcenter",
                      "childcolumn"
                    ].join(" ")}>
                    <span>注册成功</span>
                    <span>正在为您跳转，请稍后</span>
                  </div>
                </div>
              </MobileTipAlert>
            ) : (
              ""
            )}
            {this.state.RegisterResult.result == false ? (
              <MobileTipAlert onClose={this.HandleAlertShow.bind(this, false)}>
                <div
                  className={[
                    style.AlertInfoBox,
                    "childcenter",
                    "childcolumn"
                  ].join(" ")}>
                  <img src={Error} className={style.Status} alt="" />
                  <div
                    className={[
                      style.TextLayer,
                      "childcenter",
                      "childcolumn"
                    ].join(" ")}>
                    <span>注册失败</span>
                    <span>{this.state.RegisterResult.value}</span>
                  </div>
                </div>
              </MobileTipAlert>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
        <div
          className={[style.RegisterBox, "childcenter", "childcolumn"].join(
            " "
          )}>
          <div
            className={[style.ActTitle, "childcenter", style.textbox].join(
              " "
            )}>
            <img src={logo} className={style.logo} />
            全国婴幼儿牛奶蛋白过敏膳食管理规范化培训项目
          </div>
          <div
            className={[style.MainTitle, "childcenter", style.textbox].join(
              " "
            )}>
            2019青年讲者优秀病例征文平台
          </div>
          <div
            className={[style.Welcome, "childcenter", style.textbox].join(" ")}>
            欢迎注册
          </div>
          <div
            className={[style.InputGroup, "childcenter", "childcolumn"].join(
              " "
            )}>
            <div className={[style.InputBox, "childcenter"].join(" ")}>
              <div
                className={[
                  style.InputTitle,
                  "childcenter",
                  "childcontentstart"
                ].join(" ")}>
                姓名
              </div>
              <input
                value={this.state.formdata.name}
                type="text"
                placeholder='请输入您的姓名'
                className={style.Inputs}
                onBlur={this.onInputBlur}
                onFocus={this.onInputFocus}
                onChange={this.onInputChange.bind(this,'name')}
              />
            </div>
            <div className={[style.InputBox, "childcenter"].join(" ")}>
              <div
                className={[
                  style.InputTitle,
                  "childcenter",
                  "childcontentstart"
                ].join(" ")}>
                省市区
              </div>
              <div className={style.Inputs}>
                <CitySelect onSelect={this.onCitySelect}/>
              </div>
            </div>
            <div className={[style.InputBox, "childcenter"].join(" ")}>
              <div
                className={[
                  style.InputTitle,
                  "childcenter",
                  "childcontentstart"
                ].join(" ")}>
                手机号码
              </div>
              <input
                value={this.state.formdata.tel}
                placeholder='请填写您的手机号码'
                type="tel"
                type="number"
                className={style.Inputs}
                onBlur={this.onInputBlur}
                onFocus={this.onInputFocus}
                onChange={this.onInputChange.bind(this,'tel')}
              />
            </div>
            <div className={[style.InputBox, "childcenter"].join(" ")}>
              <div
                className={[
                  style.InputTitle,
                  "childcenter",
                  "childcontentstart"
                ].join(" ")}>
                邀请码
              </div>
              <input
                value={this.state.formdata.code}
                placeholder='请输入6位邀请码'
                type="text"
                className={style.Inputs}
                onBlur={this.onInputBlur}
                onFocus={this.onInputFocus}
                onChange={this.onInputChange.bind(this,'code')}
              />
            </div>
          </div>
          {/* <div
            className={[style.InformedConsent, "childcenter"].join(" ")}
            onClick={this.HandleInformedConsent}>
            <div
              className={[
                style.CheckBox,
                this.state.InformedConsentStatus ? style.ActCheckBox : ""
              ].join(" ")}
            />
            <span className={style.text}>
              我已经阅读并同意《用户知情同意书》
            </span>
          </div> */}
          <div
            className={[style.RegButton, "childcenter"].join(" ")}
            onClick={this.HandleSubmit}>
            确定
          </div>
        </div>
      </div>
    );
  }
}
export default Register;
