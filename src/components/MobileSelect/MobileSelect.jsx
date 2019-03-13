import React, { Component } from 'react'
import style from './MobileSelect.scss'
import DarkBox from 'components/DarkBox'
  
export class MobileSelect extends Component {
constructor(props) {
  super(props);
  this.state = {
      option:null,
      selected:null,
      DropOn:false,
  };
     this.refreshProps = this.refreshProps.bind(this);
     this.createOptionButton = this.createOptionButton.bind(this);
     this.handleSelect = this.handleSelect.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
}
refreshProps(props) {
  this.state.option = props.option?props.option:this.state.option;
  this.setState(this.state);
}
createOptionButton(){
  if (!this.state.option) return;
  let result = [];
  for (const key in this.state.option) {
      if (this.state.option.hasOwnProperty(key)) {
          result.push(
            <div onClick={this.handleSelect.bind(this,key)} className={[style.RowBox,this.state.selected === key?style.Selected:'','childcenter'].join(' ')}>{this.state.option[key]}</div>
          )
      }
  }
  return result;
}
handleSelect(key){
    this.state.selected = key;
    this.setState(this.state);
}
handleDropBox(boolean){
    if (boolean) {
        this.props.onSelect({key:this.state.selected,value:this.state.option[this.state.selected]});
        this.state.DropOn = false;
    }else{
        this.state.DropOn = false;
    }
    this.setState(this.state);
}
render() {
  return (
    <div className={style.MobileSelect}>
        <div className={[style.SelectValue,this.state.selected?'':style.Placeholder,'childcenter', 'childcontentstart'].join(' ')} onClick={(()=>{this.setState({DropOn:true})}).bind(this)}>
            {this.state.selected?this.state.option[this.state.selected]:(this.props.placeholder?this.props.placeholder:'')}
        </div>
        {this.state.DropOn?<DarkBox >

            <div className={style.DropBox}>

                <div className={[style.HandleBox, 'childcenter'].join(' ')}>
                    <div className={[style.ButtonBox, 'childcenter', 'childcontentstart'].join(' ')}>
                        <div onClick={this.handleDropBox.bind(this,false)} className={[style.Button, 'childcenter'].join(' ')}>
                            取消
                        </div>
                    </div>
                    <div className={[style.ButtonBox, 'childcenter', 'childcontentend'].join(' ')}>
                        <div onClick={this.handleDropBox.bind(this,true)} className={[style.Button, 'childcenter'].join(' ')}>
                            确定
                        </div>
                    </div>
                </div>
                <div className={style.DataBody}>
                    {this.createOptionButton()}
                </div>
            </div>

        </DarkBox>:''}
    </div>
   )
   }
}
export default MobileSelect