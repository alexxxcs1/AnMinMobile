import React, { Component } from 'react'
import style from './Score.scss'
import {api} from 'common/app'

import scoreBasis1 from 'assets/scoreBasis1.png'
import scoreBasis2 from 'assets/scoreBasis2.png'
import scoreBasis3 from 'assets/scoreBasis3.png'
import scoreBasis4 from 'assets/scoreBasis4.png'
import scoreBasis5 from 'assets/scoreBasis5.png'
import scoreBasis6 from 'assets/scoreBasis6.png'
  
export class Score extends Component {
constructor(props) {
  super(props);
  this.state = {
      scoreArray:['','','','','',''],
  };
  this.refreshProps = this.refreshProps.bind(this);
  this.getCountScore = this.getCountScore.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
}
refreshProps(props) {
    console.log(props);
    this.state.id = props.id?props.id:this.state.id;
    this.state.scoreArray = props.score?props.score:this.state.scoreArray;
    console.log(this.state.scoreArray);
    
    this.setState(this.state);
}
getCountScore(type){
        let result = 0;
        switch (type) {
            default:
            case 'all':
                
                for (let z = 0; z < this.state.scoreArray.length; z++) {
                    let score = this.state.scoreArray[z];
                    if (!isNaN(parseInt(score))) {
                        result = result + parseInt(score);
                    }
                }
                break;
            case 'soap':
                for (let z = 0; z < 4; z++) {
                    const score = this.state.scoreArray[z];
                    if (score) {
                        result = result + parseInt(score);
                    }
                }
                break;
            case 'analysis':
                let _score4 = this.state.scoreArray[4]?this.state.scoreArray[4]:0;
                let _score5 = this.state.scoreArray[5]?this.state.scoreArray[5]:0;
                result = parseInt(_score4)+parseInt(_score5);
                break;
        }
        return result;
    
}
render() {
  return (
    <div className={[style.ScoreBox,'childcenter childcolumn'].join(' ')}>
        <div className={style.ScoreFormBox}>
            <div className={[style.FormTitle,'childcenter'].join(' ')}>
                <div className={[style.FormColumn,'childcenter'].join(' ')}>项目</div>
                <div className={[style.FormColumn,'childcenter'].join(' ')}>评分标准</div>
                <div className={[style.FormColumn,'childcenter'].join(' ')}>得分</div>
            </div>
            <div className={[style.FormRow,'childcenter'].join(' ')}>
                <div className={style.ImageColumn}>
                    <img src={scoreBasis1} alt=""/>
                </div>
                <div className={style.ScoreColumn}>
                    <div className={style.SelectBox}>
                        {this.state.scoreArray[0]}分
                    </div>
                </div>
            </div>
            <div className={[style.FormRow,'childcenter'].join(' ')}>
                <div className={style.ImageColumn}>
                    <img src={scoreBasis2} alt=""/>
                </div>
                <div className={style.ScoreColumn}>
                    <div className={style.SelectBox}>
                        {this.state.scoreArray[1]}分
                    </div>
                </div>
            </div>
            <div className={[style.FormRow,'childcenter'].join(' ')}>
                <div className={style.ImageColumn}>
                    <img src={scoreBasis3} alt=""/>
                </div>
                <div className={style.ScoreColumn}>
                    <div className={style.SelectBox}>
                        {this.state.scoreArray[2]}分
                    </div>
                </div>
            </div>
            <div className={[style.FormRow,'childcenter'].join(' ')}>
                <div className={style.ImageColumn}>
                    <img src={scoreBasis4} alt=""/>
                </div>
                <div className={style.ScoreColumn}>
                    <div className={style.SelectBox}>
                        {this.state.scoreArray[3]}分
                    </div>
                </div>
            </div>
            <div className={[style.FormRow,'childcenter'].join(' ')}>
                <div className={style.ImageColumn}>
                    <img src={scoreBasis5} alt=""/>
                </div>
                <div className={style.ScoreColumn}>
                    <div className={style.SelectBox}>
                        {this.state.scoreArray[4]}分
                    </div>
                </div>
            </div>
            <div className={[style.FormRow,'childcenter'].join(' ')}>
                <div className={style.ImageColumn}>
                    <img src={scoreBasis6} alt=""/>
                </div>
                <div className={style.ScoreColumn}>
                    <div className={style.SelectBox}>
                        {this.state.scoreArray[5]}分
                    </div>
                </div>
            </div>
            <div className={[style.AllCount,'childcenter childcolumn'].join(' ')}>
                <div className={[style.ScoreGroup,'childcenter'].join(' ')}>
                    <div className={style.ScoreType} >SOAP病例描述 <span className={style.otherCount} style={{color:'#DA4913'}}>{this.getCountScore('soap')}</span>  分</div>
                    <div className={style.ScoreType} >病例分析/归纳/收获/总结 <span className={style.otherCount} style={{color:'#DA4913'}}>{this.getCountScore('analysis')}</span>  分</div>
                </div>
                <div className={style.ScoreType} >总计 <span className={style.CountAllText} style={{color:'#DA4913'}}>{this.getCountScore()}</span>  分</div>
            </div>
        </div>
        <div onClick={(()=>{
            this.props.handle({
                show:false,
                cotnent:null,
            })
        }).bind(this)} className={[style.SubmitButton,'childcenter'].join(' ')}>
            确定
        </div>
    </div>
   )
   }
}

export default Score