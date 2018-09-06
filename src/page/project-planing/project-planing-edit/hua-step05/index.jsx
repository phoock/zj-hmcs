import React from 'react'
import { Card, message, Button, Icon, Input, Radio } from 'antd'
import axios from 'axios'

const { TextArea } = Input
const RadioGroup = Radio.Group

class HuaStep05 extends React.Component{
  constructor(props){
    super(props)
    this.state={
      radioValue:1,
      showUpload : this.props.nowStep>this.props.successStep,
      PageHtml:''
    }
  }

  componentDidMount(){
    let params = {
        PROJECTID: this.props.proId,
        STEPNUM: this.props.data.STEPNUM,
        PageHtml: "HMCSPROJECTSTEPFILE"
    }
    axios.post('/api/Project/JsonGetStepFileList',params)
    .then(res=>{

    })
  }
  onRadioChange(e){
    this.setState({
      radioValue: e.target.value,
    })
  }
  handleFormSubmit (){
    let params = {
      NOWSTEP: this.props.data.STEPNUM,
      STEPTTYPE: this.props.data.FLOWTYPE,
      PROJECTNAME: this.props.projectName,
      MODULEID: this.props.moduleId,
      PROJECTID: this.props.proId,
      PageHtml: this.state.PageHtml,
      ISOVER: this.props.data.STEPNUM%10 === this.props.successStep?1:0,
      PageList: this.state.radioValue === 1?'next':'pre'
    }
    axios.post('/api/Project/JsonNxtProjectInfo',params)
    .then(res=>{
      message.success('已提交成功,刷新页面可以操作下一步骤')
    })
    .then(()=>{
      this.props.history.push('/project-planing/map')
    })
    .catch(err=>{
      message.error('有错误请重新操作')
    })

  }
  render(){
    //判断upload情况下显示的内容
    const uploadInfo = (this.props.nowStep-this.props.successStep)===1
    ?(
      <Card title={this.props.data.STEPNAME}>
        <div className="row" style={{ marginTop: 16 }}>
          <div className="col-md-8 col-sm-12">
            <RadioGroup onChange={(e)=>this.onRadioChange(e)} value={this.state.radioValue}>
              <Radio value={1}>已通过</Radio>
              <Radio value={2}>未通过</Radio>
            </RadioGroup>
          </div>
        </div>

        <div className="row" style={{ marginTop: 16 }}>
          <div className="col-md-8 col-sm-12">
            <TextArea rows={6} placeholder={`请在此区域输入备注内容`} />
            <Button onClick={()=>this.handleFormSubmit()} type="primary" style={{ marginTop: 16}}>提交</Button>
          </div>
        </div>
      </Card>
    )
    :
    (<div>请先完成第{this.props.successStep+1}步以后刷新页面</div>)

    return (
      <div>
      {
        !this.state.showUpload?
        <div>已审核通过</div>
        :null
      }
      {
        this.state.showUpload?
        uploadInfo
        :null
      }
      </div>
    )
  }
}

export default HuaStep05
