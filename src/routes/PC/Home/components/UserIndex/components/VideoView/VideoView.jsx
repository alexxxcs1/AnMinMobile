import React, { Component } from 'react'
import DarkBox from "components/DarkBox";
import style from './VideoView.scss'
import PropTypes from "prop-types";
import {api} from 'common/app'
  
let LoadInterval = null;
export class VideoView extends Component {
constructor(props) {
  super(props);
  this.state = {
    video:'',
    loaded:0,
  };
  this.refreshProps = this.refreshProps.bind(this);
  this.onReturn = this.onReturn.bind(this);
  this.onReloader = this.onReloader.bind(this);
  this.onFileChange = this.onFileChange.bind(this);
  this.deleteVideo = this.deleteVideo.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
  this.state.video = this.props.video;
  this.setState(this.state);
  
}
refreshProps(props) {
  
}
onReturn(){
  this.context.HandleFileLoad(null);
}
onReloader(){
  this.refs.file.click();
}
onFileChange(e){
  let file = e.target.files[0];
  let formdata = new FormData();
  e.target.value='';
  formdata.append('file',file);
  this.state.uploading = true;
  this.state.ajaxdone = false;
  this.setState(this.state);
  clearInterval(LoadInterval);
  LoadInterval = setInterval(() => {
    
    if (this.state.loaded>=100) {
      this.state.loaded = 100;
      this.state.uploading = false;
      alert('重新上传成功！')
      clearInterval(LoadInterval);
    }else{
      if (this.state.ajaxdone) {
        this.state.loaded += Math.random()*10;
      }else{
        if (this.state.loaded>=60) {
          this.state.loaded += 0;
        }else{
          this.state.loaded += Math.random();
        }
      }
    }
    this.setState(this.state);
  }, 50);
  
  api.reUploadVideo(formdata).then(res=>{
    if (res.code==200) {
      this.state.video = res.data;
      this.state.ajaxdone = true;
      // this.state.uploading = false;
    }else{
      alert(res.msg)
      this.state.ajaxdone = true;
      this.state.uploading = false;
      this.state.loaded = 0;
      clearInterval(LoadInterval);
    }
    this.setState(this.state);
  },err=>{
    console.log(err);
  })
}
deleteVideo(){
  api.deleteVideo().then(res=>{
    console.log(res);
    if (res.code == 200) {
      this.context.HandleFileLoad(null);
    }else{
      alert(res.msg)
    }
  },err=>{
    console.log(err);
  })
}
componentWillUnmount(){
  clearInterval(LoadInterval);
}
render() {
  return (
    <DarkBox>
        <div className={style.VideoViewBox}>
          
          <div className={[style.VideoBox,'childcenter'].join(' ')}>
            <div className={[style.VideoBarBox,'childcenter'].join(' ')}>
              <video src={this.state.video} autoPlay controls ref='video'></video>
              <div className={[style.VideoHandleBox,'childcenter childcolumn'].join(' ')}>
                <div className={[style.HandleButton,'childcenter'].join(' ')} onClick={this.deleteVideo}>删除</div>
                {this.state.uploading?
                <div style={{background:'#333',overflow:'hidden'}} className={[style.HandleButton,'childcenter'].join(' ')} >
                  <div className={style.LoadBar} style={{width:this.state.loaded + '%'}}></div>
                  <div className={[style.ButtonValue,'childcenter'].join(' ')}>上传中</div> 
                </div>:<div className={[style.HandleButton,'childcenter'].join(' ')} onClick={this.onReloader}>重新上传</div>}
                <div className={[style.HandleButton,'childcenter'].join(' ')} onClick={this.onReturn}>返回</div>
              </div>
            </div>
          </div>
        </div>
        <input type="file" ref='file' accept='video/*' style={{display:'none'}} onChange={this.onFileChange}/>
    </DarkBox>
   )
   }
}
VideoView.contextTypes = {
  HandleFileLoad: PropTypes.func
};
export default VideoView