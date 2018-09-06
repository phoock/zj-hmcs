import React from 'react'
import { Button, Table, Card, Modal, Divider } from 'antd'

//导入公共组件
import AddStaffComponent from './add-staff.jsx'
import EditStaffComponent from './edit-staff.jsx'

class StaffType1 extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      editVisible : false,
      dataResource : null,
      addVisible : false,
      dataSource : [],
      columns : [
        {
          title : '姓名',
          dataIndex : 'name',
          key : 'name'
        },
        {
          title : '职责',
          dataIndex : 'duty',
          key : 'duty'
        },
        {
          title : '联系电话',
          dataIndex : 'phone',
          key : 'phone'
        },
        {
          title : '邮箱',
          dataIndex : 'mail',
          key : 'mail'
        },
        {
          title : '操作',
          render : (text, record) => {
            return (
              <span>
                <Button id={record.phone} onClick={(e)=>this.editStaff(e)}>编辑</Button>
                <Divider type="vertical"/>
                <Button id={record.phone} onClick={(e)=>this.deleteStaff(e)}>删除</Button>
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
            name : '王小虎',
            duty : 'xxx河道指挥',
            phone : '19871717171',
            mail :'12134@qq.com'
          },
          {
            key : 2,
            name : '王da虎',
            duty : 'xxx河道指挥',
            phone : '19871717172',
            mail :'1212234@qq.com'
          },
          {
            key : 3,
            name : '王lao虎',
            duty : 'xxx河道指挥',
            phone : '19871717173',
            mail :'1211134@qq.com'
          },
          {
            key : 4,
            name : '王虎',
            duty : 'xxx河道指挥',
            phone : '19871717174',
            mail :'1212334@qq.com'
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
  //添加人员按钮
  showAdd(){
    this.setState({
      addVisible : true
    })
  }
  //modal层确定,取消按钮
  handleOk(){
    this.refs.AddStaffComponent.submit()
    //回调函数中关闭弹出层并重置
  }
  handleCancel(){
    this.setState({
      addVisible : false
    })
  }

  //编辑人员按钮
  editStaff(e){
    let id = e.target.getAttribute('id')
    //请求接口拿到回填数据
    let dataResource = {
      key : 1,
      name : '王小虎',
      duty : 'xxx河道指挥',
      phone : '19871717171',
      mail :'12134@qq.com'
    }
    this.setState({
      editVisible : true,
      dataResource : dataResource
    })

  }
  //modal层确定,取消按钮
  handleEditOk(){
    this.refs.EditStaffComponent.submit()
    //回调函数中关闭弹出层并重置
    this.setState({
      editVisible : true
    })
  }
  handleEditCancel(){
    this.setState({
      editVisible : false
    },()=>{
      this.refs.EditStaffComponent.reload()
    })

  }

  //删除人员按钮
  deleteStaff(e){
    let id = e.target.getAttribute('id')

  }
  render(){
    return (
      <div>
        <div className="row">
          <div className="col-md-3">
            <Button onClick={(e)=>{this.showAdd()}}> 新增人员<i className="fa fa-plus"></i></Button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <Card title = {`系统操作人员列表`} style ={{ marginTop : 16 }}>
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
          <AddStaffComponent ref='AddStaffComponent' cancelModal={()=>{this.handleCancel()}}></AddStaffComponent>
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
          <EditStaffComponent ref='EditStaffComponent' dataResource={this.state.dataResource}></EditStaffComponent>
        </Modal>
      </div>
    )
  }
}

export default StaffType1
