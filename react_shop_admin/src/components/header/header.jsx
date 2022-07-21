import React, { Component } from 'react'
import {formateDate} from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import {reqWeather} from '../../api/index'
import {withRouter} from 'react-router-dom'
import {Modal} from 'antd'
import storageUtils from '../../utils/storageUtils'
import LinkButton from '../link-button'
import menuList from '../../config/menuConfig'
import './header.css'

 class Header extends Component {
  state = {
    currentTime: formateDate(Date.now()), //当前时间
    city: '',
    weather: ''
  }

  getTime = ()=>{
    this.timer = setInterval(()=>{
      const currentTime = formateDate(Date.now())
      this.setState({currentTime})
    },1000)
  }

  getWeather = async()=>{
    //调用接口请求函数
    const {city,weather} = await reqWeather()
    //更新状态
    this.setState({city,weather})

  }

  //动态展示标题
  getTitle = ()=>{
    //获取当前请求路径
    const path = this.props.location.pathname
    let title
    menuList.forEach(item =>{ 
      if(item.key === path){ //如果当期item的key与path一样，返回标题
        title = item.title
      } else if (item.children){ //如果存在下一级，就继续往下找 
        const cItem = item.children.find(cItem => cItem.key === path)
        //有值才有匹配的
        if(cItem){
          title = cItem.title
        }
      }
    })

    return title
  }

  logout = () =>{
    Modal.confirm({
      content: '确定退出登录吗？',
      //修改为箭头函数，才会指向实例对象，不然this为undefined
      onOk: () => {
        // console.log('确认');
        //删除保存的user数据
        storageUtils.removeUser()
        memoryUtils.user = {}
        //跳转到登录界面
        this.props.history.replace('/login')
      },
      //不写onCancel也行，点击会自动关闭
      onCancel(){
        // console.log('取消');
      }

    })
  }
/**
 * 第一次render后执行
 * 一般在此执行异步操作，发ajax请求/启动定时器
 */
  componentDidMount(){
    //获取当前时间
    this.getTime()
    //获取当前天气
    this.getWeather()
  }

  /**
   * 当前组件卸载之前，清除定时器
   */
  componentWillUnmount(){
    clearInterval(this.timer)
  }

  render() {
    const {currentTime,city,weather} = this.state
    const username = memoryUtils.user.username
    const title = this.getTitle()
    return (
      <div className='header'>
        <div className="header-top">
          <span>欢迎，{username}</span>
          <LinkButton  onClick={this.logout}>退出</LinkButton>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{title}</div>
          <div className="header-bottom-right">
            <span>{currentTime}</span>{city}<span></span><span>{weather}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
