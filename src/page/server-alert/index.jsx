import React from 'react'
import './index.scss'
import { Link } from 'react-router-dom'
import PageTitle from 'component/page-title/index.jsx'
import {Card, Button, Input, Table, Modal} from 'antd';
const Search = Input.Search;
//引入alertInfo组件
import ServerAlertInfo from './server-alert-info/index.jsx'

class ServerAlert extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          columns : [
              {
                  title: '项目编号',
                  dataIndex: 'proNum',
                  key: 'proNum'
              }, {
                  title: '河道名称',
                  dataIndex: 'proName',
                  key: 'proName'
              }, {
                  title: '现场图片',
                  dataIndex: 'img',
                  key: 'img',
                  render: (text,record) => {return(
                    <div>
                      <img src={record.img} alt=""/>
                    </div>
                  )
                  }
              }, {
                  title: '报警时间',
                  dataIndex: 'createTime',
                  key: 'createTime'
              }, {
                  title: '报警人',
                  dataIndex: 'admin',
                  key: 'admin'
              }, {
                  title: '操作',
                  render: (item) => {
                      return (<span>
                          <Button onClick={(e)=>this.showModal(e)}>查看</Button>
                      </span>)
                  }
              }
          ],
          dataSource : [
              {
                  key: '1',
                  proNum: '20172021',
                  proName: '中心家园项目',
                  img: '出让类项目',
                  createTime: '2018-05-01',
                  admin: 'admin'
              },
              {
                  key: '2',
                  proNum: '20172023',
                  proName: '中心家园项目',
                  img: '出让类项目',
                  createTime: '2018-05-02',
                  admin: 'admin'
              },
              {
                  key: '3',
                  proNum: '20172020',
                  proName: '中心家园项目',
                  img: '出让类项目',
                  createTime: '2018-05-03',
                  admin: 'admin'
              }
          ],
          visible: false,
        }
    }
    showModal(e){
      this.setState({
        visible: true
      })
    }
    handleOk(){
      this.setState({
        visible: false,
      });
    }
    handleCancel(){
      this.setState({
        visible: false,
      });
    }
    render() {
        return (<div id="page-wrapper">
            <PageTitle title="公众报警信息管理"></PageTitle>
            <div className="row">
                <div className="col-md-12">
                    <Card title="公众报警信息列表">
                        <div className="row">
                            <div className="col-md-3 col-xs-6">
                                <Search
                                placeholder="请输入查询内容"
                                onSearch={value => console.log(value)}
                                enterButton="搜索"/>
                            </div>
                        </div>
                        <Table dataSource={this.state.dataSource} columns={this.state.columns} pagination={{
                          position:'bottom',
                          defaultCurrent:1,
                          total:30
                        }}/>
                    </Card>
                    <Modal
                      title="报警信息详情"
                      width="80%"
                      visible={this.state.visible}
                      onOk={(e)=>this.handleOk(e)}
                      onCancel={(e)=>this.handleCancel(e)}
                      okText="确定"
                      cancelText="取消"
                    >
                      <ServerAlertInfo></ServerAlertInfo>
                    </Modal>
                </div>
            </div>
        </div>)
    }
}

export default ServerAlert;
