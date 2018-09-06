import React from 'react'
import { Card, Form, Input, Button, Checkbox, Icon } from 'antd';
const FormItem = Form.Item;

class Step08 extends React.Component{

  render(){
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="step08-wrap">
        <Card title="规划基本信息录入:" bordered={false}>
          <Card
          type="inner"
          title="镇江居民滨江苑小区"
          >
            <Form>
              <FormItem
                label="项目名称"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 8 }}
              >
                {getFieldDecorator('note1', {
                  rules: [{ required: true, message: 'Please input your note!' }],
                })(
                  <Input />
                )}
              </FormItem>
              <FormItem
                label="项目名称"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 8 }}
              >
                {getFieldDecorator('note2', {
                  rules: [{ required: true, message: 'Please input your note!' }],
                })(
                  <Input />
                )}
              </FormItem>
              </Form>
          </Card>
        </Card>
      </div>
    )
  }
}




const wrapStep08 = Form.create()(Step08)
export default wrapStep08
