import React from 'react'
import './index.scss'
import PageTitle from 'component/page-title/index.jsx'
import { Button } from 'antd';
import zhengjiang from 'images/zhengjiang.jpg'
class Home extends React.Component{
  render(){
    return (
      <div id="page-wrapper">
        <PageTitle title="海边城市管理系统欢迎您">
        </PageTitle>
        <div className="row home-wrap">
          <div className="col-md-12">
            <div className="img-wrap">
              <img src={zhengjiang} alt=""/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home;
