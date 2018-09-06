import React from 'react'
import { Button, Input, message } from 'antd'

class AddStaffComponent extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      name:'',
      duty:'',
      phone:'',
      mail:''    }
  }
  componentDidMount(){
    this.reloadState()
  }
  reloadState(){
    this.setState({
      name:'',
      duty:'',
      phone:'',
      mail:''
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

  //提交表单
  submit(){

    let isValid = this.vilidate(this.state)
    //通过验证
    if( isValid.state ){
      //调用接口
      //_phoock.addStaff(this.state)
      message.success('添加成功')
      this.props.cancelModal()
      this.refs.form.reset()
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
    if(data.phone === ''||typeof(parseInt(data.phone))!=='number'||data.phone.length !== 11){

      return result = {
        state : false,
        errMsg : '手机号码必须为11位数字'
      }
    }
    //邮箱验证
    console.log(data.mail.match(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/));
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
            <Input autoComplete="age" name="name" onChange = {(e) => this.changeValue(e) } placeholder={`请输入员工姓名`}></Input>
          </div>
        </div>
        <div className="row" style = {{marginTop:16}}>
          <div className="col-md-2 text-right">
            <label style={{display:'inline-block',lineHeight:'26px'}}>职责:</label>
          </div>
          <div className="col-md-4">
            <Input autoComplete="name" name="duty" onChange = {(e) => this.changeValue(e) }  placeholder="请输入员工职责"></Input>
          </div>
        </div>
        <div className="row" style = {{marginTop:16}}>
          <div className="col-md-2 text-right">
            <label style={{display:'inline-block',lineHeight:'26px'}}>电话:</label>
          </div>
          <div className="col-md-4">
            <Input autoComplete="name" name="phone" onChange = {(e) => this.changeValue(e) }  placeholder="请输入员工电话"></Input>
          </div>
        </div>
        <div className="row" style = {{marginTop:16}}>
          <div className="col-md-2 text-right">
            <label style={{display:'inline-block',lineHeight:'26px'}}>邮箱:</label>
          </div>
          <div className="col-md-4">
            <Input autoComplete="name" name="mail" onChange = {(e) => this.changeValue(e) }  placeholder="请输入员工邮箱"></Input>
          </div>
        </div>
      </form>
    )
  }
}

export default AddStaffComponent
