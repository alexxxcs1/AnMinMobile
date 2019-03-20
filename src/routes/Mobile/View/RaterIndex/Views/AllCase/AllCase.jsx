import React, { Component } from 'react'
import style from './AllCase.scss'

import pass from 'assets/pass.png'
import nopass from 'assets/nopass.png'
import uncheck from 'assets/uncheck.png'
import rateruserbgicon from 'assets/rateruserbgicon.png'

import SearchBox from '../../components/SearchBox'

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

      filterOption:null,
      searchValue:null,
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
     this.onSearchOptionChange = this.onSearchOptionChange.bind(this);
     this.onSearchValueChange = this.onSearchValueChange.bind(this);
     this.onSearchValue = this.onSearchValue.bind(this);
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
    api.getAllCaseByRater(1,this.state.filterOption,this.state.filterOption===null?null:this.state.searchValue,'all').then(res=>{
        if (res.code === 200) {
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
pushData(){
    if (this.state.nowpage+1>this.state.totalpage) return;
    
    this.state.nowpage+=1;
    api.getAllCaseByRater(this.state.nowpage,this.state.filterOption,this.state.filterOption==null?null:this.state.searchValue,'all').then(res=>{
        let result = [];
        if (res.code === 200) {
            
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
        if (res.code === 200) {
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
        if (res.code === 200) {
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
            if (res.code === 200) {
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
        result.push(
        <div className={[style.CaseCard,'childcenter','childcolumn','childalignstart'].join(' ')}>
            <div className={style.CaseTitle}> {this.state.data[z].name} </div>
            <div className={[style.CaseInfo,'childcenter childcontentstart'].join(' ')}>
                <span> {this.state.data[z].userName}</span>
                |
                <span> {this.state.data[z].tel}</span>
                |
                <span><a href={this.state.data[z].filePath}>预览</a></span>
                |
                <span><a href={this.state.data[z].video}>查看视频</a></span>
                {/* <div className={style.CaseUpdateTime}>审核状态：{this.state.data[z].status===2? <span >已通过</span>:this.state.data[z].status===1?<span>待审核</span>:<span>不通过</span> }</div>
                <div className={'flexbox'}></div>
                <div className={[style.ButtonGroup,'childcenter','childcontentstart'].join(' ')}>
                    <div className={[style.HandleButton,style.Colorful,'childcenter'].join(' ')}> <a href={this.state.data[z].filePath}>查看案例</a></div>
                    <div className={[style.HandleButton,'childcenter'].join(' ')} onClick={this.acceptCase.bind(this,this.state.data[z].id,z)}>通过</div>
                    <div className={[style.HandleButton,'childcenter'].join(' ')} onClick={this.unacceptCase.bind(this,this.state.data[z].id,z)}>不通过</div>
                </div> */}
            </div>
            <div className={[style.ButtonGroup,'childcenter','childcontentstart'].join(' ')}>
                <div className={[style.HandleButton,'childcenter'].join(' ')} onClick={this.acceptCase.bind(this,this.state.data[z].id,z)}>通过审核</div>
                <div className={[style.HandleButton,'childcenter'].join(' ')} onClick={this.unacceptCase.bind(this,this.state.data[z].id,z)}>审核不通过</div>
            </div> 
            <div className={style.CaseStatus}>
                {this.state.data[z].status===2? <img src={pass} alt=""/>:this.state.data[z].status===1?<img src={uncheck} alt=""/>:<img src={nopass} alt=""/> }
            </div>
        </div>
    )
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
onSearchOptionChange(option){
    this.state.filterOption = option;
    this.setState(this.state);
    this.getCaseList();
}
onSearchValueChange(value){
    this.state.searchValue = value;
    this.setState(this.state);
}
onSearchValue(){
    this.getCaseList();
}
render() {
  return (
    <div className={style.ListBox} ref={'scrollbody'}>
        <div className={[style.ListBody,'childcenter','childcolumn'].join(' ')}>
            <div className={style.SearchBox}>
                <SearchBox 
                    onOptionChange={this.onSearchOptionChange}
                    onSearchValueChange={this.onSearchValueChange}
                    onSearch={this.onSearchValue}/>
            </div>
            <div className={style.PageTitle}>所有案例总览表</div>
            <div className={style.BGtop}>
                <img src={rateruserbgicon} alt=""/>
            </div>
            <div className={style.ListDetialBox}>
                {this.state.data.length === 0?'这里什么都没有':this.createList()}
            </div>
            <div className={[style.BGbot,style.rotate].join(' ')}>
                <img src={rateruserbgicon} alt=""/>
            </div>
        </div>
        
    </div>
   )
   }
}
AllCase.childContextTypes = {
    refreshList: PropTypes.func
};
export default AllCase