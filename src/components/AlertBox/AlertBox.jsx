import React, { Component } from 'react'
import style from './AlertBox.scss'
  
export class AlertBox extends Component {
constructor(props) {
  super(props);
  this.state = {
    Option:{
        Value:'确定通过审核吗？',
        Cancle:()=>{
            console.log('已取消');
        },
        Submit:()=>{
            console.log('确定');
        }
    }
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
    this.state.Option = props.Option?props.Option:this.state.Option;
    this.setState(this.state);
}
render() {
  return (
    <div className={[style.LightBox,'childcenter'].join(' ')}>
        <div className={[style.AlertBox,'childcenter childcolumn childcontentstart'].join(' ')}>
            <div className={[style.Content,'childcenter'].join(' ')}>
                {this.state.Option.Value}
            </div>
            <div className={[style.HandleBox,'childcenter'].join(' ')}>
                {this.state.Option.Cancle? <div onClick={this.state.Option.Cancle} className={[style.Button,'childcenter'].join(' ')}>取消</div>:''}
                {this.state.Option.Submit? <div onClick={this.state.Option.Submit} className={[style.Button,'childcenter'].join(' ')}>确定</div>:''}
            </div>
        </div>
    </div>
   )
   }
}
export default AlertBox