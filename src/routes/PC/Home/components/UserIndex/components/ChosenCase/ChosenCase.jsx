import React, { Component } from 'react'
import style from './ChosenCase.scss'
import {api} from 'common/app'
import CommentBox from './components/CommentBox'
  
export class ChosenCase extends Component {
constructor(props) {
  super(props);
  this.state = {
    data:[],
    CommentOption:{
        show:false,
        id:null,
        content:null,
    }
  };
     this.refreshProps = this.refreshProps.bind(this);
     this.createTableRow = this.createTableRow.bind(this);
     this.getCaseList = this.getCaseList.bind(this);
     this.HandleCommentBox = this.HandleCommentBox.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
  this.getCaseList();
}
refreshProps(props) {
  
}
HandleCommentBox(option){
    this.state.CommentOption = option;
    this.setState(this.state);
}
getCaseList(){
    api.getChosenCase().then(res=>{
        console.log(res);
        if (res.code == 200) {
            this.state.data = res.data?res.data:[];
        }else{
            alert(res.msg)
        }
        this.setState(this.state);
    },err=>{

    })
}
createTableRow(){
    let result = [];
    for (let z = 0; z < this.state.data.length; z++) {
        result.push(<div className={[style.TableRow,'childcenter'].join(' ')}>
        <div className={[style.TableColumn,'childcenter','childcontentstart'].join(' ')} style={{width:'42%'}}>
            <input value={this.state.data[z].name} className={style.ValueInput} type="text" readOnly/>
            <div className={[style.HandleButtonGroup,'childcenter','childcontentstart'].join(' ')}>
                <a href={this.state.data[z].filePath} download={this.state.data[z].name} target="_blank" rel="noopener noreferrer"><div >在线预览</div></a>
            </div>
        </div>
        <div className={[style.TableColumn,'childcenter','childcontentstart'].join(' ')} style={{width:'24%'}}>
        <span className={style.CheckInfo} onClick={this.HandleCommentBox.bind(this,{
            show:true,
            id:this.state.data[z].id,
            content:this.state.data[z].content
        })}>查看详情</span> 
        </div>
        <div className={[style.TableColumn,'childcenter','childcontentstart'].join(' ')} style={{width:'18%'}}>
        <span className={style.Timespan}>{new Date(this.state.data[z].created_at*1000).format('yyyy-MM-dd hh:mm')}</span> 
        </div>
        <div className={[style.TableColumn,'childcenter','childcontentstart'].join(' ')} style={{width:'15%'}}>
        <span className={style.Timespan}>{new Date(this.state.data[z].updated_at*1000).format('yyyy-MM-dd hh:mm')}</span>
        </div>
    </div>);
    }
    return result;
}
render() {
  return (
    <div className={[style.AllCaseBox,'childcenter','childcolumn','childcontentstart'].join(' ')}>
        {this.state.CommentOption.show?<CommentBox id={this.state.CommentOption.id} content={this.state.CommentOption.content} handle={this.HandleCommentBox}/>:''}
        <div className={[style.ListBox,'childcenter','childcolumn','childcontentstart'].join(' ')}>
        
            <div className={[style.TableBox,'childcenter','childcolumn','childcontentstart'].join(' ')}>

                <div className={[style.TableHead,'childcenter'].join(' ')}>
                    <div className={[style.TableColumn,'childcenter','childcontentstart'].join(' ')} style={{width:'42%'}}>
                    名称
                    </div>
                    <div className={[style.TableColumn,'childcenter','childcontentstart'].join(' ')} style={{width:'24%'}}>
                    评委评语
                    </div>
                    <div className={[style.TableColumn,'childcenter','childcontentstart'].join(' ')} style={{width:'18%'}}>
                    上传时间
                    </div>
                    <div className={[style.TableColumn,'childcenter','childcontentstart'].join(' ')} style={{width:'15%'}}>
                    更新时间
                    </div>
                </div>
                <div className={style.TableBody}>
                    {this.createTableRow()}
                </div>
            </div>

        </div>
    </div>
   )
   }
}
export default ChosenCase