import React from 'react';
import { MPagination,MButton,MInput,MTable,MIcon } from '../../components/MComponent';
import { Icon } from 'antd';

class ComponentInit extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			name:'梅超',
			columns : [
			{
			  title: 'Name',
			  dataIndex: 'name',
			  key: 'name',
			  render: text => <a href="#">{text}{
			  	// console.log('textasdsad',text)
			  }</a>,
			}, {
			  title: 'Age',
			  dataIndex: 'age',
			  key: 'age',
			}, {
			  title: 'Address',
			  dataIndex: 'address',
			  key: 'address',
			}, {
			  title: 'Action',
			  key: 'action',
			  render: (text, record,index) => (
			    <span>
			    {
			    	// console.log('record',record)
				}
			      <a href="#">Action 一 {record.name}</a>
			      <span className="ant-divider" />
			      <a href="#">Delete</a>
			      <span className="ant-divider" />
			      <a href="#" className="ant-dropdown-link">
			        More actions <MIcon type="down" />
			      </a>
			    </span>
			  ),
			}],
			pagination : {
		    	current:1,
		    	pageSize:10,
		    	onChange: (current) => {
				    console.log('Current: ', current);
				}
	    	}
		};
		[
	      '_onShowSizeChange',
	      '_changePage',   
	    ].forEach(func=>{
	        this[func] = this[func].bind(this);
	    });
	};
	_onShowSizeChange(current,pageSize){
		// console.log("current",current);
		// console.log("pageSize",pageSize);
	}
	_changePage(current,pageSize){
		// console.log("current",current);
		// console.log("pageSize",pageSize);
	}
	render(){
		const data = [];
		for (let i = 0; i < 46; i++) {
		  data.push({
		    key: i,
		    name: `Edward King ${i}`,
		    age: 32,
		    address: `London, Park Lane no. ${i}`,
		  });
		}
		return (
			<article className={'McomponentInit'} style={{minHeight:900}}>
				<h1>React Component</h1>
				<section>
					<MButton onClick={this._callback} className={'demoClass'} type='primary' size='lg'>testword</MButton>
					<MInput type='text' size='lg' />
				</section>
				<MPagination total="91" showSizeChanger showQuickJumper onShowSizeChange={this._onShowSizeChange} onChange={this._changePage}/>
				<MTable onChange={this._changePage} rowKey={record => record.registered} dataSource={data} columns={this.state.columns} pagination={this.state.pagination}/>
			</article>
		)
	}
}

module.exports = ComponentInit;