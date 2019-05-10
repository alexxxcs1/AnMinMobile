import React, { Component } from 'react'
import style from './Comment.scss'
import DarkBox from 'components/DarkBox'
import close from 'assets/close.png'
import PropTypes from "prop-types";

import commentbot from 'assets/commentbot.png'
import commenttop1 from 'assets/commenttop1.png'
import commenttop2 from 'assets/commenttop2.png'

const COMMENTTOP=[
  commenttop1,
  commenttop2
];
  
export class Comment extends Component {
constructor(props) {
  super(props);
  this.state = {
    select:0,
    content:[],
  };
     this.refreshProps = this.refreshProps.bind(this);
     this.handleClose = this.handleClose.bind(this);
     this.HandleSelect = this.HandleSelect.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
}
refreshProps(props) {
    this.state.content = props.content;
    this.setState(this.state);
}
handleClose(){
    this.context.handleComment({
        show:false,
        content:null,
    })
}
HandleSelect(index){
  this.setState({
    select:index,
  })
}
render() {
  return (
    <DarkBox>
        <div className={[style.CommentBox,'childcenter'].join(' ')}>
            <img src={COMMENTTOP[this.state.select]} className={style.CommentTopImg} alt=""/>
            <div className={style.CloseButton} onClick={this.handleClose}>
                <img src={close} alt=""/>
            </div>
            <div className={style.DetialBox}>
                {this.state.select <= 0?'':<div className={style.LeftArrow} onClick={this.HandleSelect.bind(this,this.state.select-1)}></div>}
                <div className={style.DetialTextArea}>{this.state.content[this.state.select]}</div>
                {this.state.select >= this.state.content.length-1?'':<div className={style.RightArrow} onClick={this.HandleSelect.bind(this,this.state.select+1)}></div>}
            </div>
            <img src={commentbot} className={style.CommentBotImg} alt=""/>
        </div>
    </DarkBox>
   )
   }
}
Comment.contextTypes = {
    refreshList: PropTypes.func,
    handleComment: PropTypes.func
  };
export default Comment