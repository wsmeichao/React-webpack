/**
 * Created by MC on 2016/11/11.
 */
import React from 'react';
const footer = require('../../../build/img/footer.png');
class Footer extends React.Component{
  render(){
    return (
      <footer>
        <ul>
        	<li key='footer_first'>
        		<a href='http://bigmeichao.com/' target='_blank' className={'footJump'}>
        			<img src={footer} alt='http://bigmeichao.com/'/>
        		</a>
        	</li>
        	<li key='footer_second'>
        		<h2>GitHub相关</h2>
        		<div className={'footDetail'}>
        			<a href='https://git.oschina.net/meichao/React-webpack' target='_blank'>
	        			OSC仓库
	        		</a>
        		</div>

        	</li>
        </ul>
      </footer>        
    )
  }
}
module.exports = Footer;