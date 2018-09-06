import React from 'react'
import './index.scss'
import PageTitle from 'component/page-title/index.jsx'
import {Button, Card, Table, Divider, Switch} from 'antd';
import { Link } from 'react-router-dom'
import mapTem from 'images/map.jpg'

class tem extends React.Component {

    render() {
        return (<div id="page-wrapper">
            <PageTitle title="规划管理"></PageTitle>
            <div className="row project-planing-wrap">
                <div className="col-md-12">
                    <Card title="规划类地图" extra={<i className = "fa fa-angle-down" > </i>} bordered={true} style={{
                            background: '#fff'
                        }}>
                        <div className="row">
                            <div className="col-md-8 col-sm-12">

                            </div>
                            <div className="col-md-4 col-sm-12" style={{textAlign:"right"}}>
                                <Link to="/project-planing/">
                                  <Switch defaultChecked /> <span className="map-mode">地图模式</span>
                                </Link>
                            </div>
                        </div>
                        <div className="row" style={{marginTop:'20px'}}>
                            <div className="col-md-12">
                              <img src={mapTem} alt="百度地图" width={'100%'}/>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>)
    }
}

export default tem;
