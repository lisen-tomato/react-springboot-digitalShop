package com.lisen.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.lisen.pojo.CartData;
import com.lisen.pojo.Order;
import com.lisen.pojo.OrderItem;
import com.lisen.service.OrderService;
import com.lisen.utils.Response;
import netscape.javascript.JSObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class OrderController {
    @Autowired
    private OrderService orderService;

    //创建订单
    @RequestMapping("/user/createOrder")
    public Object createOrder(@RequestBody Map<String,Object> orderMap) {
        // 调用业务对象执行业务
        System.out.println(orderMap);
        Object orderItemList = orderMap.get("orderItemList");
        Order order = orderService.createOrder(orderMap);

        if(order != null){
            return new Response(200,"提交订单成功",order);
        } else {
            return new Response(-1,"订单提交失败，请联系管理员");
        }
    }

    //查询订单
    @RequestMapping("/user/findOrder")
    public Object findOrder(@RequestBody Map<String,Integer> map){
        Integer uid = map.get("uid");
        List<Order> orderList = orderService.findOrder(uid);
        if(orderList != null){
            return new Response(200,"ok",orderList);
        } else {
            return new Response(-1,"订单查询失败");
        }
    }

    //查询订单项
    @RequestMapping("/user/findOrderItem")
    public Object findOrderItem(@RequestBody Map<String,Integer> map){
        Integer oid = map.get("oid");
        List<OrderItem> orderItemList = orderService.findItem(oid);
        if(orderItemList != null){
            return new Response(200,"ok",orderItemList);
        } else {
            return new Response(-1,"订单项查询失败");
        }
    }

    //获取所有订单
    @RequestMapping("/admin/order/getOrder")
    public Object getOrder(){
        List<Order> orderList = orderService.getOrderList();
        if (orderList != null){
            return new Response(200,"ok",orderList);
        } else {
            return new Response(-1,"没有订单");
        }
    }

    //删除订单
    @RequestMapping("/admin/deleteOrder")
    public Object deleteOrder(@RequestBody Map<String,Integer> map){
        Integer oid = map.get("oid");
//        System.out.println(oid);
        Integer integer = orderService.deleteOrder(oid);
        if(integer > 0){
            return new Response(200,"订单删除成功");
        } else {
            return new Response(-1,"订单删除失败");
        }
    }
}
