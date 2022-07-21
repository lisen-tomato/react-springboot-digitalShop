/**
 * 包含所有接口请求函数的模块
 */
 import ajax from './ajax'
 
 //登录
 export const reqLogin = (username,password) => ajax('/api/user/login',{username,password},'POST')

 //验证同户名是否存在
 export const reqCheckUsername = (username) => ajax('/api/user/checkUsername',{username},'POST')

 //注册
 export const reqRegister= (username,password,phone,email) => ajax('/api/user/register',{username,password,phone,email},'POST')

 //获取用户资料
 export const reqGetUser = (uid) => ajax ('/api/user/getUser',{uid},'POST')

 //修改用户资料
 export const reqUpdateUser = (uid,username,password,email,phone) => ajax('/api/user/updateUser',{uid,username,password,email,phone},'POST')
 
 //获取分类列表
 export const reqCategorys = ()=>ajax('/api/admin/category/getCategoryList')

 //根据分类获取商品
 export const reqGetProductS = (categoryId) => ajax('/api/admin/product/productList',{categoryId},'POST')

 //根据商品名称获取商品
 export const reqGetProduct = (productName) => ajax('/api/user/getProduct',{productName},'POST')

 //商品加入购物车
 export const reqAddToCart = (uid,pid,num,price) => ajax('/api/user/addToCart',{uid,pid,num,price},'POST')

 //根据用户id获取购物车列表
 export const reqGetCarts = (uid) => ajax('/api/user/getCartByUid',{uid},'POST')

 //根据购物车id删除
 export const reqDeleteCart = (cid) => ajax('/api/user/deleteCartByid',{cid},'POST')

 //获取省市区列表
 export const reqGetDistrict = (parent) => ajax ('/api/user/district',{parent},'POST')

 //创建订单
 export const reqCreateOrder = (uid,recvName,recvPhone,recvProvince,recvCity,recvArea,recvAddress,totalPrice,orderItemList) => ajax(
     '/api/user/createOrder',{uid,recvName,recvPhone,recvProvince,recvCity,recvArea,recvAddress,totalPrice,orderItemList},'POST')

//根据用户id查询订单
export const reqFindOrder = (uid) => ajax('/api/user/findOrder',{uid},'POST')

//根据订单id查询订单项
export const reqFindItem = (oid) => ajax('/api/user/findOrderItem',{oid},'POST')

//订单支付
export const reqPay = (oid,totalPrice) => ajax('/api/user/pay',{oid,totalPrice},'POST')

 
 