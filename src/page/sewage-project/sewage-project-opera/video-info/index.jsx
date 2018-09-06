import React from 'react'
import './index.scss'
import { Card, Button, Table} from 'antd';

const dataSource = [

    {
        key: '1',
        num: '001',
        video: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1527178856066&di=8f7d4d913a1b4ab610bb82feda95b6a7&imgtype=0&src=http%3A%2F%2Fimage.tupian114.com%2F20150313%2F03570154.jpg.thumb.jpg',
        time: '2017-1-1',
        admin: 'admin'
    },
    {
        key: '2',
        num: '002',
        video: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1527178856066&di=8f7d4d913a1b4ab610bb82feda95b6a7&imgtype=0&src=http%3A%2F%2Fimage.tupian114.com%2F20150313%2F03570154.jpg.thumb.jpg',
        time: '2017-1-3',
        admin: 'admin'
    },
    {
        key: '3',
        num: '003',
        video: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1527178856066&di=8f7d4d913a1b4ab610bb82feda95b6a7&imgtype=0&src=http%3A%2F%2Fimage.tupian114.com%2F20150313%2F03570154.jpg.thumb.jpg',
        time: '2017-1-2',
        admin: 'admin'
    },
];

const columns = [
    {
        title: '编号',
        dataIndex: 'num',
        key: 'num'
    }, {
        title: '影像资料',
        dataIndex: 'video',
        key: 'video',
        render: (text, record) => {
          return (
            <img src={record.video} width="60px" alt=""/>
          )
        }
    }, {
        title: '创建时间',
        dataIndex: 'time',
        key: 'time',

    }, {
        title: '上传人',
        dataIndex: 'admin',
        key: 'admin',

    }, {
        title: '操作',
        render: (text, record) => {
            return (
            <span>
              <a href="javascript:;">删除</a>
            </span>
          )
        }
    }
];


class VideoInfo extends React.Component{
  render(){


    return (


      <div className="vidio-info-wrap">
        <Card title="计划列表" type="inner" style={{marginTop:16}}>
          <div className="row">
            <div className="col-md-3 col-xs-6" style={{marginTop:16,marginBottom:16}}>
              <Button>上传新的影像     <i className="fa fa-plus"></i></Button>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Table dataSource={dataSource} columns={columns} pagination={{
                position:'bottom',
                defaultCurrent:1,
                total:30              }}/>
            </div>
          </div>
        </Card>
      </div>
    )
  }
}

export default VideoInfo;
