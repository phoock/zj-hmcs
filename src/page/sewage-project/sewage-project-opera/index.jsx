import React from 'react'
import './index.scss'
import PageTitle from 'component/page-title/index.jsx'
import {Card, Button, Tabs } from 'antd';
const TabPane = Tabs.TabPane;

//导入组件
import BaseInfo from './base-info/index.jsx';
import ProcessInfo from './process-info/index.jsx';
import VideoInfo from './video-info/index.jsx';
import Position from './position/index.jsx';

class ProjectProcessOpera  extends React.Component{
  constructor(props){
    super(props)
    this.state = {

    }
  }
  render(){
    return (
      <div id="page-wrapper">
        <PageTitle title="整治工程详情">
        </PageTitle>
        <div className="row">
          <div className="col-md-12">
          <Card title="河道排水改造项目施工详情">
            <Tabs defaultActiveKey="1" type="card">
              <TabPane tab="基本信息" key="1"><BaseInfo /></TabPane>
              <TabPane tab="工程进度" key="2"><ProcessInfo /></TabPane>
              <TabPane tab="影像资料" key="3"><VideoInfo /></TabPane>
              <TabPane tab="地图位置" key="4"><Position /></TabPane>
            </Tabs>
          </Card>
          </div>
        </div>
      </div>
    )
  }
}

export default ProjectProcessOpera ;
