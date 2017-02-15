/**
 * Created by MC on 2016/11/11.
 */
import React from 'react';
import {IndexLink,Link} from 'react-router';
class Header extends React.Component{
  render(){
    return (
        <header className="header clearfix">
          <ul className="M-menu M-menu-horizontal">
            <li className="M-menu-item" key="home"><IndexLink to="/" activeClassName="headerActive">首页</IndexLink></li>
            <li className="M-menu-item" key="component"><Link to="/component/" activeClassName="headerActive">组件</Link></li>
            <li className="M-menu-item" key="contact"><Link to="/contact" activeClassName="headerActive">下载</Link></li>
          </ul>
        </header>      
    )
  }
}
module.exports = Header;