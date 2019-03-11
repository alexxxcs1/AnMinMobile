import React, { Component } from 'react'
import style from './AllCase.scss'
import UploadVideo from './components/UploadVideo'
import UploadCase from './components/UploadCase'

import {api} from 'common/app'
import PropTypes from "prop-types";

let scrollbuttontimers;
let timers;
let onHandleScroll = false;
let reuploadid=null;
let reuploadindex=null;
export class AllCase extends Component {
constructor(props) {
  super(props);
  this.state = {
      scrollButton:false,
      scrollTopInterval:null,
      HandleButtonShow:true,
      data:[],
  };
     this.refreshProps = this.refreshProps.bind(this);
     this.getData = this.getData.bind(this);
     this.pushData = this.pushData.bind(this);
     this.createList = this.createList.bind(this);
     this.setScrollListener = this.setScrollListener.bind(this);
     this.ShowHandleButton = this.ShowHandleButton.bind(this);
     this.ScrolltoTop = this.ScrolltoTop.bind(this);
     this.reloadCase = this.reloadCase.bind(this);
     this.onReupload = this.onReupload.bind(this);
     this.onDeleteCase = this.onDeleteCase.bind(this);
     this.getCaseList = this.getCaseList.bind(this);
}
getChildContext() {
    return {
        refreshList: this.getCaseList
    };
  }
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
  this.getCaseList();
//   this.refs.scrollbody.addEventListener('scroll',this.setScrollListener);
//   this.refs.scrollbody.addEventListener('touchmove',this.onTouchmove,{
//     passive: false //  禁止 passive 效果
//   });
}
refreshProps(props) {
    this.refs.scrollbody.scrollTop = 0;
    clearInterval(this.scrollTopInterval);
    onHandleScroll = false;
    clearInterval(this.scrollTopInterval);
}
getCaseList(){
    api.getAllCase().then(res=>{
        console.log(res);
        if (res.code == 200) {
            this.state.data = res.data;
        }else{
            alert(res.msg)
        }
        this.setState(this.state);
    },err=>{

    })
}
setScrollListener(e){
    if ((e.currentTarget.clientHeight+e.currentTarget.scrollTop+50) > e.currentTarget.scrollHeight) {
        clearTimeout(timers)
        let self = this;
        timers=setTimeout(() => {
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
getData(){
    for (let z = 0; z < 10; z++) {
        this.state.data.push({
            id:z,
            title:'安敏感·健行婴幼儿奶粉分析安敏感·健行婴幼儿奶粉分析',
            updatetime:'2018-10-31 21:04',
        });
    }
    this.setState(this.state);
}
//mock data
pushData(){
    let result = [];
    for (let z = 0; z < 10; z++) {
        result.push({
            id:z,
            title:'安敏感·健行婴幼儿奶粉分析安敏感·健行婴幼儿奶粉分析',
            updatetime:'2018-10-31 21:04',
        })
    }
    this.state.data.push(...result);
    this.setState(this.state);
}
reloadCase(id,index){
    reuploadid = id;
    reuploadindex = index;
    this.refs.reuploadfile.click();
}
onReupload(e){
    let file = e.target.files[0];
    e.target.value = '';
    if (file) {
        let formdata = new FormData();
        formdata.append('file',file);
        formdata.append('id',reuploadid);   
        api.reuploadCase(formdata).then(res=>{
            // console.log(res);
            if (res.code == 200) {
                this.state.data[reuploadindex].filePath = res.data;
            }
            this.setState(this.state);
            alert(res.msg)
        },err=>{
            console.log(err);
            
        })
        
    }
    reuploadid = null;
}
onDeleteCase(id,index){
    api.deleteCase(id).then(res=>{
        console.log(res);
        if (res.code == 200) {
            this.state.data.splice(index,1);
        }else{
            alert(res.msg)
        }
        this.setState(this.state);
    },err=>{

    })
}
createList(){
    let result = [];
    for (let z = 0; z < this.state.data.length; z++) {
        result.push(<div className={[style.CaseCard,'childcenter','childcolumn','childalignstart'].join(' ')}>
        <div className={style.CaseTitle}> {this.state.data[z].name} </div>
        <div className={style.CaseUpdateTime}>更新时间：{new Date(this.state.data[z].updated_at * 1000).format('yyyy-MM-dd hh:mm')}</div>
        <div className={'flexbox'}></div>
        <div className={[style.ButtonGroup,'childcenter','childcontentstart'].join(' ')}>
            <div className={[style.HandleButton,style.Colorful,'childcenter'].join(' ')}> <a href={this.state.data[z].filePath}>查看案例</a></div>
            <div className={[style.HandleButton,'childcenter'].join(' ')} onClick={this.reloadCase.bind(this,this.state.data[z].id,z)}>重新上传</div>
            <div className={[style.HandleButton,'childcenter'].join(' ')} onClick={this.onDeleteCase.bind(this,this.state.data[z].id,z)}>删除</div>
        </div>
    </div>)
    }
    return result;
}
ShowHandleButton(){
    this.state.HandleButtonShow = !this.state.HandleButtonShow;
    this.setState(this.state);
}
ScrolltoTop(){
    clearInterval(this.scrollTopInterval);
    this.scrollTopInterval = setInterval(() => {
        onHandleScroll = true;
        this.refs.scrollbody.scrollTop = this.refs.scrollbody.scrollTop * 0.9;
        if (this.refs.scrollbody.scrollTop<=1) {
            this.refs.scrollbody.scrollTop = 0;
            clearInterval(this.scrollTopInterval);
            onHandleScroll = false;
        }
    }, 10);
    // this.refs.scrollbody.scrollTop = 0;
}
onTouchmove(event){
    if (onHandleScroll) {
        event.preventDefault();
    }
}
componentWillUnmount(){
    clearInterval(this.scrollTopInterval);
}
render() {
  return (
    <div className={style.ListBox} ref={'scrollbody'}>
        <div className={[style.ListBody,'childcenter','childcolumn'].join(' ')}>
            {this.state.data.length == 0?'这里什么都没有，快去投稿吧！':this.createList()}
        </div>
        
        <div className={[style.HandleGroupBox,'childcenter'].join(' ')}>
            <div className={this.state.HandleButtonShow?style.HandleButtonHide:style.HandleButtonShow} onClick={this.ShowHandleButton}></div>
            {this.state.HandleButtonShow?[<UploadCase />,
            <UploadVideo />]:''}
            {this.state.scrollButton?<div className={style.ScrollToTop} onClick={this.ScrolltoTop}></div>:''}
        </div>
        <input type="file" ref='reuploadfile' style={{display:'none'}} onChange={this.onReupload}/>
    </div>
   )
   }
}
AllCase.childContextTypes = {
    refreshList: PropTypes.func
};
export default AllCase