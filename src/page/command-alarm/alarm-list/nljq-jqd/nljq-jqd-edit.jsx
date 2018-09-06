import React from 'react'
import { Popconfirm, Button, Input } from 'antd'
const { TextArea } = Input;


class JqdInfo extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      jqId : '',
      time : '',
      position : '',
      status : '',
      desc : '',
      imgs : [],
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
        jqId : '001001',
        time : '2018-5-28',
        position : '胜利街六合路223号',
        status : '未处理',
        desc : 'XX小区门口有大面积积水',
        imgs : [
          'http://img3.imgtn.bdimg.com/it/u=2098762393,1634068094&fm=214&gp=0.jpg',
          'http://img51.hbzhan.com/9/20160812/636065873327300412791.jpg',
          'http://s9.sinaimg.cn/orignal/44c250a0dbd5b8056ade8'
        ],
        jishui : false,
      })
    },200)
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
  //清除数据
  clearData(){
    this.setState({
      jqId : '',
      time : '',
      position : '',
      status : '',
      desc : '',
      imgs : [],
      jishui : false,
      isModify : false
    })
  }

  render(){
    return (
      <div>
        <div className="row" style={{marginTop:16}}>
          <div className="col-md-2 text-right"><label style={{display:'inline-block',lineHeight:'32px'}}>警情编号:</label></div>
          <div className="col-md-2">
            <Input value={this.state.jqId} disabled={true}></Input>
          </div>
        </div>
        <div className="row" style={{marginTop:16}}>
          <div className="col-md-2 text-right"><label style={{display:'inline-block',lineHeight:'32px'}}>报警时间:</label></div>
          <div className="col-md-2">
            <Input value={this.state.time} disabled={true}></Input>
          </div>
        </div>
        <div className="row" style={{marginTop:16}}>
          <div className="col-md-2 text-right"><label style={{display:'inline-block',lineHeight:'32px'}}>位置名称:</label></div>
          <div className="col-md-3">
            <Input value={this.state.position} disabled={true}></Input>
          </div>
        </div>
        <div className="row" style={{marginTop:16}}>
          <div className="col-md-2 text-right"><label style={{display:'inline-block',lineHeight:'32px'}}>处理状态:</label></div>
          <div className="col-md-2">
            <Input value={this.state.status} disabled={true}></Input>
          </div>
        </div>
        <div className="row" style={{marginTop:16}}>
          <div className="col-md-2 text-right"><label style={{display:'inline-block',lineHeight:'32px'}}>警情描述:</label></div>
          <div className="col-md-4">
            <TextArea rows={4} value={this.state.desc} disabled={true} />
          </div>
        </div>
        <div className="row" style={{marginTop:16}}>
          <div className="col-md-2 text-right"><label style={{display:'inline-block',lineHeight:'32px'}}>现场图片:</label></div>
          <div className="col-md-8">
            {
              this.state.imgs.length
              ? this.state.imgs.map((imgUrl, index)=>{
                return (<img src={imgUrl} key={index} width="100%" style={{marginTop:8}} alt=""/>)
              })
              : null
            }
          </div>
        </div>

        <div className="row" style={{marginTop:16}}>
          <div className="col-md-2 text-right"><label style={{display:'inline-block',lineHeight:'32px'}}>积水点切换:</label></div>
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

export default JqdInfo;
