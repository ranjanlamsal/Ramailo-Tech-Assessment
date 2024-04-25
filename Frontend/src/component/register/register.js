import React from "react";
import { Form, Button, Checkbox, Input } from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './register.css'
import { Link, useNavigate } from "react-router-dom";
import { url } from "../../config/api";


const Register = () => {
  const navigate = useNavigate()
  const onFinish = (values) => {
    url.post("user/register/", {
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
  };
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
            onFinish={onFinish}
          >
            <h1>Register</h1>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your Username!',
                },
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
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
              <Button type="primary" htmlType="submit" className="login-form-button">
                Register
              </Button>
              Or <Link to="/login">login!</Link>
            </Form.Item>
          </Form>
        </div>

      </div>

    </div>

  )

}

export default Register;