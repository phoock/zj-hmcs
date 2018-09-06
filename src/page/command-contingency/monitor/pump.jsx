import React from 'react'
import {Table, Icon, Divider, Button, Switch } from 'antd'
const {Column, ColumnGroup} = Table

class Pump extends React.Component {
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
      this.setState({
        data : [
          {
            key: 1,
            name: '镇江芳草路泵站1',
            id: '1234',
            pumpone: false,
            pumptwo: true,
            pumpthree: true,
            pumpfour: true,
            pumpfive: false,
            pumpsix: true
          },
          {
            key: 2,
            name: '镇江南宁街泵站2',
            id: '1235',
            pumpone: false,
            pumptwo: true,
            pumpthree: false,
            pumpfour: true,
            pumpfive: false,
            pumpsix: true,
            ceshi:function(){console.log(123);}
          },
          {
            key: 3,
            name: '镇江南宁街泵站3',
            id: '1236',
            pumpone: true,
            pumptwo: true,
            pumpthree: true,
            pumpfour: true,
            pumpfive: false,
            pumpsix: true,
            ceshi:function(){console.log(123);}
          }
        ]
      })
    }
    //更改开关状态
    onChange(e){
      // let eleName = e.target.nodeName.toLowerCase()
      // if(eleName === 'div') {return}
      let self = null

      //点击的三种情况,点击文字,点击按钮,点击空白div,修复 
      if(e.target.getAttribute('theid')){
        self = e.target
      }
      if($(e.target).parent()[0].getAttribute('theid')) {
        self = $(e.target).parent()[0]
      }
      if( e.target.nodeName.toLowerCase() === 'div') {
        return
      }
      let theid = self.getAttribute('theid'),
          names = self.getAttribute('name');
      let index = 0;
      for(let i=0,length=this.state.data.length;i<length;i++){
        if(this.state.data[i].id === theid) {
          index = i
        }
      }
      let data = this.state.data;
      data[index][names] = !data[index][names]
      this.setState({
        data
      })
    }

    //重置按钮
    resetPump(e){
      this.loadList()
    }

    //提交按钮
    submit(e){
      let self = e.target,
          theid = self.getAttribute('theid'),
          index = 0;

      //找到数组的index
      for(let i=0,length=this.state.data.length;i<length;i++){
        if(this.state.data[i].id === theid) {
          index = i
        }
      }

      //取数组index项的值
      console.log({
        pumpone: this.state.data[index].pumpone,
        pumptwo: this.state.data[index].pumptwo,
        pumpthree: this.state.data[index].pumpthree,
        pumpfour: this.state.data[index].pumpfour,
        pumpfive: this.state.data[index].pumpfive,
        pumpsix: this.state.data[index].pumpsix,
      });

    }

    render() {
        const TableTitle = ()=>(
          <div className="row">
            <div className="col-md-3">水泵控制列表</div>
            <div className="col-md-9 text-right">
              <Button onClick={(e)=>this.resetPump(e)}>重置</Button>
            </div>
          </div>
        )
        return (<div>
            <Table bordered title={TableTitle} dataSource={this.state.data}>

                <Column title="泵站名称" dataIndex="name" key="name"/>
                <ColumnGroup title="运行状态">
                    <Column title="1号泵站" key="pumpone" render={
                      (text, record) => {
                        return (
                          <span>
                            <div onClick={(e)=>this.onChange(e)}>
                              <Switch checkedChildren="开" unCheckedChildren="关" checked={record.pumpone} name='pumpone' theid={record.id} />
                            </div>
                          </span>
                        )
                      }
                    }/>
                    <Column title="2号泵站" key="pumptwo" render={
                      (text, record) => {
                        return (
                          <span>
                            <div onClick={(e)=>this.onChange(e)}>
                              <Switch checkedChildren="开" unCheckedChildren="关" checked={record.pumptwo} name='pumptwo' theid={record.id} />
                            </div>
                          </span>
                        )
                      }
                    }/>
                    <Column title="3号泵站" key="pumpthree" render={
                      (text, record) => {
                        return (
                          <span>
                            <div onClick={(e)=>this.onChange(e)}>
                              <Switch checkedChildren="开" unCheckedChildren="关" checked={record.pumpthree} name='pumpthree' theid={record.id} />
                            </div>
                          </span>
                        )
                      }
                    }/>
                    <Column title="4号泵站" key="pumfour" render={
                      (text, record) => {
                        return (
                          <span>
                            <div onClick={(e)=>this.onChange(e)}>
                              <Switch checkedChildren="开" unCheckedChildren="关" checked={record.pumpfour} name='pumpfour' theid={record.id} />
                            </div>
                          </span>
                        )
                      }
                    }/>
                    <Column title="5号泵站" key="pumfive" render={
                      (text, record) => {
                        return (
                          <span>
                            <div onClick={(e)=>this.onChange(e)}>
                              <Switch checkedChildren="开" unCheckedChildren="关" checked={record.pumpfive} name='pumpfive' theid={record.id} />
                            </div>
                          </span>
                        )
                      }
                    }/>
                    <Column title="6号泵站" key="pumsix" render={
                      (text, record) => {
                        return (
                          <span>
                            <div onClick={(e)=>this.onChange(e)}>
                              <Switch checkedChildren="开" unCheckedChildren="关" checked={record.pumpsix} name='pumpsix' theid={record.id} />
                            </div>
                          </span>
                        )
                      }
                    }/>
                </ColumnGroup>
                <Column title="操作" key="opera" render={
                  (text, record) => (
                    <span>
                        <Button theid={record.id} onClick={(e)=>this.submit(e)}>状态提交</Button>
                    </span>
                  )
                }/>
            </Table>
        </div>)
    }
}

export default Pump
