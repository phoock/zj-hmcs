import React from 'react'
import {Table, Icon, Divider, Button, Switch } from 'antd'
const {Column, ColumnGroup} = Table

class Pip extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data : [
            ]
        }
    }
    componentDidMount() {
      this.loadList()
    }
    loadList(){
      this.columns = [{
        title: '管道名称',
        dataIndex: 'name',
        key: 'name',
      }, {
        title: '液位（mm）',
        dataIndex: 'level',
        key: 'level',
      }, {
        title: '流量(m3/s)',
        dataIndex: 'flux',
        key: 'flux',
      }, {
        title: '流速(m/s)',
        dataIndex: 'speed',
        key: 'speed',
      }];
      this.setState({
        dataSource : [
          {
              key: '1',
              name: '三阳路管道',
              level: 32,
              flux: 80,
              speed: 20
          }, {
              key: '2',
              name: '中山大道管道',
              level: 22,
              flux: 40,
              speed: 30
          }, {
              key: '3',
              name: '五棵松管道',
              level: 41,
              flux: 80,
              speed: 21
          }, {
              key: '4',
              name: '黄浦路管道',
              level: 15,
              flux: 60,
              speed: 12
          }
        ]
      })
    }


    render() {
      const TableTitle = ()=>(
        <div className="row">
          <div className="col-md-3">管道控制列表</div>
        </div>
      )
      return (
      <div>
         <Table
         bordered
         title={TableTitle}
         dataSource={this.state.dataSource}
         columns={this.columns}
         />
      </div>
      )
    }
}

export default Pip
