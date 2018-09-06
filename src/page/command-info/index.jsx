import React from 'react'
import './index.scss'
import PageTitle from 'component/page-title/index.jsx'
import {Button, Card, List, Avatar} from 'antd';

const data = [
  {
    author: '2018/5/15 15:00',
    content:'新华路路口发生大规模积水'
  },
  {
    author: '2018/5/5 10:00',
    content:'江汉路嘉和花园小区门口发生积水现象'
  },
  {
    author: '2018/4/13 8:00',
    content:'二七路路段发生严重积水现象,道路阻断'
  },
  {
    author: '2018/3/15 13:00',
    content:'中山公园井盖持续渗水'
  },
  {
    author: '2018/3/5 9点',
    content:'中山大道长春积水点积水30cm,阻塞交通'
  }
];
const data2 = [
  {
    author: '2018-5-6 15:00',
    content:'预计未来3小时内有100mm降雨(橙色预警)'
  },
  {
    author: '2018/5/5 18:00',
    content:'预计未来3小时内有200mm降雨(红色预警)'
  },
  {
    author: '2018/4/13 8:00',
    content:'预计未来1小时内有50mm降雨(橙色预警)'
  },
  {
    author: '2018/3/15 13:00',
    content:'预计未来3小时内有50mm降雨'
  },
  {
    author: '2018/3/2 9点',
    content:'预计未来3小时内有150mm降雨(橙色预警)'
  }
];

class Project extends React.Component {

    render() {
        return (<div id="page-wrapper">
            <PageTitle title="内涝信息">

            </PageTitle>
            <div className="row command-wrap">
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-4 col-sm-6 col-xs-12">
                            <div className="panel panel-primary text-center no-boder bg-color-green green">
                                <div className="panel-left pull-left green">
                                    <i className="fa fa-bar-chart-o fa-5x"></i>

                                </div>
                                <div className="panel-right pull-right">
                                    <h3>120</h3>
                                    <strong>
                                        内涝报警信息统计</strong>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6 col-xs-12">
                            <div className="panel panel-primary text-center no-boder bg-color-blue blue">
                                <div className="panel-left pull-left blue">
                                    <i className="fa fa-shopping-cart fa-5x"></i>
                                </div>

                                <div className="panel-right pull-right">
                                    <h3>87
                                    </h3>
                                    <strong>
                                        内涝预警信息统计</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 col-xs-12">
                        <Card title="内涝报警信息" extra={<i className="fa fa-angle-down"></i>} bordered={true} style={{background:'#fff'}} >
                          <List
                            itemLayout="horizontal"
                            dataSource={data2}
                            renderItem={item => (
                              <List.Item>
                                <List.Item.Meta
                                  avatar={<i className="fa fa-user"></i>}
                                  title={<span>{item.author}</span>}
                                  description={item.content}
                                />
                              </List.Item>
                            )}
                          />
                        </Card>
                      </div>
                      <div className="col-md-6 col-xs-12">
                        <Card title="内涝预警信息" extra={<i className="fa fa-angle-down"></i>} bordered={true} style={{background:'#fff'}} >
                          <List
                            itemLayout="horizontal"
                            dataSource={data}
                            renderItem={item => (
                              <List.Item>
                                <List.Item.Meta
                                  avatar={<i className="fa fa-user"></i>}
                                  title={<span>{item.author}</span>}
                                  description={item.content}
                                />
                              </List.Item>
                            )}
                          />
                        </Card>
                      </div>

                    </div>
                </div>
            </div>
        </div>)
    }
}

export default Project;
