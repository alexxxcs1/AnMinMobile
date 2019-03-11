import React, { Component } from 'react'
import style from './Select.scss'
  
export class Select extends Component {
constructor(props) {
  super(props);
  this.state = {};
     this.refreshProps = this.refreshProps.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
}
refreshProps(props) {
  
}
render() {
  return (
    <div className={style.SelectBox} tabIndex='-1'>
        <div className={style.ValueBox}>{this.props.Selected}</div>
        <div className={style.DropBox}>
            {this.props.children}
        </div>
    </div>
   )
   }
}
export default Select