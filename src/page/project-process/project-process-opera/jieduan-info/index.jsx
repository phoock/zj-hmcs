import React from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

import './index.scss'

import { Card, Button, Input, Table, Modal, message, Upload, Icon } from 'antd';
const Search = Input.Search;

//导入工具函数
import HM from 'util/hmcs.js'
let HMutil = new HM()

//导入文件组件
import ShowFile from 'component/show-file/index.jsx'



@withRouter
class JianliInfo extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      previewVisible : false,
      CurrentPage : 1,
      totalPage : 1,
      PageSize : 5,
      //文件类型
      fileType : 3,
      proId:1,
      proName:'',
      fileNum: 1,
      //table列表数据
      dataSource : [],
      //上传文件数据
      fileList: [],
      //modal层图片数据
      modalImgArr : [],
      uploading: false,
      uploadUrl: '/api/Project/OperateConstucFileUpload',
      hasData : true

    }
  }
  componentDidMount(){
    this.loadData()
  }
  loadData(){
    let proId = this.props.match.params.proNum
    let params = {
      PROJECTID : proId,
      FILETYPE : this.state.fileType,
      CurrentPage : this.state.CurrentPage,
      PageSize : this.state.PageSize,
      PageHtml : "HMCSCONFILEVIDEOPAGE",
      PageList : ""
    }
    axios.post('/api/Project/JsonGetHmcsConstructionFilePage', params)
    .then(res=>{
      if(res.status === 200 && res.data.Data){
        let newDataSource = this.handleDataFormat(res.data.Data)
        this.setState({
          totalPage : res.data.RowCount,
          dataSource : newDataSource,
          hasData : true
        })
      } else {
        this.setState({
          hasData : false
        })
      }
    })
    .catch(error=>{
      console.log(error);
      message.error('error')
    })
  }
  handleDataFormat(dataArr){
    return dataArr.map((v,index)=>{
      let createTime = HMutil.handleTimeFormate(v.FILEDATE)
      let img = HMutil.handleImgUrl(v.FILEURL,v.FILETYPE,this.props.proInfo.proId)
      return {
          key: index + 1,
          fileName: v.FILENAME,
          bumen: v.FILEDEPT,
          admin: v.FILEOP,
          createTime: createTime,
          status: v.ISCHECK === 1?'已审核':'未审核',
          img:img
      }
    })
  }
  showModal(imgArr){
    this.setState({
      previewVisible : true,
      modalImgArr : imgArr
    })
  }
  handleOk(e) {
    this.setState({
      previewVisible: false,
    });
  }
  handleModelCancel (e) {
    this.setState({
      previewVisible: false,
    });
  }
  handleUpload(){
    const { fileList } = this.state;
    const formData = new FormData();
    fileList.forEach((file,index) => {
      formData.append(`file_${index+1}`, file);
    });
    formData.append('PROJECTID',this.props.proInfo.proId)
    formData.append('FILETYPE',this.state.fileType)
    formData.append('PROJECTNAME',this.props.proInfo.proName)
    this.setState({
      uploading: true,
    });
    // 使用axios上传
    axios.post(this.state.uploadUrl,formData)
    .then((res)=>{
      if(res.data.isSuccessful){
        this.setState({
          uploading: false
        },()=>{
          message.success('保存成功')
          this.loadData()
        })
      }else{
        this.setState({
          uploading: false
        })
        message.error('上传失败')
      }
    })
    .catch((err)=>{
      message.error('上传失败')
      this.setState({
        uploading: false
      })
    })
  }
  render(){
    const { uploadUrl, uploading, modalImgArr, previewVisible, hasData } = this.state
    const columns = [
        {
            title: '变更文件名称',
            dataIndex: 'fileName',
            key: 'fileName'
        }, {
            title: '上传部门',
            dataIndex: 'bumen',
            key: 'bumen'
        }, {
            title: '上传人',
            dataIndex: 'admin',
            key: 'admin'
        }, {
            title: '上传时间',
            dataIndex: 'createTime',
            key: 'createTime'
        }, {
            title: '审核状态',
            dataIndex: 'status',
            key: 'status'
        }, {
            title: '详情',
            render: (record) => {
                return (<span key={record.key}>
                    <Button onClick={()=>this.showModal(record.img)}>查看</Button>
                </span>)
            }
        }
    ]

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
    return (
      <div className="jianli-info-wrap">
          <div className="row">
            <div className="col-md-3 col-sm-6">
              <Upload {...props}>
                <Button>
                  <Icon type="upload" /> 请上传准予许可决定书
                </Button>
              </Upload>
            </div>
            <div className="col-md-3 col-sm-6">
              <Button
                type="primary"
                onClick={()=>this.handleUpload()}
                disabled={this.state.fileList.length !== this.state.fileNum}
                loading={uploading}
              >
                {uploading ? '上传中' : '开始上传' }
              </Button>
            </div>
            <div className="col-md-3 col-xs-6">
              <Search
                placeholder="请输入文件名称"
                onSearch={value => console.log(value)}
                enterButton
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
            {
              hasData
              ?
              <Table
                loading = {this.state.dataSource.length>0?false:true}
                dataSource={this.state.dataSource}
                columns={columns}
                pagination={{
                  position:'bottom',
                  pageSize:this.state.PageSize,
                  defaultCurrent:1,
                  current:this.state.CurrentPage,
                  total:this.state.totalPage,
                  onChange:(current,size)=>{
                    this.setState({
                        CurrentPage: current,
                        PageSize: size
                    }
                    ,()=>{
                      this.loadData()
                    })
                }
              }}/>
              :
              null
            }

            </div>
          </div>

          <Modal width={'55%'} visible={previewVisible} footer={null} onCancel={()=>this.handleModelCancel()}>
          {
            modalImgArr.length>0?
            (
              <div>
              {

                modalImgArr.map((v, index)=>{
                  return (<div key={index}>
                    {
                      v?<ShowFile url={v}></ShowFile>:<div>暂无数据</div>
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

export default JianliInfo;
