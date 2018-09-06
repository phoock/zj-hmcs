import React from 'react'
import './index.scss'
import PageTitle from 'component/page-title/index.jsx'
import { Button } from 'antd';

class CommandWarning  extends React.Component{
  render(){
    return (
      <div id="page-wrapper">
        <PageTitle title="预警报警">

        </PageTitle>
        <div className="row">
          <div className="col-md-12">
            预警报警内容
          </div>
        </div>
      </div>
    )
  }
}

export default CommandWarning ;
