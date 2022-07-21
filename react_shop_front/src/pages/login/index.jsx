import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { reqLogin,reqCheckUsername } from '../../api/index'
import {
  Layout,
  Form,
  Input,
  Button,
  Icon,
  message,
} from 'antd'

const { Header, Content } = Layout

class Login extends Component {

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const { username, password } = values
        const result = await reqLogin(username, password)
        console.log(result);
        if (result.code === 200) {
          message.success(result.msg)
          sessionStorage.setItem('isLogin', true)
          sessionStorage.setItem('uid', result.data.uid)
          // console.log( sessionStorage.getItem('isLogin'));
          // console.log( sessionStorage.getItem('uid'));
          this.timer = setTimeout(() => {
            this.props.history.replace('/home')
          }, 2000)
        } else {
          message.error(result.msg)
        }
      }
    });
  };

  // checkUsername = async(rulw,value,callback)=>{
  //   const {form} = this.props
  //   if(value){
  //     const result = await reqCheckUsername(form.getFieldValue('username'))
  //     if(result.code===200){
  //       callback(result.msg)
  //     } else {
  //       callback(result.msg)
  //     }
  //   }
   
  // }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {

    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 6, offset: 9 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 10,
        },
      },
    };


    return (
      <div>
        <Header style={{ color: '#fff' }}>
          <Link to='/home'>
            <Icon type='arrow-left' style={{ fontSize: 24 }} />
          </Link>
          <span style={{ marginLeft: 50, fontSize: 20 }}>欢迎来到登录页面</span>
        </Header>
        <Content style={{ paddingTop: 50, paddingBottom: 50, backgroundColor: '#f5f5f5' }}>

          <h1 style={{ fontWeight: 700, fontSize: 24, marginLeft: 700, marginBottom: 40 }}>用户登录</h1>

          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [
                  { required: true, message: '请输入用户名!'}
                ]
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="用户名"
                />,
              )}
            </Form.Item>

            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码!' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="密码"
                />,
              )}
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
              <Link style={{ marginLeft: 100 }} to='/register' >注册</Link>
            </Form.Item>
          </Form>
        </Content>
      </div>
    )
  }
}

export default Form.create({ name: 'login' })(Login);