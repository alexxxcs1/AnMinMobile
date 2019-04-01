import React, { Component } from 'react'
import style from './Score.scss'
import {api} from 'common/app'
  
export class Score extends Component {
constructor(props) {
  super(props);
  this.state = {
      id:null,
      scoreArray:['','','','','',''],
  };
  this.refreshProps = this.refreshProps.bind(this);
  this.HandleSetScore = this.HandleSetScore.bind(this);
  this.getCountScore = this.getCountScore.bind(this);
  this.SubmitScore = this.SubmitScore.bind(this);
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
HandleSetScore(index,score){
    this.state.scoreArray[index] = score;
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
SubmitScore(){
    let allfill = true;
    for (let z = 0; z < this.state.scoreArray.length; z++) {
        if (isNaN(parseInt(this.state.scoreArray[z]))) {
            allfill = false;
        }
    }
    if (allfill) {
        let sum = this.getCountScore();
        api.setCaseScoreContent(this.state.id,1,sum,this.state.scoreArray.toString()).then(res=>{
            console.log(res);
            if (res.code == 200) {
                alert('打分成功');
                this.props.onUpdate(this.state.scoreArray,{
                    index:null,
                    show:false,
                    id:null,
                    score:null,
                },res.data)
            }else{
                alert(res.msg)
            }
        },err=>{
            this.props.onUpdate({
                index:null,
                show:false,
                id:null,
                score:null,
            },null,null)
        })
    }else{
        alert('请填写所有打分项再提交！')
    }
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
                        <SetScoreBox value={this.state.scoreArray[0]} max={15} min={1} onSelected={this.HandleSetScore.bind(this,0)}/>
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
                        <SetScoreBox value={this.state.scoreArray[1]} max={10} min={1} onSelected={this.HandleSetScore.bind(this,1)}/>
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
                        <SetScoreBox value={this.state.scoreArray[2]} max={10} min={1} onSelected={this.HandleSetScore.bind(this,2)}/>
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
                        <SetScoreBox value={this.state.scoreArray[3]} max={15} min={1} onSelected={this.HandleSetScore.bind(this,3)}/>
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
                        <SetScoreBox value={this.state.scoreArray[4]} max={25} min={1} onSelected={this.HandleSetScore.bind(this,4)}/>
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
                        <SetScoreBox value={this.state.scoreArray[5]} max={25} min={1} onSelected={this.HandleSetScore.bind(this,5)}/>
                    </div>
                </div>
            </div>
            <div className={[style.AllCount,'childcenter'].join(' ')}>
                <div className={style.ScoreType} >SOAP病例描述 <span style={{color:'#DA4913'}}>{this.getCountScore('soap')}</span>  分</div>
                <div className={style.ScoreType} >病例分析/归纳/收获/总结 <span style={{color:'#DA4913'}}>{this.getCountScore('analysis')}</span>  分</div>
                <div className={style.ScoreType} >总计 <span style={{color:'#DA4913'}}>{this.getCountScore()}</span>  分</div>
            </div>
        </div>
        <div onClick={this.SubmitScore} className={[style.SubmitButton,'childcenter'].join(' ')}>
            确认
        </div>
    </div>
   )
   }
}
  
let touchstartPosY = null;
class SetScoreBox extends Component{
    constructor(props){
        super(props);
        this.state = {
            DropBox:false,
            min:Number.MIN_SAFE_INTEGER,
            max:Number.MAX_SAFE_INTEGER,
            selectScore:null,
            selected:null
        };
        this.ScrollTouchStart = this.ScrollTouchStart.bind(this);
        this.ScrollTouchMove = this.ScrollTouchMove.bind(this);
        this.ScrollTouchEnd = this.ScrollTouchEnd.bind(this);
        this.HandleSubmitScore = this.HandleSubmitScore.bind(this);
        this.HandleDropBoxShow = this.HandleDropBoxShow.bind(this);
        this.LockTouchMove = this.LockTouchMove.bind(this);
    }
    componentDidMount(){
        this.state.min = this.props.min!=undefined?this.props.min:this.state.min;
        this.state.max = this.props.max!=undefined?this.props.max:this.state.max;
        this.state.selectScore = this.props.value === 0?(this.props.value):(this.props.value?this.props.value:this.state.selectScore);
        this.setState(this.state);
    }
    componentWillReceiveProps(nextprops){
        this.state.min = nextprops.min!=undefined?nextprops.min:this.state.min;
        this.state.max = nextprops.max!=undefined?nextprops.max:this.state.max;
        this.state.selectScore = nextprops.value === 0?(nextprops.value):(nextprops.value?nextprops.value:this.state.selectScore);
        this.state.selected = this.state.selectScore;
        this.setState(this.state);
    }
    ScrollTouchStart(e){
        touchstartPosY = e.touches[0].clientY;
        this.state.onTouch = true;
        this.setState(this.state);
    }
    ScrollTouchMove(e){
        let posY = e.touches[0].clientY;
        let num = posY - touchstartPosY;
        this.state.onTouch = true;
        let nowHour = new Date().getHours();
        if (num > 30) {
            touchstartPosY = posY;
            this.state.selectScore -= 1;
            if(this.state.selectScore<this.state.min) this.state.selectScore = this.state.max;
        }else if(num < -30){
            touchstartPosY = posY;
            this.state.selectScore += 1;
            if(this.state.selectScore>this.state.max) this.state.selectScore = this.state.min;
        }
        this.setState(this.state);
    }
    ScrollTouchEnd(e){
        touchstartPosY = null;
        this.state.onTouch = false;
        this.setState(this.state);
    }
    HandleSubmitScore(){
        this.props.onSelected(this.state.selectScore);
        this.state.selected = this.state.selectScore;
        this.HandleDropBoxShow(false);
    }
    HandleDropBoxShow(boolean){
        this.state.DropBox = boolean;
        if (boolean) {
            window.document.body.addEventListener(
                "touchmove",
                this.LockTouchMove,
                false
              );
              window.document.body.addEventListener(
                "ondragstart",
                this.LockTouchMove,
                false
            );
        }else{
            window.document.body.removeEventListener("touchmove",
                this.LockTouchMove,
            false);
            window.document.body.removeEventListener("ondragstart",
                this.LockTouchMove,
            false);
        }
        this.setState(this.state);
    }
    LockTouchMove(e){
        e.preventDefault();
        return false;
    }
    render(){
        return <div className={style.ScoreSelectBox}>
            
            <div className={[style.ScoreValue,'childcenter'].join(' ')} onClick={this.HandleDropBoxShow.bind(this,true)}>
                <span>{this.state.selected?this.state.selected:'打分'}</span>
                <span></span>
            </div>
            {this.state.DropBox?<div className={[style.DropBox,'childcenter childcolumn childcontentend'].join(' ')}>

                <div className={[style.SetScoreBox,'childcenter childcolumn'].join(' ')}>
                    <div className={[style.HandleGroup,'childcenter'].join(' ')}>
                        <div className={[style.ButtonBox,'childcenter childcontentstart'].join(' ')}>
                            <div className={[style.Button,'childcenter'].join(' ')} onClick={this.HandleDropBoxShow.bind(this,false)}>取消</div>
                        </div>
                        <div className={[style.ButtonBox,'childcenter childcontentend'].join(' ')}>
                            <div className={[style.Button,'childcenter'].join(' ')} onClick={this.HandleSubmitScore}>确定</div>
                        </div>
                    </div>
                    <div className={[style.ScrollBox,'childcenter childcolumn'].join(' ')} 
                        onTouchStart={this.ScrollTouchStart}
                        onTouchMove={this.ScrollTouchMove}
                        onTouchEnd={this.ScrollTouchEnd}
                    >
                        <span>{(this.state.selectScore-1)<this.state.min?this.state.max:this.state.selectScore-1}</span>
                        <span>{this.state.selectScore==null?1:this.state.selectScore}</span>
                        <span>{((this.state.selectScore==null?1:this.state.selectScore)+1)>this.state.max?this.state.min:(this.state.selectScore==null?1:this.state.selectScore)+1}</span>
                    </div>
                </div>
            </div>:''}
        </div>
    }
}

export default Score