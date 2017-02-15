import React from 'react';
import MIcon from './MIcon';
import classNames from 'classnames';
import {ComponentTool} from '../Tool/ComponentTool';

/*
* 调用方式： <MSelect className='testClass' multiple style={{width:this.state.selectWith}} defaultValue={this.state.pageSize} dataSource={this.state.dataSource} onSelect={this._changeSize}/>
*
*   -----------------------------------------------------------------------------------
*   |        参数         |           说明           |     类型      |     默认值     |
*   -----------------------------------------------------------------------------------
*   |      className      |      用户自定义样式      |    string     |                |    
*   -----------------------------------------------------------------------------------
*   |       multiple      |       是否可以多选       |   multiple    |                |
*   -----------------------------------------------------------------------------------
*   |       style         |      用户自定义样式      |    string     |                |
*   -----------------------------------------------------------------------------------
*   |    defaultValue     |       默认显示的值       |    number     |                |
*   -----------------------------------------------------------------------------------
*   |     dataSource      |       下拉框的值         |  array|json   |                |
*   -----------------------------------------------------------------------------------
*   |      onSelect       |  选中下拉框中的值的回调  |   function    |                |  
*   -----------------------------------------------------------------------------------
*
*/

class MSelect extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        value:this.props.defaultValue || "",
        selectOpen:false,
        multiple:this.props.multiple?true:false     //暂时无用,满足基本需求为先
      };

      [
        '_selectOpen',
        '_selectClose',
      ].forEach(func=>{
        this[func] = this[func].bind(this);
      });
  };
  _selectOpen(e){
    e.stopPropagation();
    if (e.nativeEvent.stopImmediatePropagation) {
      e.nativeEvent.stopImmediatePropagation();
    }
    let ifOpen = this.state.selectOpen;
    this.setState({
      selectOpen:!ifOpen
    }) 
  }
  _selectClose(){
    let ifOpen = this.state.selectOpen;
    if(ifOpen){
      this.setState({
        selectOpen:!ifOpen
      })
    }  
  }
  _select(elem){
    let chooseValue = "";
    if(typeof elem == 'object'){
      for(let key in elem){
        chooseValue = elem[key];
      }
    }else if(typeof elem == 'string' || typeof elem == "number"){
      chooseValue = elem;
    }
    this.setState({
      value:chooseValue
    })
    this.props.onSelect(chooseValue);
  }
  componentDidMount(){
    ComponentTool.bind(document, 'click', this._selectClose);
  }
  componentWillUnmount(){
    ComponentTool.unbind(document, 'click', this._selectClose);
  }
  render() {
    let self = this;
    let showValue = self.state.value;
    if(typeof self.state.value == 'object'){
      for(let key in self.state.value){
        showValue = self.state.value[key];
      }
    }
    let option = self.props.dataSource?self.props.dataSource.map((elem,index)=>{
      if(typeof elem == 'object'){
        for(let key in elem){
          return <li key={index} className={classNames('M-select-dropdown-menu-item',{"M-select-dropdown-menu-item-selected":self.state.value==elem[key]})} onClick={self._select.bind(self,elem)}>{elem[key]}</li>
        }
      }else if(typeof elem == 'string' || typeof elem == "number"){
        return <li key={index} className={classNames('M-select-dropdown-menu-item',{"M-select-dropdown-menu-item-selected":self.state.value==elem})} onClick={self._select.bind(self,elem)}>{elem}</li>
      }
    }):"";
    return (
    	<div className={classNames('M-select',this.props.className,{'M-select-open':this.state.selectOpen})} style={this.props.style}>
        <div className={classNames('M-select-selection')} onClick={this._selectOpen}>
          <div className={classNames('M-select-selection-selected')}>{showValue}</div>
        </div>
        <MIcon type="down" className="M-select-allow"/>
        <div className={classNames('M-select-dropdown')}>
          <ul className={classNames('M-select-dropdown-menu')}>
            {option}
          </ul>
        </div>      
    	</div>
    )
  }
}
module.exports = MSelect;
