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
                <div className={[style.Button,'childcenter childcolumn'].join(' ')} onClick={()=>{window.location.href = 'http://meadjohnson-qiniu.rup-china.com/meadjohnson-gz/%E5%85%A8%E5%9B%BD%E4%B8%93%E5%AE%B6%E8%AF%81%E8%A8%80%E8%A7%86%E9%A2%91final-0327.mp4'}}>
                  <span>项目</span>
                  {/* <span>介绍</span> */}
                  <span>视频</span>
                </div>
                <div className={[style.Button,'childcenter childcolumn'].join(' ')} onClick={()=>{window.location.href = 'http://meadjohnson-qiniu.rup-china.com/meadjohnson-gz/%E7%89%9B%E5%A5%B6%E8%9B%8B%E7%99%BD%E8%BF%87%E6%95%8F%E8%AF%8A%E6%B2%BB%E7%97%85%E4%BE%8B%E5%BE%81%E9%9B%86%28%E6%A8%A1%E6%9D%BF20190322%29.pptx'}}>
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