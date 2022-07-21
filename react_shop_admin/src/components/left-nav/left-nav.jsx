import React, { Component } from 'react'
import './left-nav.css'
import { Link, withRouter } from 'react-router-dom'
import { Menu,Icon} from 'antd';

class LeftNav extends Component {
    render() {
        /**
         * 问题：当点击其他导航路径会变化，但再点击首页，路径不会变为/home
         */
        //得到当前的请求路径
        //因为LeftNav不是路由组件，读取不到location属性，会报undefined,使用withRouter 使组件具有路由的属性history/location/match
        let path = this.props.location.pathname
  
        return (
            <div className='left-nav'>
                <Link to='/' className='left-nav-header'>
                    <h1>商城管理后台</h1>
                </Link>

                {/* 一开始请求的路径为/ 之后才跳到/home 
                    换成selectedkeys可解决
                */}
                <Menu
                    selectedKeys={[path]}  //当前选中的菜单项 key 数组
                    mode="inline"          //菜单类型，现在支持垂直、水平、和内嵌模式三种
                    theme="dark"           //主题颜色
                >
                    <Menu.Item key='/category'>
                        <Link to='/category'>
                            <Icon type='bars'/>
                            <span>分类管理</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key='/product'>
                        <Link to='/product'>
                            <Icon type='tool'/>
                            <span>商品管理</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key='/order'>
                        <Link to='/order'>
                            <Icon type='file-text'/>
                            <span>订单管理</span>
                        </Link>
                    </Menu.Item>
                </Menu>
            </div>

        )
    }
}

export default withRouter(LeftNav)
