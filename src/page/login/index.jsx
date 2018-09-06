import React from 'react'
import './index.scss'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;
import { Link} from 'react-router-dom'
import axios from 'axios'


@Form.create({

})
class Login extends React.Component{
  constructor(props){
    super(props)
    this.state={
      go:false,
      message:''
    }
  }
  handleInSys(e){
    this.setState({
      go:true
    })
    setTimeout(()=>{
      this.props.history.push('/')
    }, 400)
  }
  handleSubmit(e){
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios.get('/api/Account/GetPersonWebSiteInfo',{
        　　params: values
        })
        .then((res)=>{
          if(res.status === 200 && res.data.isSuccessful){
            window.a_phoock_dpt = res.data.Data[0].empdepart.substring(2)
            this.setState({
              message:''
            })
            this.props.history.push('/')
          } else {
            this.setState({
              message:'用户名或密码错误'
            },()=>{
              if(this.setInterNum){
                return
              }else{
                this.setInterNum = setTimeout(()=>{
                  this.setState({
                    message:''
                  })
                },3000)
              }
            })
          }
        })
      }
    })
  }
  clearTimeoutNum(){
    this.setState({
      message:''
    })
    if(!this.setInterNum) return
    clearTimeout(this.setInterNum)
  }

  componentWillUnmount(){

  }
  render(){
    const { getFieldDecorator } = this.props.form;
    return (
      <div id="welcome">
        <div className={`login-wrap`}>
          <div className={`bg-wrap ${this.state.go?'fade-out':''}`}>
            <div className="black-filter">
              <div className="content-wrap">
                <div>
                  <div className="login-form">
                    <FormItem>
                      {getFieldDecorator('LOGINNAME', {
                        rules: [{ required: true, message: '用户名不能为空' }],
                      })(
                        <Input onChange={()=>{this.clearTimeoutNum()}} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入用户名" />
                      )}
                    </FormItem>
                    <FormItem>
                      {getFieldDecorator('LOGINPWD', {
                        rules: [{ required: true, message: '密码不能为空' }],
                      })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入密码" />
                      )}
                    </FormItem>
                    {
                      this.state.message?
                      <p className="message-warning">{this.state.message}</p>
                      :null
                    }




                    <Button type="primary" onClick={(e)=>{this.handleSubmit(e)}} className="login-form-button">
                      登录
                    </Button>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Login;
