import React, { Component } from 'react'
import style from './MobileTipAlert.scss'
  
export class MobileTipAlert extends Component {
constructor(props) {
  super(props);
  this.state = {
      onClose:null,
  };
     this.refreshProps = this.refreshProps.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
}
refreshProps(props) {
    this.state.onClose = props.onClose;
    this.setState(this.state);
}
render() {
  return (
    <div className={style.MobileTipAlert}>
        {this.state.onClose?<div className={style.CloseButton} onClick={this.state.onClose}></div>:''}
        {this.props.children}
    </div>
   )
   }
}
export default MobileTipAlert