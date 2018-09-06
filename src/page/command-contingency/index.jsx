import React from 'react'
import './index.scss'
import PageTitle from 'component/page-title/index.jsx'
import { Route } from 'react-router-dom'
import { Button, Tabs } from 'antd'
const TabPane = Tabs.TabPane

//导入组件
import Staff from './staff/index.jsx'
import Material from './material/index.jsx'
import Monitor from './monitor/index.jsx'
import Simulation from './simulation/index.jsx'

class CommandContingency  extends React.Component{
  constructor(props){
    super(props)
    this.state={

    }
  }
  componentDidMount(){
    this.props.history.push('/command-contingency/staff')
  }
  handleClick(val){
    this.props.history.push(`/command-contingency/${val}`)
  }
  render(){
    return (
      <div id="page-wrapper">
        <PageTitle title="应急指挥">

        </PageTitle>
        <div className="row alarm-warning-wrap">
          <div className="col-md-12">
          <Tabs animated={true} defaultActiveKey="staff" onChange={(key)=>this.handleClick(key)}>
            <TabPane tab="人员管理" key="staff">
              <Route path="/command-contingency/staff" component={Staff}></Route>
            </TabPane>
            <TabPane tab="物资管理" key="material">
              <Route path="/command-contingency/material" component={Material}></Route>
            </TabPane>
            <TabPane tab="运行状态监控" key="monitor">
              <Route path="/command-contingency/monitor" component={Monitor}></Route>
            </TabPane>
            <TabPane tab="运行情景模拟" key="simulation">
              <Route path="/command-contingency/simulation" component={Simulation}></Route>
            </TabPane>
          </Tabs>
          </div>
        </div>
      </div>
    )
  }
}

export default CommandContingency ;
