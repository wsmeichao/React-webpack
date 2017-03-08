import React from 'react';
import classNames from 'classnames';
import { MIcon } from '../../components/MComponent';
import { Tool } from '../Tool/Tool';
const secondAdmin = require('../../../build/img/second_admin.png');
const secondDevelop = require('../../../build/img/second_develop.png');

class Main extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			listPoint:[0,1,2,3],
			isComplate:true,
			offset:0,
			test:true
		};
		[
	        '_offset',
	        '_nextPage',
	        '_getEvent',
	        '_stopPropagation',
	        '_EventMouseWheel',
	    ].forEach(func=>{
	        this[func] = this[func].bind(this);
	    });
	}
	_offset(index){
		this.setState({
        	offset:index
      	})	
	}
	_nextPage(){
		let nowPage = this.state.offset;
		this.setState({offset:nowPage+1});
	}
	_getEvent(event) {
        return event ? event : window.event;
    };
    _stopPropagation(event) {
        event = this._getEvent(event);
        if (event.stopPropagation) {
            event.stopPropagation();
        }else{
            event.cancelBubble = true;
        }
    }
    _EventMouseWheel(event) {
    	let state = this.state;
    	this._stopPropagation(event);
	    event = this._getEvent(event);
	    if(state.isComplate){
	    	state.isComplate = false;
	    	let wheelDeltaValue = event.wheelDelta || event.detail;
	    	let preOffset = state.offset;
	    	if(wheelDeltaValue > 0 && preOffset > 0){
	    		preOffset--
	        }else if(wheelDeltaValue < 0 && preOffset < (state.listPoint.length-1)){
	        	preOffset++;
	        }
	        this.setState({
    			isComplate:true,
    			offset:preOffset
    		})
	    }
    }
    componentWillReceiveProps(nextProps){
    	// 这个还没有刷新出来,因为props没有改变
    	console.log("nextProps",nextProps);
    }
    // forceUpdate(){

    // }
    shouldComponentUpdate(nextProps,nextState){
    	console.log(this.state);
    	console.log("shouldComponentUpdate",nextProps,nextState);
    	return true;
    }
    componentWillUpdate(nextProps,nextState){
    	console.log("componentWillUpdate",nextProps,nextState);
    }
    componentDidUpdate(prevProps,prevState){
    	console.log("componentDidUpdate",prevProps,prevState);
    	console.log(this.state);
    }

    /*
    *	componentDidMount 和 componentDidUpdate 常用来加载第三方的库（此时真实DOM存在，可加载各种图表库）。
    */

    componentWillMount(){
    	this.setState({test:false});
    	console.log("componentWillMount");
    }
	componentDidMount(prevProps,prevState){
		console.log(this.props.children)
		console.log("componentDidMount",prevProps,prevState,'this.state',this.state);
		document.title="React-Component";
		document.querySelectorAll(".page").forEach((item,index)=>{
			item.style.height = window.innerHeight + "px";
		})
		Tool.bind(document, 'mousewheel', this._EventMouseWheel);
        Tool.bind(document, 'DOMMouseScroll', this._EventMouseWheel);
        // window.onmousewheel = document.onmousewheel = this._EventMouseWheel; 
	}
	render(){
		console.log(__dirname);
		let arr = [1,1,'2','2',3,4,5,'meichao','meichao'];
		console.log("数组去重",[...new Set(arr)]);
		// for(let item of ['a','b']){console.log(item )}
		let arrs = [1,2,3,5];
		Tool.ArrayConcat(arrs,['3','4','d','g'],6,7,8,[5,6,6,6,6,4]);
		console.log(arrs);
		const self = this;
		let mainPageOffset = {
			height:window.innerHeight,
			transform:'translateY(-'+this.state.offset*window.innerHeight+'px)'
		}
		let listPoint = self.state.listPoint.map(function(elem, index) {
			return <div key={`list-point-${index}`} className={classNames('list-point',{'active':self.state.offset==elem})} onClick={self._offset.bind(self,elem)}></div>
		})
		return (
			<main className="main-wrapper">
				<section id="list">
					{listPoint}
				</section>
				<section className="page-container">
					<div style={mainPageOffset} className="page-full">
						<div className={classNames('page',{'page-active':this.state.offset==0})}>
							<div className="first-content">
								React Componet  <span className="design">Design</span>
								<div className="doIt">
									Lets Do it
								</div>
								<a className="start" href="https://git.oschina.net/meichao/React-webpack" target="_blank">
									<MIcon type='github' /><span>Github</span>
								</a>
							</div>
							<div className="rainbow">
							    <div className="green"></div>
							    <div className="cyan"></div>
							    <div className="blue"></div>
							    <div className="purple"></div>
							    <div className="pink"></div>
							    <div className="MediumVioletRed"></div>
							    <div className="Thistle"></div>
							    <div className="Violet"></div>
							</div>
							<div className="nextPage" onClick={this._nextPage}></div>
						</div>
						<div className={classNames('page',{'page-active':this.state.offset==1})}>
							<div className="second-content">
								<div className="second-hd">开发人员介绍</div>
								<div className="second-bd">
									<div className="second-cell">
										<div className="second-cell-hd">
											<img src={secondAdmin} alt="" />
										</div>
										<div className="second-cell-bd">
											<div className="second-cell-bd-title">梅超</div>
											<div className="second-cell-bd-content">
												项目的主要开发者,负责整体的架构及开发流程(不会PS的前端不是一个好UI)
											</div>
											<a href="http://bigmeichao.com/" target="_blank">个人博客<MIcon type='arrowright' /></a>
										</div>
										<div className="second-cell-ft">
											<MIcon type='user'/> admin
										</div>
									</div>
									<div className="second-cell">
										<div className="second-cell-hd">
											<img src={secondDevelop} alt="" />
										</div>
										<div className="second-cell-bd">
											<div className="second-cell-bd-title">邓文秀</div>
											<div className="second-cell-bd-content">
												项目协助者,负责相关组件的开发(一个会PS的前端)
											</div>
											<a href="http://www.arvinsue-tsang.com/" target="_blank">个人博客<MIcon type='arrowright' /></a>
										</div>
										<div className="second-cell-ft">
											<MIcon type='user'/> develop
										</div>
									</div>
								</div>
							</div>
							<div className="nextPage" onClick={this._nextPage}></div>
						</div>
						<div className="content-wrapper page"></div>
						<div className="content-wrapper page"></div>
					</div>
				</section>
      		</main>
    	);
	}
}
module.exports = Main;