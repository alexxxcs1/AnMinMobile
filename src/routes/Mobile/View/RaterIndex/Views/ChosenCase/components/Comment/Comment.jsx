import React, { Component } from 'react'
import PropTypes from "prop-types";
import style from './Comment.scss'
import DarkBox from 'components/DarkBox'
import scoretitle from 'assets/scoretitle.png'
import {api} from 'common/app'
  
export class Comment extends Component {
constructor(props) {
  super(props);
  this.state = {
      id:null,
      score:'',
      comment:''
  };
     this.refreshProps = this.refreshProps.bind(this);
     this.HandleScore = this.HandleScore.bind(this);
     this.HandleComment = this.HandleComment.bind(this);
     this.ConfirmResult = this.ConfirmResult.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
}
refreshProps(props) {
    this.state.id = props.id?props.id:this.state.id;
    this.state.comment = props.content?props.content:this.state.content;
    this.state.score = props.score?props.score:this.state.score;
    this.setState(this.state);
}
HandleScore(e){
    this.state.score = e.target.value<0?0:(e.target.value>100?100:e.target.value);
    // this.state.score = e.target.value;
    this.setState(this.state);
}
ConfirmResult(){
    if (this.state.comment) {
        if (this.state.id) {
            if (this.state.comment == this.props.content) {
                this.context.handleEditComment({
                    show:false,
                    id:null,
                    score:null,
                    content:null,
                })
            }else{
                api.setCaseScoreContent(this.state.id,2,this.state.comment,null).then(res=>{
                    if (res.code === 200) {
                        this.context.refreshList();
                        this.context.handleEditComment({
                            show:false,
                            id:null,
                            score:null,
                            content:null,
                        });
                    }else{
                        alert(res.msg);
                        this.context.handleEditComment({
                            show:false,
                            id:null,
                            score:null,
                            content:null,
                        })
                    }
                },err=>{
    
                })
            }
            
        }else{
            alert('该文章不存在！');
            this.context.handleEditComment({
                show:false,
                id:null,
                score:null,
                content:null,
            })
        }
    }else{
        alert('请确保所有内容都填上了')
    }
}
HandleComment(e){
    this.state.comment = e.target.value;
    this.setState(this.state);
}
render() {
  return (
    <DarkBox >
        <div className={style.Comment}>
            <div className={[style.Scoretitle,'childcenter'].join(' ')}>
                <img src={scoretitle} alt=""/>
            </div>
            {/* <div className={style.ScoreBox}>
                <div className={[style.InputBox,'childcenter'].join(' ')}>
                    <input className={[style.Inputs,this.state.score?'':style.LongInputs].join(' ')} value={this.state.score} 
                    placeholder={'此处输入分数'}
                    onChange={this.HandleScore}
                    type="text"/>
                    {this.state.score?<span>分</span>:''}
                </div>
            </div> */}
            <div className={style.CommentBox}>
                <textarea placeholder={'此处输入点评内容'} className={style.TextArea} value={this.state.comment} onChange={this.HandleComment}></textarea>
            </div>
            <div className={[style.ConfirmButton,'childcenter'].join(' ')} onClick={this.ConfirmResult}>确认</div>
        </div>
    </DarkBox>
   )
   }
}
Comment.contextTypes = {
    refreshList: PropTypes.func,
    handleEditComment: PropTypes.func
};
export default Comment