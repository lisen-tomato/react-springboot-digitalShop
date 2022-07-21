/**
 * 能发送异步ajax请求的函数模块
 * 封装axios库
 */

import axios from 'axios'
import { message } from 'antd'

export default function ajax(url, data, type='GET') {
    /**
     * 优化ajax处理模块，使得再调用时不用trycatch来捕获错误，在这里已完成全部处理
     * 1.在外层创建一个自己的Promise对象，请求出错时，不reject(error),直接提示错误信息
     * 2.异步得到的不是response,而是response.data
     * 在请求成功resolve时:resolve(reponse.data)
     */
    let promise
    return new Promise((resolve, reject) => {
        if (type === 'GET') {
            promise = axios.get(url, { //配置对象
                params: data  //指定请求参数
            })
        } else {
            promise = axios.post(url, data)
        }
        //取得promise状态
        promise.then(response => {
            resolve(response.data)
        }).catch(error => {
            message.error('请求出错了' + error.message)
        })
    })

}