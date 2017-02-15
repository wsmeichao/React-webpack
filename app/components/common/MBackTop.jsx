import React from 'react';
import MIcon from './MIcon';
import classNames from 'classnames';
import {ComponentTool} from '../Tool/ComponentTool';

/*
*	调用方式： <MBackTop onClick={this._callback} className={'demoClass'}/>
*
*	----------------------------------------------------------------------
*	|  参数		|	      说明	  	   |      类型	   |      默认值	 |
*	----------------------------------------------------------------------
*	|  onClick  |       回调函数 	   |    function   |				 |
*	----------------------------------------------------------------------
*	| className |    用户自定义样式    |     string    | 				 |
*	----------------------------------------------------------------------
*/
class MBackTop extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			InTop: '',
			scrollTop:0,
			TimeClearn:[]
		};
		[
	    	'_handleScroll',
	        '_backTop',
	        '_toTop',
	    ].forEach(func=>{
	        this[func] = this[func].bind(this);
	    });
	}
	_backTop(){
		this.props.onClick?this.props.onClick():"";
		this._toTop();
	}
	_toTop(){
		let self = this;
		let everyScroll = -self.state.scrollTop/10;
		window.scrollBy(0,everyScroll);
		if(document.body.scrollTop>0) { 
			let timeout = setTimeout(function() {
				self._toTop();
			}, 10);
			self.state.TimeClearn.push(timeout);
		}
	}
	_handleScroll(e){
		let self = this;
	    let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
		let InTop = self.state.InTop;
	    if(scrollTop > 0){
	    	if(InTop == ''){
	    		InTop = 'M-in-top';
	    	}	    			
	    }else{
	    	InTop = '';
	    }
	    self.setState({
			InTop: InTop,
			scrollTop: scrollTop
		});
	}
	componentDidMount() {
		ComponentTool.bind(window,'scroll',this._handleScroll);
	}
	componentWillUnmount() {
		this.state.TimeClearn.map(function(elem,index) {
			clearTimeout(elem);
		})
		ComponentTool.unbind(window,'scroll',this._handleScroll);
	}
	render(){
		return (
			<div className = {classNames('M-back-top',this.state.InTop,this.props.className)} onClick = {this._backTop}>
				<MIcon type="arrowup" />
			</div>
		)
	}
}
module.exports = MBackTop;