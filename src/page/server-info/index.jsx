import React from 'react'
import './index.scss'
import PageTitle from 'component/page-title/index.jsx'
import { Card, Button, Table, Modal} from 'antd';

//导入组件
import ServerInfoAddone from './server-info-addone/index.jsx';


const PUBLIC = "发布公众信息";
const EDIT = "编辑该信息"

class ServerInfo extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      dataSource : [

          {
              key: '1',
              num: '001',
              title: '全市河道清淤项目',
              type: '动态新闻',
              time: '2017-02-01',
              admin: 'admin'
          },
          {
              key: '2',
              num: '002',
              title: '水资源管理规范资料',
              type: '行业新闻',
              time: '2017-03-01',
              admin: 'admin2'
          },
          {
              key: '3',
              num: '003',
              title: '我市水污染治理调查',
              type: '问卷调查',
              time: '2017-04-04',
              admin: 'admin'
          },
      ],
      columns : [
          {
              title: '编号',
              dataIndex: 'num',
              key: 'num'
          }, {
              title: '标题',
              dataIndex: 'title',
              key: 'title',
          }, {
              title: '信息类型',
              dataIndex: 'type',
              key: 'type',

          }, {
              title: '发布时间',
              dataIndex: 'time',
              key: 'time',

          }, {
              title: '发布人',
              dataIndex: 'admin',
              key: 'admin',

          },{
              title: '操作',
              render: (text, record) => {
                  return (
                  <span>
                    <a href="javascript:;" onClick={(e)=>this.showModal(e,EDIT)}>编辑</a>
                  </span>
                )
              }
          }
      ],
      visible: false,
      subTitle:''
    }
  }
  showModal(e,title){
    this.setState({
      visible: true,
      subTitle: title
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
  render(){
    return (
      <div id="page-wrapper">
        <PageTitle title="公众信息管理">
        </PageTitle>
        <div className="row">
          <div className="col-md-12">
            <div className="servser-info-wrap">
              <Card title="公众信息列表" type="inner" style={{marginTop:16}}>
                <div className="row">
                  <div className="col-md-3 col-xs-6" style={{marginTop:16,marginBottom:16}}>
                    <Button onClick={(e)=>this.showModal(e,PUBLIC)}>发布公众信息    <i className="fa fa-plus"></i></Button>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <Table dataSource={this.state.dataSource} columns={this.state.columns} pagination={{
                      position:'bottom',
                      defaultCurrent:1,
                      total:30              }}/>
                  </div>
                </div>
              </Card>
              <Modal
                title={this.state.subTitle}
                width="80%"
                visible={this.state.visible}
                onOk={(e)=>this.handleOk(e)}
                onCancel={(e)=>this.handleCancel(e)}
                okText="提交"
                cancelText="取消"
              >
                <ServerInfoAddone></ServerInfoAddone>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ServerInfo;
