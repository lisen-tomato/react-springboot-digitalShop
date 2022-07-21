package com.lisen.service;


import com.lisen.pojo.Order;
import com.lisen.pojo.OrderItem;

import java.util.List;
import java.util.Map;

public interface OrderService {
    //创建订单
    Order createOrder(Map<String,Object> orderMap);

    //查询订单
    List<Order> findOrder(Integer uid);

    //查询订单项
    List<OrderItem> findItem(Integer oid);

    //获取所有订单
    List<Order> getOrderList();

    //删除订单
    Integer deleteOrder(Integer oid);
}
