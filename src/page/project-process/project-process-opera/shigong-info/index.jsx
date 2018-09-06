import React from 'react'
import './index.scss'
import PageTitle from 'component/page-title/index.jsx'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

import { Input, Select,Card , DatePicker, message, Button, Icon } from 'antd';
const { TextArea } = Input;
const Option = Select.Option;
const { RangePicker } = DatePicker;

//导入工具函数
import moment from 'moment';
import HM from 'util/hmcs.js'
let HMutil = new HM()


@withRouter
class ShiGongInfo extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      dataSource : null
    }
  }

  componentDidMount(){
    let params = this.props.match.params.proNum
    //加载基本信息
    this.loadInfo(params)
  }

  loadInfo(proId){
    if(proId){
      axios.get('/api/Project/JsonProjectConstruction',{params: { 'proId': `${proId}` }})
      .then(res=>{
        if(res.status===200&&res.data.Data){
          this.setState({
            dataSource : res.data.Data
          })
        }
      }).catch(err=>{
        message.error('err')
      })
    }
  }


  render(){
    const { dataSource } = this.state
    return (
      <div>
      {
        dataSource
        ? <div className="shigong-info-wrap">
          <Card title = "河道排水改造项目施工详情" type = "inner" >
            <div className = 'formInfo'>
              <div className="row">
                <div className="col-md-2 col-xs-4 labels"><label htmlFor="projectName">项目名称</label></div>
                <div className="col-md-5 col-xs-8"><Input readOnly id="projectName" value={dataSource.PRONAME} placeholder="请填写项目名称"/></div>
              </div>
              <div className="row" style={{marginTop:16}}>
                <div className="col-md-2 col-xs-4 labels"><label htmlFor="projectStatus">施工状态</label></div>
                <div className="col-md-5 col-xs-8">
                  <Select readOnly defaultValue="stop" style={{ width: 160 }} id="projectStatus" value={dataSource.COMSTATUS}>
                    <Option value="1">未动工</Option>
                    <Option value="2">进行中</Option>
                    <Option value="3">已完成</Option>
                  </Select>
                </div>
              </div>
              <div className="row" style={{marginTop:16}}>
                <div className="col-md-2 col-xs-4 labels"><label>项目起始/结束时间</label></div>
                <div className="col-md-5 col-xs-8">
                <RangePicker
                  allowClear={false}
                  disabled={true}
                  placeholder={['项目开始时间', '项目结束时间']}
                  defaultValue={[moment(HMutil.handleTimeFormate(`${dataSource.CONSTARTDATE}`)), moment(HMutil.handleTimeFormate(`${dataSource.CONEND}`))]}
                />
                </div>
              </div>

              <div className="row" style={{marginTop:16}}>
                <div className="col-md-2 col-xs-4 labels"><label htmlFor="checkCompony">勘察单位</label></div>
                <div className="col-md-5 col-xs-8"><Input readOnly value={dataSource.KCDEPT}/></div>
              </div>

              <div className="row" style={{marginTop:16}}>
                <div className="col-md-2 col-xs-4 labels"><label htmlFor="designCompony">设计单位</label></div>
                <div className="col-md-5 col-xs-8"><Input readOnly value={dataSource.DESDEPT}/></div>
              </div>

              <div className="row" style={{marginTop:16}}>
                <div className="col-md-2 col-xs-4 labels"><label htmlFor="processCompony">施工单位</label></div>
                <div className="col-md-5 col-xs-8"><Input readOnly value={dataSource.CONDEPT}/></div>
              </div>

              <div className="row" style={{marginTop:16}}>
                <div className="col-md-2 col-xs-4 labels"><label htmlFor="projectCompony">施工负责人</label></div>
                <div className="col-md-5 col-xs-8"><Input readOnly value={dataSource.CONMAN}/></div>
              </div>

              <div className="row" style={{marginTop:16}}>
                <div className="col-md-2 col-xs-4 labels"><label htmlFor="totalCount">总投资</label></div>
                <div className="col-md-2 col-xs-4"><Input readOnly value={dataSource.COMMONEY} addonAfter={<div>万元</div>}/></div>
              </div>

              <div className="row" style={{marginTop:16}}>
                <div className="col-md-2 col-xs-4 labels"><label htmlFor="projectDuration">工期</label></div>
                <div className="col-md-2 col-xs-4"><Input readOnly value={dataSource.COMLIFT} addonAfter={<div>月</div>}/></div>
              </div>

            </div>
          </Card>
          <Card title = "项目概况" type="inner" style={{marginTop:16}}>
            <TextArea rows={12} />
          </Card>
          {/*
            <div className="row" style={{marginTop:16}}>
              <Button type="primary" style={{marginRight:16,marginLeft:15}}>提交</Button>
              <Button>取消</Button>
            </div>
          */}

        </div>
        : <Icon type="loading"></Icon>
      }
      </div>

    )
  }
}

export default ShiGongInfo;
