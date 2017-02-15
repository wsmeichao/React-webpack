import React from 'react';
import {render} from 'react-dom';
import { Router,browserHistory,hashHistory} from 'react-router';
import route from './config/route';
import {Scss} from './components/scss/component.scss';
import common from './public/scss/common.scss';
import animate from './public/scss/animate.scss';
import componentAnimate from './components/scss/animate.scss';
import iconfont from './components/iconfont/iconfont.css';

/* 暂时使用 hashhistory 进行开发,因为使用 browserHistory 是服务器渲染，页面刷新时会出现404  */
/* 
*   error:`Router` no longer defaults the history prop to hash history. Please use the `hashHistory` singleton instead.
*   解决方案：使用history
*   <Router hashHistory={withExampleBasename(browserHistory, __dirname)} routes={route}>
*   <Router history={browserHistory} routes={route}>
*   但是用history好像没用
*   解决了,需要配置下publicPath,绝对路径,就OK了的
*/
render((
  <Router history={hashHistory} routes={route}>  
  </Router>
),document.getElementById('content'));