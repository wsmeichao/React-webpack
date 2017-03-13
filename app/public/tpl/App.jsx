import React from 'react';
import Header from './header';
import { Tool } from '../Tool/Tool';
// import Footer from './footer';

class App extends React.Component{
	constructor(props){
		super(props);
		[
	        '_EventhashChange',
	    ].forEach(func=>{
	        this[func] = this[func].bind(this);
	    });
	}
	_EventhashChange(e){
		// console.log("e",e);
		// console.log("hashchange",location.hash);
	}
	componentDidMount(prevProps,prevState){
		Tool.bind(window, 'hashchange', this._EventhashChange);
	}
  	render(){
	    return (
	      	<div>
	        	<Header />
	          	{ this.props.children}
	      	</div>        
	    )
  	}
}

module.exports = App;