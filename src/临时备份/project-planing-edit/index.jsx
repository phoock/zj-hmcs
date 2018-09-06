import React from 'react'
import './index.scss'
import PageTitle from 'component/page-title/index.jsx'
import {Tabs, Button, Card, Icon} from 'antd';
const TabPane = Tabs.TabPane;

import Step01 from './step01/index.jsx'
import Step02 from './step02/index.jsx'
import Step03 from './step03/index.jsx'
import Step04 from './step04/index.jsx'
import Step05 from './step05/index.jsx'
import Step06 from './step06/index.jsx'
import Step07 from './step07/index.jsx'
import Step08 from './step08/index.jsx'

class ProjectPlaningEdit extends React.Component {

    render() {
        return (<div id="page-wrapper">
            <PageTitle title="规划管理"></PageTitle>
            <div className="row project-planing-edit">
                <div className="col-md-12">
                    <Card title="规划类详情" extra={<i className = "fa fa-angle-down" > </i>} bordered={true} style={{
                            background: '#fff'
                        }}>
                      <div className="row">
                        <Tabs defaultActiveKey="1">
                          <TabPane  tab={<div><span className="label label-success">已完成</span><span>1.设计方案申报</span></div>} key="1"><Step01 /></TabPane>
                          <TabPane tab={<div><span className="label label-success">已完成</span><span>2.设计方案评估</span></div>} key="2"><Step02 /></TabPane>
                          <TabPane tab={<div><span className="label label-success label-hidden">已完成</span><span>3.设计方案审核</span></div>} key="3"><Step03 /></TabPane>
                          <TabPane tab={<div><span className="label label-success label-hidden">已完成</span><span>4.施工图申报</span></div>} key="4"><Step04 /></TabPane>
                          <TabPane tab={<div><span className="label label-success label-hidden">已完成</span><span>5.施工图审核</span></div>} key="5"><Step05 /></TabPane>
                          <TabPane tab={<div><span className="label label-success label-hidden">已完成</span><span>6.审核材料申报</span></div>} key="6"><Step06 /></TabPane>
                          <TabPane tab={<div><span className="label label-success label-hidden">已完成</span><span>7.施工许可审核</span></div>} key="7"><Step07 /></TabPane>
                          <TabPane tab={<div><span className="label label-success label-hidden">已完成</span><span>8.基本信息录入</span></div>} key="8"><Step08 /></TabPane>
                        </Tabs>
                      </div>
                    </Card>
                </div>
            </div>
        </div>)
    }
}

export default ProjectPlaningEdit;
