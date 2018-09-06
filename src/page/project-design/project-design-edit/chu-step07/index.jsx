import React from 'react'
import { Card, Table, Upload, message, Button, Icon, Input} from 'antd'
import axios from 'axios'
const Dragger = Upload.Dragger
const { TextArea } = Input


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
      message.success(`${info.file.name} 上传成功`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 上传失败.`);
    }
  },
};

class HuaStep02 extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      dataSource : [
      ],
      showUpload : this.props.nowStep>=this.props.successStep
    }
  }
  componentDidMount(){

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
    //处理params
    // axios.post('url',params)
    // .then(res={
    //   if(res.state===200&res.state.data.Data){
    //
    //   }
    // })


    this.setState({
      dataSource:[{
        key:1001,
        fileName:'xxx文件名',
        operaPerson:'小吴',
        department:'美术组',
        time:'2018/5/1',
        img:'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
      }]
    })
  }
  render(){
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
          (
            <Card title="上传设计方案" style={{ marginTop: 16 }}>
              <div className="row" style={{ marginTop: 16 }}>
                <div className="col-md-8 col-sm-12">
                  <Upload {...props}>
                    <Button>
                      <Icon type="upload" /> 请上传选址意见书申请
                    </Button>
                  </Upload>
                </div>
              </div>
              <div className="row" style={{ marginTop: 16 }}>
                <div className="col-md-8 col-sm-12">
                  <Upload {...props}>
                    <Button>
                      <Icon type="upload" /> 请上传项目建议书批复
                    </Button>
                  </Upload>
                </div>
              </div>
              <div className="row" style={{ marginTop: 16 }}>
                <div className="col-md-8 col-sm-12">
                  <Upload {...props}>
                    <Button>
                      <Icon type="upload" /> 请上传选址用地位置的现势地形图
                    </Button>
                  </Upload>
                </div>
              </div>
              <div className="row" style={{ marginTop: 16 }}>
                <div className="col-md-8 col-sm-12">
                  <Upload {...props}>
                    <Button>
                      <Icon type="upload" /> 请上传选址论证报告及批复文件
                    </Button>
                  </Upload>
                </div>
              </div>

              <div className="row" style={{ marginTop: 16 }}>

                <div className="col-md-8 col-sm-12">
                  <TextArea rows={6} placeholder={`请在此区域输入备注内容`} />
                  <Button type="primary" style={{ marginTop: 16}}>提交</Button>
                </div>
              </div>
            </Card>
          )
          :null
        }

      </div>
    )
  }
}

export default HuaStep02
