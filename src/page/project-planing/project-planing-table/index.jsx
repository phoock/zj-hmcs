import React from 'react'
import './index.scss'
import { Link} from 'react-router-dom'
import {Button, Card, Table, Divider, Progress, message } from 'antd';
import NoData from 'component/noData/index.jsx'
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

class tem extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      dataEmpty : false,
      pageInfo:{
        objProjectFlow: {
          STEPTTYPE: 0,
          MODULEID: 1001,
        },
        CurrentPage: 1,
        PageSize: 5
      },
      totalPage : 0,
      dataSource : [

      ],
      processData : [],
      percent:0
    }
  }
  componentDidMount(){
    this.columns = [
        {
            title: '项目名称',
            dataIndex: 'name',
            render: text => <a href="javascript:;">{text}</a>
        }, {
            title: '项目类型',
            dataIndex: 'type'
        }, {
            title: '时间',
            dataIndex: 'time'
        }, {
            title: '发起部门',
            dataIndex: 'unitBegin'
        }, {
            title: '当前审批部门',
            dataIndex: 'unitCurrent'
        }, {
            title: '当前操作',
            dataIndex: 'editCurrent'
        }, {
            title: "操作",
            render: (record) => {
              return (<span>
                  <a onClick={()=>this.handleProcess(record)}>查看进度</a>
                  <Divider type="vertical"/>
                  <a onClick={(e)=>this.handleLink(e,record)}>项目处理</a>
              </span>)
            }
        }
    ]
    this.loadData()
  }
  handleLink(e,record){
    this.props.history.push(`/project-planing/edit/${record.name}&${record.typeNum}&${record.proType}&${record.step}&${record.proId}&${record.paramType}&${record.hasFinished}`)
    // if(record.editCurrent.indexOf(window.a_phoock_dpt) !== -1){
    //
    // } else{
    //   message.error('当前用户没有权限进行操作')
    // }
  }
  loadData(){
    axios.post('/api/Project/JsonProInfoPage',this.state.pageInfo)
    .then((res)=>{
      if(res.status===200&&res.data.isSuccessful){
        this.handleDataFormat(res.data.Data)
        this.loadPagination(res.data)
      }
      else if (res.status === 200 && !res.data.isSuccessful){
        this.setState({
          dataEmpty : true
        })
      }
      else{
        this.props.history.push('/login')
      }
    })
  }
  handleDataFormat(data){

      let dataArr = data.map((v,index)=>{
        let project = {
            key: index,
            name: v.PRONAME,
            proId: v.PROID,
            typeNum:v.FLOWID,
            type: PROJECT_TYPE[v.FLOWID],
            time: `${v.PROSTARTDATE.slice(0,10)}至${v.PROENDDATE.slice(0,10)}`,
            unitBegin: v.STARTDEPT.substring(2),
            editCurrent: v.nowdept,
            unitCurrent: v.STEPNAME,
            step: v.nowstep,
            proType: v.MODULEID,
            paramType: v.FLOWID,
            hasFinished: v.isover === 1?1 : 0
        }
        return project
    })
    this.setState({
      dataSource:dataArr
    })
  }
  loadPagination(data){
    this.setState({
      totalPage:data.RowCount
    })
  }
  handleProcess(data){
    //整理请求时的参数
    const params = {
      "FLOWTYPE": data.paramType,
      "FLOWNAME": data.name,
      "STEPNUM": data.step-1,
      "STEPMODULE": data.proType
    }
    axios.post('/api/Project/JsonProjectFlowWorks',params)
    .then((res)=>{
      if(res.status===200) {
        let dataArr = res.data.Data
        this.handleStepData(dataArr,params.STEPNUM,data.hasFinished)
      }
    })

  }

  handleStepData(dataArr,stepNum,hasFinished){
    //数据格式处理
    let dataSourceRight = []
    dataSourceRight = dataArr.map((v, index, arr)=>{
      let dataLenght = arr.length
      //标记最后一步是否已完成
      let flaglastStepFinished
      if(v.STEPNUM%10 === arr.length){
        flaglastStepFinished = hasFinished
      }
      let objectRight = {
        step : index + 1,
        text : v.STEPNAME,
        hasDone : (v.STEPNUM) <= (stepNum) || flaglastStepFinished
      }
      return objectRight
    })
    let fenzi = dataSourceRight.filter(v=>v.hasDone).length
    let fenmu = dataSourceRight.length

    this.setState({
      processData:dataSourceRight,
      percent:Math.ceil((fenzi/fenmu)*100)
    })
  }

  render(){
    let { dataEmpty } = this.state
    const processWrap = this.state.processData.map((item, index)=>{
      return (
        <div className={item.hasDone?'col-md-1 item has-done':'col-md-1 item not-done'} key={index}>
          <span className="hid label label-success">已完成</span>
          <span className="hidd label label-success">未完成</span>
          <p>{item.step}</p>
          <p>{item.text}</p>
        </div>
      )
    });
    const processBarWrap = (<Progress percent={this.state.percent} status="active" style={{marginBottom:16}}/>)
    return (
      <div className="planing-table-wrap">
        {
          this.state.processData.length > 0
          ?<Card
            type="inner"
            title={this.state.processTitle}
          >
            <div className="row process-wrap">{processWrap}</div>
            <div className="row process-bar-wrap">{processBarWrap}</div>
          </Card>
          :''
        }

        {
          dataEmpty
          ? <NoData></NoData>
          : <Table
            loading = {this.state.dataSource.length>0?false:true}
            dataSource={this.state.dataSource}
            columns={this.columns}
            pagination={{
              position:'bottom',
              pageSize:this.state.pageInfo.PageSize,
              defaultCurrent:1,
              current:this.state.pageInfo.CurrentPage,
              total:this.state.totalPage,
              onChange:(current,size)=>{
                this.setState({
                  pageInfo:{
                    objProjectFlow: {
                      STEPTTYPE: 0,
                      MODULEID: 1001,
                    },
                    CurrentPage: current,
                    PageSize: size
                  }
                },()=>{
                  this.loadData()
                })
            }
          }}/>
        }

      </div>
    )
  }
}

export default tem;
