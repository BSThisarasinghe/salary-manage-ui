import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';

const SignIn = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              className="box"
            >
              <h1>Login</h1>
              <p className="text-muted"> Please enter your login and password!</p>
              <Form.Item
                name="username"
                placeholder="Username"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input className="login__input" />
              </Form.Item>

              <Form.Item
                placeholder="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password className="login__input" />
              </Form.Item>
              <Form.Item>
                <Button className="login__btn" type="primary" htmlType="submit">
                  Submit
        </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;