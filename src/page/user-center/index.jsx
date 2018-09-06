import React from 'react'
import { Card, Table, messagem, Modal, Input, Select, message } from 'antd'
import axios from 'axios'

//引入组件
import PageTitle from 'component/page-title/index.jsx'
import NoData from 'component/noData/index.jsx'


//环境中的常量及函数
const usertype = (num)=> {
  if(num == 1) return '超级管理员'
  if(num == 2) return '系统员工'
  if(num == 3) return '建设单位'
}

const Option = Select.Option;

const departFun = (num)=>{
  if( num == 1 ) return '1+海绵领导小组'
  if( num == 2 ) return '2+指挥部'
  if( num == 3 ) return '3+发改局'
  if( num == 4 ) return '4+规划国土局'
  if( num == 5 ) return '5+建设环保局'
  if( num == 6 ) return '6+建设单位'
  if( num == 7 ) return '7+设计单位'
  if( num == 8 ) return '8+施工单位'
}

class UserCenter extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        //加载列表数据state
        dataSource : [],
        dataEmpty : false,
        pageInfo : {
          CurrentPage : 1
        },
        totalPage : 0,

        //modal层state
        visible : false,
        modalData : {
          userid : '',
          usertype : '',
          username : '',
          userdepart : '',
          userTel : '',
          userPhoneNum : '',
          userAddress : '',
          userSN : 0,
        }
      }
    }
    componentDidMount(){
      this.columns = [
          {
              title: '用户账号',
              dataIndex: 'userid',
              render: text => <a href="javascript:;">{text}</a>
          }, {
              title: '用户姓名',
              dataIndex: 'username'
          }, {
              title: '联系电话',
              dataIndex: 'phone'
          }, {
              title: '用户部门',
              dataIndex: 'userdepart'
          }, {
              title: '用户类别',
              dataIndex: 'usertype'
          }, {
              title: "操作",
              render: (record) => {
                return (<span>
                    <a onClick={()=>this.handleEdit(record)}>编辑</a>
                </span>)
              }
          }
      ]
      this.loadData()
    }
    loadData(){
      let params = {
        CurrentPage : this.state.pageInfo.CurrentPage
      }
      axios.post('/api/Account/JsonAccountPage',params)
      .then(res=>{
        if(res.status === 200 && res.data.isSuccessful){
          //正确请求,并且有数据的情况
          this.handleDataFormat(res.data.Data)
          this.setState({
            totalPage : res.data.RowCount
          })
        }
        else if(res.status === 200 && !res.data.isSuccessful){
          //正确请求,但是没有数据的情况
          this.setState({
            dataEmpty : true
          })
        }
      })
      .catch(err=>{
        message.error('出现错误')
      })
    }

    //数据的格式处理
    handleDataFormat(data){
        let dataArr = data.map((v,index)=>{
          let project = {
              key: index,
              userid: v.LOGINNAME,
              username: v.USERNAME,
              phone:v.LINKMOBILE,
              userdepart: v.EMPDEPART.substring(2),
              usertype: usertype(v.USERTYPE),
              userSN : v.USERSN,
          }
          // ${record.name}&
          // ${record.typeNum}&
          // ${record.proType}&
          // ${record.step}&
          // ${record.proId}&
          // ${record.paramType}&
          // ${record.hasFinished}
          return project
      })
      this.setState({
        dataSource:dataArr
      })
    }

    //点击编辑按钮
    handleEdit(record){
      this.setState({
        visible : true
      })
      //数据回填
      let params = {
        USERSN:record.userSN
      }
      axios.post('/api/Account/JsonGetPersonInfo', params)
      .then(res=>{
        if(res.status===200 && res.data.isSuccessful){
          this.handleModelFormat(res.data.Data)
        }
        else if (res.status === 200 && !res.data.isSuccessful){
          console.log('请求JsonGetPersonInfo接口时,isSuccessful返回为false');
        }
        else {
          console.log('请求JsonGetPersonInfo接口时,status不为200');
        }
      })
      .catch(err=>{
        console.log(err);
      })
    }
    //modal层数据回填数据格式处理
    handleModelFormat(data){
      let dataParse = JSON.parse(data)
      console.log(dataParse[0]);
      let v = dataParse[0]
      this.setState({
        modalData : {
          userid : v.LOGINNAME || '',
          usertype : v.USERTYPE || '',
          username : v.USERNAME || '',
          userdepart : v.EMPDEPART.substring(0,1) || '',
          userTel : v.LINKTEL || '',
          userPhoneNum : v.LINKMOBILE || '',
          userAddress : v.ADDRESS || '',
          userSN : v.USERSN
        }
      })
    }
    handleModelSubmit(){
      //数据格式验证
      //手机验证
      let reg_phone = /1\d{10}/;
      if(this.state.modalData.userPhoneNum){
        if(!reg_phone.test(this.state.modalData.userPhoneNum) || this.state.modalData.userPhoneNum.length !== 11){
          message.error('请输入正确格式的手机号')
          return
        }
      }

      //座机验证
      let reg_Tel = /^[0-9]*$/
      if(this.state.modalData.userTel){
        if(!reg_Tel.test(this.state.modalData.userTel) || this.state.modalData.userTel.length >= 8){
          message.error('请输入正确格式的座机号')
          return
        }
      }



      let v = this.state.modalData
      let param = {
          USERNAME : v.username,
          LOGINNAME : v.userid,
          USERSN : v.userSN,
          LINKMOBILE : v.userPhoneNum,
          LINKTEL : v.userTel,
          EMPDEPART : departFun(v.userdepart),
          ADDRESS : v.userAddress
      }



      axios.post('/api/Account/JsonUpdatePersonalWebSiteInfoSet',param)
      .then(res=>{
        if(res.status === 200 && res.data.isSuccessful){
          message.success('修改成功')
          //重新加载页面
          this.loadData()
          this.setState({
            visible: false
          })
        }
      })
      .catch(err=>{
        console.log(err);
      })
    }
    handleModelCancel(){
      this.setState({
        visible: false
      })
    }
    handleModleInputEdit(e,key){
      let value = e.target.value
      //拷贝modalData
      let finValue = Object.assign({},this.state.modalData)
      //修改对应的value值
      finValue[key] = value
      this.setState({
        modalData : finValue
      })
    }
    handleModleSelectEdit(e,key){
      let value = e
      //拷贝modalData
      let finValue = Object.assign({},this.state.modalData)
      //修改对应的value值
      finValue[key] = value
      this.setState({
        modalData : finValue
      })
    }
    render() {
        let { modalData } = this.state
        return (<div id="page-wrapper">
            <PageTitle title="用户中心">

            </PageTitle>
            <div className="row project-wrap">
              <Card title="系统账号信息">
                <Table
                  loading = {this.state.dataSource.length>0?false:true}
                  dataSource={this.state.dataSource}
                  columns={this.columns}
                  pagination={{
                    position:'bottom',
                    pageSize:10,
                    defaultCurrent:1,
                    current:this.state.pageInfo.CurrentPage,
                    total:this.state.totalPage,
                    onChange:(current,size)=>{
                      this.setState({
                        pageInfo:{
                          CurrentPage : current
                        }
                      },()=>{
                        this.loadData()
                      })
                  }
                }}
                />
                <Modal
                  title="用户信息维护"
                  visible={this.state.visible}
                  onOk={()=>this.handleModelSubmit()}
                  onCancel={()=>this.handleModelCancel()}
                  okText = {`保存`}
                  cancelText = {`取消`}
                  width = {`600px`}
                >
                  <div className="row">
                    <div className="col-md-2 labels"><label>用户账号</label></div>
                    <div className="col-md-4"><Input disabled={true} value={`${modalData.userid}`} onChange={(e)=>this.handleModleInputEdit(e,'userid')}/></div>
                    <div className="col-md-4">
                      <Select disabled={true} value={`${modalData.usertype}`} onChange={(e)=>this.handleModleSelectEdit(e,'usertype')} style={{ width: 160 }}>
                        <Option value="1">员工账户</Option>
                        <Option value="2">建设单位</Option>
                      </Select>
                    </div>
                  </div>
                  <div className="row" style={{marginTop:16}}>
                    <div className="col-md-2 labels"><label>用户姓名</label></div>
                    <div className="col-md-4"><Input value={`${modalData.username}`} onChange={(e)=>this.handleModleInputEdit(e,'username')}/></div>
                  </div>
                  <div className="row" style={{marginTop:16}}>
                    <div className="col-md-2 labels"><label>用户部门</label></div>
                    <div className="col-md-4">
                      <Select value={`${modalData.userdepart}`} onChange={(e)=>this.handleModleSelectEdit(e,'userdepart')} style={{ width: 160 }}>
                        <Option value="1">海绵领导小组</Option>
                        <Option value="2">指挥部</Option>
                        <Option value="3">发改局</Option>
                        <Option value="4">规划国土局</Option>
                        <Option value="5">建设环保局</Option>
                        <Option value="6">建设单位</Option>
                        <Option value="7">设计单位</Option>
                        <Option value="8">施工单位</Option>
                      </Select>
                    </div>
                  </div>
                  <div className="row" style={{marginTop:16}}>
                    <div className="col-md-2 labels"><label>手机号</label></div>
                    <div className="col-md-6"><Input value={`${modalData.userPhoneNum}`} onChange={(e)=>this.handleModleInputEdit(e,'userPhoneNum')}/></div>
                  </div>
                  <div className="row" style={{marginTop:16}}>
                    <div className="col-md-2 labels"><label>联系电话</label></div>
                    <div className="col-md-6"><Input value={`${modalData.userTel}`} onChange={(e)=>this.handleModleInputEdit(e,'userTel')}/></div>
                  </div>
                  <div className="row" style={{marginTop:16}}>
                    <div className="col-md-2 labels"><label>联系地址</label></div>
                    <div className="col-md-8"><Input value={`${modalData.userAddress}`} onChange={(e)=>this.handleModleInputEdit(e,'userAddress')}/></div>
                  </div>
                </Modal>
              </Card>
            </div>
        </div>)
    }
}

export default UserCenter
