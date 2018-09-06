import React from 'react'
import './index.scss'
import PageTitle from 'component/page-title/index.jsx'
import { Input, Select,Card , DatePicker, Upload, message, Button, Icon } from 'antd';
const { TextArea } = Input;
const Option = Select.Option;
const { RangePicker } = DatePicker;



class BaseInfo extends React.Component{

  render(){
    const uploadProps = {
      name: 'file',
      action: '//jsonplaceholder.typicode.com/posts/',
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} 文件上传成功`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} 文件上传失败.`);
        }
      },
    };
    return (
      <div className="base-info-wrap">
        <Card title = "基本信息" type = "inner" >
          <div className = 'formInfo'>
            <div className="row">
              <div className="col-md-2 col-xs-4 labels"><label htmlFor="projectName">工程名称</label></div>
              <div className="col-md-5 col-xs-8"><Input id="projectName" placeholder="填写工程名称"/></div>
            </div>
            <div className="row" style={{marginTop:16}}>
              <div className="col-md-2 col-xs-4 labels"><label htmlFor="projectLevel">治理类型</label></div>
              <div className="col-md-5 col-xs-8">
                <Select defaultValue="sheng" style={{ width: 160 }} id="projectLevel">
                  <Option value="sheng">省级年度治理任务</Option>
                  <Option value="shi">市级年度治理任务</Option>
                  <Option value="qv">区级年度治理任务</Option>
                </Select>
              </div>
            </div>
            <div className="row" style={{marginTop:16}}>
              <div className="col-md-2 col-xs-4 labels"><label>工期</label></div>
              <div className="col-md-5 col-xs-8">
              <RangePicker
                placeholder={['项目开工时间', '预计项目结束时间']}
              />
              </div>
            </div>

            <div className="row" style={{marginTop:16}}>
              <div className="col-md-2 col-xs-4 labels"><label htmlFor="projectCompony">责任单位</label></div>
              <div className="col-md-5 col-xs-8"><Input id="projectCompony" placeholder="请填写责任单位"/></div>
            </div>

            <div className="row" style={{marginTop:16}}>
              <div className="col-md-2 col-xs-4 labels"><label htmlFor="checkCompony">责任人</label></div>
              <div className="col-md-2 col-xs-4"><Input id="checkCompony" placeholder="请输入责任人姓名"/></div>
            </div>

            <div className="row" style={{marginTop:16}}>
              <div className="col-md-2 col-xs-4 labels"><label htmlFor="designCompony">联系方式</label></div>
              <div className="col-md-5 col-xs-4"><Input id="designCompony" placeholder="请输入责任人常用联系方式,电话,微信,qq,邮箱等"/></div>
            </div>

            <div className="row" style={{marginTop:16}}>
              <div className="col-md-2 col-xs-4 labels"><label htmlFor="processCompony">工程位置</label></div>
              <div className="col-md-5 col-xs-8"><Input id="processCompony" placeholder="请输入工程位置"/></div>
            </div>

            <div className="row" style={{marginTop:16}}>
              <div className="col-md-2 col-xs-4 labels"><label>当前进度</label></div>
              <div className="col-md-5 col-xs-8">
                <Select defaultValue="step01" style={{ width: 160 }}>
                  <Option value="step01">进度01</Option>
                  <Option value="step02">进度02</Option>
                  <Option value="step03">进度03</Option>
                </Select>
              </div>
            </div>



          </div>
        </Card>

        <Card title = "投资情况" type="inner" style={{marginTop:16}}>
          <div className="row" style={{marginTop:16}}>
            <div className="col-md-2 col-xs-4 labels"><label>总投资</label></div>
            <div className="col-md-2 col-xs-4"><Input addonAfter={<div>万元</div>}/></div>
          </div>

          <div className="row" style={{marginTop:16}}>
            <div className="col-md-2 col-xs-4 labels"><label>自筹</label></div>
            <div className="col-md-2 col-xs-4"><Input addonAfter={<div>万元</div>}/></div>
          </div>

          <div className="row" style={{marginTop:16}}>
            <div className="col-md-2 col-xs-4 labels"><label>财政扶持</label></div>
            <div className="col-md-2 col-xs-4"><Input addonAfter={<div>万元</div>}/></div>
          </div>

        </Card>

        <Card title = "项目详情" type="inner" style={{marginTop:16}}>
          <TextArea rows={12} />
        </Card>
        <div className="row" style={{marginTop:16}}>
          <Button type="primary" style={{marginRight:16,marginLeft:15}}>提交</Button>
          <Button>取消</Button>
        </div>
      </div>
    )
  }
}

export default BaseInfo;
