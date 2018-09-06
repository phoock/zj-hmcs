import React from 'react'
import './index.scss'
import PageTitle from 'component/page-title/index.jsx'
import { Button } from 'antd';

class tem extends React.Component{
  render(){
    return (
      <div id="page-wrapper">
        <PageTitle title="模板">
        </PageTitle>
        <div className="row">
          <div className="col-md-12">
            content
          </div>
        </div>
      </div>
    )
  }
}

export default tem;
