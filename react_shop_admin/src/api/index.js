/**
 * 包含所有接口请求函数的模块
 */
import ajax from './ajax'
import jsonp from 'jsonp'
import { message } from 'antd'

//登录
export const reqLogin = (username,password) => ajax('/api/admin/login',{username,password},'POST')

/**
 * json请求的接口请求函数
 */

export const reqWeather = ()=>{
   return new Promise((resolve,reject)=>{
    const url = 'https://restapi.amap.com/v3/weather/weatherInfo?key=72f95aab0a7263dea78130441fa53b98&city=110000&extensions=base&output=JSON'
    jsonp(url,{},(error,data)=>{
        //成功
        if(!error && data.status==='1'){
            //city weather reporttime 取出数据
           const {city,weather} = data.lives[0]
           resolve({city,weather})

        }else {
            //失败了，统一处理错误
            message.error('获取天气信息失败')
        }
    })
   })
}

//获取分类列表
export const reqCategorys = ()=>ajax('/api/admin/category/getCategoryList')
//获取一个分类
export const reqCategory = (categoryId)=>ajax('/api/admin/category/findCategoryById',{categoryId},'POST')
//添加分类
export const reqAddCategory = (categoryName)=>ajax('/api/admin/category/addCategory',{categoryName},'POST')
//更新分类
export const reqUpdateCategory = ({categoryId,categoryName})=>ajax('/api/admin/category/updateCategory',{categoryId,categoryName},'POST')
//删除分类
export const reqDeleteCategory =(categoryId)=>ajax('/api/admin/category/deleteCategory',{categoryId},'POST')
//商品分页列表
export const reqProducts = (pageNum,pageSize) => ajax('/api/admin/product/selectPage',{pageNum,pageSize},'POST')
//搜索商品分页列表
//searchType:搜索的类型，productName/productDesc
export const reqSearchProducts = (pageNum,pageSize,searchName,searchType) => ajax('/api/admin/product/search',{
    pageNum,
    pageSize,
    searchType, 
    searchName
    },
'POST')

//添加商品
export const reqAddProduct = (product) => ajax('/api/admin/product/addProduct',product,'POST')
//更新商品
export const reqUpdateProduct = (product) => ajax('/api/admin/product/updateProduct',product,'POST')

//删除商品
export const reqDeleteProduct = (id) => ajax('/api/admin/product/deleteProduct',{id},'POST')

//查询所有订单
export const reqGetOrderLsit = () => ajax('/api/admin/order/getOrder')

//根据订单id查询订单项
export const reqFindItem = (oid) => ajax('/api/user/findOrderItem',{oid},'POST')

//删除订单
export const reqDeleteOrder = (oid) => ajax('/api/admin/deleteOrder',{oid},'POST')

//删除图片
export const reqDeleteImg = (name) => ajax('/api/deleteImg',{name},'POST')




