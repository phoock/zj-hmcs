import React from 'react'
import { Route } from 'react-router-dom'
import { Button, Tabs } from 'antd'
const TabPane = Tabs.TabPane

//导入组件
import StaffType1 from './staff-type1.jsx'
import StaffType2 from './staff-type2.jsx'
import StaffType3 from './staff-type3.jsx'
import StaffType4 from './staff-type4.jsx'
import StaffType5 from './staff-type5.jsx'


class Staff extends React.Component{
  constructor(props){
    super(props)
    this.state = {

    }
  }

  render(){
    return (
      <div>
      <Tabs type="card" animated={true} defaultActiveKey="staff01">
        <TabPane tab="指挥调度人员" key="staff01">
          <StaffType1></StaffType1>
        </TabPane>
        <TabPane tab="定点定片人员" key="staff02">
          <StaffType2></StaffType2>
        </TabPane>
        <TabPane tab="泵站工作人员" key="staff03">
          <StaffType3></StaffType3>
        </TabPane>
        <TabPane tab="防汛抢险人员" key="staff04">
          <StaffType4></StaffType4>
        </TabPane>
        <TabPane tab="系统操作人员" key="staff05">
          <StaffType5></StaffType5>
        </TabPane>
      </Tabs>
      </div>
    )
  }
}

export default Staff
