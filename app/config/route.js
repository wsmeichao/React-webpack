/*
*	created by MC on 2016/12/30
*/

export default {
	childRoutes:[
		{
			path:'404',
			getComponent(nextState, cb) {
		    	require.ensure([], (require) => {
		      		cb(null, require('../public/tpl/NotFound'))
		    	})
		  	}
		},
		{
			path:'/',
			getComponent(nextState,cb){
				require.ensure([],(require)=>{
					cb(null,require('../public/tpl/App'))
				})
			},
			indexRoute:{
				getComponent(nextState,cb){
					require.ensure([],(require)=>{
						cb(null,require('../public/tpl/Main'))
					})
				},
			},
			childRoutes:[
				{
					path: 'component',
				  	getComponent(nextState, cb) {
				    	require.ensure([], (require) => {
				      		cb(null, require('../public/tpl/ComponentMain'))
				    	})
				  	},
				  	indexRoute:{
						getComponent(nextState,cb){
							require.ensure([],(require)=>{
								cb(null,require('../public/tpl/componentInit'))
							})
						},
					}
			    },{
					path:'*',
					onEnter:(nextState, replace) => replace("404")
				}
			]
		}
	]	
}