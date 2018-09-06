import React from 'react'
import './index.scss'
import {Card, Button, Tabs } from 'antd';
import axios from 'axios'
import { withRouter } from 'react-router-dom'
const TabPane = Tabs.TabPane;

//导入组件
import ShiGongInfo from './shigong-info/index.jsx';
import JianLiInfo from './jianli-info/index.jsx';
import BianGengInfo from './biangeng-info/index.jsx';
import JieDuanInfo from './jieduan-info/index.jsx';
import GuoChengInfo from './guocheng-info/index.jsx';
import VidioInfo from './vidio-info/index.jsx';
import JunGongInfo from './jungong-info/index.jsx';


@withRouter
class ProjectProcessOpera  extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      proInfo : null,
      proId : this.props.match.params.proNum
    }
  }
  componentDidMount(){
    this.loadBaseInfo()
  }
  loadBaseInfo(){
    let flowId = this.props.match.params.proNum.split('&')
    let { proId } = this.state
    axios.get('/api/Project/JsonProjectConstruction',{params: { 'proId': `${proId}` }})
    .then(res=>{
      if(res.status === 200 && res.data.Data){

        this.setState({
          tabType : res.data.Data.COMSTATUS,
          proInfo : {
            proId : res.data.Data.PROID,
            proName : res.data.Data.PRONAME,
          }
        })
      }
    })

  }
  render(){
    let { proInfo, tabType } = this.state

    return (
      <div style={{marginTop:16}}>
        <div className="row">
          <div className="col-md-12">
          <Card title="河道排水改造项目施工详情">
            <Tabs defaultActiveKey="1" type="card">
              <TabPane tab="项目施工信息" key="1"><ShiGongInfo proInfo={proInfo}/></TabPane>
              <TabPane tab="竣工备案文件" key="7"><JunGongInfo proInfo={proInfo}/></TabPane>
              <TabPane tab="项目监理信息" key="2"><JianLiInfo proInfo={proInfo}/></TabPane>
              <TabPane tab="项目变更信息" key="3"><BianGengInfo proInfo={proInfo} /></TabPane>
              <TabPane tab="项目阶段信息" key="4"><JieDuanInfo proInfo={proInfo} /></TabPane>
              <TabPane tab="项目过程信息" key="5"><GuoChengInfo proInfo={proInfo} /></TabPane>
              <TabPane tab="项目施工影像" key="6"><VidioInfo proInfo={proInfo} /></TabPane>
            </Tabs>
          </Card>
          </div>
        </div>
      </div>
    )
  }
}

export default ProjectProcessOpera ;
