import React from 'react';
import {IndexLink,Link} from 'react-router';
import { MBackTop } from '../../components/MComponent';
import Footer from './footer';
import fetch from 'isomorphic-fetch';
require('es6-promise').polyfill();

class ComponentMain extends React.Component{
	constructor(props){
		super(props);
	}
	componentDidMount(){
		document.title="组件API文档";
		// let detail = '/api/Page?init=init';
		// fetch(detail,{
		// 	method: 'POST',
		// 	body:'init=init'
		// })
		// .then(function(response) {
		// 	console.log("response",response);
		// 	return response.json();
		// }).then(function(data){
		// 	console.log('data',data);
		// })
	}
	render(){
		return (
			<div>
				<div className="Mcomponent">
					<ul className="Mcomponenthd">
						<li className="M-component-item" key="component"><IndexLink to="/component" activeClassName="componentActive">React Component</IndexLink></li>
						<li className="M-component-item" key="componentTest"><Link to="/component/test" activeClassName="componentActive">安装</Link></li>
					</ul>
					<div className="Mcomponentbd">
						{ this.props.children }
					</div>
					<MBackTop/>					
				</div>
				<Footer />
			</div>
		)
	}
}

module.exports = ComponentMain;