import React, { Component } from 'react'
import style from './Rule.scss'
import mobilerule from 'assets/mobilerule.png'
import rulebottom from 'assets/rulebottom.png'

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
    <div className={style.Rule}>
        <div className={style.RuleContent}>
          <div className={[style.RuleBox,'childcenter childcolumn childcontentstart'].join(' ')}>
            <img src={mobilerule} className={style.RuleImage} alt=""/>
            <div className={style.RuleBottom}>
              <div className={[style.ButtonGroup,'childcenter'].join(' ')}>
                <div className={[style.Button,'childcenter childcolumn'].join(' ')}>
                  <span>项目</span>
                  {/* <span>介绍</span> */}
                  <span>视频</span>
                </div>
                <div className={[style.Button,'childcenter childcolumn'].join(' ')}>
                  <span>下载</span>
                  <span>案例</span>
                </div>
              </div>
              <img className={style.RuleBottomImage} src={rulebottom} alt=""/>
            </div>
          </div>
          
        </div>
    </div>
   )
   }
}
export default Rule