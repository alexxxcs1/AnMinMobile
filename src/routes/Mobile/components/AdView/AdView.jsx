import React, { Component } from 'react'
import style from './AdView.scss'
import adtitle from 'assets/adtitle.png';
import mobilebottom from 'assets/mobilebottom.png'
import raterloginlogo from 'assets/raterloginlogo.png'
  
let cutdowntime;
export class AdView extends Component {
constructor(props) {
  super(props);
  this.state = {
      lasttime:5,
      end:false,
      unshow:false,
  };
  this.refreshProps = this.refreshProps.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  
  
  this.refreshProps(this.props);
  let lastAD = window.localStorage.getItem('lastAD');
  if (lastAD&&((new Date().getTime() - lastAD)<=60000*10)){
    this.state.unshow = true;
    this.setState(this.state);
  };
  this.onLoaded();
}
refreshProps(props) {
  
}
onLoaded(){
    cutdowntime = setInterval(() => {
        if (this.state.lasttime<=0) {
            clearInterval(cutdowntime);
            this.state.end = true;
            this.state.unshow = true;
            this.setState(this.state);
            window.localStorage.setItem('lastAD',new Date().getTime());
        }else{
            this.state.lasttime -= 1;
            this.setState(this.state);
        }
    }, 1000);
}
render() {
  return (
    <div className={[style.UnshowBox,this.state.unshow?style.UnshowTure:''].join(' ')}>
        {this.state.unshow?'':<div className={[style.AdView,this.state.end?style.ADHide:''].join(' ')}>
            
            <div className={style.LogoBox}>
                <img src={raterloginlogo} alt=""/>
            </div>
            <div className={[style.ContentBox,'childcenter childcolumn'].join(' ')}>
                <div className={[style.CutDownTime,'childcenter'].join(' ')}>
                    {this.state.lasttime}
                </div>
                <div className={style.TitleBox}>
                    <img src={adtitle} alt=""/>
                </div>
            </div>
            <div className={style.BottomImage}>
                <img src={mobilebottom} alt=""/>
            </div>
        </div>}
    </div>
   )
   }
}
export default AdView