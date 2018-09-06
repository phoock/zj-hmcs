import React from 'react'
import PageTitle from 'component/page-title/index.jsx'
import { Button, Menu, Icon } from 'antd'
import { Route } from 'react-router-dom'

//组件
import DesignMap from './project-design-map/index.jsx'
import DesignTable from './project-design-table/index.jsx'
import DesignTableEdit from './project-design-edit/index.jsx'


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
    this.props.history.push(`/project-design/${e.key}`)

    //边缘情况:多次点击信息模式,使url为'/command-alarm/list'
  }
  componentDidMount(){
    //边缘情况:在信息模式下刷新页面依然会停留在信息页面
    let currentPath = this.props.history.location.pathname;
    if(currentPath !== '/project-design/map') {
      this.setState({
        current: 'list'
      })
    } else {
      this.setState({
        current: 'map'
      })
    }
  }
  render(){
    return (
      <div id="page-wrapper">
        <PageTitle title="设计管控">

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
            <Route exact path='/project-design/map' component={DesignMap}></Route>
            <Route exact path='/project-design/list' component={DesignTable}></Route>
            <Route exact path='/project-design/edit/:id' component={DesignTableEdit}></Route>
          </div>
        </div>
      </div>
    )
  }
}

export default CommandProcess
