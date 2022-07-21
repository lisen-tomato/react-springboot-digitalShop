package com.lisen.mapper;

import com.lisen.pojo.Cart;
import com.lisen.pojo.CartData;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface CartMapper {

    //插入购物车数据
    Integer insert(Cart cart);

    //查询用户的购物车数据
    List<CartData> findCartByUid(@Param("uid") Integer uid);

    //根据购物车id删除购物车
    Integer deleteCartById(@Param("cid") Integer cid);

    /*根据若干个购物车数据id查询详情的列表*/
    List<CartData> findCartByCids(Integer[] cids);
}
