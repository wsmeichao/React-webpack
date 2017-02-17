import React from 'react';
import classNames from 'classnames';
import { MPagination } from '../../components/MComponent';
import assign from 'object-assign';
import RcTable from 'rc-table';

class MTable extends React.Component {
	constructor(props){
		super(props);
		this.state = assign({},{
			pagination:this._getDefaultPagination(props)
		});
		[
			'_getDefaultPagination',
	        '_getColumnKey',
	        '_getCurrentPageData',
	        '_hasPagination',				// 是否允许分页
	        '_getMaxCurrent',
	        '_handlePageChange',
	        '_handleShowSizeChange',
	        '_getLocalData',
	        '_renderPagination',
	    ].forEach(func=>{
	        this[func] = this[func].bind(this);
	    });
	}
	// 获取分页基本信息
	_getDefaultPagination(props){
		const pagination = props.pagination || {};
		return this._hasPagination(props)?
			assign({},pagination,{
				current:pagination.current || 1,
				pageSize:pagination.pageSize || 10,
			}):{}
	}
	// 获取列的key值
	_getColumnKey(column, index?) {
	    return column.key || column.dataIndex || index;
	}
	// 获取当前页的内容
	_getCurrentPageData(){
		let data = this._getLocalData();
		let current;
		let pageSize;
		let state = this.state;
		// 如果没有分页,默认全部显示
		if(!this._hasPagination()){
			pageSize = Number.MAX_VALUE;	//设置分页大小为最大值
			current = 1;
		}else{
			pageSize = state.pagination.pageSize;
			current = this._getMaxCurrent(state.pagination.total || data.length);
		}

		/*
		*	分页
		*	当数据少于等于每页数量时,直接显示数据
		*	否则就进行分页处理
		*/
		if(data.length > pageSize || pageSize === Number.MAX_VALUE){
			data = data.filter((_, i) => {
				console.log("i",i >= (current - 1) * pageSize && i < current * pageSize,i);
		        return i >= (current - 1) * pageSize && i < current * pageSize;
		    });
		}
		return data;
	}
	// 是否允许分页
	_hasPagination(props){
		return (props || this.props).pagination !== false;
	}
	// 获取当前页
	_getMaxCurrent(total){
		const { current, pageSize } = this.state.pagination;
	    if ((current - 1) * pageSize >= total) {
	      return current - 1;
	    }
	    return current;
	}
	// 页码改变
	_handlePageChange(current){
		console.log("asdasdsad current",current);
		const props = this.props;
		let pagination = assign({},this.state.pagination);
		if(current){
			pagination.current = current;
		}else{
			pagination.current = pagination.current || 1;
		}
		pagination.onChange(pagination.current);
		const newState = {
	      pagination,
	    };
		// if(typeof props.pagination === 'object'){
		// 	newState.pagination = assign({}, pagination, {
		//         current: this.state.pagination.current,
		//     });
		// }
		this.setState(newState);
	}
	// 分页的显示条数改变
	_handleShowSizeChange(){
		console.log("sadasdasdaqfsdfsdfswq");
	}
	// 获取数据(待完善)
	_getLocalData(){
		const state = this.state;
		const { dataSource } = this.props;
		// 这里应该还要优化本地排序和筛选数据
		return dataSource || [];

	}
	//  分页
	_renderPagination(){
		if(!this._hasPagination()){
			return null;
		}
		const {pagination} = this.props;
		let total = pagination.total || this._getLocalData().length;
		// console.log("total",total);
		return (total>0)?
			<MPagination
		        className={`M-table-pagination`}
		        onChange={this._handlePageChange}
		        total={total}
		        pageSize={this.state.pagination.pageSize}
		        current={this.state.pagination.current}
		        onShowSizeChange={this._handleShowSizeChange}
		    /> : null;
	}
	render(){
		const { pagination, ...other } = this.props;
		let data = this._getCurrentPageData();
		let columns = this.props.columns.map((column, i) => {
		    const newColumn = assign({}, column);
		    newColumn.key = this._getColumnKey(newColumn, i);
		    return newColumn;
		});
		let prefixCls = 'M-table'
		let table = (
	      <RcTable
	      	prefixCls={prefixCls}
	        data={data}
	        columns={columns}
	      />
	    );
		return(
			<div className={classNames('clearfix')} style={this.props.style}>
				{table}
				{this._renderPagination()}
			</div>	
		)
	}
}
module.exports = MTable;