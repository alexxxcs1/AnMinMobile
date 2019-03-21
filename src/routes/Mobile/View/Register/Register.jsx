import React, { Component } from "react";
import style from "./Register.scss";
import MobileTipAlert from "components/MobileTipAlert";
import CitySelect from "components/CitySelect";
import MobileSelect from "components/MobileSelect";
import AuthBox from '../../components/AuthBox'
import AdView from '../../components/AdView'

import logo from "assets/logo.png";
import Success from "assets/Success.png";
import Error from "assets/Error.png";
import mobileregisterlogo from "assets/mobileregisterlogo.png";


import { api } from "common/app";

let timmer;
let jumpertimmer;

let getcodeTimeout=null;
export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getCodeCutdown:60,
      InformedConsentStatus: false,
      RegisterResult: {
        alertshow: false,
        result: null,
        value: ""
      },
      CheckCodeAlert:{
        alertshow: false,
      },
      formdata: {
        name: "",
        province: "",
        city: "",
        district: "",
        tel: "",
        code: "",
        office:"",
        title:"",
        age:"",
        hospital:"",
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
    this.onInputSelect = this.onInputSelect.bind(this);
    this.GetPublicCode = this.GetPublicCode.bind(this);
    this.CheckCodeConfirm = this.CheckCodeConfirm.bind(this);
    this.HandleCheckCodeAlert = this.HandleCheckCodeAlert.bind(this);
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
  onInputFocus() {
    clearTimeout(timmer);
  }
  onInputBlur() {
    timmer = setTimeout(() => {
      document.documentElement.scrollTop = 0;
      window.pageYOffset = 0;
      document.body.scrollTop = 0;
    }, 500);
  }
  onInputChange(type, e) {
    if (e.target.value.length > 11 && type === "tel") {
      e.target.value = e.target.value.slice(0, 11);
    }
    this.state.formdata[type] = e.target.value;
    this.setState(this.state);
  }
  HandleSubmit() {
    let values = "";
    /**
        name: "",
        province: "",
        city: "",
        district: "",
        tel: "",
        code: "",
        office:"",
        title:"",
        age:"",
        hospital:"", 
    */
    switch (false) {
      case Boolean(this.state.formdata.name):
        values = "姓名";
        break;
      case Boolean(this.state.formdata.province):
        values = "省市区";
        break;
      case Boolean(this.state.formdata.city):
        values = "省市区";
        break;
      case Boolean(this.state.formdata.district):
        values = "省市区";
        break;
      case Boolean(this.state.formdata.hospital):
        values = "医院";
        break;
      case Boolean(this.state.formdata.office):
        values = "科室";
        break;
      case Boolean(this.state.formdata.title):
        values = "职称";
        break;
      case Boolean(this.state.formdata.age):
        values = "年限";
        break;
      case Boolean(this.state.formdata.tel):
        values = "手机号";
        break;
      case Boolean(this.state.formdata.code):
        values = "邀请码";
        break;
    }
    if (values === "") {
      api
        .userRegister(
          this.state.formdata.name,
          this.state.formdata.province,
          this.state.formdata.city,
          this.state.formdata.district,
          this.state.formdata.tel,
          this.state.formdata.code,
          this.state.formdata.office,
          this.state.formdata.title,
          this.state.formdata.age,
          this.state.formdata.hospital,
        )
        .then(
          res => {
            console.log(res);
            if (res.code === 200) {
              this.state.RegisterResult = {
                alertshow: true,
                result: true,
                value: res.msg
              };
              let self = this;
              jumpertimmer = setTimeout(() => {
                self.props.history.push("/mobile/user");
              }, 1000);
            } else {
              this.state.RegisterResult = {
                alertshow: true,
                result: false,
                value: res.msg
              };
            }
            this.setState(this.state);
          },
          err => {}
        );
    } else {
      this.state.RegisterResult = {
        alertshow: true,
        result: false,
        value: values + "不能为空"
      };
    }
    this.setState(this.state);
  }
  HandleAlertShow(boolean) {
    this.state.RegisterResult.alertshow = boolean;
    this.setState(this.state);
  }
  onCitySelect(Province, City, Region) {
    console.log(Province, City, Region);
    this.state.formdata.province = Province;
    this.state.formdata.city = City;
    this.state.formdata.district = Region;
    this.setState(this.state);
  }
  onInputSelect(type,keyvalue){
    this.state.formdata[type] = keyvalue.value;
    this.setState(this.state);
    console.log(this.state.formdata);
    
  }
  componentWillUnmount() {
    clearTimeout(timmer);
    clearTimeout(jumpertimmer);
  }
  GetPublicCode(){
    if (this.state.formdata.tel) {
      let self = this;
      this.state.getCodeCutdown = 59;
      this.setState(this.state);
      getcodeTimeout = setInterval(() => {
        self.state.getCodeCutdown -= 1;
        self.setState(self.state);
        if (self.state.getCodeCutdown<=0) {
          self.state.getCodeCutdown = 60;
          self.setState(self.state);
          clearInterval(getcodeTimeout);
        }
      }, 1000);
    }else{
      alert('请先填写手机号！')
    }
  }
  componentWillUnmount(){
    clearInterval(getcodeTimeout);
  }
  CheckCodeConfirm(){
    this.HandleCheckCodeAlert(false);
    this.HandleSubmit();
  }
  HandleCheckCodeAlert(boolean){
    this.state.CheckCodeAlert.alertshow = boolean;
    this.setState(this.state);
  }
  render() {
    return (
      <div className={[style.ContentBox,'childcenter childcolumn childcontentstart'].join(" ")}>
        <AdView />
        <AuthBox />
        {this.state.RegisterResult.alertshow ? (
          <div className={[style.FixLayer, "childcenter"].join(" ")}>
            {this.state.RegisterResult.result === true ? (
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
            {this.state.RegisterResult.result === false ? (
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
        
        {this.state.CheckCodeAlert.alertshow? <div className={[style.FixLayer, "childcenter"].join(" ")}>
          <MobileTipAlert onClose={this.HandleCheckCodeAlert.bind(this, false)}>
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
                <span>请确定您填写的邀请码正确</span>
                
                <div className={[style.CheckCodeButtonGroup,'childcenter'].join(' ')}>
                  <div className={[style.Button,'childcenter'].join(' ')} onClick={this.HandleCheckCodeAlert.bind(this,false)}>
                    重新填写
                  </div>
                  <div className={[style.Button,'childcenter'].join(' ')} onClick={this.CheckCodeConfirm}>
                    确定
                  </div>
                </div>
                
              </div>
            </div>
          </MobileTipAlert>
        </div>:''}

        <div className={style.TitleLogo}>
            <img src={mobileregisterlogo} alt=""/>
        </div>
        <div
          className={[style.RegisterBox, "childcenter childcolumn"].join(
            " "
          )}>
          {/* <div
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
          </div> */}
          
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
                placeholder="请填写您的姓名"
                className={style.Inputs}
                onBlur={this.onInputBlur}
                onFocus={this.onInputFocus}
                onChange={this.onInputChange.bind(this, "name")}
              />
            </div>
            <div className={[style.InputBox, "childcenter"].join(" ")}>
              <div
                className={[
                  style.InputTitle,
                  "childcenter",
                  "childcontentstart"
                ].join(" ")}>
                省市
              </div>
              <div className={style.Inputs}>
                <CitySelect onSelect={this.onCitySelect} />
              </div>
            </div>
            <div className={[style.InputBox, "childcenter"].join(" ")}>
              <div
                className={[
                  style.InputTitle,
                  "childcenter",
                  "childcontentstart"
                ].join(" ")}>
                医院
              </div>
              <div className={style.Inputs}>
                
                <input
                value={this.state.formdata.hospital}
                type="text"
                placeholder="请填写您所在的医院"
                className={style.Inputs}
                onBlur={this.onInputBlur}
                onFocus={this.onInputFocus}
                onChange={this.onInputChange.bind(this, "hospital")}
                />
              </div>
            </div>
            <div className={[style.InputBox, "childcenter"].join(" ")}>
              <div
                className={[
                  style.InputTitle,
                  "childcenter",
                  "childcontentstart"
                ].join(" ")}>
                科室
              </div>
              <div className={style.Inputs}>
                <input
                  value={this.state.formdata.office}
                  type="text"
                  placeholder="请填写您所在的科室"
                  className={style.Inputs}
                  onBlur={this.onInputBlur}
                  onFocus={this.onInputFocus}
                  onChange={this.onInputChange.bind(this, "office")}
                  />
              </div>
            </div>
            <div className={[style.InputBox, "childcenter"].join(" ")}>
              <div
                className={[
                  style.InputTitle,
                  "childcenter",
                  "childcontentstart"
                ].join(" ")}>
                职称
              </div>
              <div className={style.Inputs}>
                <MobileSelect placeholder='请选择您的职称' option={{
                  '1':'主任医师',
                  '2':'主治医师',
                  '3':'副主任医师',
                  '4':'其他',
                }} onSelect={this.onInputSelect.bind(this,'title')}/>
              </div>
            </div>
            <div className={[style.InputBox, "childcenter"].join(" ")}>
              <div
                className={[
                  style.InputTitle,
                  "childcenter",
                  "childcontentstart"
                ].join(" ")}>
                年限
              </div>
              <div className={style.Inputs}>
                <MobileSelect placeholder='请选择您的工作年限' option={{
                    '1':'1年-5年',
                    '2':'5年-10年',
                    '3':'10年-15年',
                    '4':'15年以上',
                  }} onSelect={this.onInputSelect.bind(this,'age')}/>
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
                placeholder="请填写您的手机号码"
                type="tel"
                type="number"
                className={style.Inputs}
                onBlur={this.onInputBlur}
                onFocus={this.onInputFocus}
                onChange={this.onInputChange.bind(this, "tel")}
              />
            </div>
            <div className={[style.InputBox, "childcenter"].join(" ")} onClick={this.GetPublicCode}>
              <div className={[style.PhoneCodeButton, "childcenter"].join(" ")}>{this.state.getCodeCutdown === 60?'丨点击获取临床儿科杂志社邀请码丨':'重新发送邀请码剩余'+this.state.getCodeCutdown+'秒'}</div>
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
                placeholder="请填写销售/专家/杂志社邀请码"
                type="text"
                className={style.Inputs}
                onBlur={this.onInputBlur}
                onFocus={this.onInputFocus}
                onChange={this.onInputChange.bind(this, "code")}
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
            onClick={this.HandleCheckCodeAlert}>
            确定
          </div>
        </div>
      </div>
    );
  }
}
export default Register;
