import React, { Component } from 'react'
import style from './SearchBox.scss'
import selecticon from 'assets/selecticon.png'
  

export class SearchBox extends Component {
constructor(props) {
  super(props);
  this.state = {
    filterType:null,
    searchValue:'',
  };
  this.refreshProps = this.refreshProps.bind(this);
  this.HandleSearchValue = this.HandleSearchValue.bind(this);
  this.startListenKey = this.startListenKey.bind(this);
  this.onKeyDown = this.onKeyDown.bind(this);
  this.onInputBlur = this.onInputBlur.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
  this.startListenKey();
}
refreshProps(props) {
  
}
HandleSelect(option){
    if (this.state.filterType === option) return;
    this.state.filterType = option;
    this.setState(this.state);
    this.props.onOptionChange(option?option.key:null);
}
HandleSearchValue(e){
    this.state.searchValue = e.target.value;
    this.setState(this.state);
}
startListenKey(){
    window.addEventListener('keydown',this.onKeyDown);
}
onKeyDown(e){
    if (e.key === 'Enter') {
        this.props.onSearchValueChange(this.state.searchValue);
    }
}
onInputBlur() {
    document.documentElement.scrollTop = 0;
    window.pageYOffset = 0;
    document.body.scrollTop = 0;
}
render() {
  return (
    <div className={[style.SearchBox,'childcenter'].join(' ')}>
        <div className={style.SelectOptionBox} tabIndex='0'>
            <div className={[style.SelectedValue,'childcenter'].join(' ')}>
                {this.state.filterType==null?'全部':this.state.filterType.value}
            </div>
            <div className={style.DropOption}>
                <div className={[style.Option,'childcenter'].join(' ')} onClick={this.HandleSelect.bind(this,null)}>全部</div>
                <div className={[style.Option,'childcenter'].join(' ')} onClick={this.HandleSelect.bind(this,{key:'name',value:'姓名'})}>姓名</div>
                <div className={[style.Option,'childcenter'].join(' ')} onClick={this.HandleSelect.bind(this,{key:'hospital',value:'医院'})}>医院</div>
                <div className={[style.Option,'childcenter'].join(' ')} onClick={this.HandleSelect.bind(this,{key:'office',value:'科室'})}>科室</div>
            </div>
        </div>
        <div className={[style.SearchValueBox,'childcenter'].join(' ')}>
            <input type="text" value={this.state.searchValue} onBlur={this.onInputBlur} onChange={this.HandleSearchValue} className={style.Inputs}/>
            <div className={style.SelectIcon} onClick={(()=>{
                this.props.onSearchValueChange(this.state.searchValue);
            }).bind(this)}>
                <img src={selecticon} alt=""/>
            </div>
        </div>
    </div>
   )
   }
}
export default SearchBox