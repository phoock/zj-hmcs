import React from 'react'
import './index.scss'
import { Link } from 'react-router-dom'
import PageTitle from 'component/page-title/index.jsx'
import {Card, Button, Input, Table} from 'antd';
const Search = Input.Search;

import axios from 'axios'


const PROJECT_TYPE = [
  '划拔类',
  '出让类'
]
const STATUS_TYPE = [
  '未施工',
  '施工中',
  '已验收',
  '已竣工'
]
//导入组件

const columns = [
    {
        title: '项目编号',
        dataIndex: 'proNum',
        key: 'proNum'
    }, {
        title: '项目名称',
        dataIndex: 'proName',
        key: 'proName'
    }, {
        title: '项目类型',
        dataIndex: 'proType',
        key: 'proType'
    }, {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime'
    }, {
        title: '竣工时间',
        dataIndex: 'finishedTime',
        key: 'finishedTime'
    }, {
        title: '勘察单位',
        dataIndex: 'check',
        key: 'check'
    }, {
        title: '设计单位',
        dataIndex: 'design',
        key: 'design'
    }, {
        title: '施工单位',
        dataIndex: 'workCom',
        key: 'workCom'
    }, {
        title: '监理单位',
        dataIndex: 'jianli',
        key: 'jianli'
    }, {
        title: '建设单位',
        dataIndex: 'buildCom',
        key: 'buildCom'
    },{
        title: '工期',
        dataIndex: 'duration',
        key: 'duration'
    }, {
        title: '总投资(千万)',
        dataIndex: 'totalCount',
        key: 'totalCount'
    }, {
        title: '施工状态',
        dataIndex: 'status',
        key: 'status'
    }, {
        title: '详情',
        render: (item) => {
            return (<span>
                <Link to={`/project-process/operation/${item.proNum}`}>查看</Link>
            </span>)
        }
    }
];
class ProjectProcess extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          pageInfo:{
            CurrentPage:1,
            PageSize:5
          },
          totalPage:0,
          dataSource:[]
        }
    }
    componentDidMount(){
      this.loadData(this.state.pageInfo)
    }
    loadData(){
      axios.post('/api/Project/JsonConstructionPage',this.state.pageInfo)
      .then((res)=>{
        if(res.status===200&&res.data.isSuccessful){
          this.handleDataFormat(res.data.Data)
          this.loadPagination(res.data)
        }else{
          // this.props.history.push('/login')
        }
      })
    }
    handleDataFormat(data){
      let dataArr = data.map((v,index)=>{
        let project = {
            key: index + 1,
            proNum: v.PROID,
            proName: v.PRONAME,
            flowId: v.FLOWID,
            proType: PROJECT_TYPE[v.FLOWID],
            createTime: v.CONSTARTDATE.slice(0,10),
            finishedTime:v.CONEND.slice(0,10),
            process: v.CONEND,
            check: v.KCDEPT,
            design: v.DESDEPT,
            workCom: v.CONDEPT,
            jianli: v.JLDEPT,
            buildCom: v.USERNAME,
            duration: v.COMLIFT+'个月',
            totalCount: v.COMMONEY,
            status: STATUS_TYPE[v.COMSTATUS-1]
        }
        return project
      })
      this.setState({
        dataSource: dataArr
      })
    }
    loadPagination(data){
      this.setState({
        totalPage:data.RowCount
      })
    }
    render() {
        return (<div id="page-wrapper">
            <PageTitle title="施工管理"></PageTitle>
            <div className="row">
                <div className="col-md-12">
                    <Card title="项目列表">
                        <div className="row">
                            <div className="col-md-3 col-xs-6">
                                <Search
                                placeholder="请输入项目名称"
                                onSearch={value => console.log(value)}
                                enterButton="搜索"/>
                            </div>
                        </div>
                        <Table
                        loading = {this.state.dataSource.length>0?false:true}
                        dataSource={this.state.dataSource}
                        columns={columns}
                        pagination={{
                          position:'bottom',
                          pageSize:this.state.pageInfo.PageSize,
                          defaultCurrent:1,
                          current:this.state.pageInfo.CurrentPage,
                          total:this.state.totalPage,
                          onChange:(current,size)=>{
                            this.setState({
                              pageInfo:{
                                CurrentPage:current,
                                PageSize:size
                              }
                            },()=>{
                              this.loadData()
                            })
                          }
                        }}/>
                    </Card>
                </div>
            </div>
        </div>)
    }
}

export default ProjectProcess;
