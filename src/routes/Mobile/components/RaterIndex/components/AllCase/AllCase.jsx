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
      nowpage:1,  
      totalpage:1,
      scrollButton:false,
      scrollTopInterval:null,
      HandleButtonShow:true,
      data:[],
  };
     this.refreshProps = this.refreshProps.bind(this);
     this.pushData = this.pushData.bind(this);
     this.createList = this.createList.bind(this);
     this.setScrollListener = this.setScrollListener.bind(this);
     this.ShowHandleButton = this.ShowHandleButton.bind(this);
     this.ScrolltoTop = this.ScrolltoTop.bind(this);
     this.acceptCase = this.acceptCase.bind(this);
     this.onReupload = this.onReupload.bind(this);
     this.unacceptCase = this.unacceptCase.bind(this);
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
  this.refs.scrollbody.addEventListener('scroll',this.setScrollListener);
  this.refs.scrollbody.addEventListener('touchmove',this.onTouchmove,{
    passive: false //  禁止 passive 效果
  });
}
refreshProps(props) {
    this.refs.scrollbody.scrollTop = 0;
    clearInterval(this.scrollTopInterval);
    onHandleScroll = false;
    clearInterval(this.scrollTopInterval);
}
getCaseList(){
    api.getAllCaseByRater(this.state.nowpage,null,null,'all').then(res=>{
        if (res.code == 200) {
            this.state.data = res.data.list;
            this.state.nowpage = res.data.page;
            this.state.totalpage = res.data.num;
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
pushData(){
    if (this.state.nowpage+1>this.state.totalpage) return;
    this.state.nowpage+=1;
    api.getAllCaseByRater(this.state.nowpage,null,null,'all').then(res=>{
        let result = [];
        if (res.code == 200) {
            
            result = res.data.list;
            this.state.nowpage = res.data.page;
            this.state.totalpage = res.data.num;
        }else{
            alert(res.msg)
        }
        this.state.data.push(...result);
        this.setState(this.state);
    },err=>{

    })
}
acceptCase(id,index){
    // reuploadid = id;
    // reuploadindex = index;
    // this.refs.reuploadfile.click();
    api.getCasePase(id,2).then(res=>{
        if (res.code == 200) {
            this.state.data[index].status = 2;
            this.setState(this.state);
        }else{
            alert(res.msg)
        }
    },err=>{
        console.log(err);
        
    })
}
unacceptCase(id,index){
    api.getCasePase(id,3).then(res=>{
        if (res.code == 200) {
            this.state.data[index].status = 3;
            this.setState(this.state);
        }else{
            alert(res.msg)
        }
    },err=>{
        console.log(err);
        
    })
}
onReupload(e){
    let file = e.target.files[0];
    e.target.value = '';
    if (file) {
        let formdata = new FormData();
        formdata.append('file',file);
        formdata.append('id',reuploadid);   
        api.reuploadCase(formdata).then(res=>{
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

createList(){
    let result = [];
    for (let z = 0; z < this.state.data.length; z++) {
        result.push(<div className={[style.CaseCard,'childcenter','childcolumn','childalignstart'].join(' ')}>
        <div className={style.CaseTitle}> {this.state.data[z].name} </div>
        <div className={style.CaseUpdateTime}>审核状态：{this.state.data[z].status==2? <span >已通过</span>:this.state.data[z].status==1?<span>待审核</span>:<span>不通过</span> }</div>
        <div className={'flexbox'}></div>
        <div className={[style.ButtonGroup,'childcenter','childcontentstart'].join(' ')}>
            <div className={[style.HandleButton,style.Colorful,'childcenter'].join(' ')}> <a href={this.state.data[z].filePath}>查看案例</a></div>
            <div className={[style.HandleButton,'childcenter'].join(' ')} onClick={this.acceptCase.bind(this,this.state.data[z].id,z)}>通过</div>
            <div className={[style.HandleButton,'childcenter'].join(' ')} onClick={this.unacceptCase.bind(this,this.state.data[z].id,z)}>不通过</div>
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
            {this.state.data.length == 0?'这里什么都没有':this.createList()}
        </div>
    </div>
   )
   }
}
AllCase.childContextTypes = {
    refreshList: PropTypes.func
};
export default AllCase