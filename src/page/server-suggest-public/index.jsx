import React from 'react'
import './index.scss'
import PageTitle from 'component/page-title/index.jsx'
import { Button, Input, Select, Card  } from 'antd';
const { TextArea } = Input;

class ServerSuggestPublic extends React.Component{
  render(){
    return (
      <div id="page-wrapper">
        <PageTitle title="公众建议发布(微信端)">
        </PageTitle>
        <div className="row">
          <Card title="报警信息">
            <div className="row">
              <div className="col-md-12">
                <div className="servser-suggest-public">
                  <div className="row">
                    <div className="col-md-2 col-xs-4 label02">
                      <label>建议标题</label>
                    </div>
                    <div className="col-md-4 col-xs-7">
                      <Input placeholder="请输入建议标题"/>
                    </div>
                  </div>
                  <div className="row" style={{marginTop:16}}>
                    <div className="col-md-2 col-xs-4 label02">
                      <label>联系方式</label>
                    </div>
                    <div className="col-md-4 col-xs-7">
                      <Input placeholder="请输入联系方式"/>
                    </div>
                  </div>
                  <div className="row" style={{marginTop:16}}>
                    <div className="col-md-2 col-xs-4 label02">
                      <label>内容:</label>
                    </div>
                    <div className="col-md-7 col-xs-8">
                      <TextArea rows={6} />
                      <Button type="primary" style={{ marginTop: 16}}>提交</Button>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    )
  }
}

export default ServerSuggestPublic;
