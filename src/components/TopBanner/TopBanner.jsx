import React, { Component } from 'react'
import style from './TopBanner.scss'
import headshot from './imgs/headshot.jpg'
import logo from './imgs/logo.png'
import {api} from 'common/app'
  
export class TopBanner extends Component {
constructor(props) {
  super(props);
  this.state = {
    userinfo:null,
  };
     this.refreshProps = this.refreshProps.bind(this);
     this.getUserInfo = this.getUserInfo.bind(this);
     this.jumpUrl = this.jumpUrl.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
  this.getUserInfo();
}
refreshProps(props) {
  
}
getUserInfo(){
    switch (window.location.hash.split('/')[2]) {
      case 'user':
        api.getUserInfo().then(res=>{
          if (res.code == 200) {
            this.state.userinfo = res.data;
          }else{
            console.log(res.msg);
          }
          this.setState(this.state);
        },err=>{
          console.log(err);
        });
        break;
      case 'rateruser':
        api.getRaterInfo().then(res=>{
          if (res.code == 200) {
            this.state.userinfo = res.data;
          }else{
            console.log(res.msg);
          }
          this.setState(this.state);
        },err=>{
          console.log(err);
        });
        break;
      default:
        break;
    }
    
  }
jumpUrl(){
  api.logout().then(res=>{
    if (res.code == 200) {
      switch (window.location.hash.split('/')[2]) {
        case 'user':
          window.location.hash = '#/ulogin';
          break;
        case 'rateruser':
          window.location.hash = '#/rlogin';
          break;
        default:
          break;
      }
    }else{
      alert(res.msg)
    }
  },err=>{
    console.log(err);
  })
  
}
render() {
  return (
    <div className={[style.TopBannerBox,'childcenter'].join(' ')}>
        <div className={[style.BannerDetial,'childcenter'].join(' ')}>
            <div className={[style.GroupBox,'childcenter','childcontentstart'].join(' ')}>
                
                <div className={[style.TextSlogan,'childcenter'].join(' ')}>
                  <div className={style.Logo}>
                    <img src={logo} alt=""/>
                  </div>
                  <div className={[style.TextGroup,'childcenter childcolumn childalignstart'].join(' ')}>
                    <span>2019全国婴幼儿牛奶蛋白过敏膳食管理规范化培训项目</span>
                    <span>真知灼见·青年讲者优秀临床案例征集比赛</span>
                  </div>
                </div>
            </div>
            <div className={[style.HandleBox,'childcenter','childcontentend'].join(' ')}>
                {this.state.userinfo?<div className={[style.UserInfo,'childcenter'].join(' ')}>
                    <div className={style.UserHeadShot}>
                        <img src={this.state.userinfo.headurlimg} alt=""/>
                    </div>
                    <div className={style.UserName}>
                        {this.state.userinfo.name}
                    </div>
                    <div className={style.ExitButton} onClick={this.jumpUrl}>退出</div>
                </div>:<div className={[style.UserInfo,'childcenter'].join(' ')} onClick={this.jumpUrl}>
                    <div className={style.ExitButton}>去登录</div>
                </div>}
            </div>
        </div>
    </div>
   )
   }
}
export default TopBanner