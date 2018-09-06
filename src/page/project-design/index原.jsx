import React from 'react'
import './index.scss'
import PageTitle from 'component/page-title/index.jsx'
import {Button, Card, Switch} from 'antd';
import { Route, Link, Redirect,Switch as Swtich02 } from 'react-router-dom'

//组件
import DesignMap from './project-design-map/index.jsx'
import DesignTable from './project-design-table/index.jsx'
import DesignTableEdit from './project-design-edit/index.jsx'

//标记路由地址

class ProjectDesign extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        switch:true,
        subTitle: '地图模式',
        url:'/project-design/map'
      }
    }
    switchHandle(boolean){
      let subTitle = boolean?'地图模式':'列表模式';
      let url = boolean?'/project-design/map':'/project-design/list'
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
            <PageTitle title="设计管控"></PageTitle>
            <div className="row project-design-wrap">
                <div className="col-md-12">
                    <Card title={this.state.subTitle} extra={cardExtra} bordered={true} style={{background: '#fff'}}>
                          <Switch
                          style={{float:'right'}}
                          checkedChildren="开"
                          unCheckedChildren="关"
                          defaultChecked
                          onChange={(boolean)=>this.switchHandle(boolean)}/>
                          <div className="project-design-map-wrap" style={{marginTop:'10px'}}>
                            <Swtich02>
                              <Route exact path='/project-design/map' component={DesignMap}></Route>
                              <Route exact path='/project-design/list' component={DesignTable}></Route>
                              <Route exact path='/project-design/edit/:id' component={DesignTableEdit}></Route>
                              <Redirect exact from="/project-design" to={this.state.url}></Redirect>
                            </Swtich02>
                          </div>
                    </Card>
                </div>
            </div>
        </div>)
    }
}

export default ProjectDesign;
