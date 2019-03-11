import React, { Component } from "react";
import style from "./UploadCase.scss";
import DarkBox from "components/DarkBox";

import assetsicon from "assets/assetsicon.png";
import Success from "assets/Success.png";
import Error from "assets/Error.png";

import PropTypes from "prop-types";

import {api} from 'common/app'

const fileaccept = "*";
let uploadBarInter;
let alertInter;
export class UploadCase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AlertTips: {
        show: false,
        status: null,
        msg: ""
      },
      file: {
        value:null,
        name:null,
      },
      loading: false,
      loaded: 0,
      AjaxDone:false,
    };
    this.refreshProps = this.refreshProps.bind(this);
    this.Subimt = this.Subimt.bind(this);
    this.clickUpload = this.clickUpload.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
  }
  componentWillReceiveProps(nextprops) {
    this.refreshProps(nextprops);
  }
  componentDidMount() {
    this.refreshProps(this.props);
  }
  refreshProps(props) {}
  Subimt() {
    clearInterval(uploadBarInter);
    let self = this;
    this.state.loading = true;
    this.state.loaded = 0;
    this.setState(this.state);
    uploadBarInter = setInterval(() => {
      if (self.state.loaded >= 100) {
        self.state.loaded = 100;
        self.state.loading = false;
        self.state.AlertTips.show = true;
        
        alertInter = setTimeout(() => {
          self.context.HandleFileLoad( null);
        }, 2000);
        clearInterval(uploadBarInter);
      } else {
        if (self.state.loaded >= 50) {
          if (self.state.AjaxDone) {
            self.state.loaded += Math.random() * 10;
          }
        } else {
          self.state.loaded += Math.random() * 10;
        }
      }
      this.setState(this.state);
    }, 100);
    
    let formdata = new FormData();
    formdata.append('file',this.state.file.value)
    api.uploadCase(formdata).then(res=>{
      if (res.code==200) {
        self.state.AjaxDone = true;
        self.state.AlertTips.status = "success";
        self.state.AlertTips.msg = "正在您跳转-请稍后";
        self.setState(self.state);
      }else{
        clearInterval(uploadBarInter);
        self.state.loaded = 0;
        self.state.loading = false;
        self.state.AlertTips = {
          show: true,
          status: 'err',
          msg: res.msg
        }
        self.setState(self.state);
        alertInter = setTimeout(() => {
          self.state.AlertTips = {
            show: false,
            status: null,
            msg: null
          }
          self.setState(self.state);
        }, 2000);
      }
    },err=>{

    })
  }
  clickUpload() {
    this.refs.fileinput.click();
  }
  onFileChange(e) {
    let self = this;
    this.state.file.value = e.target.files[0]?e.target.files[0]:this.state.file.value;
    this.state.file.name = e.target.files[0]?e.target.files[0].name:this.state.file.name;
    e.target.value = '';
    
    this.setState(this.state);
  }
  componentWillUnmount() {
    clearInterval(uploadBarInter);
    clearTimeout(alertInter);
  }
  render() {
    return (
      <DarkBox>
        {this.state.AlertTips.show ? (
          <div
            className={[style.TipsAlertBox, "childcenter", "childcolumn"].join(
              " "
            )}>
            <img
              src={this.state.AlertTips.status == "success" ? Success : Error}
              alt=""
            />
            <span>
              {this.state.AlertTips.status == "success"
                ? "上传成功"
                : "上传失败"}
            </span>
            <span>
              {this.state.AlertTips.status == "success"
                ? "正在您跳转-请稍后"
                : this.state.AlertTips.msg}
            </span>
          </div>
        ) : (
          ""
        )}
        <div
          className={[style.UploadCaseBox, "childcenter", "childcolumn"].join(
            " "
          )}>
          <div
            className={style.CloseButton}
            onClick={this.context.HandleFileLoad.bind(this, null)}
          />
          <div className={style.UploadTitle}>上传案例</div>
          <div className={style.UploadTips}>点击下框空白处上传您的案例，只支持pdf文件</div>
          <div
            className={[style.UploadButton, "childcenter", "childcolumn"].join(
              " "
            )}
            onClick={this.clickUpload}>
            <div
              className={[style.LoaderBar, "childcenter"].join(" ")}
              style={{ width: this.state.loaded + "%" }}>
              {Math.floor(this.state.loaded)}%
            </div>
            {this.state.file.value ? (
              <div
                className={[style.FileIcon, "childcenter", "childcolumn"].join(
                  " "
                )}>
                <img src={assetsicon} alt="" />
                <span className={[style.FileName,'childcenter'].join(' ')}>
                  {this.state.loading
                    ? "上传中"
                    : this.state.loaded == 100
                    ? "上传完成"
                    : this.state.file.name}
                </span>
              </div>
            ) : (
              <div className={style.AddButton} />
            )}
            <input
              type="file"
              accept={fileaccept}
              className={style.hidden}
              ref={"fileinput"}
              onChange={this.onFileChange}
            />
          </div>
          <div
            className={[
              style.SubmitButton,
              this.state.file.value ? "" : style.unloadFile,
              "childcenter"
            ].join(" ")}
            onClick={this.state.file.value ? this.Subimt : ()=>{}}>
            确定
          </div>
        </div>
      </DarkBox>
    );
  }
}
UploadCase.contextTypes = {
  HandleFileLoad: PropTypes.func
};
export default UploadCase;
