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
                <div className={[style.Button,'childcenter'].join(' ')}>自我介绍＋病例特殊性的简短介绍</div>
                <a href={'http://meadjohnson-qiniu.rup-china.com/%E7%89%9B%E5%A5%B6%E8%9B%8B%E7%99%BD%E8%BF%87%E6%95%8F%E8%AF%8A%E6%B2%BB%E6%A1%88%E4%BE%8B%E5%BE%81%E9%9B%86%EF%BC%88%E6%A8%A1%E6%9D%BF%EF%BC%89-1212%201.pptx'} download={'参赛PPT模板'} target="_blank" rel="noopener noreferrer"><div className={[style.Button,'childcenter'].join(' ')}>下载参赛PPT模板</div></a>
            </div>
        </div>
    </div>
   )
   }
}
export default Rule