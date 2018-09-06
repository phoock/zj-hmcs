import React from 'react'
import PageTitle from 'component/page-title/index.jsx'
import { Button, Menu, Icon } from 'antd'
import { Route } from 'react-router-dom'

//组件
import ControlMap from './project-control-map/index.jsx'

class ProjectControl extends React.Component{
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
    this.props.history.push(`/project-design/${e.key}`)

    //边缘情况:多次点击信息模式,使url为'/command-alarm/list'
  }
  render(){
    return (
      <div id="page-wrapper">
        <PageTitle title="指标调控">

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
            </Menu>
          </div>
          <div className="col-md-12">
            <Route exact path='/project-control/map' component={ControlMap}></Route>
          </div>
        </div>
      </div>
    )
  }
}

export default ProjectControl
