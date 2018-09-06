import React from 'react'
import './index.scss'
import PageTitle from 'component/page-title/index.jsx'
import {Tabs, Button, Card, Icon, message} from 'antd';
import { Link } from 'react-router-dom'
const TabPane = Tabs.TabPane;

import axios from 'axios'

import StepInfo from './step-info/index.jsx'
import StepTransfer from './step-transfer/index.jsx'

class BeforeEdit extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      editDept : ''
    }
  }
  componentDidMount(){
    axios.get('/api/Account/AuothLogin').then((res)=>{
      if(res.status===200 && res.data.isSuccessful){
        let value = res.data.Data.EMPDEPART.substring(2)
        this.setState({
          editDept : value
        })

      }else{
        // this.props.history.push('/login')
      }
    })
  }
  render(){
    return (
      <div>
        {
          this.state.editDept
          ?
          <ProjectDesignEdit {...this.props} editDept={this.state.editDept }></ProjectDesignEdit>
          : null
        }

      </div>
    )
  }
}

class ProjectDesignEdit extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        step:'',
        flowWorkData:[],
        title:'',
        projectId:0,
        flowType:0,
        moduleId:0,
        flowId:0,
        isOver:0,
      }
    }
    componentDidMount(){
      let urlParam = this.props.match.params.id

      //获取权限
      let paramsQuan = this.handleParamsQuan(this.props.match.params.id)
      axios.post('api/Project/JsonGetProjectInfoView',paramsQuan)
      .then((res)=>{
        if(res.status===200&&res.data.isSuccessful){
          let data = res.data.Data.objProjectFlow.NOWDEPT
          if(data.indexOf(this.props.editDept)!==-1) {
            console.log(data,this.props.editDept);

          } else {
            message.error('您没有权限操作当前步骤')
            console.log(data,this.props.editDept);
            this.props.history.goBack()

          }
        }
      })

      //拿到并处理参数
      let params = this.handleParams(this.props.match.params.id)
      axios.post('/api/Project/JsonProjectFlowWorks',params)
      .then((res)=>{
        if(res.status===200&&res.data.isSuccessful){
          this.setState({
            flowWorkData:res.data.Data,
            step:params.STEPNUM%10-1,
            title:params.FLOWNAME,
          })
        }
      })
    }
    handleParamsQuan(data){
      return data.split('&')[4]
    }
    handleParams(data){
      let dataArr = data.split("&")
      //设置projectid
      let projectId = dataArr[4]
      //设置flowId
      let flowId = dataArr[5]
      //设置moduleId
      let moduleId = dataArr[2]
      //设置isOver
      let isOver = dataArr[6]
      this.setState({
        projectId: projectId,
        flowId:flowId,
        flowType:flowId,
        moduleId:moduleId,
        isOver:isOver==='1'?true:false
      })
      return {
        FLOWTYPE: dataArr[1],
        FLOWNAME: dataArr[0],
        STEPNUM: dataArr[3],
        STEPMODULE: dataArr[2],
      }
    }

    render() {
        let { step,flowWorkData,isOver } = this.state
        if(isOver) step+=1
        let ifFinishedEle = (index)=>{
          return (
            step>index
            ?(<span className="label label-success">已完成</span>)
            :(<span className="label label-success label-hidden">已完成</span>)
          )
        }
        let tabPaneEle =(type)=>{
          if(this.state.flowWorkData){
            return  (
               <Tabs defaultActiveKey={`${this.props.match.params.id.split('&')[3]%10}`}>
                 {
                     this.state.flowWorkData.map((v, index)=>{

                       return (
                           <TabPane
                           key={index+1}
                           tab={<div>{ifFinishedEle(index)}<span>{`${index+1}.${v.STEPNAME}`}</span></div>}>
                             <StepTransfer
                               nowStep={index+1}
                               successStep={step}
                               type={type}
                               flowType={this.state.flowType}
                               proId={this.state.projectId}
                               FlowID={this.state.flowId}
                               moduleId={this.state.moduleId}
                               data={v}
                             />
                           </TabPane>
                       )
                     })
                 }
               </Tabs>
             )
          }
        }



        return (
            <div className="row project-planing-edit" style={{marginTop:40}}>
                <div className="col-md-12">
                    <Card title={this.state.title} extra={<Link to={`/project-design/map`}><i className = "fa fa-angle-left" >返回</i></Link>} bordered={true} style={{
                            background: '#fff'
                        }}>
                      <div className="row">
                      {
                        this.state.flowId==1
                        ?tabPaneEle('huabo')
                        :null
                      }
                      {
                        this.state.flowId==2
                        ?tabPaneEle('churang')
                        :null
                      }
                      </div>
                    </Card>
                </div>
            </div>
            )
    }
}

export default BeforeEdit;


//这个页加载16个组件
//如果flowid是1  则选择9项  划拨类huabo
//如果flowid是2  则选择8项  出让类churang





//
//
// <TabPane tab={<div><span className="label label-success">已完成</span><span>1.设计方案申报</span></div>} key={`1`}><HuaStep01/></TabPane>
// <TabPane tab={<div><span className="label label-success">已完成</span><span>2.设计方案评估</span></div>} key={`2`}><HuaStep02 /></TabPane>
// <TabPane tab={<div><span className="label label-success label-hidden">已完成</span><span>3.设计方案审核</span></div>} key={`3`}><HuaStep01 /></TabPane>
// <TabPane tab={<div><span className="label label-success label-hidden">已完成</span><span>4.施工图申报</span></div>} key={`4`}><HuaStep01 /></TabPane>
// <TabPane tab={<div><span className="label label-success label-hidden">已完成</span><span>5.施工图审核</span></div>} key={`5`}><HuaStep01 /></TabPane>
// <TabPane tab={<div><span className="label label-success label-hidden">已完成</span><span>6.审核材料申报</span></div>} key={`6`}><HuaStep01 /></TabPane>
// <TabPane tab={<div><span className="label label-success label-hidden">已完成</span><span>7.施工许可审核</span></div>} key={`7`}><HuaStep01 /></TabPane>
// <TabPane tab={<div><span className="label label-success label-hidden">已完成</span><span>8.基本信息录入</span></div>} key={`8`}><HuaStep01 /></TabPane>
