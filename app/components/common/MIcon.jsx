import React from 'react';
import classNames from 'classnames';

/*
*	调用方式： <MIcon className={'demoClass'} type='left' />
*
*	--------------------------------------------------------------------------
*	|  参数		|	      说明	  	   |        类型          |    默认值	 |
*	--------------------------------------------------------------------------
*	| className |    用户自定义样式    |       string         | 			 |
*	--------------------------------------------------------------------------
*	|   type    |     显示的类型       |       string         |              |
*	--------------------------------------------------------------------------
*/

class MIcon extends React.Component{
	constructor(props) {
		super(props);
		this.states = {		
		};
	}
	render(){
		return (
			<i className={classNames('iconfont',`icon-${this.props.type}`,this.props.className)}></i>
		)
	}
}
module.exports = MIcon;