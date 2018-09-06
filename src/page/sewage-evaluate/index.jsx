import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import PageTitle from 'component/page-title/index.jsx'
import { Button } from 'antd';
import map01 from './images/sewage-evaluate.jpg';
class SewageEvalute extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      iFrameHeight: '0px'
    }
  }
  render(){
    return (
      <div id="page-wrapper">
        <PageTitle title="水质监控评估管理">
        </PageTitle>
        <div className="row evalute">
        <div>
          <iframe
          style={{width:'100%', height:this.state.iFrameHeight, overflow:'visible', border: 'none'}}
          onLoad={() => {
              const obj = ReactDOM.findDOMNode(this);
              const heightIframe = (document.body.scrollHeight);
              this.setState({
                  "iFrameHeight":  heightIframe + 'px'
              });
          }}
          ref="iframe"
          src="http://192.168.1.3/hmcsmap/BlackRiver/WaterQualityMap"
          />
        </div>
        </div>
      </div>
    )
  }
}

export default SewageEvalute;
