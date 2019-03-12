import React, { Component } from 'react'
import style from './Rule.scss'
import mobilerule from 'assets/mobilerule.png'

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
          <div className={[style.RuleBox,'childcenter childcontentstart'].join(' ')}>
            <img src={mobilerule} className={style.RuleImage} alt=""/>
          </div>
        </div>
    </div>
   )
   }
}
export default Rule