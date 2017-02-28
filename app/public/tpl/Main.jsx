import React from 'react';
import classNames from 'classnames';
import { MIcon } from '../../components/MComponent';
import { Tool } from '../Tool/Tool';

class Main extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			listPoint:[0,1,2,3],
			isComplate:true,
			offset:0
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
	componentDidMount(){
		document.title="React-Component";
		document.querySelectorAll(".page").forEach((item,index)=>{
			item.style.height = window.innerHeight + "px";
		})
		Tool.bind(document, 'mousewheel', this._EventMouseWheel);
        Tool.bind(document, 'DOMMouseScroll', this._EventMouseWheel);
        // window.onmousewheel = document.onmousewheel = this._EventMouseWheel; 
	}
	render(){
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
											<img src="./img/second_admin.png" alt="" />
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
											<img src="./img/second_develop.png" alt="" />
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