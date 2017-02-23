import React from 'react';
import ReactDom from 'react-dom';
import classNames from 'classnames';

/*
* 调用方式： <MInput type='text' placeholder='testplaceholder' value='value' defaultValue='defaultValue' disabled size='lg' className={'demoClass'} onFocus={this._onFocus} onBlur={this._onBlur} onChange={this,_onChange} onKeyPress={this._onKeyPress}/>
*
*   ---------------------------------------------------------------------------------------------
*   |            参数            |           说明          |        类型          |    默认值   |
*   ---------------------------------------------------------------------------------------------
*   |            type            |        输入框类型       |        string        |             |
*   ---------------------------------------------------------------------------------------------
*   |         placeholder        |        显示的内容       |        string        |             |
*   ---------------------------------------------------------------------------------------------
*   | value(之后改变不了value值) |        输入框的值       |        string        |             |
*   ---------------------------------------------------------------------------------------------
*   |  defaultValue(之后可改变)  |          默认值         |        string        |             |
*   ---------------------------------------------------------------------------------------------
*   |           disabled         |    输入框是否不可编辑   |        disabled      |             |  
*   ---------------------------------------------------------------------------------------------
*   |            size            |        输入框大小       |        'lg|sm'       |             |
*   ---------------------------------------------------------------------------------------------
*   |         className          |      用户自定义样式     |        string        |             |
*   ---------------------------------------------------------------------------------------------
*   |           onFocus          |      输入框聚焦操作     |        function      |             |    
*   ---------------------------------------------------------------------------------------------
*   |           onBlur           |   输入框失去焦点操作    |        function      |             |
*   ---------------------------------------------------------------------------------------------
*   |          onChange          |     输入框值改变操作    |        function      |             |    
*   ---------------------------------------------------------------------------------------------
*   |         onKeyPress         |         键盘操作        |        function      |             |     
*   ---------------------------------------------------------------------------------------------
*
*/

class MInput extends React.Component {
    constructor(props) {
      super(props);
      [
        '_Focus',
        '_Blur',
        '_Change',
      ].forEach(func=>{
          this[func] = this[func].bind(this);
      });
    };
    _Focus(e){
      this.props.onFocus?this.props.onFocus():'';
      this.InputFocus.focus();
    }
    _Blur(){
      this.props.onBlur?this.props.onBlur():'';
    }
    _Change(e){
      this.props.onChange?this.props.onChange(e):"";
    }
    render() {
      let inputsize = this.props.size?`M-input-${this.props.size}`:"";
      return (
      	<span className="M-input-wrapper">
      		<input 
      			type={this.props.type} 
      			placeholder={this.props.placeholder} 
      			value={this.props.value}
      			defaultValue={this.props.defaultValue}
      			disabled={this.props.disabled}
      			className={classNames('M-input',inputsize,this.props.className)} 
      			onFocus={this._Focus} 
      			onBlur={this._Blur}
      			onChange={this._Change}
            onKeyPress={this.props.onKeyPress}
            ref={event=>this.InputFocus=event}
      		/>
      	</span>
      )
    }
}
module.exports = MInput;