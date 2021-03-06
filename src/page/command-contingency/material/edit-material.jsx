import React from 'react'
import { Button, Input, message } from 'antd'

class EditMaterialComponent extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      name:this.props.dataResource.name || '',
      compony:this.props.dataResource.compony || '',
      total:this.props.dataResource.total || '',
      address:this.props.dataResource.address || '',
      allot:this.props.dataResource.allot || ''
    }
  }
  componentDidMount(){
    this.reloadState()
  }
  reloadState(){
    this.setState({
      name:this.props.dataResource.name || '',
      compony:this.props.dataResource.compony || '',
      total:this.props.dataResource.total || '',
      address:this.props.dataResource.address || '',
      allot:this.props.dataResource.allot || ''
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
        errMsg : '物资名称不能为空'
      }
    }
    //职责验证
    if(data.compony === ''){
      return result = {
        state : false,
        errMsg : '公司不能为空'
      }
    }
    //总量验证
    if(data.total === '' || isNaN(data.total)){
      return result = {
        state : false,
        errMsg : '总量不能为空,并且必须为数字'
      }
    }
    //地址验证
    if(data.address === ''){
      return result = {
        state : false,
        errMsg : '地址不能为空'
      }
    }
    //分配量验证
    if(data.allot ===''||parseInt(data.total)<parseInt(data.allot)){
      return result = {
        state : false,
        errMsg : '分配量不能为空,不能大于总量'
      }
    }
    return result
  }
  render(){
    return (
      <form ref="form" autoComplete="off">
        <div className="row">
          <div className="col-md-2 text-right">
            <label style={{display:'inline-block',lineHeight:'26px'}}>物资名称:</label>
          </div>
          <div className="col-md-4">
            <Input autoComplete="age" name="name" onChange = {(e) => this.changeValue(e) } defaultValue={this.state.name}></Input>
          </div>
        </div>
        <div className="row" style = {{marginTop:16}}>
          <div className="col-md-2 text-right">
            <label style={{display:'inline-block',lineHeight:'26px'}}>单位:</label>
          </div>
          <div className="col-md-4">
            <Input autoComplete="name" name="compony" onChange = {(e) => this.changeValue(e) } defaultValue={this.state.compony}></Input>
          </div>
        </div>
        <div className="row" style = {{marginTop:16}}>
          <div className="col-md-2 text-right">
            <label style={{display:'inline-block',lineHeight:'26px'}}>总量:</label>
          </div>
          <div className="col-md-4">
            <Input autoComplete="name" name="total" onChange = {(e) => this.changeValue(e) } defaultValue={this.state.total}></Input>
          </div>
        </div>
        <div className="row" style = {{marginTop:16}}>
          <div className="col-md-2 text-right">
            <label style={{display:'inline-block',lineHeight:'26px'}}>存放地点:</label>
          </div>
          <div className="col-md-4">
            <Input autoComplete="name" name="address" onChange = {(e) => this.changeValue(e) } defaultValue={this.state.address}></Input>
          </div>
        </div>
        <div className="row" style = {{marginTop:16}}>
          <div className="col-md-2 text-right">
            <label style={{display:'inline-block',lineHeight:'26px'}}>已分配量:</label>
          </div>
          <div className="col-md-4">
            <Input autoComplete="name" name="allot" onChange = {(e) => this.changeValue(e) } defaultValue={this.state.allot}></Input>
          </div>
        </div>
      </form>
    )
  }
}

export default EditMaterialComponent
