
import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import App from './App'
import './index.css'
import storageUtils from './utils/storageUtils'
import memoryUtils from './utils/memoryUtils'

// 读取local中保存user, 保存到内存中
const user = storageUtils.getUser()
memoryUtils.user = user


// 将App组件标签渲染到index页面的div上
ReactDOM.render(<BrowserRouter>
<App />
</BrowserRouter>, document.getElementById('root'))
