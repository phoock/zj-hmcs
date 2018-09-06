import React from 'react'
import './index.scss'
import PageTitle from 'component/page-title/index.jsx'
import { Card, Button, Input, Table  } from 'antd';
import { Link } from 'react-router-dom'
const Search = Input.Search;


const dataSource = [
    {
        key: 1,
        num: '2011224',
        name: ' 河口大桥,大寨港清淤工程',
        type: '省级年度治理任务',
        time: '2017-01-01/2017-06-26',
        riverName: '河口大桥',
        componey: '京口区政府',
        admin: '王小虎',
        phoneNum: '19080808080',
        totalCount: '80'
    },
    {
        key: 2,
        num: '2011224',
        name: ' 河口大桥,大寨港清淤工程',
        type: '省级年度治理任务',
        time: '2017-01-01/2017-06-26',
        riverName: '河口大桥',
        componey: '京口区政府',
        admin: '王小虎',
        phoneNum: '19080808080',
        totalCount: '80'
    },
    {
        key: 3,
        num: '2011224',
        name: ' 河口大桥,大寨港清淤工程',
        type: '省级年度治理任务',
        time: '2017-01-01/2017-06-26',
        riverName: '河口大桥',
        componey: '京口区政府',
        admin: '王小虎',
        phoneNum: '19080808080',
        totalCount: '80'
    },
    {
        key: 4,
        num: '2011224',
        name: ' 河口大桥,大寨港清淤工程',
        type: '省级年度治理任务',
        time: '2017-01-01/2017-06-26',
        riverName: '河口大桥',
        componey: '京口区政府',
        admin: '王小虎',
        phoneNum: '19080808080',
        totalCount: '80'
    },
    {
        key: 5,
        num: '2011224',
        name: ' 河口大桥,大寨港清淤工程',
        type: '省级年度治理任务',
        time: '2017-01-01/2017-06-26',
        riverName: '河口大桥',
        componey: '京口区政府',
        admin: '王小虎',
        phoneNum: '19080808080',
        totalCount: '80'
    },

];

const columns = [
    {
        title: '编号',
        dataIndex: 'num',
        key: 'num'
    }, {
        title: '工程名称',
        dataIndex: 'name',
        key: 'name'
    }, {
        title: '治理类型',
        dataIndex: 'type',
        key: 'type'
    }, {
        title: '时间',
        dataIndex: 'time',
        key: 'time'
    }, {
        title: '河道名称',
        dataIndex: 'riverName',
        key: 'riverName'
    }, {
        title: '责任单位',
        dataIndex: 'componey',
        key: 'componey'
    }, {
        title: '负责人',
        dataIndex: 'admin',
        key: 'admin'
    }, {
        title: '联系方式',
        dataIndex: 'phoneNum',
        key: 'phoneNum'
    }, {
        title: '总投资(万元)',
        dataIndex: 'totalCount',
        key: 'totalCount'
    }, {
        title: '详情',
        render: (data) => {
            return (<span>
                <Link to={`sewage-project/operation/${data.num}`}>查看</Link>
            </span>)
        }
    }
];

class SewageProject extends React.Component{
  constructor(props){
    super(props)
  }
  addNewProject(e){
    this.props.history.push('/sewage-project/addone')
  }
  render(){
    return (
      <div id="page-wrapper">
        <PageTitle title="整治项目管理">
        </PageTitle>
        <div className="row">
          <Card title="整治项目列表">
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-3 col-xs-6">
                  <Button onClick={()=>this.addNewProject()}>添加施工监理报告  <i className="fa fa-plus"></i></Button>
                </div>
                <div className="col-md-3 col-xs-6">
                  <Search
                    placeholder="请输入文件名称"
                    onSearch={value => console.log(value)}
                    enterButton
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <Table dataSource={dataSource} columns={columns} pagination={{
                    position:'bottom',
                    defaultCurrent:1,
                    total:30              }}/>
                </div>
              </div>


            </div>
          </Card>
        </div>
      </div>
    )
  }
}

export default SewageProject;
