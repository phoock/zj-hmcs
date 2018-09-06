import React from 'react'
import { Card, Button, Input, Table, Modal, Spin  } from 'antd';
const Search = Input.Search;

//导入组件
import JqdEdit from './nljq-jqd-edit.jsx'
import JqdAdd from './nljq-jqd-add.jsx'

class NljqJqd extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      historyVisible : false,
      editVisible: false,
      addVisible: false,
      columns : [
          {
              title: '报警时间 ',
              dataIndex: 'time',
              key: 'time'
          }, {
              title: '位置',
              dataIndex: 'position',
              key: 'position'
          }, {
              title: '警情描述',
              dataIndex: 'desc',
              key: 'desc'
          }, {
              title: '操作',
              render: (text, record) => {
                  return (<span>
                      <Button baojing-id={record.baojingId} style={{marginLeft:8}} onClick={(e)=>this.showEdit(e)}>详情</Button>
                  </span>)
              }
          }
      ],
      dataSource:[],
      baojingId:'',
      id:'',
      editVal : null
    }
  }

  //请求列表数据
  componentDidMount(){
    this.loadList()
  }
  loadList(){
    var timer = setTimeout(()=>{
      this.setState({
        dataSource : [
            {
                key: '1',
                time: '2018-5-28',
                position: '胜利街六合路223号',
                desc : 'XX小区门口有大面积积水',
                baojingId:'001001'
            },
            {
                key: '2',
                time: '2018-5-24',
                position: '黄陂区澳门路18号',
                desc : '路面积水严重,阻塞交通',
                baojingId:'001002'
            },
            {
                key: '3',
                time: '2018-5-18',
                position: '镇江英培中学后面',
                desc : '积水较深',
                baojingId:'001003'
            },
            {
                key: '4',
                time: '2018-5-18',
                position: '镇江市政府旁的广发银行大厦门口',
                desc : '大面积积水',
                baojingId:'001004'
            },
            {
                key: '5',
                time: '2018-5-15',
                position: 'CBD楚世家',
                desc : '道路两旁积水,阻塞交通',
                baojingId:'001005'
            }
        ]
      })
    },400)
    this.timer = timer
  }
  //清除计时器
  componentWillUnmount(){
    clearTimeout(this.timer)
  }

  //编辑按钮
  showEdit(e){
    this.setState({
      editVisible: true,
    });
    let id = e.target.getAttribute('baojing-id')

    this.setState({
      baojingId:id
    })
  }
  handleEditOk(e) {
    this.getEditVal(()=>{
      this.setState({
        editVisible: false,
      },()=>{
        //离开以后将修改的项目重置成初始状态
        this.refs.JqdEdit.loadList()
      })
    })
  }
  handleEditCancel (e) {
    this.refs.JqdEdit.clearData()
    this.refs.JqdEdit.loadList()
    this.setState({
      editVisible: false,
    });
  }
  getEditVal(callback){
    let info = this.refs.JqdEdit.getAllVal()
    this.setState({
      editVal : info
    },()=>{
      callback()
    })
  }

  //添加水位信息按钮
  showAdd(e){
    this.setState({
      addVisible: true,
    });
  }
  handleAddOk(){
    let info = this.refs.JqdAdd.getAllVal()
    //验证info的合法性,调用接口,关闭modal层,弹出成功提醒
    this.setState({
      addVisible: false,
    });
  }
  handleAddCancel(){
    this.setState({
      addVisible: false,
    });
  }

  //刷新水位
  refreshList(e){
    //清空计时器
    clearTimeout(this.timer)
    //清空原始列表,再加载新信息
    this.setState({
      dataSource : []
    },()=>{
      this.loadList()
    })

  }

  render(){
    return (
      <div className="jianli-info-wrap">
          <div className="row">
            <div className="col-md-12 col-xs-12">
              <Button type="primary" onClick={(e)=>this.showAdd(e)}>添加报警信息  <i className="fa fa-plus"></i></Button>
              <Button style={{float:'right'}} onClick={(e)=>this.refreshList(e)}>刷新报警信息  <i className="fa fa-refresh"></i></Button>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
            <Card title="报警信息列表" style={{marginTop:16}}>
              {
                this.state.dataSource.length > 0
                ? <Table dataSource={this.state.dataSource} columns={this.state.columns} pagination={{
                   position:'bottom',
                   defaultCurrent:1,
                   total:30              }}/>
                : <div style={{textAlign:'center',padding:'10px'}}><Spin /></div>
              }

            </Card>

            </div>
          </div>
          <Modal
            title="报警信息详情"
            visible={this.state.editVisible}
            onOk={(e)=>this.handleEditOk(e)}
            onCancel={(e)=>this.handleEditCancel(e)}
            okText="确定"
            cancelText="取消"
            width="65%"
          >
            <div><JqdEdit ref='JqdEdit' id={this.state.baojingId}></JqdEdit></div>
          </Modal>
          <Modal
            title="添加新的报警信息"
            visible={this.state.addVisible}
            onOk={(e)=>this.handleAddOk(e)}
            onCancel={(e)=>this.handleAddCancel(e)}
            okText="确定"
            cancelText="取消"
            width="65%"
          >
            <div><JqdAdd ref='JqdAdd'></JqdAdd></div>
          </Modal>
      </div>
    )
  }
}

export default NljqJqd;
