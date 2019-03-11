import React, { Component } from "react";
import style from "./UploadCase.scss";
import {api} from 'common/app'
import MobileTipAlert from 'components/MobileTipAlert'
import PropTypes from "prop-types";

let uploadBarInter;
export class UploadCase extends Component {
  constructor(props) {
    super(props);
    this.state = {
        Uploading:false,
        loaded:0,
        loading:false,
        AjaxDone:false,
    };
    this.refreshProps = this.refreshProps.bind(this);
    this.fileClick = this.fileClick.bind(this);
    this.fileChange = this.fileChange.bind(this);
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
  }
  fileChange(e){
    // if (!e.target.files[0]) return;
    let file = e.target.files[0];
    let formdata = new FormData();
    e.target.value = '';
    formdata.append('file',file);
    api.uploadCase(formdata).then(res=>{
        if (res.code == 200) {
            
        }else{
            alert(res.msg);
            this.state.loaded = 0;
            this.state.loading = false;
            this.setState(this.state);
            clearInterval(uploadBarInter);
        }
        this.state.AjaxDone = true;
    },err=>{

    });
    let self = this;
    this.state.loaded = 0;
    this.state.AjaxDone = false;
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
  render() {
    return (
      <div
        onClick={this.fileClick}
        className={[
          style.Button,
          "childcenter",
          "childcolumn"
        ].join(" ")}>
        <span>新增</span>
        <span>案例</span>
        <div className={style.loadbar} style={{height:(this.state.loaded==0?100:this.state.loaded)+'%'}}></div>
        <input type="file" onChange={this.fileChange} accept='*' ref='file' className={style.hidden}/>
      </div>
    );
  }
}
UploadCase.contextTypes = {
  refreshList: PropTypes.func
};
export default UploadCase;
