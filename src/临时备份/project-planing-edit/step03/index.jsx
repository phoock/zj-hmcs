import React from 'react'
import { Card, Icon, Button, Radio, Input, Table } from 'antd';
const RadioGroup = Radio.Group;
const { TextArea } = Input;


const dataSource = [
    {
        key: '1',
        fileNum: '20172020',
        fileName: '项目设计方案',
        ext: 'pdf',
        createTime: '2018-05-01',
        editor: '王小虎'
    }, {
        key: '2',
        fileNum: '20172020',
        fileName: '项目设计方案',
        ext: 'pdf',
        createTime: '2018-05-01',
        editor: '王小虎'
    }, {
        key: '3',
        fileNum: '20172020',
        fileName: '项目设计方案',
        ext: 'pdf',
        createTime: '2018-05-01',
        editor: '王小虎'
    }
];

const columns = [
    {
        title: '文件编号',
        dataIndex: 'fileNum',
        key: 'fileNum'
    }, {
        title: '文件名称',
        dataIndex: 'fileName',
        key: 'fileName'
    }, {
        title: '文件类型',
        dataIndex: 'ext',
        key: 'ext'
    }, {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime'
    }, {
        title: '操作人',
        dataIndex: 'editor',
        key: 'editor'
    }, {
        title: '详情',
        render: (text, record) => {
            return (<span>
                <a href="javascript:;">查看</a>
            </span>)
        }
    }
];


class Step03 extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      value: 1
    }
  }
  onChange(e){
    this.setState({
      value: e.target.value
    })
  }
  render(){
    return (
      <div className="step01-wrap">
        <Card title="设计方案审核">
          <Card
            type="inner"
            title="申报材料列表"
            extra={<a href="javascript:;"><Icon type="reload" /></a>}
          >
            <Table dataSource={dataSource} columns={columns} pagination={{
              position:'bottom',
              defaultCurrent:6,
              total:500
            }}/>
          </Card>
          <Card
            style={{ marginTop: 16 }}
            type="inner"
            title="审核"
          >
            <div className="row">
              <h5>是否通过</h5>
                <RadioGroup onChange={e=>this.onChange(e)} value={this.state.value}>
                  <Radio value={1}>未通过</Radio>
                  <Radio value={2}>审核通过</Radio>
                </RadioGroup>
            </div>
            <div className="row" style={{marginTop : 16}}>
              <h5>审核意见</h5>
              <TextArea rows={6} placeholder={`请在此区域输入备注内容`} />
            </div>
            <div className="row" style={{marginTop : 16}}>
              <Button style={{marginRight : 16}}>提交</Button>
              <Button>取消</Button>
            </div>
          </Card>
        </Card>
      </div>
    )
  }
}

export default Step03
