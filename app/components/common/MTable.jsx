import React from 'react';
import classNames from 'classnames';
import { MPagination } from '../../components/MComponent';
import assign from 'object-assign';
import RcTable from 'rc-table';

class MTable extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			
		};
		[
	        '_getColumnKey',
	        '_getCurrentPageData',
	        '_hasPagination',
	        '_getMaxCurrent',
	        '_handlePageChange',
	        '_handleShowSizeChange',
	        '_getLocalData',
	        '_renderPagination',
	    ].forEach(func=>{
	        this[func] = this[func].bind(this);
	    });
	}
	_getColumnKey(column, index?) {
	    return column.key || column.dataIndex || index;
	}
	_getCurrentPageData(total){
		return 1;
	}
	_hasPagination(props){
		return (props || this.props).pagination !== false;
	}
	_getMaxCurrent(total){
		const { current, pageSize } = this.props.pagination;
	    if ((current - 1) * pageSize >= total) {
	      return current - 1;
	    }
	    return current;
	}
	_handlePageChange(){
		console.log("haha");
	}
	_handleShowSizeChange(){
		console.log("sadasdasdaqfsdfsdfswq");
	}
	_getLocalData(){
		const state = this.state;
		const { dataSource } = this.props;
		let data = dataSource || [];

	}
	_renderPagination(){
		if(!this._hasPagination()){
			return null;
		}
		const {pagination} = this.props;
		let total = 10||pagination.total || this._getLocalData().length;
		return (total>0)?
			<MPagination
		        {...pagination}
		        className={`M-table-pagination`}
		        onChange={this._handlePageChange}
		        total='91'
		        current='1'
		        onShowSizeChange={this._handleShowSizeChange}
		    /> : null;
	}
	render(){
		// const {pagination} = this.props;
		const { pagination, ...other } = this.props;
		let columns = this.props.columns.map((column, i) => {
		    const newColumn = assign({}, column);
		    newColumn.key = this._getColumnKey(newColumn, i);
		    return newColumn;
		});
		let prefixCls = 'M-table'
		let table = (
	      <RcTable
	      	prefixCls={prefixCls}
	        data={this.props.data}
	        columns={columns}
	      />
	    );
		const data = this._getCurrentPageData();
		return(
			<div className={classNames('clearfix')} style={this.props.style}>
				{table}
				{this._renderPagination()}
			</div>	
		)
	}
}
module.exports = MTable;