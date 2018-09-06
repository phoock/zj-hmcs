import React from 'react'
import { Button, Table, Card, Modal, Divider } from 'antd'

//导入公共组件
import AddMaterialComponent from './add-material.jsx'
import EditMaterialComponent from './edit-material.jsx'
import AllotMaterialComponent from './allot-material.jsx'

class StaffType1 extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      allotVisible : false,
      editVisible : false,
      dataResource : null,
      addVisible : false,
      dataSource : [],
      columns : [
        {
          title : '物资名称',
          dataIndex : 'name',
          key : 'name'
        },
        {
          title : '单位',
          dataIndex : 'compony',
          key : 'compony'
        },
        {
          title : '总量',
          dataIndex : 'total',
          key : 'total'
        },
        {
          title : '存放地点',
          dataIndex : 'address',
          key : 'address'
        },
        {
          title : '已分配量',
          dataIndex : 'allot',
          key : 'allot'
        },
        {
          title : '操作',
          render : (text, record) => {
            return (
              <span>
                <Button id={record.phone} onClick={(e)=>this.editStaff(e)}>编辑</Button>
                <Divider type="vertical"/>
                <Button id={record.phone} onClick={(e)=>this.deleteStaff(e)}>删除</Button>
                <Divider type="vertical"/>
                <Button id={record.phone} onClick={(e)=>this.allot(e)}>分配</Button>
              </span>
            )
          }
        }
      ]
    }
  }
  componentDidMount(){
    this.loadTable()
  }
  loadTable(){
    //异步请求
    this.timer = setTimeout(()=>{
      this.setState({
        dataSource : [
          {
            key : 1,
            name : '帐篷',
            compony : 'xxx户外有限公司',
            total : '200',
            address :'黄浦大街物管局',
            allot :'50'
          },
          {
            key : 2,
            name : '救生衣',
            compony : 'xxx户外有限公司',
            total : '800',
            address :'黄浦大街物管局',
            allot :'400'
          }
        ]
      })
    },200)
  }
  componentWillUnmount(){
    clearTimeout(this.timer)
  }

  /*
  bindEvent
  */
  //添加按钮
  showAdd(){
    this.setState({
      addVisible : true
    })
  }
  //modal层确定,取消按钮
  handleOk(){
    this.refs.AddMaterialComponent.submit()
    //回调函数中关闭弹出层并重置
  }
  handleCancel(){
    this.setState({
      addVisible : false
    })
  }

  //编辑按钮
  editStaff(e){
    let id = e.target.getAttribute('id')
    //请求接口拿到回填数据
    let dataResource = {
      key : 2,
      name : '救生衣',
      compony : 'xxx户外有限公司',
      total : '800',
      address :'黄浦大街物管局',
      allot :'400'
    }
    this.setState({
      editVisible : true,
      dataResource : dataResource
    })

  }
  //modal层确定,取消按钮
  handleEditOk(){
    this.refs.EditMaterialComponent.submit()
    //回调函数中关闭弹出层并重置
    this.setState({
      editVisible : true
    })
  }
  handleEditCancel(){
    this.setState({
      editVisible : false
    },()=>{
      this.refs.EditMaterialComponent.reload()
    })

  }

  //删除按钮
  deleteStaff(e){
    let id = e.target.getAttribute('id')

  }

  //分配按钮
  allot(e) {
    this.setState({
      allotVisible : true
    })
  }
  handleAllotOk(e){
    this.setState({
      allotVisible : false
    })
  }
  handleAllotCancel(e){
    this.setState({
      allotVisible : false
    })
  }
  render(){
    return (
      <div>
        <div className="row">
          <div className="col-md-3">
            <Button onClick={(e)=>{this.showAdd()}}> 添加新物资<i className="fa fa-plus"></i></Button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <Card title = {`指挥调度人员列表`} style ={{ marginTop : 16 }}>
              <Table
              loading = {this.state.dataSource.length>0?false:true}
              columns={this.state.columns}
              dataSource={this.state.dataSource}
              />
            </Card>
          </div>
        </div>
        <Modal
          title="新增员工"
          visible={this.state.addVisible}
          onOk={()=>this.handleOk()}
          onCancel={()=>this.handleCancel()}
          okText = {`确定`}
          cancelText = {`取消`}
          width = {`55%`}
        >
          <AddMaterialComponent ref='AddMaterialComponent' cancelModal={()=>{this.handleCancel()}}></AddMaterialComponent>
        </Modal>
        <Modal
          title="编辑员工信息"
          visible={this.state.editVisible}
          onOk={()=>this.handleEditOk()}
          onCancel={()=>this.handleEditCancel()}
          okText = {`确定`}
          cancelText = {`取消`}
          width = {`55%`}
        >
          <EditMaterialComponent ref='EditMaterialComponent' dataResource={this.state.dataResource}></EditMaterialComponent>
        </Modal>
        <Modal
          title="编辑员工信息"
          visible={this.state.allotVisible}
          onOk={()=>this.handleAllotOk()}
          onCancel={()=>this.handleAllotCancel()}
          okText = {`确定`}
          cancelText = {`取消`}
          width = {`55%`}
        >
          <AllotMaterialComponent ref='AllotMaterialComponent' ></AllotMaterialComponent>
        </Modal>
      </div>
    )
  }
}

export default StaffType1
