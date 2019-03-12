import React, { Component } from 'react'
import style from './Comment.scss'
import DarkBox from 'components/DarkBox'
import close from 'assets/close.png'
import PropTypes from "prop-types";

import commentbot from 'assets/commentbot.png'
import commenttop from 'assets/commenttop.png'
  
export class Comment extends Component {
constructor(props) {
  super(props);
  this.state = {
    content:'',
  };
     this.refreshProps = this.refreshProps.bind(this);
     this.handleClose = this.handleClose.bind(this);
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
render() {
  return (
    <DarkBox>
        <div className={[style.CommentBox,'childcenter'].join(' ')}>
            <img src={commenttop} className={style.CommentTopImg} alt=""/>
            <div className={style.CloseButton} onClick={this.handleClose}>
                <img src={close} alt=""/>
            </div>
            <div className={style.DetialBox}>
                {this.state.content}
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