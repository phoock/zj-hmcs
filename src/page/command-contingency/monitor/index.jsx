import React from 'react'
import { Route } from 'react-router-dom'
import { Button, Tabs } from 'antd'
const TabPane = Tabs.TabPane

import Pump from './pump.jsx'
import Pip from './pip.jsx'

class Monitor extends React.Component{
  render(){
    return (
      <div>
      <Tabs type="card" animated={true} defaultActiveKey="staff01">
        <TabPane tab="泵站" key="staff01">
          <Pump></Pump>
        </TabPane>
        <TabPane tab="管道" key="staff02">
          <Pip></Pip>
        </TabPane>
      </Tabs>
      </div>
    )
  }
}

export default Monitor
