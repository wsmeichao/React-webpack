import React from 'react';
import classNames from 'classnames';

/*
*	调用方式： <MButton onClick={this._callback} className={'demoClass'} type='primary' size='lg'>testword</MButton>
*
*	--------------------------------------------------------------------------
*	|  参数		|	      说明	  	   |        类型          |    默认值	 |
*	--------------------------------------------------------------------------
*	|  onClick  |       回调函数 	   |      function        |				 |
*	--------------------------------------------------------------------------
*	| className |    用户自定义样式    |       string         | 			 |
*	--------------------------------------------------------------------------
*	|   type    |     button的类型     |'primary|ghost|dashed'|              |
*	--------------------------------------------------------------------------
*	|   size    |     button的大小     |       'lg|sm'        |              |
*	--------------------------------------------------------------------------
*
*/

class MButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
		[
	    	'_click',
	    ].forEach(func=>{
	        this[func] = this[func].bind(this);
	    });
	};
	_click(e) {
		this.props.onClick?this.props.onClick():"";
	};
	render() {
		let buttontype = this.props.type?`M-btn-${this.props.type}`:"";
		let buttonsize = this.props.size?`M-btn-${this.props.size}`:"";
		return ( 
			<button className = {classNames('M-btn',buttontype,buttonsize,this.props.className)} onClick = { this._click}>
				<span>
					{this.props.children}
				</span>
			</button>
		);
	}
}
class Group extends React.Component{
	constructor(props) {
		super(props);
	}
	render(){
		return (
			<div className={classNames('M-btn-group',this.props.className)}>
				{this.props.children}
			</div>
		)
	}
}
MButton.Group = Group;
module.exports = MButton;
