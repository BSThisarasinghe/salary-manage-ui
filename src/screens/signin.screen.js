import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { useHistory } from "react-router-dom";
import { postSignIn } from '../services';

const SignIn = () => {

  const history = useHistory();

  const onFinish = (values) => {
    let req = {
      "email": values.email,
      "password": values.password
    }

    postSignIn(req).then((response) => {
      if (response.status === 200) {
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('expireTime', response.data.expireTime);
        localStorage.setItem('refreshToken', response.data.response.refreshToken);
        localStorage.setItem('authenticated', true);
        history.push('/');
      }
    }).catch((error) => {
      console.log(error);
    });
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
                name="email"
                placeholder="Email"
                rules={[{ required: true, message: 'Please input your email!' }]}
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