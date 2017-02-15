import React from 'react';
import {IndexLink,Link} from 'react-router';
import { MBackTop } from '../../components/MComponent';
import Footer from './footer';
import $ from 'jquery';

class ComponentMain extends React.Component{
	constructor(props){
		super(props);
	}
	componentDidMount(){
		document.title="组件API文档";
		let detail = 'http://localhost:8181/api/Page';
		$.post(detail,{"init":'init'}, function(data) {
			console.log('data',data);
		});
		// console.log('$',$);
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