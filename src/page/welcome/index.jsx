import React from 'react'

import './index.scss'
import HM from 'util/hmcs.js'
const _hm = new HM()
import { Button } from 'antd';
import { Link} from 'react-router-dom'
import NavTop from 'component/nav-top/index.jsx'


class Welcome extends React.Component{
  constructor(props){
    super(props)
    this.state={
      go:false
    }
  }
  handleInSys(e){
    this.setState({
      go:true
    })
    setTimeout(()=>{
      this.props.history.push('/project')
    }, 400)
  }
  componentDidMount(){

  }
  render(){
    return (
      <div id="welcome">
        <NavTop />
        <div className={`welcome-wrap`}>
          <div className={`bg-wrap ${this.state.go?'fade-out':''}`}>
            <div className="black-filter">
              <div className="content-wrap">
                <div className="title">
                  欢迎使用海绵城市XX系统
                </div>
                <div className="col-md-6 col-xs-6">
                    <div className="panel panel-primary text-center no-boder bg-color-green green">
                        <div className="panel-left pull-left green">
                            <i className="fa fa-bar-chart-o fa-5x"></i>

                        </div>
                        <div className="panel-right pull-right">
                            <h3>120</h3>
                            <strong>
                                规划类项目</strong>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-xs-6">
                    <div className="panel panel-primary text-center no-boder bg-color-blue blue">
                        <div className="panel-left pull-left blue">
                            <i className="fa fa-shopping-cart fa-5x"></i>
                        </div>

                        <div className="panel-right pull-right">
                            <h3>160
                            </h3>
                            <strong>
                                待处理项目数</strong>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-xs-6">
                    <div className="panel panel-primary text-center no-boder bg-color-red red">
                        <div className="panel-left pull-left red">
                            <i className="fa fa fa-comments fa-5x"></i>
                        </div>

                        <div className="panel-right pull-right">
                            <h3>160
                            </h3>
                            <strong>
                                待处理项目数</strong>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-xs-6">
                    <div className="panel panel-primary text-center no-boder bg-color-brown brown">
                        <div className="panel-left pull-left brown">
                            <i className="fa fa-users fa-5x"></i>
                        </div>

                        <div className="panel-right pull-right">
                            <h3>160
                            </h3>
                            <strong>
                                待处理项目数</strong>
                        </div>
                    </div>
                </div>
                <div to="/project" className="in-system" onClick={(e)=>this.handleInSys(e)}>
                  进入系统
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Welcome;
