import React from 'react'
import { Button, Input, message } from 'antd'

class AddStaffComponent extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      name:this.props.dataResource.name || '',
      duty:this.props.dataResource.duty || '',
      phone:this.props.dataResource.phone || '',
      mail:this.props.dataResource.mail || ''
    }
  }
  componentDidMount(){
    this.reloadState()
  }
  reloadState(){
    this.setState({
      name:this.props.dataResource.name || '',
      duty:this.props.dataResource.duty || '',
      phone:parseInt(this.props.dataResource.phone) || '',
      mail:this.props.dataResource.mail || ''
    })
  }
  //bindEvent
  changeValue(e){
    let value = e.target.value,
        name = e.target.getAttribute('name');
    this.setState({
      [name]:value
    })
  }

  //向外暴露的方法
  //重置
  reload(){
    this.reloadState()
    this.refs.form.reset()
  }

  //提交表单
  submit(){

    let isValid = this.vilidate(this.state)
    //通过验证
    if( isValid.state ){
      //调用接口
      //_phoock.addStaff(this.state)
      message.success('修改成功')
    }
    else {
      message.error(isValid.errMsg)
    }
  }
  vilidate(data){
    let result = {
      state : true,
      msg : '通过验证'
    }
    //名字验证
    if(data.name === ''){
      return result = {
        state : false,
        errMsg : '姓名不能为空'
      }
    }
    //职责验证
    if(data.duty === ''){
      return result = {
        state : false,
        errMsg : '职责不能为空'
      }
    }
    //电话验证
    if(data.phone === ''||typeof(parseInt(data.phone))!=='number'||data.phone.toString().length !== 11){
      return result = {
        state : false,
        errMsg : '手机号码必须为11位数字'
      }
    }
    //邮箱验证
    if(data.mail==='  '||!data.mail.match(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/)){
      return result = {
        state : false,
        errMsg : '邮箱格式不正确'
      }
    }
    return result
  }
  render(){
    return (
      <form ref="form" autoComplete="off">
        <div className="row">
          <div className="col-md-2 text-right">
            <label style={{display:'inline-block',lineHeight:'26px'}}>姓名:</label>
          </div>
          <div className="col-md-4">
            <Input autoComplete="name" name="name" onChange = {(e) => this.changeValue(e) } defaultValue={this.state.name}></Input>
          </div>
        </div>
        <div className="row" style = {{marginTop:16}}>
          <div className="col-md-2 text-right">
            <label style={{display:'inline-block',lineHeight:'26px'}}>职责:</label>
          </div>
          <div className="col-md-4">
            <Input autoComplete="name" name="duty" onChange = {(e) => this.changeValue(e) } defaultValue={this.state.duty}></Input>
          </div>
        </div>
        <div className="row" style = {{marginTop:16}}>
          <div className="col-md-2 text-right">
            <label style={{display:'inline-block',lineHeight:'26px'}}>电话:</label>
          </div>
          <div className="col-md-4">
            <Input autoComplete="name" name="phone" onChange = {(e) => this.changeValue(e) } defaultValue={this.state.phone}></Input>
          </div>
        </div>
        <div className="row" style = {{marginTop:16}}>
          <div className="col-md-2 text-right">
            <label style={{display:'inline-block',lineHeight:'26px'}}>邮箱:</label>
          </div>
          <div className="col-md-4">
            <Input autoComplete="name" name="mail" onChange = {(e) => this.changeValue(e) } defaultValue={this.state.mail}></Input>
          </div>
        </div>
      </form>
    )
  }
}

export default AddStaffComponent
