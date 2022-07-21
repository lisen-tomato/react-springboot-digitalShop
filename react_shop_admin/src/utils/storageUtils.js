/* eslint-disable import/no-anonymous-default-export */
/**
 * 进行local数据存储管理数据的模块
 * 
 */
import store from 'store'
const USER_KEY = 'user_key'
export default {
    saveUser(user){
        //设置json格式的对象
        // localStorage.setItem(USER_KEY,JSON.stringify(user))
        store.set(USER_KEY,user)
    },

    getUser(){
        // return JSON.parse(localStorage.getItem(USER_KEY) || '{}')
        return store.get(USER_KEY) || {}
    },

    removeUser(){
        // localStorage.removeItem(USER_KEY)
        store.remove(USER_KEY)
    }


}