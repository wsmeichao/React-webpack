import React from 'react';
import MIcon from './MIcon';
import MSelect from './MSelect';
import MInput from './MInput';
import {ComponentTool} from '../Tool/ComponentTool';
import classNames from 'classnames';

/*
* 调用方式： <MPagination current='1' pageSize='10' pagesLength='9' showQuickJumper selectWith='65' showSizeChanger pageSizeOptions={[10,20,30,40,50]} className={'demoClass'} onChange={this._onChange} onShowSizeChange={this._onShowSizeChange} total='91'/>
*
*   --------------------------------------------------------------------------------------------------------------------
*   |          参数           |                   说明                    |         类型        |        默认值        |
*   --------------------------------------------------------------------------------------------------------------------
*   |         current         |                  当前页                   |        number       |          1           |
*   --------------------------------------------------------------------------------------------------------------------
*   |         pageSize        |               每页显示的数量              |        number       |         10           |
*   --------------------------------------------------------------------------------------------------------------------
*   |        pagesLength      |          省略号之间显示的页码个数         |        number       |         9            |
*   --------------------------------------------------------------------------------------------------------------------
*   |     showQuickJumper     |                输入页码跳转               |   showQuickJumper   |                      |
*   --------------------------------------------------------------------------------------------------------------------
*   |       selectWith        |  (快速跳转输入框|每页显示条数下拉框)宽度  |        number       |        65            |  
*   --------------------------------------------------------------------------------------------------------------------
*   |     showSizeChanger     |            显示更改每页显示条数           |   showSizeChanger   |                      |
*   --------------------------------------------------------------------------------------------------------------------
*   |     pageSizeOptions     |              每页显示条数选项             |        array        |   [10,20,30,40,50]   |
*   --------------------------------------------------------------------------------------------------------------------
*   |        className        |               用户自定义样式              |        string       |                      |    
*   --------------------------------------------------------------------------------------------------------------------
*   |        onChange         |                页码改变回调               |       function      |                      |
*   --------------------------------------------------------------------------------------------------------------------
*   |    onShowSizeChange     |            每页显示条数改变回调           |       function      |                      |    
*   --------------------------------------------------------------------------------------------------------------------
*   |         total           |                  总条数                   |        number       |                      |     
*   --------------------------------------------------------------------------------------------------------------------
*/

class MPagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          current:this.props.current || 1,
          pageSize:this.props.pageSize || 10,
          pagesLength:this.props.pagesLength || 9,
          showQuickJumper:this.props.showQuickJumper?true:false,
          selectWith:this.props.selectWith?this.props.selectWith:65,
          showSizeChanger:this.props.showSizeChanger?true:false,
          selectSource:this.props.pageSizeOptions?this.props.pageSizeOptions:[10,20,30,40,50],
        };
        [
          '_prePage',             //上一页
          '_nextPage',            //下一页
          '_changeCurrent',       //点击页码直接跳转
          '_preFive',             //前五页
          '_nextFive',            //后五页
          '_changeSize',          //改变页数
          '_keyEvent',            //回车事件
        ].forEach(func=>{
            this[func] = this[func].bind(this);
        });
    };
    // 上一页
    _prePage(){
      let current = this.state.current;
      let pageSize = this.state.pageSize;
      if(current == 1){
        return;
      }else{
        this.setState({
          current:current-1,
          pageSize:pageSize
        })
      }
      this.props.onChange?this.props.onChange(this.state.current,this.state.pageSize):'';
    };
    // 下一页
    _nextPage(){
      let current = this.state.current;
      let pageSize = this.state.pageSize;
      let totalPage =  Math.ceil(this.props.total/this.state.pageSize);
      if(current == totalPage){
        return;
      }else{
        this.setState({
          current:current+1,
          pageSize:pageSize
        })
      }
      this.props.onChange?this.props.onChange(this.state.current,this.state.pageSize):'';
    };
    // 页数跳转
    _changeCurrent(index){
      this.setState({
        current:index
      })
      this.props.onChange?this.props.onChange(index,this.state.pageSize):'';
    };
    // 前五页
    _preFive(){
      let current = this.state.current;
      if(current > 5){
        this.setState({
          current:current-5
        })
      }else{
        this.setState({
          current:3
        })
      }
      this.props.onChange?this.props.onChange(this.state.current,this.state.pageSize):'';
    };
    // 后五页
    _nextFive(total){
      let current = this.state.current;
      if(total - current > 5){
        this.setState({
          current:current+5
        })
      }else{
        this.setState({
          current:total-2
        })
      }
      this.props.onChange?this.props.onChange(this.state.current,this.state.pageSize):'';
    };
    //改变页数
    _changeSize(pageSize){
      let totalPage =  Math.ceil(this.props.total/pageSize);
      let current = this.state.current;
      if(current > totalPage){
        current = 1;
      }
      this.props.onShowSizeChange(current,pageSize);
      this.setState({
        pageSize:pageSize,
        current:current
      })
    }
    _keyEvent(e){
      let self = this;
      if(e.nativeEvent.key=='Enter'){
        if(!isNaN(e.target.value)){
          let NumberValue = parseInt(e.target.value);
          //   1 <= NumberValue <= 总页数 并且不等于当前页
          if(NumberValue <= Math.ceil(self.props.total/self.state.pageSize) && NumberValue >= 1 && NumberValue != self.state.current){
            self.setState({
              current:NumberValue
            })
            self.props.onChange?this.props.onChange(NumberValue,self.state.pageSize):'';
          }
        }
      }
    }
    _initMPagination(){
      let self = this;
      let RenderHtml = [];
      let totalPage =  Math.ceil(self.props.total/self.state.pageSize);
      RenderHtml.push(<li key='pre' className={classNames('M-pagination-prev',{'M-pagination-disabled':self.state.current == 1})} onClick={self._prePage}><MIcon type="arrowleft"/></li>)
      
      //总页数小于等于分页的长度,则直接显示
      if(totalPage <= self.state.pagesLength){  
        for(let i = 1;i <= totalPage;i++){
          RenderHtml.push(<li key={i} className={classNames('M-pagination-item',{'M-pagination-item-active':self.state.current==i})} onClick={self._changeCurrent.bind(self,i)}>{i}</li>);
        }     
      }else{
        // 总页数大于分页长度（此时分为三种情况：1.左边没有...2.右边没有...3.左右都有...）
        // 计算中心偏移量
        let offset = (self.state.pagesLength-1)/2;
        if(self.state.current <= offset){  
          // 左边没有... 
          for(let i = 1;i<=offset+1;i++){
            RenderHtml.push(<li key={i} className={classNames('M-pagination-item',{'M-pagination-item-active':self.state.current==i})} onClick={self._changeCurrent.bind(self,i)}>{i}</li>);
          }
          RenderHtml.push(<li key="nextMore" className="M-pagination-item" onClick={this._nextFive.bind(self,totalPage)}><MIcon type="ellipsis"/></li>);
          RenderHtml.push(<li key={totalPage} className="M-pagination-item" onClick={self._changeCurrent.bind(self,totalPage)}>{totalPage}</li>);
        }else if(self.state.current > totalPage - offset){
          // 右边没有...
          RenderHtml.push(<li key="1" className="M-pagination-item" onClick={self._changeCurrent.bind(self,1)}>1</li>);
          RenderHtml.push(<li key="preMore" className="M-pagination-item" onClick={this._preFive}><MIcon type="ellipsis"/></li>);
          for(let i = offset; i >= 1; i--){
            RenderHtml.push(<li key={totalPage - i} className={classNames('M-pagination-item',{'M-pagination-item-active':self.state.current==totalPage - i})} onClick={self._changeCurrent.bind(self,totalPage - i)}>{totalPage - i}</li>);
          }
          RenderHtml.push(<li key={totalPage} className={classNames('M-pagination-item',{'M-pagination-item-active':self.state.current==totalPage})} onClick={self._changeCurrent.bind(self,totalPage)}>{totalPage}</li>);
        }else{
          // 最后一种情况，两边都有...
          RenderHtml.push(<li key="1" className="M-pagination-item" onClick={self._changeCurrent.bind(self,1)}>1</li>);
          RenderHtml.push(<li key="preMore" className="M-pagination-item" onClick={this._preFive}><MIcon type="ellipsis"/></li>);
          for(let i = offset/2; i >= 0; i--){
              RenderHtml.push(<li key={self.state.current - i} className={classNames('M-pagination-item',{'M-pagination-item-active':self.state.current==self.state.current - i})} onClick={self._changeCurrent.bind(self,self.state.current - i)}>{self.state.current - i}</li>);
          }
          for(let j= 1; j <= offset/2; j++){
            RenderHtml.push(<li key={self.state.current + j} className={classNames('M-pagination-item',{'M-pagination-item-active':self.state.current==self.state.current + j})} onClick={self._changeCurrent.bind(self,self.state.current + j)}>{self.state.current + j}</li>);
          }
          RenderHtml.push(<li key="nextMore" className="M-pagination-item" onClick={this._nextFive.bind(self,totalPage)}><MIcon type="ellipsis"/></li>);
          RenderHtml.push(<li key={totalPage} className="M-pagination-item" onClick={self._changeCurrent.bind(self,totalPage)}>{totalPage}</li>);
        }
      }
      RenderHtml.push(<li key='next' className={classNames('M-pagination-next',{'M-pagination-disabled':self.state.current == totalPage})} onClick={self._nextPage}><MIcon type="arrowright"/></li>)
      if(this.state.showSizeChanger){
        RenderHtml.push(<MSelect className='M-pagination-options-size-changer' key="select" style={{width:this.state.selectWith}} defaultValue={this.state.pageSize} dataSource={this.state.selectSource} onSelect={this._changeSize}/>);
        if(this.state.showQuickJumper){
          RenderHtml.push(<div key="QuickJumper" className={classNames('M-pagination-options-quick-jumper')}><span>Goto</span><MInput onKeyPress={this._keyEvent} style={{width:this.state.selectWith}} defaultValue={this.state.current}/></div>)
        }
      }
      return RenderHtml;
    };   
    render() {
      let RenderHtml = this._initMPagination();
      return (
        <ul className={classNames('M-pagination',this.props.className)}>{RenderHtml}</ul>
      )
    }
}
module.exports = MPagination;