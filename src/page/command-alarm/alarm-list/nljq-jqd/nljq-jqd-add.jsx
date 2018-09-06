import React from 'react'
import { Popconfirm, Button, Input, Upload, message, Icon } from 'antd'
const { TextArea } = Input;


class JqdAdd extends React.Component{
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

  }
  
  //填写信息时候出发的onchange事件
  onChangeValue(e){
    let name = e.target.name,
        value = e.target.value;
    this.setState({
      [name] : value
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
  submit(){

  }
  render(){
    const props = {
      name: 'file',
      action: '//jsonplaceholder.typicode.com/posts/',
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      }
    };
    return (
      <div>
        <div className="row" style={{marginTop:16}}>
          <div className="col-md-2 text-right"><label style={{display:'inline-block',lineHeight:'32px'}}>警情编号:</label></div>
          <div className="col-md-2">
            <Input name='jqId' onChange={(e)=>this.onChangeValue(e)}></Input>
          </div>
        </div>
        <div className="row" style={{marginTop:16}}>
          <div className="col-md-2 text-right"><label style={{display:'inline-block',lineHeight:'32px'}}>报警时间:</label></div>
          <div className="col-md-2">
            <Input name='time' onChange={(e)=>this.onChangeValue(e)}></Input>
          </div>
        </div>
        <div className="row" style={{marginTop:16}}>
          <div className="col-md-2 text-right"><label style={{display:'inline-block',lineHeight:'32px'}}>位置名称:</label></div>
          <div className="col-md-3">
            <Input name='position' onChange={(e)=>this.onChangeValue(e)}></Input>
          </div>
        </div>
        <div className="row" style={{marginTop:16}}>
          <div className="col-md-2 text-right"><label style={{display:'inline-block',lineHeight:'32px'}}>处理状态:</label></div>
          <div className="col-md-2">
            <Input name='status' onChange={(e)=>this.onChangeValue(e)}></Input>
          </div>
        </div>
        <div className="row" style={{marginTop:16}}>
          <div className="col-md-2 text-right"><label style={{display:'inline-block',lineHeight:'32px'}}>警情描述:</label></div>
          <div className="col-md-4">
            <TextArea rows={4} name='desc' onChange={(e)=>this.onChangeValue(e)}/>
          </div>
        </div>
        <div className="row" style={{marginTop:16}}>
          <div className="col-md-2 text-right"><label style={{display:'inline-block',lineHeight:'32px'}}>现场图片:</label></div>
          <div className="col-md-3">
            <Upload {...props}>
              <Button>
                <Icon type="upload" /> 点击上传现场图片
              </Button>
            </Upload>
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

export default JqdAdd;
