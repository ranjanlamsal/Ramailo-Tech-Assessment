import React from "react";
import { Form, Button, Checkbox, Input } from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.css'
import { url } from '../../config/api.js'
import { useNavigate, Link } from 'react-router-dom'

const Login = () => {

  const navigate = useNavigate()
  const handleSubmit = (values) => {
    console.log(values);
    url.post("user/login/", {
      username: values.username,
      password: values.password
    }).then(res => {
      console.log(res.data);
      localStorage.setItem('token', res.data.token)
      localStorage.setItem("userId", res.data.user_id)
      navigate("/")
    }).catch(err => {
      console.log(err.message);
    })
  }


  return (
    <div className="login_container">
      <div className="login_middle_container">
        <div className="login_inner_container">
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={handleSubmit}
          >
            <h1>Login</h1>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your Username!',
                },
              ]}

            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>


            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
              Or <Link to="/register">register now!</Link>
            </Form.Item>
          </Form>
        </div>

      </div>

    </div >

  )

}

export default Login;