package com.lisen.service;

import com.lisen.pojo.Cart;
import com.lisen.pojo.CartData;

import java.util.List;

public interface CartService {

    //添加商品到购物车
    Integer addToCart(Integer uid,Integer pid, Integer price,Integer num);

    //查询某用户的购物车数据
    List<CartData> getCartByUid(Integer uid);

    //根据购物车id删除购物车
    Integer deleteCartById(Integer cid);

    /*根据若干个购物车数据id查询详情的列表*/
    List<CartData> getCartByCids(Integer uid, Integer[] cids);
}
