import React, { Component } from 'react'
import style from './Rule.scss'
import ruletips from 'assets/ruletips.png'
  
export class Rule extends Component {
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
    <div className={[style.RuleBox,'childcenter','childcolumn'].join(' ')}>
        {/* <img src={ruletips} style={{width:'100%'}} alt=""/> */}
        <div className={[style.DetialBox,'childcenter'].join(' ')}>
            <div className={[style.imgBox,'childcenter'].join(' ')}>
                <img src={ruletips} alt=""/>
            </div>
            <div className={[style.ButtonGroup,'childcenter','childcolumn','childcontentend','childalignstart'].join(' ')}>
                <div className={[style.Button,'childcenter'].join(' ')}>查看视频范例</div>
                <div className={[style.Button,'childcenter'].join(' ')}>下载参赛PPT模板</div>
            </div>
        </div>
    </div>
   )
   }
}
export default Rule