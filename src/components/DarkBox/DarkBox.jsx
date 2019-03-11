import React, { Component } from 'react'
import style from './DarkBox.scss'
  
export class DarkBox extends Component {
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
    <div className={[style.DarkBox,'childcenter','childcolumn'].join(' ')}>
        {this.props.children}
    </div>
   )
   }
}
export default DarkBox