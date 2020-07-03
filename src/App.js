import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import 'antd/dist/antd.css'
import axios from 'axios'

function App() {

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const onFinish = values => {
    axios.get('/user/login', {
      params: {
        username: values.username,
        password: values.password
      }
    })
    .then(function (response) {
      if (response.data.code === 1) {
        alert(response.data.data.dispaly_name);
      } else {
          alert(response.data.msg);
      }
    })
    .catch(function (error) {
      console.log(error.message);
    });
  };
  
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
    <Form
    {...layout}
    name="basic"
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
  >
    <Form.Item
      label="Username"
      name="username"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input style={{ width:300}}/>
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password style={{ width:300}}/>
    </Form.Item>

    <Form.Item {...tailLayout} name="remember" valuePropName="checked">
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item {...tailLayout}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
  </div>
  );
}

export default App;