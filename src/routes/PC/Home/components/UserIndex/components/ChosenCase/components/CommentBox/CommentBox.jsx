import React, { Component } from 'react'
import style from './CommentBox.scss'
import DarkBox from 'components/DarkBox'
import close from 'assets/close.png'
import {api} from 'common/app'

import commentbot from 'assets/commentbot.png'
import commenttop from 'assets/commenttop.png'
  
export class CommentBox extends Component {
constructor(props) {
  super(props);
  this.state = {
      id:null,
      commentValue:'',
  };
     this.refreshProps = this.refreshProps.bind(this);
     this.HandleTextArea = this.HandleTextArea.bind(this);
     this.handleClose = this.handleClose.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
}
refreshProps(props) {
  this.state.id = props.id;
  this.state.commentValue = props.content;
  console.log(props.content);
  
  this.setState(this.state);
}
HandleTextArea(e){
    this.state.commentValue = e.target.value;
    this.setState(this.state);
}
handleClose(){
    this.props.handle({
        show:false,
        id:null,
    })
}
render() {
  return (
    <DarkBox>
        <div className={style.CommentBox}>
            <img src={commenttop} className={style.CommentTopImg} alt=""/>
            <div className={style.CloseButton} onClick={this.handleClose}>
                <img src={close} alt=""/>
            </div>
            <div className={[style.DetialBox,'childcenter'].join(' ')}>
                <div className={style.DetialTextArea}>{this.state.commentValue}</div>
            </div>
            <img src={commentbot} className={style.CommentBotImg} alt=""/>
        </div>
    </DarkBox>
   )
   }
}
export default CommentBox