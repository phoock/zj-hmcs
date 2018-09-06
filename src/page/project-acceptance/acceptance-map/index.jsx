import React from 'react'
import { Icon } from 'antd'
import ReactDOM from 'react-dom'

//导入map地址
import {ConstructionOverList} from 'util/map-url.js'

class ShigongMap extends React.Component{
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
        src={`${ConstructionOverList}`}
        />
      </div>
    )
  }
}

export default ShigongMap;
