import React, { Component } from 'react'
import style from './MobileHome.scss'
import { HashRouter,Route,Switch,Redirect} from 'react-router-dom';
import AuthBox from './components/AuthBox'
import Register from './components/Register'
import UserIndex from './components/UserIndex'
import RaterIndex from './components/RaterIndex'
import shareicon from 'assets/shareicon.png'

import {api} from 'common/app'
  
export class MobileHome extends Component {
constructor(props) {
  super(props);
  this.state = {};
     this.refreshProps = this.refreshProps.bind(this);
     this.setShare = this.setShare.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
  this.setShare();
  window.document.title = '真知灼见';
}
refreshProps(props) {
  
}
setShare() {
  var share_url = window.location.href;
  var share_img =
    "http://meadjohnson-gz.rup-china.com/public/html/" +
    shareicon.split("/")[3];
  var share_title = "安敏·健行“真知灼见”2019青年讲者优秀案例征文平台";
  var share_content = "青年讲者优秀案例征文比赛";
  api.getShare(share_url).then(
    response => {
      window.wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: response.data.appId, // 必填，公众号的唯一标识
        timestamp: response.data.timestamp, // 必填，生成签名的时间戳
        nonceStr: response.data.nonceStr, // 必填，生成签名的随机串
        signature: response.data.signature, // 必填，签名，见附录1
        jsApiList: [
          "chooseImage",
          "onMenuShareTimeline",
          "onMenuShareAppMessage",
          "previewImage",
          "uploadImage",
          "checkJsApi",
          "onMenuShareTimeline",
          "onMenuShareAppMessage",
          "hideMenuItems",
          "startRecord",
          "stopRecord",
          "onVoiceRecordEnd",
          "playVoice",
          "pauseVoice",
          "onVoicePlayEnd",
          "uploadVoice",
          "downloadVoice"
        ]
      });
      window.wx.ready(function() {
        window.wx.onMenuShareAppMessage({
          title: share_title, // 分享标题
          desc: share_content, // 分享描述
          link: share_url, // 分享链接
          imgUrl: share_img, // 分享图标
          type: "link", // 分享类型,music、video或link，不填默认为link
          dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
          success: function() {
            // 用户确认分享后执行的回调函数
          },
          cancel: function() {
            // 用户取消分享后执行的回调函数
          }
        });

        window.wx.onMenuShareTimeline({
          title: share_title, // 分享标题
          desc: share_content, // 分享描述
          link: share_url, // 分享链接
          imgUrl: share_img, // 分享图标
          type: "link", // 分享类型,music、video或link，不填默认为link
          dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
          success: function() {
            // 用户确认分享后执行的回调函数
          },
          cancel: function() {
            // 用户取消分享后执行的回调函数
          }
        });
      });
      window.wx.error(function(res) {});
    },
    err => {}
  );
}
render() {
  return (
    <div className={style.MobileHomeBox}>
        <AuthBox />
        <Switch>
            <Route path='/mobile/register' component={Register} />
            <Route path='/mobile/user' component={UserIndex} />
            <Route path='/mobile/rateruser' component={RaterIndex} />
            <Redirect from="/" to="/mobile/user/all" />
        </Switch>
    </div>
   )
   }
}
export default MobileHome