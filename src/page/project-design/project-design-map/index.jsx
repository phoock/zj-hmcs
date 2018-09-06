import React from 'react'
import { Icon } from 'antd'
import ReactDOM from 'react-dom'
import './index.scss'
import map01 from '../images/map.jpg'

//导入url
import {Design} from 'util/map-url.js'

class DesignMap extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      iFrameHeight: '0px',
      loading:true
    }
  }
  render() {
    return (
      <div>
      {
        this.state.loading?
        <Icon type='loading' style={{marginTop:16}}>-----------如果是第一次加载将十分缓慢,请耐心等待</Icon>
        :null
      }

        <iframe
        style={{width:'100%', height:this.state.iFrameHeight, overflow:'visible', border: 'none'}}
        onLoad={() => {
            const obj = ReactDOM.findDOMNode(this);
            const heightIframe = (document.body.scrollHeight);
            this.setState({
                iFrameHeight:  heightIframe + 'px',
                loading: false

            });
        }}
        ref={(e)=>{this.container = e}}
        src={`${Design}`}
        />
      </div>
    )
    // return <div>123</div>
  }
}

export default DesignMap;
