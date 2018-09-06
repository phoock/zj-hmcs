import React from 'react'
import './index.scss'
import MUtil from 'util/mm.jsx'
const _mm = new MUtil();

class Login extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        username:'',
        password:''
      }
    }
    //当用户名发生改变
    onInputChange(e){
      let inputValue = e.target.value,
          inputName = e.target.name;
      this.setState({
        [inputName]: inputValue
      })
    }
    //用户提交表单
    onSubmit(e){
      _mm.request({
        type:'post',
        url: '/manage/user/login.do',
        data:{
          username: this.state.username,
          password: this.state.password
        }
      }).then((res)=>{

      },(err)=>{

      })
    }
    render() {
        return (<div className="login-wrap">
            <div className="col-md-4 col-md-offset-4">
                <div className="panel panel-default login-panel">
                    <div className="panel-heading">欢迎登录-MMALL</div>
                    <div className="panel-body">
                        <div className="form-group">
                            <div className="form-group">
                                <label htmlFor="username1">请输入用户名</label>
                                <input
                                name="username"
                                type="text"
                                className="form-control"
                                id="username1"
                                placeholder="用户名"
                                onChange={e=>this.onInputChange(e)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password1">请输入密码</label>
                                <input
                                name="password"
                                type="password"
                                className="form-control"
                                id="password1"
                                placeholder="密码"
                                onChange={e=>this.onInputChange(e)}
                                />
                            </div>
                            <button
                            type="submit"
                            className="btn btn-block btn-lg btn-primary"
                            onClick={e=>this.onSubmit(e)}
                            >登录</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>)
    }
}

export default Login;
