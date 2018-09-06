import React from 'react'
import { Tabs } from 'antd'
const TabPane = Tabs.TabPane

//导入组件
import SwjkHedao from './swjk-hedao/index.jsx'
import SwjkJishui from './swjk-jishui/index.jsx'

class Swjk extends React.Component{
  render(){
    return (
      <div style={{marginTop:8}}>
        <Tabs type="card" animated={true} defaultActiveKey="1">
          <TabPane tab="河道" key="1">
            <SwjkHedao></SwjkHedao>
          </TabPane>
          <TabPane tab="积水点" key="2">
            <SwjkJishui></SwjkJishui>
          </TabPane>

        </Tabs>
      </div>
    )
  }
}

export default Swjk;
