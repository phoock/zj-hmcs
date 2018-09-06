import React from 'react';
import {Button, Card, Upload, Icon, message, Input} from 'antd';
const Dragger = Upload.Dragger;
const { TextArea } = Input;


//静态图片数据
const fileList = [{
  uid: -1,
  name: 'xxx.png',
  status: 'done',
  url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
}, {
  uid: -2,
  name: 'yyy.png',
  status: 'done',
  url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
}];

//上传设置
const props = {
  name: 'file',
  multiple: true,
  action: '//xxxxxxx.xxxx.do',
  listType: 'picture',
  defaultFileList: [...fileList],
  onChange(info) {
    const status = info.file.status;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} 文件上传成功.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} 文件上传失败.`);
    }
  },
};


class Step01 extends React.Component{
  render(){
    return (
      <div className="step01-wrap">
        <Card title="上传设计方案">
        <div className="row">
          <div className="col-md-4 col-sm-12">
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">上传设计方案</p>
              <p className="ant-upload-hint">点击此区域上传文件,或将文件拖拽至此区域</p>
            </Dragger>
          </div>
          <div className="col-md-4 col-sm-12">
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">上传设计<b>补充</b>方案</p>
              <p className="ant-upload-hint">点击此区域上传文件,或将文件拖拽至此区域</p>
            </Dragger>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8 col-sm-12">
          <Card  style={{ marginTop: 16 }} type="inner" title="备注说明">
            <TextArea rows={6} placeholder={`请在此区域输入备注内容`} />
            <Button type="primary" style={{ marginTop: 16}}>提交</Button>
          </Card>
          </div>

        </div>
        </Card>
      </div>
    )
  }
}

export default Step01
