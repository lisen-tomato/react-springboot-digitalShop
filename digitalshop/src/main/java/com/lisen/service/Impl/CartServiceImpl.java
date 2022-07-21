package com.lisen.service.Impl;

import com.lisen.mapper.CartMapper;
import com.lisen.pojo.Cart;
import com.lisen.pojo.CartData;
import com.lisen.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Iterator;
import java.util.List;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartMapper cartMapper;


    //将商品添加入购物车
    @Override
    public Integer addToCart(Integer uid, Integer pid, Integer price, Integer num) {
        Cart cart = new Cart();
        cart.setUid(uid);
        cart.setPid(pid);
        cart.setPrice(price);
        cart.setNum(num);
        Integer integer = cartMapper.insert(cart);
        return integer;
    }

    //根据用户id查询购物车
    @Override
    public List<CartData> getCartByUid(Integer uid) {
        return cartMapper.findCartByUid(uid);
    }

    //根据购物车id删除购物车
    @Override
    public Integer deleteCartById(Integer cid) {
        return cartMapper.deleteCartById(cid);
    }

    @Override
    public List<CartData> getCartByCids(Integer uid, Integer[] cids) {
        List<CartData> list = cartMapper.findCartByCids(cids);
        Iterator<CartData> it = list.iterator();
        while (it.hasNext()) {
            CartData cart = it.next();
            if (!cart.getUid().equals(uid)) {
                it.remove();
            }
        }
        return list;
    }
}
