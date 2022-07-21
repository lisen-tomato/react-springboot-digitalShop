import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { reqGetUser,reqUpdateUser } from '../../api/index'
import {
  Layout,
  Form,
  Input,
  Button,
  Icon,
  message,
} from 'antd'

const { Header, Content } = Layout

class User extends Component {

  state = {
    user: {}
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        // console.log(values);
        const{uid} = this.state.user
        const {username,password,email,phone} = values

        const result = await reqUpdateUser(uid,username,password,email,phone)
        if(result.code===200){
          message.success(result.msg)
          this.getUser(uid)
        } else {
          message.error('用户名已存在，请重新修改')
        }
      }
    });
  };


  getUser = async (uid) => {
    const result = await reqGetUser(uid)
    if (result.code === 200) {
      console.log(result);
      this.setState({ user: result.data })
    } else {
      message.error('获取个人资料出错')
    }
  }

  componentDidMount() {
    const uid = JSON.parse(sessionStorage.getItem('uid'))
    // console.log(typeof uid);
    this.getUser(uid)
  }


  render() {

    const { getFieldDecorator } = this.props.form;
    const {username,password,email,phone} = this.state.user

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 },
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
          <span style={{ marginLeft: 50, fontSize: 20 }}>欢迎来到个人中心</span>
        </Header>
        <Content style={{ paddingTop: 50, paddingBottom: 50, backgroundColor: '#f5f5f5' }}>

          <h1 style={{ fontWeight: 700, fontSize: 24, marginLeft: 700, marginBottom: 40 }}>个人资料</h1>

          <Form {...formItemLayout} onSubmit={this.handleSubmit}>

            <Form.Item label="用户名">
              {getFieldDecorator('username', {
                initialValue: username,
                rules: [
                  {
                    required: true,
                    message: '请输入用户名！',
                  },
                ],
              })(<Input />)}
            </Form.Item>

            <Form.Item label="密码">
              {getFieldDecorator('password', {
                initialValue: password,
                rules: [
                  {
                    required: true,
                    message: '请输入密码！',
                  },
                ],
              })(<Input.Password />)}
            </Form.Item>

            <Form.Item label="邮箱">
              {getFieldDecorator('email', {
                initialValue: email,
                rules: [
                  {
                    type: 'email',
                    message: '这不是一个合法的邮箱地址！',
                  },
                  {
                    required: true,
                    message: '请输入邮箱！',
                  },
                ],
              })(<Input />)}
            </Form.Item>

            <Form.Item label="手机号码">
              {getFieldDecorator('phone', {
                initialValue: phone,
                rules: [{ required: true, message: '请输入手机号码！' }],
              })(<Input style={{ width: '100%' }} />)}
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                修改
              </Button>
            </Form.Item>
          </Form>
        </Content>
      </div>
    )
  }
}

export default Form.create({ name: 'user' })(User)