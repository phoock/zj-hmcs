import React from 'react'
import { Route } from 'react-router-dom'
import { Tabs } from 'antd'
const TabPane = Tabs.TabPane

//导入组件
import Swjk from './swjk.jsx'
import Nljq from './nljq.jsx'
import Nlyj from './nlyj.jsx'

class AlarmList extends React.Component{
  constructor(props){
    super(props)
  }
  handleClick(key){
    this.props.history.push(`/command-alarm/list/${key}`)
  }
  componentDidMount(){
    this.props.history.push(`/command-alarm/list/swjk`)
  }
  render(){
    return (
      <div style={{marginTop:24}}>
        <Tabs type="card" animated={true} defaultActiveKey="swjk" onChange={(key)=>this.handleClick(key)}>
          <TabPane tab="水位监控" key="swjk">
            <Route path="/command-alarm/list/swjk" component={Swjk}></Route>
          </TabPane>
          <TabPane tab="内涝警情" key="nljq">
            <Route path="/command-alarm/list/nljq" component={Nljq}></Route>
          </TabPane>
          <TabPane tab="内涝预警" key="nlyj">
            <Route path="/command-alarm/list/nlyj" component={Nlyj}></Route>
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

export default AlarmList;
