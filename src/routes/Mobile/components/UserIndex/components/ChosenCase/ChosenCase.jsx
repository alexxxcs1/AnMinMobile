import React, { Component } from "react";
import style from "./ChosenCase.scss";
import Comment from './components/Comment'

import {api} from 'common/app'
import PropTypes from "prop-types";

let scrollbuttontimers;
let timers;
let onHandleScroll = false;
export class ChosenCase extends Component {
  constructor(props) {
    super(props);
    this.state = {
        scrollButton:false,
      scrollTopInterval: null,
      HandleButtonShow: true,
      data: [],
      contentBoxOption:{
        show:false,
        content:null,
      }
    };
    this.refreshProps = this.refreshProps.bind(this);
    this.getData = this.getData.bind(this);
    this.pushData = this.pushData.bind(this);
    this.createList = this.createList.bind(this);
    this.setScrollListener = this.setScrollListener.bind(this);
    this.ScrolltoTop = this.ScrolltoTop.bind(this);
    this.HandleCommentBox = this.HandleCommentBox.bind(this);
  }
  getChildContext() {
    return {
        refreshList: this.getCaseList,
        handleComment: this.HandleCommentBox
    };
  }
  componentWillReceiveProps(nextprops) {
    this.refreshProps(nextprops);
  }
  componentDidMount() {
    this.refreshProps(this.props);
    this.getCaseList();
    // this.refs.scrollbody.addEventListener("scroll", this.setScrollListener);
    // this.refs.scrollbody.addEventListener("touchmove", this.onTouchmove, {
    //   passive: false //  禁止 passive 效果
    // });
  }
  refreshProps(props) {}
  getCaseList(){
    api.getChosenCase().then(res=>{
        console.log(res);
        if (res.code == 200) {
            this.state.data = res.data?res.data:[];
        }else{
            alert(res.msg)
        }
        this.setState(this.state);
    },err=>{

    })
}
  setScrollListener(e) {
    if (
      e.currentTarget.clientHeight + e.currentTarget.scrollTop + 50 >
      e.currentTarget.scrollHeight
    ) {
      clearTimeout(timers);
      let self = this;
      timers = setTimeout(() => {
        self.pushData();
      }, 300);
    }
    if (e.currentTarget.scrollTop>100) {
        clearTimeout(scrollbuttontimers);
        let self = this;
        scrollbuttontimers = setTimeout(() => {
            self.setState({
                scrollButton:true,
            })
        }, 100);
    }else{
        clearTimeout(scrollbuttontimers);
        let self = this;
        scrollbuttontimers = setTimeout(() => {
            self.setState({
                scrollButton:false,
            })
        }, 100);
    }
  }
  //mock data
  getData() {
    for (let z = 0; z < 10; z++) {
      this.state.data.push({
        id: z,
        title: "安敏感·健行婴幼儿奶粉分析安敏感·健行婴幼儿奶粉分析",
        updatetime: "2018-10-31 21:04"
      });
    }
    this.setState(this.state);
  }
  //mock data
  pushData() {
    let result = [];
    for (let z = 0; z < 10; z++) {
      result.push({
        id: z,
        title: "安敏感·健行婴幼儿奶粉分析安敏感·健行婴幼儿奶粉分析",
        updatetime: "2018-10-31 21:04"
      });
    }
    this.state.data.push(...result);
    this.setState(this.state);
  }
  createList() {
    let result = [];
    for (let z = 0; z < this.state.data.length; z++) {
      result.push(
        <div
          className={[
            style.CaseCard,
            "childcenter",
            "childcolumn",
            "childalignstart"
          ].join(" ")}>
          <div className={style.CaseTitle}>
            {" "}
            {this.state.data[z].name}
          </div>
          <div className={style.CaseUpdateTime}>更新时间：{new Date(this.state.data[z].updated_at * 1000).format('yyyy-MM-dd hh:mm')}</div>
          <div className={"flexbox"} />
          <div
            className={[
              style.ButtonGroup,
              "childcenter",
              "childcontentend"
            ].join(" ")}>
            <div
              className={[
                style.HandleButton,
                style.Colorful,
                "childcenter"
              ].join(" ")}>
              <a href={this.state.data[z].filePath}>查看案例</a>
            </div>
            {this.state.data[z].content?<div
              className={[
                style.HandleButton,
                style.Colorful,
                "childcenter"
              ].join(" ")}
              onClick={this.HandleCommentBox.bind(this,{
                show:true,
                content:this.state.data[z].content
              })}>
              查看专家评语
            </div>:''}
          </div>
        </div>
      );
    }
    return result;
  }
  HandleCommentBox(option){
    this.state.contentBoxOption = option;
    this.setState(this.state);
  }
  ScrolltoTop() {
    clearInterval(this.scrollTopInterval);
    this.scrollTopInterval = setInterval(() => {
      onHandleScroll = true;
      this.refs.scrollbody.scrollTop = this.refs.scrollbody.scrollTop * 0.8;
      if (this.refs.scrollbody.scrollTop <= 1) {
        this.refs.scrollbody.scrollTop = 0;
        clearInterval(this.scrollTopInterval);
        onHandleScroll = false;
      }
    }, 50);
    // this.refs.scrollbody.scrollTop = 0;
  }
  onTouchmove(event) {
    if (onHandleScroll) {
      event.preventDefault();
    }
  }
  componentWillUnmount() {
    this.refs.scrollbody.scrollTop = 0;
    clearInterval(this.scrollTopInterval);
    onHandleScroll = false;
    clearInterval(this.scrollTopInterval);
  }
  render() {
    return (
      <div className={style.ListBox} ref={"scrollbody"}>
        {this.state.contentBoxOption.show?<Comment content={this.state.contentBoxOption.content}/>:''}
        <div
          className={[style.ListBody, "childcenter", "childcolumn"].join(" ")}>
          {this.state.data.length == 0
            ? "这里什么都没有，快去投稿吧！"
            : this.createList()}
        </div>
        <div className={[style.HandleGroupBox, "childcenter"].join(" ")}>
          {/* <div className={this.state.HandleButtonShow?style.HandleButtonHide:style.HandleButtonShow} onClick={this.ShowHandleButton}></div>
            <div className={[style.Button,this.state.HandleButtonShow?'':style.hidden,'childcenter','childcolumn'].join(' ')}>
                <span>新增</span>
                <span>案例</span>
            </div>
            <div className={[style.Button,this.state.HandleButtonShow?'':style.hidden,'childcenter','childcolumn'].join(' ')}>
                <span>上传</span>
                <span>视频</span>
            </div> */}
          {this.state.scrollButton?<div className={style.ScrollToTop} onClick={this.ScrolltoTop}></div>:''}
        </div>
      </div>
    );
  }
}
ChosenCase.childContextTypes = {
  refreshList: PropTypes.func,
  handleComment: PropTypes.func,
};
export default ChosenCase;
