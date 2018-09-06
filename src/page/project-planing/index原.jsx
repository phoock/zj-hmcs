import React from 'react'
import './index.scss'
import PageTitle from 'component/page-title/index.jsx'
import {Button, Card, Switch} from 'antd';
import { Route, Link, Redirect,Switch as Swtich02 } from 'react-router-dom'

//组件
import PlaningMap from './project-planing-map/index.jsx'
import PlaningTable from './project-planing-table/index.jsx'
import PlaningTableEdit from './project-planing-edit/index.jsx'

//标记路由地址

class ProjectPlaning extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        switch:true,
        subTitle: '地图模式',
        url:'/project-planing/map'
      }
    }
    switchHandle(boolean){
      let subTitle = boolean?'地图模式':'列表模式';
      let url = boolean?'/project-planing/map':'/project-planing/list'
      this.setState({
        switch:boolean,
        subTitle:subTitle,
        url:url,
      })
      this.props.history.push(url)
    }

    render() {
        const cardExtra = (
          <div >
            <span>点击下方按钮可以切换模式<i style={{position:'relative',top:'-4px'}} className="fa fa-angle-down"></i></span>
          </div>
        )
        return (<div id="page-wrapper">
            <PageTitle title="规划管理"></PageTitle>
            <div className="row project-planing-wrap">
                <div className="col-md-12">
                    <Card title={this.state.subTitle} extra={cardExtra} bordered={true} style={{background: '#fff'}}>
                          <Switch
                          style={{float:'right'}}
                          checkedChildren="开"
                          unCheckedChildren="关"
                          defaultChecked
                          onChange={(boolean)=>this.switchHandle(boolean)}/>
                          <div className="project-planing-map-wrap" style={{marginTop:'10px'}}>
                            <Swtich02>
                              <Route exact path='/project-planing/map' component={PlaningMap}></Route>
                              <Route exact path='/project-planing/list' component={PlaningTable}></Route>
                              <Route exact path='/project-planing/edit/:id' component={PlaningTableEdit}></Route>
                              <Redirect exact from="/project-planing" to={this.state.url}></Redirect>
                            </Swtich02>
                          </div>
                    </Card>
                </div>
            </div>
        </div>)
    }
}

export default ProjectPlaning;
