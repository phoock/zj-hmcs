import React from 'react'
import './index.scss'
import PageTitle from 'component/page-title/index.jsx'
import { Button, Menu, Icon } from 'antd'
import { Route, Link, Redirect } from 'react-router-dom'

//导入组件
import ProcessMap from './process-map/index.jsx'
import ProcessList from './process-list/index.jsx'
import ProjectProcessOpera from './project-process-opera/index.jsx'


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
    this.props.history.push(`/project-process/${e.key}`)

    //边缘情况:多次点击信息模式,使url为'/command-alarm/list'
  }
  componentDidMount(){
    //边缘情况:在信息模式下刷新页面依然会停留在信息页面
    let currentPath = this.props.history.location.pathname;
    if(currentPath !== '/project-process/map') {
      this.setState({
        current: 'list'
      })
    }
  }
  render(){
    return (
      <div id="page-wrapper">
        <PageTitle title="施工管理">

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
            <Route path="/project-process/map" component={ProcessMap}></Route>
            <Route path="/project-process/list" component={ProcessList}></Route>
            <Route path="/project-process/operation/:proNum" component={ProjectProcessOpera}></Route>
          </div>
        </div>
      </div>
    )
  }
}

export default CommandProcess
