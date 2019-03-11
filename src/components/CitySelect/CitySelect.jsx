import React, { Component } from 'react'
import style from './CitySelect.scss'
import DarkBox from 'components/DarkBox'
import CityJson from './CityJson.json'

let touchPosY = 0;
export class CitySelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Drop: false,
            ProvinceArray: [],
            Province: 0,
            CityArray: [],
            City: 0,
            RegionArray: [],
            Region: 0,
            Data: {
                Province: null,
                City: null,
                Region: null,
            }
        };
        this.refreshProps = this.refreshProps.bind(this);
        this.changeProvince = this.changeProvince.bind(this);
        this.createProvince = this.createProvince.bind(this);
        this.changeCity = this.changeCity.bind(this);
        this.createCity = this.createCity.bind(this);
        this.changeRegion = this.changeRegion.bind(this);
        this.createRegion = this.createRegion.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDropBox = this.handleDropBox.bind(this);
        //   this.TouchStart = this.TouchStart.bind(this);
        //   this.TouchMove = this.TouchMove.bind(this);
        //   this.TouchEnd = this.TouchEnd.bind(this);
    }
    componentWillReceiveProps(nextprops) {
        this.refreshProps(nextprops);
    }
    componentDidMount() {
        this.refreshProps(this.props);
        this.changeProvince();
        this.changeCity();
        this.changeRegion();
    }
    refreshProps(props) {
        this.state.HandleSubmit = props.onSelect;
        this.setState(this.state);
    }
    changeProvince() {
        let Province = [];
        for (const key in CityJson) {
            Province.push(key)
        }
        this.state.ProvinceArray = Province;
        this.setState(this.state);
    }
    createProvince() {
        let result = [];
        for (let z = 0; z < this.state.ProvinceArray.length; z++) {
            result.push(<div key={'Province'+z} onClick={this.SelectButton.bind(this, 'Province', z)} className={[style.SelectButton, this.state.Province == z ? style.Selected : '', 'childcenter'].join(' ')}>{this.state.ProvinceArray[z]}</div>)
        }
        return result;
    }
    changeCity() {
        let City = [];
        for (const key in CityJson[this.state.ProvinceArray[Math.floor(this.state.Province)]]) {
            City.push(key)
        }
        this.state.City = 0;
        this.state.CityArray = City;
        this.setState(this.state);
    }
    createCity() {
        let result = [];
        for (let z = 0; z < this.state.CityArray.length; z++) {
            result.push(<div key={'City'+z} onClick={this.SelectButton.bind(this, 'City', z)} className={[style.SelectButton, this.state.City == z ? style.Selected : '', 'childcenter'].join(' ')}>{this.state.CityArray[z]}</div>)
        }
        return result;
    }
    changeRegion() {
        let Region = CityJson[this.state.ProvinceArray[Math.floor(this.state.Province)]][this.state.CityArray[Math.floor(this.state.City)]];;
        this.state.RegionArray = Region;
        this.state.Region = 0;
        this.setState(this.state);
    }
    createRegion() {
        let result = [];
        for (let z = 0; z < this.state.RegionArray.length; z++) {
            result.push(<div key={'Region'+z} onClick={this.SelectButton.bind(this, 'Region', z)} className={[style.SelectButton, this.state.Region == z ? style.Selected : '', 'childcenter'].join(' ')}>{this.state.RegionArray[z]}</div>)
        }
        return result;
    }
    SelectButton(key, value) {
        this.state[key] = value;
        this.setState(this.state);
        switch (key) {
            case 'Province':
                this.refs.City.scrollTop = 0;
                this.changeCity();
                this.changeRegion();
                break;
            case 'City':
                this.refs.Region.scrollTop = 0;
                this.changeRegion();
            default:
                break;
        }
    }
    handleDropBox(boolean) {
        this.state.Drop = boolean;
        this.setState(this.state);
    }
    handleSubmit() {
        this.state.Data = {
            Province: this.state.ProvinceArray[this.state.Province], City: this.state.CityArray[this.state.City], Region: this.state.RegionArray[this.state.Region]
        }
        this.state.HandleSubmit(this.state.ProvinceArray[this.state.Province], this.state.CityArray[this.state.City], this.state.RegionArray[this.state.Region]);
        this.handleDropBox(false);
    }
    render() {
        return (
            <div className={style.SelectBox} tabIndex='0'>
                <div className={[style.SelectedValue, 'childcenter', 'childcontentstart'].join(' ')} onClick={this.handleDropBox.bind(this, true)}>
                    {this.state.Data.Province ? this.state.ProvinceArray[this.state.Province] : ''} {this.state.Data.Province ? this.state.CityArray[this.state.City] : ''} {this.state.Data.Province ? this.state.RegionArray[this.state.Region] : ''}
                </div>
                {this.state.Drop ? <DarkBox >
                    <div className={style.DropBox}>
                        <div className={[style.HandleBox, 'childcenter'].join(' ')}>
                            <div className={[style.ButtonBox, 'childcenter', 'childcontentstart'].join(' ')}>
                                <div className={[style.Button, 'childcenter'].join(' ')} onClick={this.handleDropBox.bind(this, false)}>
                                    取消
                        </div>
                            </div>
                            <div className={[style.ButtonBox, 'childcenter', 'childcontentend'].join(' ')}>
                                <div onClick={this.handleSubmit} className={[style.Button, 'childcenter'].join(' ')}>
                                    确定
                        </div>
                            </div>
                        </div>
                        <div className={[style.ListBox, 'childcenter childcolumn childcontentstart'].join(' ')}>
                            <div className={[style.ListHead, 'childcenter'].join(' ')}>
                                <div className={[style.Column, 'childcenter'].join(' ')}>
                                    省
                        </div>
                                <div className={[style.Column, 'childcenter'].join(' ')}>
                                    市
                        </div>
                                <div className={[style.Column, 'childcenter'].join(' ')}>
                                    区
                        </div>
                            </div>
                            <div className={[style.ListBody, 'childcenter'].join(' ')}>
                                <div className={[style.Column].join(' ')} ref='Province' >
                                    <div className={style.Lists} style={{ '--nowindex': this.state.Province }}>
                                        {this.createProvince()}
                                    </div>
                                </div>
                                <div className={[style.Column].join(' ')} ref='City' >
                                    <div className={style.Lists} style={{ '--nowindex': this.state.City }}>
                                        {this.createCity()}
                                    </div>
                                </div>
                                <div className={[style.Column].join(' ')} ref='Region' >
                                    <div className={style.Lists} style={{ '--nowindex': this.state.Region }}>
                                        {this.createRegion()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </DarkBox> : ''}

            </div>
        )
    }
}
export default CitySelect