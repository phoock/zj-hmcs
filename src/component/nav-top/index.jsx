import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'

@withRouter
class NavTop extends React.Component{
  constructor(props){
    super(props)
  }
  //退出登录
  logOut(){
    axios.get('/api/Account/LogOut')
    .then((res)=>{
      if(res.status===200 &&res.data.isSuccessful){

        this.props.history.push('/login')
      }
    })
    
  }
  render(){
    return(
      <div className="navbar navbar-default top-navbar">
            <div className="navbar-header">
                <Link className="navbar-brand" to="/project"><b>HMCS</b>-SYS</Link>
            </div>

            <ul className="nav navbar-top-links navbar-right">
                <li className="dropdown">
                    <a className="dropdown-toggle" onClick={()=>this.logOut()} aria-expanded="false">
                        <i className="fa fa-user fa-fw"></i>
                        <span>退出</span>
                        {
                          /*
                          <i className="fa fa-caret-down"></i>
                           */
                        }

                    </a>
                    {
                      /*
                      <ul className="dropdown-menu dropdown-user">
                          <li>
                              <a onClick={() => {this.onLogout()}}>
                                  <i className="fa fa-sign-out fa-fw"></i>
                                  <span>退出登录</span>
                              </a>
                          </li>
                      </ul>
                      */
                    }


                </li>

            </ul>
        </div>
    )
  }
}

export default NavTop
