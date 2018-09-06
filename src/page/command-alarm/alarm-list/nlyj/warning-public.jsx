import React from 'react'
import { DatePicker, Input, Select, message } from 'antd'
const { TextArea } = Input
const Option = Select.Option;

class WarningPublic extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      time : '',
      content : '',
      level : '请选择预警等级'
    }
  }

  /*
  bindEvent
  */
  onChangeTime(val, string){
    let value = string;
    this.setState({
      time : value
    })
  }
  onChangeContent(e){
    let value = e.target.value;
    this.setState({
      content : value
    })
  }
  onChangeLevel(val){
    let value = val
    this.setState({
      level : val
    })
  }

  /*
  向外暴露的方法
  */
  //重置表单
  reload(){
    this.setState({
      time : '',
      content : '',
      level : '请选择预警等级'
    })
  }
  //提交表单
  submit(){
    //验证数据合法性
    let verified = this.verified();

    //如果通过验证了
    if(verified.status){
      //调用接口
      message.success(verified.successMsg)
      this.props.canClosedModal()
    } else {
      //提示错误信息
      message.error(verified.errMsg)
    }
  }
  verified(){
    let result = {
      status : true,
      successMsg : '已成功的添加了一条预警信息'
    }
    if( this.state.time === '' ){
      return result = {
        status : false,
        errMsg : '请选择日期'
      }
    }
    if ( this.state.content === '' ){
      return result = {
        status : false,
        errMsg : '请输入预警内容'
      }
    }
    if ( this.state.level === '请选择预警等级' ){
      return result = {
        status : false,
        errMsg : '请选择预警等级'
      }
    }
    return result
  }

  render(){
    return (
      <div>
        <div className="row">
          <div className="col-md-2 text-right">
            <label style={{display:'inline-block',lineHeight:'32px'}}>预警时间:</label>
          </div>
          <div className="col-md-4">
            <DatePicker placeholder="请选择日期" onChange={(val, string)=>this.onChangeTime(val, string)} />
          </div>
        </div>
        <div className="row" style ={{marginTop : 16}}>
          <div className="col-md-2 text-right">
            <label style={{display:'inline-block',lineHeight:'32px'}}>预警内容:</label>
          </div>
          <div className="col-md-4">
            <TextArea value={this.state.content} onChange={(e)=>this.onChangeContent(e)} rows={4} />
          </div>
        </div>
        <div className="row" style ={{marginTop : 16}}>
          <div className="col-md-2 text-right">
            <label style={{display:'inline-block',lineHeight:'32px'}}>预警等级:</label>
          </div>
          <div className="col-md-4">
            <Select value={this.state.level} onChange={(val)=>this.onChangeLevel(val)}>
              <Option value="黄色预警">黄色预警</Option>
              <Option value="橙色预警">橙色预警</Option>
              <Option value="红色预警">红色预警</Option>
            </Select>
          </div>
        </div>
      </div>
    )
  }
}

export default WarningPublic
