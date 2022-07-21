import React, { Component } from 'react'
import { Form,Input, Button, message, Icon } from 'antd'
import './login.css'
import {reqLogin} from '../../api/index'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import {Redirect} from 'react-router-dom'

class Login extends Component {

  handleSubmit = e => {
    e.preventDefault();
    //对所有表单字段进行校验
    this.props.form.validateFields(async (err, values) => {
      //校验成功
      if (!err) {
        // console.log('提交登录的ajax请求', values);
        const {username,password} = values;
        // reqLogin(username,password).then(response=>{console.log(response.data);}).catch(error =>{console.log(error);})
          //请求登录

        const response = await reqLogin(username,password);
        const result = response; 
        if(result.code === 0)
        {
          //保存user信息
          const user = response.data;
          memoryUtils.user = user;
          //保存到localstorage中去
          storageUtils.saveUser(user)
          //跳转界面,不需要回退到登录界面直接用replace代替
          this.props.history.replace('/admin')
        } else {
          //登录失败
          message.error(result.msg)
        }
      } else {
        console.log('校验失败');
      }
    });
  };

 /*  UNSAFE_componentWillUpdate(){
    const user = memoryUtils.user;
    if(user || user._id){
      return <Redirect to='/'/>
    }
  } */
  

  render() {
    /**
     * 重新启动会出现问题，先注释，在刷新就正常553-55行会报问题，暂未解决
     */
    //如果用户已经登录,自动跳转admin
    const user = memoryUtils.user;
    if(user && user.id){
      return <Redirect to='/'/>
    }
    //得到具有强大功能的form对象
    const { getFieldDecorator } = this.props.form;
    return (
      <div className='login'>
        <header className='login-header'>
          <h1>数码商城后台管理系统</h1>
        </header>
        <section className='login-content'>
          <h2>管理员登录</h2>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [
                  { required: true,  message: '请输入用户名!' },
                  { min: 4, message: '用户名最少4位'},
                  { max: 12, message: '用户名最多12位'},
                  { pattern: /^[a-zA-A0-9_]+$/, whitespace: true, message: '用户名必须是英文、数字或下划线组成'},
                  ],
              })(
                <Input
                  prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="用户名"
                  name='username'
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码!' }],
              })(
                <Input
                  prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="密码"
                  name='password'
                />,
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    )
  }
}

/**
 * 包装Form组件生成一个新组件Form(Login)
 * 
 * 新组件向Form组件传递一个强大的对象属性form
 */
const WrapLogin = Form.create()(Login)
export default WrapLogin
