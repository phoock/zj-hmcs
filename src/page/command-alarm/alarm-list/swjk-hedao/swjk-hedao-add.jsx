import React from 'react'
import { Switch, Button, Input, Select, DatePicker } from 'antd'
import moment from 'moment';
const Option = Select.Option;



class SwjkHedaoAdd extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      name : '',
      newname : '',
      time : '',
      value : '',
      hedaoArray : [],
      isModify : false,
      switchOpen : false
    }
  }

  //页面第一次加载时运行
  componentDidMount(){
    //数据回填
    this.loadList()
  }

  //加载页面数据,重渲染页面
  loadList(){
    this.setState({
      isModify : false
    })
    let data = {}
    setTimeout(()=>{
      this.setState({
        hedaoArray : [
          '金华江',
          '新安江',
          '东苕溪',
          '甬江',
          '瓯江'
        ]
      })
    },200)
  }

  //选择河道名
  handleSelectChange(val){
    //将下标变成值
    let valSwitch =
    this.setState({
      name : this.state.hedaoArray[val],
      isModify :true
    })
  }

  //选择新建河道
  //开关控制
  switchHandle(boolean){
    this.setState({
      switchOpen : boolean
    })
  }
  handleNewName(e){
    this.setState({
      newname : e.target.value
    })
  }

  //选择时间
  handleTimeChange(date, dateString){
    this.setState({
      time:dateString,
      isModify :true
    })
  }

  //填写数值
  handleValueChange(e){
    let val = e.target.value
    this.setState({
      value:val,
      isModify :true
    })
  }

  //点击积水点转换按钮
  jishuiSwitch(e){
    //调用积水点转换接口,如果成功了,在回调里设置jishui
    this.setState({
      jishui: !this.state.jishui
    })
  }

  //向外层容器暴露的方法
  getAllVal(){
    //如果是选择有过的河道
    if(!this.state.switchOpen){
      console.log(1);
      return {
        name : this.state.name,
        time : this.state.time,
        value : this.state.value
      }
    } else {
      console.log(2);
      return {
        name : this.state.newname,
        time : this.state.time,
        value : this.state.value
      }
    }
  }

  render(){
    return (
      <div>
        <div className="row">
          <div className="col-md-2 text-right"><label style={{display:'inline-block',lineHeight:'26px'}}>选择已有河道:</label></div>
          <div className="col-md-4">
            <Select disabled={this.state.switchOpen} defaultValue="请选择已有河道" style={{ width: 180 }} onChange={(val)=>{this.handleSelectChange(val)}}>
              {
                this.state.hedaoArray.length
                ?this.state.hedaoArray.map((item,index)=>{
                  return (
                    <Option key={index} value={index}>{item}</Option>
                  )
                })
                :null
              }
            </Select>
          </div>
        </div>
        <div className="row" style={{marginTop:16}}>
          <div className="col-md-2 text-right"><label style={{display:'inline-block',lineHeight:'32px'}}>输入新的河道名称</label></div>
          <div className="col-md-1" style={{lineHeight:'27px'}}>
            <Switch defaultChecked={false} onChange={(boolean)=>this.switchHandle(boolean)} />
          </div>
          <div className="col-md-3">
            <Input placeholder="输入新的河道名称" disabled={!this.state.switchOpen} onChange={(e)=>{this.handleNewName(e)}} />
          </div>
        </div>
        <div className="row" style={{marginTop:16}}>
          <div className="col-md-2 text-right"><label style={{display:'inline-block',lineHeight:'32px'}}>请选择时间:</label></div>
          <div className="col-md-4">
            <DatePicker allowClear={false} placeholder="请选择日期" onChange={(date, dateString)=>{this.handleTimeChange(date, dateString)}} />
          </div>
        </div>
        <div className="row" style={{marginTop:16}}>
          <div className="col-md-2 text-right"><label style={{display:'inline-block',lineHeight:'32px'}}>请输入水位值:</label></div>
          <div className="col-md-3">
            <Input addonAfter="毫米(mm)" placeholder="输入水位值" onChange={(e)=>{this.handleValueChange(e)}} />
          </div>
        </div>

      </div>

    )
  }
}

export default SwjkHedaoAdd;
