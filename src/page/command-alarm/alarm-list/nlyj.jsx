import React from 'react'
import { Alert, Button, Card, Table, Modal, Spin, Upload, message, Icon  } from 'antd'

//导入组件
import WarningPublic from './nlyj/warning-public.jsx'

class Nlyj extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      preWarningCon : '2018-5-6预计未来3小时内有100mm降雨【橙色预警】',
      columnsWarn : [
          {
              title: '预警时间',
              dataIndex: 'time',
              key: 'time'
          }, {
              title: '预警内容',
              dataIndex: 'content',
              key: 'content'
          }, {
              title: '预警等级',
              dataIndex: 'level',
              key: 'level'
          }, {
              title: '预警状态',
              dataIndex: 'status',
              key: 'status'
          }, {
              title: '操作',
              render: (text, record) => {
                  return (<span>
                      <Button record={record.id} onClick={(e)=>this.endingWaring(e)}>结束预警</Button>
                  </span>)
              }
          }
      ],
      columnsPlan : [
          {
              title: '预案列表',
              dataIndex: 'name',
              key: 'name'
          }, {
              title: '上传时间',
              dataIndex: 'time',
              key: 'time'
          }, {
              title: '操作',
              render: (text, record) => {
                  return (<span>
                      <Button record={record.key} onClick={(e)=>this.showPlan(e)}>查看</Button>
                      <Button hedao-id={record.id} style={{marginLeft:8}} onClick={(e)=>this.downloadPlan(e)}>下载</Button>
                      <Button hedao-id={record.id} style={{marginLeft:8}} onClick={(e)=>this.deletePlan(e)}>删除</Button>
                  </span>)
              }
          }
      ],
      warningSource : [],
      planingSource : [],
      publicVisible : false
    }
  }

  componentDidMount() {
    this.loadList()
  }

  //拿到列表数据
  loadList(){
    var timer = setTimeout(()=>{
      this.setState({
        warningSource : [
            {
                key: '1',
                id: '001',
                time: '2018-5-6',
                content: '预计未来3小时内有100mm降雨',
                level:'橙色预警',
                status: '未结束'
            },
            {
                key: '2',
                id: '002',
                time: '2018-5-1',
                content: '预计未来3小时内有200mm降雨',
                level:'红色预警',
                status: '已结束'
            },
            {
                key: '3',
                id: '003',
                time: '2018-4-26',
                content: '预计未来1小时内有80mm降雨',
                level:'黄色预警',
                status: '已结束'
            },
            {
                key: '4',
                id: '004',
                time: '2018-4-16',
                content: '预计未来3小时内有100mm降雨',
                level:'橙色预警',
                status: '已结束'
            },
            {
                key: '5',
                id: '005',
                time: '2018-3-22',
                content: '预计未来6小时内有200mm降雨',
                level:'橙色预警',
                status: '已结束'
            }
        ],
        planingSource: [
          {
              key: '1',
              name: '强降雨预案',
              time: '2018-5-6'
          },
          {
              key: '2',
              name: '城市内涝预案',
              time: '2018-5-6'
          }
        ]
      })
    },400)
    this.timer = timer
  }
  //清除计时器
  componentWillUnmount(){
    clearTimeout(this.timer)
  }
  /*
  bindEvet
  */
  //发布新预警和确认取消按钮
  publicNewWarning(e){
    this.setState({
      publicVisible : true
    })
  }
  handlePublicOk(e){
    this.refs.WarningPublic.submit()
  }
  handlePublicCancel(e){
    //关闭窗口以后重置内容
    this.setState({
      publicVisible : false
    },()=>{
      this.loadList()
      this.refs.WarningPublic.reload()
    })
  }

  //结束预警按钮
  endingWaring(e){
    //调用接口
    let id = e.target.getAttribute('record')
    // console.log(id);
    this.loadList()
  }

  //查看预案
  showPlan(){

  }

  //下载预案
  downloadPlan(){

  }

  //删除预案
  deletePlan(){

  }

  render(){
    const propsUpload = {
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
      },
    };
    return (
     <div>
      <div className="row">
        <div className="col-md-6">
          <Alert message={this.state.preWarningCon} type="error"></Alert>
        </div>
        <div className="col-md-4" style={{lineHeight:'40px'}}>
          <Button type="primary" onClick={(e)=>this.publicNewWarning(e)}><i className="fa fa-plus"></i>发布新预警</Button>
          <Upload {...propsUpload} style={{marginLeft : 8}}>
            <Button>
              <Icon type="upload" /> 上传防汛预案
            </Button>
          </Upload>
        </div>
      </div>
      <div className="row" style={{marginTop : '16px'}}>
        <Card title="预警列表">
        {
          this.state.warningSource.length > 0
          ? <Table dataSource={this.state.warningSource} columns={this.state.columnsWarn} pagination={{
             position:'bottom',
             defaultCurrent:1,
             total:30              }}/>
          : <div style={{textAlign:'center',padding:'10px'}}><Spin /></div>
        }
        </Card>
      </div>
      <div className="row">
        <Card title="预案列表">
        {
          this.state.planingSource.length > 0
          ? <Table dataSource={this.state.planingSource} columns={this.state.columnsPlan} pagination={{
             position:'bottom',
             defaultCurrent:1,
             total:30              }}/>
          : <div style={{textAlign:'center',padding:'10px'}}><Spin /></div>
        }
        </Card>
      </div>
      <Modal
        title="发布新的预警信息"
        visible={this.state.publicVisible}
        onOk={(e)=>this.handlePublicOk(e)}
        onCancel={(e)=>this.handlePublicCancel(e)}
        okText="确定"
        cancelText="取消"
        width="65%"
      >
        <div><WarningPublic ref='WarningPublic' id={this.state.id} canClosedModal = {()=>this.handlePublicCancel()}></WarningPublic></div>
      </Modal>
     </div>
    )
  }
}

export default Nlyj;
