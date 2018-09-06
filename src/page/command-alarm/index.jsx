import React from 'react'
import './index.scss'
import PageTitle from 'component/page-title/index.jsx'
import { Button, Menu, Icon } from 'antd'
import { Route, Link, Redirect } from 'react-router-dom'

//导入组件
import AlarmMap from './alarm-map/index.jsx'
import AlarmList from './alarm-list/index.jsx'


class CommandAlarm  extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      current: 'map'
    }
  }
  handleClick(e){
    this.setState({
      current: e.key
    })
    this.props.history.push(`/command-alarm/${e.key}`)

    //边缘情况:多次点击信息模式,使url为'/command-alarm/list'
    let currentPath = this.props.history.location.pathname;
    if(currentPath === '/command-alarm/list'){
      this.props.history.push(`/command-alarm/list/swjk`)
    }
  }
  componentDidMount(){
    //边缘情况:在信息模式下刷新页面依然会停留在信息页面
    let currentPath = this.props.history.location.pathname;
    if(currentPath === '/command-alarm/list/swjk') {
      this.setState({
        current: 'list'
      })
    }
  }
  render(){
    return (
      <div id="page-wrapper">
        <PageTitle title="预警报警">

        </PageTitle>
        <div className="row alarm-warning-wrap">
          <div className="col-md-12">
            <Menu
              onClick={(e)=>this.handleClick(e)}
              selectedKeys={[this.state.current]}
              mode="horizontal"
            >
              <Menu.Item key="map">
                <Icon type="picture" />地图模式
              </Menu.Item>
              <Menu.Item key="list">
                <Icon type="profile" />信息模式
              </Menu.Item>
            </Menu>
          </div>
          <div className="col-md-12">
            <Route path="/command-alarm/map" component={AlarmMap}></Route>
            <Route path="/command-alarm/list" component={AlarmList}></Route>
          </div>
        </div>
      </div>
    )
  }
}

export default CommandAlarm ;
