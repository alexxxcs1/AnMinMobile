import React, { Component } from 'react'
import style from './RaterLogin.scss'
import raterloginlogo from 'assets/raterloginlogo.png'
import mobilebottom from 'assets/mobilebottom.png'
import raterlogintitle from 'assets/raterlogintitle.png'
import {api} from 'common/app'
import RaterAuthBox from '../../components/RaterAuthBox';
import customerservice from 'assets/customerservice.png'
  
export class RaterLogin extends Component {
constructor(props) {
  super(props);
  this.state = {
      username:'',
      userpassword:'',
  };
  this.refreshProps = this.refreshProps.bind(this);
  this.onInputBlur = this.onInputBlur.bind(this);
  this.LoginAction = this.LoginAction.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
}
refreshProps(props) {
  
}
onInputBlur() {
    document.documentElement.scrollTop = 0;
    window.pageYOffset = 0;
    document.body.scrollTop = 0;
}
LoginAction(){
    if (this.state.username&&this.state.userpassword) {
        api.raterLogin(this.state.username,this.state.userpassword).then(res=>{
            if (res.code == 200) {
                window.location.hash = '#/mobile/rateruser'
            }else{
                alert(res.msg)
            }
        },err=>{
    
        })
    }else{
        alert('请输入正确的账号密码！')
    }
    
}
HandleInputChange(type,e){
    this.state[type] = e.target.value;
    this.setState(this.state);
}
render() {
  return (
    <div className={style.RaterLoginBox}>
        <RaterAuthBox />
        <div className={style.LogoBox}>
            <img src={raterloginlogo} alt=""/>
        </div>

        {this.state.forgetservice?<div className={[style.ContentBox,'childcenter childcolumn'].join(' ')}>
            <ForgetPassword return={(()=>{this.setState({forgetservice:false})}).bind(this)}/>
        </div>:''}

        {this.state.forgetservice?'':<div className={[style.ContentBox,'childcenter childcolumn'].join(' ')}>
            <div className={style.LoginTitle}>
                <img src={raterlogintitle} alt=""/>
            </div>
            <div className={[style.TextTitleBox,'childcenter childcolumn'].join(' ')}>
                <span>全国CMPA膳食管理案例大赛</span>
                <span>欢迎专家登录</span>
            </div>
            <div className={style.FormBody}>
                <div className={[style.InputRow,'childcenter'].join(' ')}>
                    <div className={[style.InputName,'childcenter'].join(' ')}>账号：</div>
                    <input type="text" onChange={this.HandleInputChange.bind(this,'username')} value={this.state.username} className={style.Inputs} onBlur={this.onInputBlur}/>
                </div>
                <div className={[style.InputRow,'childcenter'].join(' ')}>
                    <div className={[style.InputName,'childcenter'].join(' ')}>密码：</div>
                    <input type="password" onChange={this.HandleInputChange.bind(this,'userpassword')} value={this.state.userpassword} className={style.Inputs} onBlur={this.onInputBlur}/>
                </div>
            </div>
            <div className={[style.SubmitButton,'childcenter'].join(' ')} onClick={this.LoginAction}>确认</div>
            <div className={style.ForgetPassword} onClick={(()=>{this.setState({forgetservice:true})}).bind(this)}>
                忘记密码
            </div>
        </div>}

        <div className={style.BottomImageBox}>
            <img src={mobilebottom} alt=""/>
        </div>

    </div>
   )
   }
}

class ForgetPassword extends Component{
    constructor(props){
        super(props);
        this.state={};
    }
    render(){
        return <div className={[style.ForgetBox,'childcenter childcolumn'].join(' ')}>
            <img src={customerservice} alt=""/>
            <span>电话联系客服</span>
            <div className={[style.ReturnButton,'childcenter'].join(' ')} onClick={this.props.return}>完成</div>
        </div>
    }
}

export default RaterLogin