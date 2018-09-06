import React from 'react'
import { Card, Table, Upload, message, Button, Icon, Input, Modal, Radio} from 'antd'
const RadioGroup = Radio.Group
import axios from 'axios'
const Dragger = Upload.Dragger
const { TextArea } = Input

//导入工具函数
import HM from 'util/hmcs.js'
let HMutil = new HM()




class HuaStep03 extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      dataSource : [
      ],
      showUpload : this.props.nowStep>this.props.successStep,
      previewVisible : false,
      modalImgArr : [],
      iFrameHeight: '0px',
      fileNum: 2,
      fileList: [],
      uploading: false,
      uploadUrl: '/api/Project/OperateFileListUpload',
      PageHtml:'',
      FILEMEMOS:'',
      radioValue: 1
    }
  }
  componentDidMount(){

    this.propsNum = 0
    this.columns = [
        {
            title: '文件名称',
            dataIndex: 'fileName',
            render: text => <a href="javascript:;">{text}</a>
        }, {
            title: '上传人',
            dataIndex: 'operaPerson'
        }, {
            title: '上传部门',
            dataIndex: 'department'
        }, {
            title: '上传时间',
            dataIndex: 'time'
        }, {
            title: "查看",
            render: (record) => {
              return (
                <span>
                  <a onClick={()=>this.showModel(record.img)}>查看</a>
                  </span>
                 )
            }
        }
    ]
    // 处理params
    let params = {
        PROJECTID: this.props.proId,
        STEPNUM: this.props.data.STEPNUM,
        PageHtml: "HMCSPROJECTSTEPFILE"
    }
    axios.post('/api/Project/JsonGetStepFileList',params)
    .then((res)=>{
      if(res.status===200 && res.data.Data.length){
        let data = res.data.Data
        let dataArr = data.map((v,index)=>{
          return {
            key:index,
            fileName:v.FILENAME,
            operaPerson:v.FILEMAN||'管理员',
            department:v.FILEDEPT||'指挥部',
            time:HMutil.handleTimeFormate(v.FILEDATE),
            img:HMutil.handleImgUrl(v.FILEURL,v.MODULEID,this.props.proId)
          }
        })
        //设置state
        this.setState({
          dataSource: dataArr
        })
      }
    })
  }
  showModel(imgArr){
    this.setState({
      previewVisible : true,
      modalImgArr : imgArr
    })
  }
  handleModelCancel(){
    this.setState({
      previewVisible : false
    })
  }
  handleUpload(){
    const { fileList } = this.state;
    const formData = new FormData();
    fileList.forEach((file,index) => {
      formData.append(`file_${index+1}`, file);
    });

    formData.append('PROJECTID',this.props.proId)
    formData.append('STEPNUM',this.props.data.STEPNUM)
    formData.append('MODULEID',this.props.moduleId)
    formData.append('PageCount',1)
    formData.append('PageHtml',this.state.PageHtml)
    formData.append('FILEMEMOS',this.state.FILEMEMOS)
    this.setState({
      uploading: true,
    });
    //使用axios上传
    axios.post(this.state.uploadUrl,formData)
    .then((res)=>{
      this.setState({
        uploading: false
      })
      if(res.data.isSuccessful){
        return Promise.resolve()
      }
      else if(!res.data.isSuccessful) {
        return Promise.reject('上传失败')
      }
    })
    .then(()=>{
      let params = {
        NOWSTEP: this.props.data.STEPNUM,
        STEPTTYPE: this.props.data.FLOWTYPE,
        PROJECTNAME: this.props.projectName,
        MODULEID: this.props.moduleId,
        PROJECTID: this.props.proId,
        PageHtml: this.state.PageHtml,
        ISOVER: this.props.data.STEPNUM%10 === this.props.successStep?1:0,
        PageList:'next'
      }
      return axios.post('/api/Project/JsonNxtProjectInfo',params)
    })
    .then(res=>{
      if(res.status===200){
        message.success('全部流程已走完')
      }
      this.props.history.push('/project-design/map')
    })
    .catch((err)=>{
      //处理错误情况
      console.log('err');
      message.error('err')
      this.setState({
        uploading: false
      })
    })
  }

  handleTextArea(e){
    let value = e.target.value
    this.setState({
      PageHtml: value,
      FILEMEMOS: value
    })
  }

  onRadioChange(e){
    let fileNum = e.target.value===1?2:1
    this.setState({
      radioValue: e.target.value,
      fileNum:fileNum,
      fileList:[]
    })
  }

  //判断button是否可用
  buttonDisabled(num){
    let { fileList } = this.state
    let result = true
    for(let k = 0; k < num ; k++){
      if(fileList[k]){
        result = false
      } else {
        return true
      }
    }
    return result
  }

  render(){
    const { previewVisible, modalImgArr, uploading, fileNum, uploadUrl, fileList } = this.state
    const propsFun = (proNum)=>{
      return {
        action: uploadUrl,
        headers: {
          authorization: 'authorization-text',
        },
        beforeUpload:function(file,filtTotal){
          return false
        }.bind(this),
        onChange:function(info){
          console.log(info);
          //info.file为当前上传文件,info.fileList为显示的文件数组(需要处理掉)
          //处理fileList数组
          if(info.fileList.length>1){
            info.fileList.pop()
          }

          let fileNewList = [...this.state.fileList]
          fileNewList[proNum] = info.file

          this.setState({
            fileList : fileNewList
          })

        }.bind(this),
        onRemove:function(file){
          return false
        }.bind(this)
      }
    }
    const props = {
      name: 'file',
      action: uploadUrl,
      headers: {
        authorization: 'authorization-text',
      },
      beforeUpload:function(file,filtTotal){
        return false
      }.bind(this),
      onChange:function(info){
        //如果info.fileList.length>1 则pop()掉一个,并
        let fileArr = this.state.fileList
        if(info.fileList.length>1){
          //删掉一个
          info.fileList = info.fileList.pop()
          //同时在state里删掉最后一个
          let fileState = this.state.fileList
          fileState.pop()
          this.setState({
            fileList : fileState
          },()=>{
            //删除掉最后一个后添加一个新的file
            this.setState(({fileList})=>({
              fileList : [...fileList,info.file]
            }))
          })
        } else {
          //如果是第一次添加数据
          this.setState(({fileList})=>({
            fileList : [...fileList,info.file]
          }))
        }
      }.bind(this),
      onRemove:function(file){
        return false
      }.bind(this)
    }

    //判断upload情况下显示的内容
    const uploadInfo = (this.props.nowStep-this.props.successStep)===1?(<Card title="上传设计方案" style={{ marginTop: 16 }}>

      <div className="row" style={{ marginTop: 16 }}>
        <div className="col-md-8 col-sm-12">
          <RadioGroup onChange={(e)=>this.onRadioChange(e)} value={this.state.radioValue}>
            <Radio value={1}>通过</Radio>
            <Radio value={2}>不通过</Radio>
          </RadioGroup>
        </div>
      </div>
      {
        this.state.radioValue === 1
        ?
        (
          <div>
            <div className="row" style={{ marginTop: 16 }}>
              <div className="col-md-8 col-sm-12">
                <Upload {...propsFun('0')}>
                  <Button>
                    <Icon type="upload" /> 请上传准予许可决定书
                  </Button>
                </Upload>
              </div>
            </div>
            <div className="row" style={{ marginTop: 16 }}>
              <div className="col-md-8 col-sm-12">
                <Upload {...propsFun('1')}>
                  <Button>
                    <Icon type="upload" /> 请上传核发建设工程规划许可证
                  </Button>
                </Upload>
              </div>
            </div>
          </div>
        )
        :
        (
          <div className="row" style={{ marginTop: 16 }}>
            <div className="col-md-8 col-sm-12">
              <Upload {...propsFun('0')}>
                <Button>
                  <Icon type="upload" /> 请上传不予许可决定书
                </Button>
              </Upload>
            </div>
          </div>
        )
      }

      <div className="row" style={{ marginTop: 16 }}>
        <div className="col-md-8 col-sm-12">
          <TextArea onChange={(v)=>this.handleTextArea(v)} rows={6} placeholder={`请在此区域输入备注内容`} />
          <Button
            style={{ marginTop: 16 }}
            type="primary"
            onClick={()=>this.handleUpload()}
            disabled={this.buttonDisabled(this.state.fileNum)}
            loading={uploading}
          >
            {uploading ? '上传中' : '开始上传' }
          </Button>
        </div>
      </div>
    </Card>):(<div>请先完成第{this.props.successStep+1}步以后刷新页面</div>)

    return (
      <div className={"step02-wrap"}>
        {
          !this.state.showUpload?
          (<Card title={this.props.data.STEPNAME}>
            <Table
              loading = {this.state.dataSource.length>0?false:true}
              dataSource={this.state.dataSource}
              columns={this.columns}
            />
          </Card>)
          :null
        }

        {
          this.state.showUpload?

          uploadInfo

          :null
        }

        <Modal width={'55%'} visible={previewVisible} footer={null} onCancel={()=>this.handleModelCancel()}>
          {
            modalImgArr.length>0?
            (
              <div>
              {

                modalImgArr.map((v, index)=>{
                  return (<div key={index}>
                    {
                      v?<embed width={`100%`} style={{minHeight:'780px'}} src={v} />:<div>暂无数据</div>
                    }

                    </div>)
                })
              }
              </div>
            )
            :<div>暂无数据</div>
          }
        </Modal>
      </div>
    )
  }
}

export default HuaStep03
