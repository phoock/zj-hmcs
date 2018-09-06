import React from 'react'
import './index.scss'
import { Card, Button, Table} from 'antd';

const dataSource = [

    {
        key: '1',
        num: '001',
        name: '河口大桥小河口',
        time: '2017-1-1',
        position: '经纬度(121.135;42,109)',
        admin: 'admin'
    },
    {
        key: '2',
        num: '001',
        name: '河口大桥大丰河道',
        time: '2017-1-2',
        position: '经纬度(121.135;42,109)',
        admin: 'admin'
    },
];

const columns = [
    {
        title: '编号',
        dataIndex: 'num',
        key: 'num'
    }, {
        title: '河道名称',
        dataIndex: 'name',
        key: 'name',
    }, {
        title: '时间',
        dataIndex: 'time',
        key: 'time',

    }, {
        title: '坐标',
        dataIndex: 'position',
        key: 'position',

    }, {
        title: '上传人',
        dataIndex: 'admin',
        key: 'admin',

    },{
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


class Position extends React.Component{
  render(){


    return (


      <div className="vidio-info-wrap">
        <Card title="计划列表" type="inner" style={{marginTop:16}}>
          <div className="row">
            <div className="col-md-3 col-xs-6" style={{marginTop:16,marginBottom:16}}>
              <Button>添加新的坐标     <i className="fa fa-plus"></i></Button>
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

export default Position;
