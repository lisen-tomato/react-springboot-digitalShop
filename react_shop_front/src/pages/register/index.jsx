import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { reqRegister } from '../../api/index'
import {
  Layout,
  Form,
  Input,
  Button,
  Icon,
  message,
} from 'antd'


const { Header, Content } = Layout

class Register extends Component {

  state = {
    confirmDirty: false,
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        // console.log(values);
        const { username, password, email, phone } = values
        const result = await reqRegister(username, password, email, phone)
        // console.log(result);
        if (result.code === 200) {
          message.success(result.msg)
          //清除输入数据
          this.props.form.resetFields()
          this.timer = setTimeout(()=>{
            this.props.history.replace('/login')
          },1000)
          console.log(22222);
        }
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('密码确认不一致！');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  componentWillUnmount(){
    clearTimeout(this.timer)
  }

  render() {

    const { getFieldDecorator } = this.props.form;

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
          <span style={{ marginLeft: 50, fontSize: 20 }}>欢迎来到注册页面</span>
        </Header>
        <Content style={{ paddingTop: 50, paddingBottom: 50, backgroundColor: '#f5f5f5' }}>
          <h1 style={{ fontWeight: 700, fontSize: 24, marginLeft: 700, marginBottom: 40 }}>用户注册</h1>
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label="用户名">
              {getFieldDecorator('username', {
                rules: [
                  {
                    required: true,
                    message: '请输入用户名！',
                  },
                ],
              })(<Input />)}
            </Form.Item>

            <Form.Item label="密码" hasFeedback>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: '请输入密码！',
                  },
                  {
                    validator: this.validateToNextPassword,
                  },
                ],
              })(<Input.Password />)}
            </Form.Item>
            <Form.Item label="确认密码" hasFeedback>
              {getFieldDecorator('confirm', {
                rules: [
                  {
                    required: true,
                    message: '请输入密码！',
                  },
                  {
                    validator: this.compareToFirstPassword,
                  },
                ],
              })(<Input.Password onBlur={this.handleConfirmBlur} />)}
            </Form.Item>

            <Form.Item label="邮箱">
              {getFieldDecorator('email', {
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
                rules: [{ required: true, message: '请输入手机号码！' }],
              })(<Input style={{ width: '100%' }} />)}
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                注册
              </Button>
            </Form.Item>
          </Form>
        </Content>
      </div>
    )
  }
}

export default Form.create({ name: 'register' })(Register);