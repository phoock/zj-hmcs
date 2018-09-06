import React from 'react'
import { Tabs } from 'antd'
const TabPane = Tabs.TabPane

//导入组件
import NljqJqd from './nljq-jqd/index.jsx'
import NljqHis from './nljq-his/index.jsx'


class Swjk extends React.Component{
  render(){
    return (
      <div style={{marginTop:8}}>
        <Tabs type="card" animated={true} defaultActiveKey="1">
          <TabPane tab="警情点" key="1">
            <NljqJqd></NljqJqd>
          </TabPane>
          <TabPane tab="历史信息" key="2">
            <NljqHis></NljqHis>
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

export default Swjk;
