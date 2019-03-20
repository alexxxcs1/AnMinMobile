import React, { Component } from 'react'
import style from './ChosenCase.scss'

import scroeicon from 'assets/scroeicon.png'
import rateruserbgicon from 'assets/rateruserbgicon.png'
import Comment from './components/Comment'
import Score from './components/Score'

import SearchBox from '../../components/SearchBox'

import {api} from 'common/app'
import PropTypes from "prop-types";

let scrollbuttontimers;
let timers;
let onHandleScroll = false;
let reuploadid=null;
let reuploadindex=null;
export class ChosenCase extends Component {
constructor(props) {
  super(props);
  this.state = {
      nowpage:1,  
      totalpage:1,
      scrollButton:false,
      scrollTopInterval:null,
      HandleButtonShow:true,
      data:[],
      contentBoxOption:{
        show:false,
        content:null,
      },
      EditCommentOption:{
        show:false,
        id:null,
        score:null,
        content:null,
      },
      EditScoreOption:{
        index:null,
        show:false,
        id:null,
        score:null,
      },

      filterOption:null,
      searchValue:null,
  };
     this.refreshProps = this.refreshProps.bind(this);
     this.pushData = this.pushData.bind(this);
     this.createList = this.createList.bind(this);
     this.setScrollListener = this.setScrollListener.bind(this);
     this.ShowHandleButton = this.ShowHandleButton.bind(this);
     this.ScrolltoTop = this.ScrolltoTop.bind(this);
     this.onReupload = this.onReupload.bind(this);
     this.getCaseList = this.getCaseList.bind(this);
     this.HandleCommentBox = this.HandleCommentBox.bind(this);
     this.HandleEditCommentBox = this.HandleEditCommentBox.bind(this);
     this.onSearchOptionChange = this.onSearchOptionChange.bind(this);
     this.onSearchValueChange = this.onSearchValueChange.bind(this);
     this.HandleEditScoreBox = this.HandleEditScoreBox.bind(this);
     this.onSearchValue = this.onSearchValue.bind(this);
}
getChildContext() {
    return {
        handleComment: this.HandleCommentBox,
        refreshList: this.getCaseList,
        handleEditComment:this.HandleEditCommentBox
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
    api.getAllCaseByRater(1,null,null,'pass').then(res=>{
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
    api.getAllCaseByRater(this.state.nowpage,null,null,'pass').then(res=>{
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
HandleCommentBox(option){
    this.state.contentBoxOption = option;
    this.setState(this.state);
}
HandleEditCommentBox(option){
    this.state.EditCommentOption = option;
    this.setState(this.state);
}
HandleEditScoreBox(option){
    this.state.EditScoreOption = option;
    this.setState(this.state);
}
createList(){
    let result = [];
    for (let z = 0; z < this.state.data.length; z++) {
        result.push(
        <div className={[style.CaseCard,'childcenter','childcolumn','childalignstart'].join(' ')}>
            <div className={style.CaseTitle}> {this.state.data[z].name} </div>
            <div className={[style.CaseInfo,'childcenter childcontentstart'].join(' ')}>
                {/* <span> {this.state.data[z].userName}</span>
                |
                <span> {this.state.data[z].tel}</span>
                | */}
                <span><a href={this.state.data[z].filePath}>预览</a></span>
                
                <span><a href={this.state.data[z].video}>查看视频</a></span>
            </div>
            <div className={[style.ButtonGroup,'childcenter','childcontentstart'].join(' ')}>
                <div className={[style.HandleButton,'childcenter'].join(' ')}
                    onClick={this.HandleEditCommentBox.bind(this,{
                        show:true,
                        id:this.state.data[z].id,
                        score:this.state.data[z].sum,
                        content:this.state.data[z].content,
                    })}
                 >
                    点此点评
                </div>
                <div className={[style.HandleButton,'childcenter'].join(' ')} 
                    onClick={this.HandleEditScoreBox.bind(this,{
                        index:z,
                        show:true,
                        id:this.state.data[z].id,
                        score:this.state.data[z].may_score,
                    })}>
                    点此打分
                </div>
            </div> 
            <div className={[style.CaseStatus,'childcenter'].join(' ')} style={{backgroundImage:'url('+scroeicon+')'}}>
                {this.state.data[z].sum?this.state.data[z].sum + '分':'未打分'}
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
    // this.state.filterOption = option;
    // this.setState(this.state);
    // this.getCaseList();
}
onSearchValueChange(value){
    // this.state.searchValue = value;
    // this.setState(this.state);
    // this.getCaseList();
}
onSearchValue(){
    // this.getCaseList();
}
UpdateScore(index,option,sum,){
    this.state.EditScoreOption = option;
    this.state.data[index].sum = sum;
    this.setState(this.state);
}
render() {
  return (
    <div className={style.ListBox} ref={'scrollbody'}>
        {this.state.EditCommentOption.show?<Comment 
            id={this.state.EditCommentOption.id} 
            content={this.state.EditCommentOption.content} 
            score={this.state.EditCommentOption.score}/>:''}
        {this.state.EditScoreOption.show?<Score 
            id={this.state.EditScoreOption.id}
            score={this.state.EditScoreOption.score}
            onUpdate={this.UpdateScore.bind(this,this.state.EditScoreOption.index)}
            />:''}
        
        {/* {this.state.contentBoxOption.show?<Comment content={this.state.contentBoxOption.content}/>:''} */}
        <div className={[style.ListBody,'childcenter','childcolumn'].join(' ')}>
            <div className={style.SearchBox}>
                <SearchBox 
                    onOptionChange={this.onSearchOptionChange}
                    onSearchValueChange={this.onSearchValueChange}
                    onSearch={this.onSearchValue}/>
            </div>
            <div className={style.PageTitle}>入选案例总览表</div>
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
ChosenCase.childContextTypes = {
    refreshList: PropTypes.func,
    handleComment: PropTypes.func,
    handleEditComment: PropTypes.func,
};
export default ChosenCase