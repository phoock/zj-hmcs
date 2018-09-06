import React from 'react'
import './index.scss'
import PageTitle from 'component/page-title/index.jsx'
import { Button, Input, Select  } from 'antd';
const { TextArea } = Input;
const Option = Select.Option;

class Addone extends React.Component{
  render(){
    return (
      <div className="servser-addone-wrap">
        <div className="row">
          <div className="col-md-2 col-xs-4 label02">
            <label>标题:</label>
          </div>
          <div className="col-md-4 col-xs-7">
            <Input placeholder="文章标题" />
          </div>
        </div>
        <div className="row" style={{marginTop:16}}>
          <div className="col-md-2 col-xs-4 label02">
            <label>信息类型:</label>
          </div>
          <div className="col-md-4 col-xs-7">
            <Select defaultValue="type01" style={{ width: 120 }}>
              <Option value="type01">新闻媒体</Option>
              <Option value="type02">热搜</Option>
              <Option value="type03">微博互动</Option>
              <Option value="type04">微信小程序</Option>
            </Select>
          </div>
        </div>
        <div className="row" style={{marginTop:16}}>
          <div className="col-md-2 col-xs-4 label02">
            <label>内容:</label>
          </div>
          <div className="col-md-7 col-xs-8">
            <TextArea rows={6} />
          </div>
        </div>
      </div>
    )
  }
}

export default Addone;
