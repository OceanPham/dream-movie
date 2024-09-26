// src/pages/Login.js
import { Button, Checkbox, Form, Input } from 'antd';
import React, { useState } from "react";
import { Helmet } from "react-helmet";
// import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  // const { login } = useAuth();

  const handleLogin = () => {
    // Simulate login logic (e.g., API call)
    // login();
  };

  const [mode, setMode] = useState('login')

  const onFinish = (values) => {
    console.log('Success:', values);
    localStorage.setItem('users', 'loggedin')
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
      <Helmet>
        <title>Dream Movie</title>
      </Helmet>
      <div
        style={{
          backgroundImage: "url(/assets/images/background.webp)",
          height: "100vh !important"
        }}
        className="w-100 d-flex justify-content-center  align-items-center image_Background">

        <div
          className=" d-flex h-auto flex-wrap fw-bold fs-2 justify-content-center align-items-center pb-5 text-danger"
          style={{ background: "rgb(118 212 252 / 62%)", borderRadius: "8px" }}
        >
          <div className="text-center w-100 mt-5">
            <img src="/assets/images/logo.png" width={100} alt="logo" className="rounded-circle" />
          </div>
          <div className="d-flex flex-wrap justify-content-center">
            <div className=" text-center w-100">
              Hello! We are Dream Movie
            </div>
            {mode === 'login' ?
              <Form
                name="basic"
                labelCol={{
                  span: 8,
                }}
                wrapperCol={{
                  span: 16,
                }}
                style={{
                  maxWidth: 600,
                }}
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your username!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  name="remember"
                  valuePropName="checked"
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
              :
              <Form
                name="basic"
                labelCol={{
                  span: 8,
                }}
                wrapperCol={{
                  span: 16,
                }}
                style={{
                  maxWidth: 600,
                }}
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your username!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>


                <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your username!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>


                <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your username!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="remember"
                  valuePropName="checked"
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            }



            <div className='w-100 text-white text-center'>or</div>
            <Button className="btn btn-success" onClick={() => setMode('signup')}>
              Sign up!
            </Button>

            <Button className="btn btn-warning text-white ms-2" onClick={() => setMode('login')}>
              Log in!
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
