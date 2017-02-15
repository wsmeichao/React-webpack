import React from 'react';
import classNames from 'classnames';

/*
*	调用方式： <MTooltip className={'demoClass'} placement='left || right || topLeft || bottomRight' title='鼠标滑过显示的内容'/>主体内容</MTooltip>
*
*   -----------------------------------------------------------------------------------
*   |        参数         |           说明           |     类型      |     默认值     |
*   -----------------------------------------------------------------------------------
*   |      className      |      用户自定义样式      |    string     |                |    
*   -----------------------------------------------------------------------------------
*   |       placement     |     文字提示显示的位置   |    string     |                |
*   -----------------------------------------------------------------------------------
*   |       title         |       显示的文字         |    string     |                |
*   -----------------------------------------------------------------------------------
*/

class MTooltip extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	};
	render() {
		let tooltipClass = "M-tooltip-"+this.props.placement?this.props.placement:"default";
		return (
			<div className="M-tooltip">
				{this.props.children}
				<div className={classNames('M-tooltip-inner',tooltipClass,this.props.className)}>
					{this.props.title}
					<span className="M-tooltip-arrow"></span>
				</div>
			</div>
		);
	}
}
module.exports = MTooltip;