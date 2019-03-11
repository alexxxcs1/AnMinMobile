import React, { Component } from 'react'
import style from './LoadingBox.scss';
export class LoadingBox extends Component {
  constructor(props){
      super(props);
      this.state={
          error:null,
      }
      this.refreshprops = this.refreshprops.bind(this);
  }
  componentWillReceiveProps(nextprop){
    this.refreshprops(nextprop)
  }
  componentDidMount(){
    this.refreshprops(this.props)
  }
  refreshprops(props){
    this.setState({
        error:props.error
    })
  }
  render() {
    return (
      
      <div>
        {this.state.error?(<span>{this.state.error}</span>):(<div className={style.LoadingBox}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>)
        }
      </div>
    )
  }
}

export default LoadingBox
