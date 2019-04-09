import React, { Component } from 'react'
import style from './Score.scss'
import {api} from 'common/app'
  
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
                <div className={[style.FormColumn,'childcenter childcolumn'].join(' ')}>
                    <span>主观资料</span> 
                    <span>（15分）</span>
                </div>
                <div className={[style.FormColumn,'childcenter childcolumn childalignstart'].join(' ')}>
                    <p>1、格式：按主要健康问题，逐一描述</p>
                    <p>2、主要书写内容</p>
                    <p>（1）主诉</p>
                    <p>（2）主要症状描述、病情演变</p>
                    <p>（3）诊治经过及结果</p>
                    <p>（4）相关病史</p>
                    <p>（5）家族史</p>
                    <p>（6）生活方式、心理及社会因素</p>
                </div>
                <div className={[style.FormColumn,'childcenter'].join(' ')}>
                    <div className={style.SelectBox}>
                        {this.state.scoreArray[0]}分
                    </div>
                </div>
            </div>
            <div className={[style.FormRow,'childcenter'].join(' ')}>
                <div className={[style.FormColumn,'childcenter childcolumn'].join(' ')}>
                    <span>客观检查</span> 
                    <span>（10分）</span>
                </div>
                <div className={[style.FormColumn,'childcenter childcolumn childalignstart'].join(' ')}>
                    <p>1、体检结果</p>
                    <p>2、实验室检查及辅助检查等</p>
                    <p>3、相关心理测验等其他评估</p>
                </div>
                <div className={[style.FormColumn,'childcenter'].join(' ')}>
                    <div className={style.SelectBox}>
                        {this.state.scoreArray[1]}分
                    </div>
                </div>
            </div>
            <div className={[style.FormRow,'childcenter'].join(' ')}>
                <div className={[style.FormColumn,'childcenter childcolumn'].join(' ')}>
                    <span>评价</span> 
                    <span>（10分）</span>
                </div>
                <div className={[style.FormColumn,'childcenter childcolumn childalignstart'].join(' ')}>
                    <p>1、主要诊断</p>
                    <p>2、存在的危险因素与健康问题</p>
                    <p>3、并发症或其他临床情况</p>
                    <p>4、患者的依从性</p>
                    <p>5、家庭可利用的资源</p>
                </div>
                <div className={[style.FormColumn,'childcenter'].join(' ')}>
                    <div className={style.SelectBox}>
                        {this.state.scoreArray[2]}分
                    </div>
                </div>
            </div>
            <div className={[style.FormRow,'childcenter'].join(' ')}>
                <div className={[style.FormColumn,'childcenter childcolumn'].join(' ')}>
                    <span>处置计划</span> 
                    <span>（15分）</span>
                </div>
                <div className={[style.FormColumn,'childcenter childcolumn childalignstart'].join(' ')}>
                    <p>1、进一步诊查计划</p>
                    <p>2、治疗计划</p>
                    <p>（1）药物治疗及相关问题</p>
                    <p>（2）非药物治疗——行为干预计划，饮食、运动等健康教育指导、注意事项等。</p>
                    <p>3、随访要求</p>
                </div>
                <div className={[style.FormColumn,'childcenter'].join(' ')}>
                    <div className={style.SelectBox}>
                        {this.state.scoreArray[3]}分
                    </div>
                </div>
            </div>
            <div className={[style.FormRow,'childcenter'].join(' ')}>
                <div className={[style.FormColumn,'childcenter childcolumn'].join(' ')}>
                    <span>分析</span> 
                    <span>（25分）</span>
                </div>
                <div className={[style.FormColumn,'childcenter childcolumn childalignstart'].join(' ')}>
                    <p>1、根据病情的分析理论和循证医学依据充分、准确</p>
                    <p>2、论点明确、论据充分、分析准确、论证合理</p>
                    <p>3、患儿症状体征或检查结果影像资料(照片)</p>
                    <p>4、掌握坚实的基础理论和系统的专业知识</p>
                </div>
                <div className={[style.FormColumn,'childcenter'].join(' ')}>
                    <div className={style.SelectBox}>
                        {this.state.scoreArray[4]}分
                    </div>
                </div>
            </div>
            <div className={[style.FormRow,'childcenter'].join(' ')}>
                <div className={[style.FormColumn,'childcenter childcolumn'].join(' ')}>
                    <span>总结</span> 
                    <span>（25分）</span>
                </div>
                <div className={[style.FormColumn,'childcenter childcolumn childalignstart'].join(' ')}>
                    <p>1、对案例理解是否透彻</p>
                    <p>2、病史陈述是否完整、准确 </p>
                    <p>3、病例思考与陈述</p>
                </div>
                <div className={[style.FormColumn,'childcenter'].join(' ')}>
                    <div className={style.SelectBox}>
                        {this.state.scoreArray[5]}分
                    </div>
                </div>
            </div>
            <div className={[style.AllCount,'childcenter'].join(' ')}>
                <div className={style.ScoreType} >SOAP病例描述 <span style={{color:'#DA4913'}}>{this.getCountScore('soap')}</span>  分</div>
                <div className={style.ScoreType} >病例分析/归纳/收获/总结 <span style={{color:'#DA4913'}}>{this.getCountScore('analysis')}</span>  分</div>
                <div className={style.ScoreType} >总计 <span style={{color:'#DA4913'}}>{this.getCountScore()}</span>  分</div>
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