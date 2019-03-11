import React, { Component } from 'react';
import style from './AllCase.scss';
import {api} from 'common/app';
import PropTypes from "prop-types";
  
let reuploadid = null;
let reuploadindex = null;
export class AllCase extends Component {
constructor(props) {
  super(props);
  this.state = {
    data:[],
  };
     this.refreshProps = this.refreshProps.bind(this);
     this.createTableRow = this.createTableRow.bind(this);
     this.getCaseList = this.getCaseList.bind(this);
     this.onFileChange = this.onFileChange.bind(this);
     this.clickFile = this.clickFile.bind(this);
     this.onDeleteCase = this.onDeleteCase.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
  this.getCaseList();
}
refreshProps(props) {
    this.getCaseList();
}
getCaseList(){
    api.getAllCase().then(res=>{
        console.log(res);
        if (res.code == 200) {
            this.state.data = res.data;
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
        <div className={[style.TableColumn,'childcenter','childcontentstart'].join(' ')} style={{width:'66%'}}>
            <input title={this.state.data[z].name} value={this.state.data[z].name} className={style.ValueInput} type="text" readOnly/>
            <div className={[style.HandleButtonGroup,'childcenter','childcontentstart'].join(' ')}>
                <a href={this.state.data[z].filePath} download={this.state.data[z].name} target="_blank" rel="noopener noreferrer"><div >在线预览</div></a>
                <div onClick={this.clickFile.bind(this,this.state.data[z].id,z)}>重新上传</div>
                <div onClick={this.onDeleteCase.bind(this,this.state.data[z].id,z)}>删除</div>
            </div>
        </div>
        <div className={[style.TableColumn,'childcenter','childcontentstart'].join(' ')} style={{width:'17%'}}>
        <span className={style.Timespan}>{new Date(this.state.data[z].created_at*1000).format('yyyy-MM-dd hh:mm')}</span> 
        </div>
        <div className={[style.TableColumn,'childcenter','childcontentstart'].join(' ')} style={{width:'17%'}}>
        <span className={style.Timespan}>{new Date(this.state.data[z].updated_at*1000).format('yyyy-MM-dd hh:mm')}</span>
        </div>
    </div>);
    }
    return result;
}
onDeleteCase(id,index){
    let self = this;
    this.context.HandleAlertOption(true,{
        Value:'确认删除该案例吗？',
        Cancle:()=>{
            this.context.HandleAlertOption(false,null)
        },
        Submit:()=>{
            api.deleteCase(id).then(res=>{
                console.log(res);
                if (res.code == 200) {
                    self.state.data.splice(index,1);
                }else{
                    alert(res.msg)
                }
                self.setState(self.state);
            },err=>{
        
            })
        }
    })
    
}
clickFile(id,index){
    reuploadid = id;
    reuploadindex = index;
    this.refs.file.click();
}
onFileChange(e){
    let file = e.target.files[0];
    e.target.value = '';
    if (file) {
        let formdata = new FormData();
        formdata.append('file',file);
        formdata.append('id',reuploadid);   
        api.reuploadCase(formdata).then(res=>{
            // console.log(res);
            if (res.code == 200) {
                this.state.data[reuploadindex].filePath = res.data;
            }
            this.setState(this.state);
            alert(res.msg)
        },err=>{

        })
        
    }
    reuploadid = null;
}
render() {
  return (
    <div className={[style.AllCaseBox,'childcenter','childcolumn','childcontentstart'].join(' ')}>
        <div className={[style.ListBox,'childcenter','childcolumn','childcontentstart'].join(' ')}>
        
            <div className={[style.TableBox,'childcenter','childcolumn','childcontentstart'].join(' ')}>

                <div className={[style.TableHead,'childcenter'].join(' ')}>
                    <div className={[style.TableColumn,'childcenter','childcontentstart'].join(' ')} style={{width:'66%'}}>
                    名称
                    </div>
                    <div className={[style.TableColumn,'childcenter','childcontentstart'].join(' ')} style={{width:'17%'}}>
                    上传时间
                    </div>
                    <div className={[style.TableColumn,'childcenter','childcontentstart'].join(' ')} style={{width:'17%'}}>
                    更新时间
                    </div>
                </div>
                <div className={style.TableBody}>
                    {this.createTableRow()}
                </div>
            </div>
        </div>
        <input type="file" ref='file' className={style.hidden} onChange={this.onFileChange}/>
    </div>
   )
   }
}
AllCase.contextTypes = {
    HandleAlertOption: PropTypes.func
};
export default AllCase