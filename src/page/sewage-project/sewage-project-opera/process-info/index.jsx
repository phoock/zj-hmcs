import React from 'react'
import './index.scss'
import { Card, Button, Input, Table, Divider, Upload, message, Icon } from 'antd';
const { TextArea } = Input;


const dataSource = [
    {
        key: '1',
        num: '001',
        time: '2017-01-02',
        operation: '河口大桥清淤1000米,计划投资100万元',
    },
    {
        key: '2',
        num: '001',
        time: '2017-01-02',
        operation: '河口大桥清淤1000米,计划投资100万元',
    },
    {
        key: '3',
        num: '001',
        time: '2017-01-02',
        operation: '河口大桥清淤1000米,计划投资100万元',
    }
];

const columns = [
    {
        title: '编号',
        dataIndex: 'num',
        key: 'num'
    }, {
        title: '时间',
        dataIndex: 'time',
        key: 'time'
    }, {
        title: '操作内容',
        dataIndex: 'operation',
        key: 'operation'
    }, {
        title: '详情',
        render: (text, record) => {
            return (
            <span>
              <a href="javascript:;">编辑</a>
              <Divider type="vertical" />
              <a href="javascript:;">删除</a>
            </span>
          )
        }
    }
];


class JianliInfo extends React.Component{
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
      },
    };

    return (


      <div className="process-info-wrap">
        <Card title="工程立项" type="inner">
          <div className="row" style={{marginTop:16}}>
            <div className="col-md-2 col-xs-4 labels"><label>工程简介</label></div>
            <div className="col-md-6 col-xs-8"><TextArea rows={4} /></div>

          </div>

          <div className="row" style={{marginTop:16}}>
            <div className="col-md-2 col-xs-4 labels"><label>科研报告</label></div>
            <div className="col-md-2 col-xs-4">
              <Upload {...props}>
                <Button>
                  <Icon type="upload" /> 上传科研报告
                </Button>
              </Upload>
            </div>
          </div>

          <div className="row" style={{marginTop:16}}>
            <div className="col-md-2 col-xs-4 labels"><label>实施方案</label></div>
            <div className="col-md-2 col-xs-4">
              <Upload {...props}>
                <Button>
                  <Icon type="upload" /> 上传实施方案
                </Button>
              </Upload>
            </div>
          </div>

          <div className="row" style={{marginTop:16}}>
            <div className="col-md-2 col-xs-4 labels"><label>施工图纸</label></div>
            <div className="col-md-2 col-xs-4">
              <Upload {...props}>
                <Button>
                  <Icon type="upload" /> 上传施工图纸
                </Button>
              </Upload>
            </div>
          </div>

        </Card>
        <Card title="计划列表" type="inner" style={{marginTop:16}}>
          <div className="row">
            <div className="col-md-12">
              <Table dataSource={dataSource} columns={columns} pagination={{
                position:'bottom',
                defaultCurrent:1,
                total:30              }}/>
            </div>
          </div>
        </Card>
        <div className="row" style={{marginTop:16}}>
          <Button type="primary" style={{marginRight:16,marginLeft:15}}>提交</Button>
          <Button>取消</Button>
        </div>
      </div>
    )
  }
}

export default JianliInfo;
