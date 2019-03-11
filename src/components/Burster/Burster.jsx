import React, { Component } from "react";
import style from "./Burster.scss";

export class Burster extends Component {
    constructor(props) {
        super(props);
        this.state = {
            min: 1,
            max: 1,
            now: 1,
            pagenum:1,
        };
        this.refreshProps = this.refreshProps.bind(this);
        this.pageHandle = this.pageHandle.bind(this);
        this.valuehandle = this.valuehandle.bind(this);
    }
    componentDidMount() {
        this.refreshProps(this.props);
    }
    componentWillReceiveProps(nextprops) {
        this.refreshProps(nextprops);
    }
    refreshProps(props) {
        this.setState({
            min: props.min ? props.min : this.state.min,
            max: props.max ? props.max : this.state.max,
            now: props.now ? props.now : this.state.now,
        });
    }
    pageHandle(e) {
        e.target.value = e.target.value.replace(/[^0-9-]+/, "");
        
        this.state.pagenum = e.target.value;
        this.setState(this.state);
    }
    valuehandle(){
        this.props.valuehandle(this.state.pagenum);
        this.state.pagenum = '';
        this.setState(this.state);
    }
    render() {
        return (
            <div className={style.BursterBox}>
                <div className={style.burster}>
                    <div className={style.baseBox}>
                    {this.state.now <= this.state.min ? (
                        ""
                    ) : (
                        <div className={[style.arrowbtn].join(" ")} onClick={this.props.backhandle}/>
                    )}
                    </div>
                    {this.state.now}/{this.state.max}
                    <div className={style.baseBox}>
                    {this.state.now >= this.state.max ? (
                        ""
                    ) : (
                        <div
                            className={[style.arrowbtn, style.next].join(" ")} onClick={this.props.nexthandle}
                        />
                    )}
                    </div>
                    <div className={style.jumpbox}>
                        <input
                            value={this.state.pagenum}
                            className={style.jumpinput}
                            onChange={this.pageHandle}
                        />
                        <div className={style.jumpbutton} onClick={this.valuehandle}>跳转</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Burster;
