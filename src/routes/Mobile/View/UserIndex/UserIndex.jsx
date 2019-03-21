import React, { Component } from 'react'
import { HashRouter,Route,Switch,Redirect} from 'react-router-dom';
import style from './UserIndex.scss'
import AllCase from './View/AllCase'
import ChosenCase from './View/ChosenCase'
import Rule from './View/Rule'
import AuthBox from '../../components/AuthBox'
import AdView from '../../components/AdView'
import projectinfobot from 'assets/projectinfobot.png'
import projectinfotitle from 'assets/projectinfotitle.png'
  
export class UserIndex extends Component {
constructor(props) {
  super(props);
  this.state = {
    navStatus:null,
    ProjectInfoShow:true
  };
  this.refreshProps = this.refreshProps.bind(this);
  this.HandleNav = this.HandleNav.bind(this);
  this.ProjectInfoHandle = this.ProjectInfoHandle.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
  let projectinfoshow = window.localStorage.getItem('projectInfoShow');
  if (projectinfoshow) {
    this.state.ProjectInfoShow = false;
  }
  this.setState(this.state);
}
refreshProps(props) {
    let hash = window.location.hash.split('/');
    this.state.navStatus = hash[hash.length-1];
    this.setState(this.state);
}
HandleNav(status){
    this.props.history.push('/mobile/user/'+status);
}
ProjectInfoHandle(boolean){
  this.state.ProjectInfoShow = boolean;
  if (!boolean) {
    window.localStorage.setItem('projectInfoShow',new Date().getTime());
  }
  this.setState(this.state);
}
render() {
  return (
    <div className={style.UserIndexBox}>
        <AdView />
        <AuthBox />

        {this.state.ProjectInfoShow? <div className={[style.ProjectInfo,'childcenter'].join(' ')}>
          <div className={style.InfoBox}>
            <div className={style.CloseButton} onClick={this.ProjectInfoHandle.bind(this,false)}></div>
            <div className={[style.Content,'childcenter childcolumn'].join(' ')}>
              <div className={style.ContentTitle}>
                <img src={projectinfotitle} alt=""/>
              </div>
              <div className={style.ContentText}>
                为提高基层医生对CMPA的认识，建立新的饮食管理模式，以病例分享和指南解读等方式促进不同学科间的交流合作。中国医师协会儿科医师分会儿童消化专业委员会联合《临床儿科杂志》邀约全国60位专家共同参与“真知灼见—全国CMPA膳食管理案例大赛”，项目帮助儿科、儿保、儿消化、营养、免疫科一线临床医生了解儿童膳食管理学术热点，通过病例分享结合系列课程培训，为青年医生解决CMPA诊治的问题，积累丰富的临床经验。同时，借助《临床儿科杂志》的权威性和影响力，打造新生代“网红”医生，更为青年讲者提供学术交流平台。
              </div>
            </div>
            <div className={style.BottomImage}>
              <img src={projectinfobot} alt=""/>
            </div>
          </div>
        </div>:''}

        <div className={[style.TopNavBox,'childcenter'].join(' ')}>
            <div className={[style.NavButton,'childcenter',this.state.navStatus==='all'?style.MatchNav:''].join(' ')} onClick={this.HandleNav.bind(this,'all')}>
                所有案例
            </div>
            <div className={[style.NavButton,'childcenter',this.state.navStatus==='chosen'?style.MatchNav:''].join(' ')} onClick={this.HandleNav.bind(this,'chosen')}>
                入选案例
            </div>
            <div className={[style.NavButton,'childcenter',this.state.navStatus==='rule'?style.MatchNav:''].join(' ')} onClick={this.HandleNav.bind(this,'rule')}>
                活动规则
            </div>
        </div>
        <div className={style.DetialBox}>
            <Switch>
                <Route path='/mobile/user/all' component={AllCase} />
                <Route path='/mobile/user/chosen' component={ChosenCase} />
                <Route path='/mobile/user/rule' component={Rule} />
                <Redirect from="/mobile/user" to="/mobile/user/rule" />
            </Switch>
        </div>
    </div> 
   )
   }
}
export default UserIndex