import React from 'react'
import './index.scss'
import PageTitle from 'component/page-title/index.jsx'
import { Button, Input, Select  } from 'antd';
const { TextArea } = Input;
const Option = Select.Option;

class ServerAlertInfo extends React.Component{
  render(){
    return (
      <div className="servser-alert-info-wrap">
        <div className="row">
          <div className="col-md-2 col-xs-4 label02">
            <label>河道名称</label>
          </div>
          <div className="col-md-4 col-xs-7">
            <Input value="河口大桥" readOnly/>
          </div>
        </div>
        <div className="row" style={{marginTop:16}}>
          <div className="col-md-2 col-xs-4 label02">
            <label>报警时间</label>
          </div>
          <div className="col-md-4 col-xs-7">
            <Input value="2018-01-01" readOnly/>
          </div>
        </div>
        <div className="row" style={{marginTop:16}}>
          <div className="col-md-2 col-xs-4 label02">
            <label>报警人</label>
          </div>
          <div className="col-md-4 col-xs-7">
            <Input value="王小虎" readOnly/>
          </div>
        </div>
        <div className="row" style={{marginTop:16}}>
          <div className="col-md-2 col-xs-4 label02">
            <label>内容:</label>
          </div>
          <div className="col-md-7 col-xs-8">
            <TextArea rows={6} value="内容content内容content内容content内容content内容content" readOnly/>
          </div>
        </div>
      </div>
    )
  }
}

export default ServerAlertInfo;
