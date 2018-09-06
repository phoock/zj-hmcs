import React from 'react'
import { Card, Button, Input, Table, Modal, Spin  } from 'antd';
const Search = Input.Search;

//导入组件
import HeDaoHis from './swjk-hedao-history.jsx'
import HeDaoEdit from './swjk-hedao-edit.jsx'
import HeDaoAdd from './swjk-hedao-add.jsx'

class SwjkHedao extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      historyVisible : false,
      editVisible: false,
      addVisible: false,
      columns : [
          {
              title: '河道名称',
              dataIndex: 'name',
              key: 'name'
          }, {
              title: '时间',
              dataIndex: 'time',
              key: 'time'
          }, {
              title: '水位(mm)',
              dataIndex: 'ruler',
              key: 'ruler'
          }, {
              title: '操作',
              render: (text, record) => {
                  return (<span>
                      <Button record={record.key} onClick={(e)=>this.showHistory(e)}>查看历史</Button>
                      <Button hedao-id={record.id} style={{marginLeft:8}} onClick={(e)=>this.showEdit(e)}>编辑</Button>
                  </span>)
              }
          }
      ],
      dataSource:[],
      hedaoId:'',
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
                name: '金华江',
                id: '001',
                hedaoId:'001001',
                time: '2018/5/22',
                ruler: '100'
            },
            {
                key: '2',
                name: '新安江',
                id: '002',
                hedaoId:'001001',
                time: '2018/5/12',
                ruler: '150'
            },
            {
                key: '3',
                name: '东苕溪',
                id: '003',
                hedaoId:'001001',
                time: '2018/5/3',
                ruler: '30'
            },
            {
                key: '4',
                name: '甬江',
                id: '004',
                hedaoId:'001001',
                time: '2018/4/12',
                ruler: '80'
            },
            {
                key: '5',
                name: '瓯江',
                id: '005',
                hedaoId:'001001',
                time: '2018/4/14',
                ruler: '180'
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
  //查看历史按钮
  showHistory(e){
    this.setState({
      historyVisible: true,
    });
    let hedaoId = e.target.getAttribute('record')
    this.setState({
      hedaoId:hedaoId
    })
  }
  handleOk(e) {
    this.setState({
      historyVisible: false,
    });
  }
  handleCancel (e) {
    this.setState({
      historyVisible: false,
    });
  }

  //编辑按钮
  showEdit(e){
    this.setState({
      editVisible: true,
    });
    let id = e.target.getAttribute('hedao-id')
    this.setState({
      id:id
    })
  }
  handleEditOk(e) {
    this.getEditVal(()=>{
      this.setState({
        editVisible: false,
      },()=>{
        //离开以后将修改的项目重置成初始状态
        this.refs.HeDaoEdit.loadList()
      })
    })
  }
  handleEditCancel (e) {
    this.getEditVal(()=>{
      //如果被修改过
      if(this.state.editVal.isModify){
        if(window.confirm('输入框已被修改过,确定要离开吗?')){
          this.setState({
            editVisible: false,
          },()=>{
            //离开以后将修改的项目重置成初始状态
            this.refs.HeDaoEdit.loadList()
          });
        }
      } else {
        this.setState({
          editVisible: false,
        });
      }
    })
  }
  getEditVal(callback){
    let info = this.refs.HeDaoEdit.getAllVal()
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
    let info = this.refs.HeDaoAdd.getAllVal()
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
              <Button type="primary" onClick={(e)=>this.showAdd(e)}>添加水位信息  <i className="fa fa-plus"></i></Button>
              <Button style={{float:'right'}} onClick={(e)=>this.refreshList(e)}>刷新水位信息  <i className="fa fa-refresh"></i></Button>

            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
            <Card title="河道水位列表" style={{marginTop:16}}>
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
            title="河道历史信息查看"
            visible={this.state.historyVisible}
            onOk={(e)=>this.handleOk(e)}
            onCancel={(e)=>this.handleCancel(e)}
            okText="确定"
            cancelText="取消"
            width="65%"
          >
            <div><HeDaoHis hedaoId={this.state.hedaoId}></HeDaoHis></div>
          </Modal>
          <Modal
            title="河道信息编辑"
            visible={this.state.editVisible}
            onOk={(e)=>this.handleEditOk(e)}
            onCancel={(e)=>this.handleEditCancel(e)}
            okText="确定"
            cancelText="取消"
            width="65%"
          >
            <div><HeDaoEdit ref='HeDaoEdit' id={this.state.id}></HeDaoEdit></div>
          </Modal>
          <Modal
            title="添加河道信息"
            visible={this.state.addVisible}
            onOk={(e)=>this.handleAddOk(e)}
            onCancel={(e)=>this.handleAddCancel(e)}
            okText="确定"
            cancelText="取消"
            width="65%"
          >
            <div><HeDaoAdd ref='HeDaoAdd' id={this.state.id}></HeDaoAdd></div>
          </Modal>
      </div>
    )
  }
}

export default SwjkHedao;
