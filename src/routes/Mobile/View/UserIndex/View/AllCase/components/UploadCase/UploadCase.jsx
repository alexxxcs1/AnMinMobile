import React, { Component } from "react";
import style from "./UploadCase.scss";
import {api} from 'common/app'
import MobileTipAlert from 'components/MobileTipAlert'
import PropTypes from "prop-types";

import Error from "assets/Error.png";

let uploadBarInter;
export class UploadCase extends Component {
  constructor(props) {
    super(props);
    this.state = {
        Uploading:false,
        loaded:0,
        loading:false,
        AjaxDone:false,
        TipsAlertShow:false,
    };
    this.refreshProps = this.refreshProps.bind(this);
    this.fileClick = this.fileClick.bind(this);
    this.fileChange = this.fileChange.bind(this);
    this.HandleTipAlert = this.HandleTipAlert.bind(this);
  }
  componentWillReceiveProps(nextprops) {
    this.refreshProps(nextprops);
  }
  componentDidMount() {
    this.refreshProps(this.props);
  }
  refreshProps(props) {}
  fileClick(){
      this.refs.file.click();
      this.HandleTipAlert(true);
  }
  fileChange(e){
    // if (!e.target.files[0]) return;
    let file = e.target.files[0];
    console.log(file);
    
    let formdata = new FormData();
    e.target.value = '';
    formdata.append('file',file);
    api.uploadCase(formdata).then(res=>{
        if (res.code === 200) {
            this.context.refreshList();
        }else{
            alert(res.msg);
            this.state.loaded = 0;
            this.state.loading = false;
            
            this.setState(this.state);
            clearInterval(uploadBarInter);
        }
        this.state.AjaxDone = true;
        this.state.TipsAlertShow = false;
        this.setState(this.state);
    },err=>{

    });
    let self = this;
    this.state.loaded = 0;
    this.state.AjaxDone = false;
    this.state.loading = true;
    this.setState(this.state);
    uploadBarInter = setInterval(() => {
        if (self.state.loaded >= 100) {
            self.state.loaded = 100;
            self.state.loading = false;
            this.context.refreshList();
            clearInterval(uploadBarInter);
          } else {
            if (self.state.loaded >= 50) {
              if (self.state.AjaxDone) {
                self.state.loaded += Math.random() * 20;
              }
            } else {
              self.state.loaded += Math.random() * 20;
            }
          }
          self.setState(this.state);
    }, 200);
  }
  HandleTipAlert(boolean){
    this.state.TipsAlertShow = boolean;
    this.setState(this.state);
  }
  render() {
    return (
      [this.state.TipsAlertShow?
      <div className={[style.FixedBox,'childcenter'].join(' ')}>
        <MobileTipAlert onClose={this.HandleTipAlert.bind(this, false)}>
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
              <span>支持扩展名pdf文件</span>
              <span>文件大小不超过30M</span>
            </div>
          </div>
        </MobileTipAlert>
      </div>:'',
      <div
        onClick={this.fileClick}
        className={[
          style.Button,
          "childcenter",
          "childcolumn"
        ].join(" ")}>
        {this.state.loading?'上传中':[<span>新增</span>,
        <span>案例</span>]}
        <div className={style.loadbar} style={{height:(this.state.loaded===0?100:this.state.loaded)+'%'}}></div>
        <input type="file" onChange={this.fileChange} accept='*' ref='file' className={style.hidden}/>
      </div>]
    );
  }
}
UploadCase.contextTypes = {
  refreshList: PropTypes.func
};
export default UploadCase;
