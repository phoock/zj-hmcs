import React from 'react'
import { Table, Button, Modal } from 'antd'

//导入组件
import HeDaoEdit from './swjk-jishui-edit.jsx'

class SwjkJiShuiHis extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      historyVisible : false,
      columns : [
          {
              title: '积水点名称',
              dataIndex: 'name',
              key: 'name'
          }, {
              title: '积水点位置',
              dataIndex: 'position',
              key: 'position'
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
                      <Button jishui-id={record.id} onClick={(e)=>{this.showEdit(e)}}>编辑</Button>
                  </span>)
              }
          }
      ],
      dataSource : [
          {
              key: '1',
              name: '沿江大道积水点',
              position: '沿江大道244号',
              id: '001',
              time: '2018/5/22',
              ruler: '100'
          },
          {
              key: '2',
              name: '沿江大道积水点',
              position: '沿江大道244号',
              id: '002',
              time: '2018/5/12',
              ruler: '150'
          },
          {
              key: '3',
              name: '沿江大道积水点',
              position: '沿江大道244号',
              id: '003',
              time: '2018/5/3',
              ruler: '30'
          },
          {
              key: '4',
              name: '沿江大道积水点',
              position: '沿江大道244号',
              id: '004',
              time: '2018/4/12',
              ruler: '80'
          },
          {
              key: '5',
              name: '沿江大道积水点',
              position: '沿江大道244号',
              id: '005',
              time: '2018/4/14',
              ruler: '180'
          }
      ],
      editVisible : false,
      id:'',
      editVal : null
    }
  }
  showEdit(e){
    this.setState({
      editVisible: true,
    });
    let id = e.target.getAttribute('jishui-id')
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
  render(){
    return (
     <div>
        <Table dataSource={this.state.dataSource} columns={this.state.columns} pagination={{
        position:'bottom',
        defaultCurrent:1,
        total:30}}/>
        <Modal
          title="编辑积水点信息"
          visible={this.state.editVisible}
          onOk={(e)=>this.handleEditOk(e)}
          onCancel={(e)=>this.handleEditCancel(e)}
          okText="确定"
          cancelText="取消"
          width="65%"
        >
          <div><HeDaoEdit ref='HeDaoEdit' ids={this.state.id}></HeDaoEdit></div>
        </Modal>
     </div>
    )
  }
}

export default SwjkJiShuiHis;
