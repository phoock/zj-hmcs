import React from 'react'
import PageTitle from 'component/page-title/index.jsx'
import { Button, Menu, Icon } from 'antd'
import {Switch, Route, Link, Redirect } from 'react-router-dom'

//组件
import PlaningMap from './project-planing-map/index.jsx'
import PlaningTable from './project-planing-table/index.jsx'
import PlaningTableEdit from './project-planing-edit/index.jsx'
import PlaningAdd from './project-planingadd/index.jsx'


class CommandProcess  extends React.Component{
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
    this.props.history.push(`/project-planing/${e.key}`)

    //边缘情况:多次点击信息模式,使url为'/command-alarm/list'
  }
  componentDidMount(){
    //边缘情况:在信息模式下刷新页面依然会停留在信息页面
    let currentPath = this.props.history.location.pathname;
    if(currentPath !== '/project-planing/map') {
      this.setState({
        current: 'list'
      })
    }
  }
  render(){
    return (
      <div id="page-wrapper">
        <PageTitle title="规划管理">

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
            <Switch>
              <Route exact path='/project-planing/map' component={PlaningMap}></Route>
              <Route exact path='/project-planing/add/:info' component={PlaningAdd}></Route>
              <Route exact path='/project-planing/list' component={PlaningTable}></Route>
              <Route exact path='/project-planing/edit/:id' component={PlaningTableEdit}></Route>
              <Route path='/project-planing' component={PlaningTable}></Route>
            </Switch>
          </div>
        </div>
      </div>
    )
  }
}

export default CommandProcess
