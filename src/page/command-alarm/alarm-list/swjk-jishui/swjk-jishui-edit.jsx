import React from 'react'
import { Popconfirm, Button, Input, Select, DatePicker } from 'antd'
import moment from 'moment';
const Option = Select.Option;



class SwjkJiShuiEdit extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      name : '',
      time : '2018-4-4',
      position : '',
      value : '',
      jishuiArray : [],
      jishui : false,
      isModify : false
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
        name : '沿江大道积水点',
        position : '沿江大道244号',
        time : '2018-05-22',
        value : '100',
        jishuiArray : [
          '沿江大道积水点',
          '中心城区积水点',
          '解放公园积水点',
          '甬江积水点',
          '瓯江积水点'
        ],
        jishui : false
      })
    },200)
  }

  //选择下拉框
  handleSelectChange(val){
    //将下标变成值
    let valSwitch =
    this.setState({
      name : this.state.jishuiArray[val],
      isModify :true
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
    return this.state
  }

  render(){
    return (
      <div>
        <div className="row">
          <div className="col-md-2"><label style={{display:'inline-block',lineHeight:'26px'}}>积水点名称:</label></div>
          <div className="col-md-4">
            <Select value={this.state.name} disabled={true} style={{ width: 120 }} onChange={(val)=>{this.handleSelectChange(val)}}>
              {
                this.state.jishuiArray.length
                ?this.state.jishuiArray.map((item,index)=>{
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
          <div className="col-md-2 text-right"><label style={{display:'inline-block',lineHeight:'32px'}}>位置信息:</label></div>
          <div className="col-md-4">
            <Input value={this.state.position} disabled={true} />
          </div>
        </div>
        <div className="row" style={{marginTop:16}}>
          <div className="col-md-2 text-right"><label style={{display:'inline-block',lineHeight:'32px'}}>请选择时间:</label></div>
          <div className="col-md-4">
            <DatePicker allowClear={false} value={moment(this.state.time, 'YYYY-MM-DD')} placeholder="请选择日期" onChange={(date, dateString)=>{this.handleTimeChange(date, dateString)}} />
          </div>
        </div>
        <div className="row" style={{marginTop:16}}>
          <div className="col-md-2 text-right"><label style={{display:'inline-block',lineHeight:'32px'}}>请输入水位值:</label></div>
          <div className="col-md-3">
            <Input addonAfter="毫米(mm)" value={this.state.value} onChange={(e)=>{this.handleValueChange(e)}} />
          </div>
        </div>
        <div className="row" style={{marginTop:16}}>
          <div className="col-md-2 text-right"><label style={{display:'inline-block',lineHeight:'32px'}}>标记它为积水点</label></div>
          <div className="col-md-2">
            <Popconfirm title="确定要切换积水点状态吗?" onConfirm={(e)=>this.jishuiSwitch(e)} okText="确定" cancelText="取消">
              <Button>积水点转换</Button>
            </Popconfirm>
          </div>
          <div className="col-md-3" style={{lineHeight:'32px'}}>
            {
              this.state.jishui
              ? <span style={{color:'red'}}>(此河道已经被标记为积水点)</span>
              : <span>(此河道不是积水点)</span>
            }
          </div>
        </div>
      </div>

    )
  }
}

export default SwjkJiShuiEdit;
