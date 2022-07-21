package com.lisen.service.Impl;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.lisen.mapper.CartMapper;
import com.lisen.mapper.OrderMapper;
import com.lisen.pojo.CartData;
import com.lisen.pojo.Order;
import com.lisen.pojo.OrderItem;
import com.lisen.service.CartService;
import com.lisen.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * 处理订单和订单数据的业务层实现类
 */
@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private OrderMapper orderMapper;
    @Autowired
    private CartMapper cartMapper;
    @Transactional
    @Override
    public Order createOrder(Map<String, Object> orderMap) {
        // 创建当前时间对象
        Date now = new Date();
        Integer uid = (Integer) orderMap.get("uid");
        String recvName = (String) orderMap.get("recvName");
        String recvPhone = (String) orderMap.get("recvPhone");
        String recvProvince = (String) orderMap.get("recvProvince");
        String recvCity = (String) orderMap.get("recvCity");
        String recvArea = (String) orderMap.get("recvArea");
        String recvAddress = (String) orderMap.get("recvAddress");
        Integer totalPrice = (Integer) orderMap.get("totalPrice");

        Object orderItemList = orderMap.get("orderItemList");
        //接收的json数组先转换为字符串
        String orderItemListStr = JSON.toJSONString(orderItemList);
        //转换为CartData的List集合
        List<CartData> carts = JSONArray.parseArray(orderItemListStr, CartData.class);
        // 创建订单数据对象
        Order order = new Order();
        // 补全数据：uid
        order.setUid(uid);
        order.setRecvName(recvName);
        order.setRecvPhone(recvPhone);
        order.setRecvProvince(recvProvince);
        order.setRecvCity(recvCity);
        order.setRecvArea(recvArea);
        order.setRecvAddress(recvAddress);
        order.setTotalPrice(totalPrice);
        //补全总价
        order.setTotalPrice(totalPrice);
        order.setOrderTime(now);

        // 插入订单数据
        Integer rows1 = orderMapper.insertOrder(order);
        if (rows1 != 1) {
            System.out.println("插入订单数据时出现未知错误，请联系系统管理员");
        } else {
            System.out.println("订单插入成功");
        }

        // 遍历orderItems，循环插入订单商品数据
        for (CartData cart : carts) {
            // 创建订单商品数据
            OrderItem item = new OrderItem();
            // 补全数据：setOid(order.getOid())
            item.setOid(order.getOid());
            // 补全数据：pid, title, image, price, num
            item.setPid(cart.getPid());
            item.setTitle(cart.getTitle());
            item.setImage(cart.getImage());
            item.setPrice(cart.getPrice());
            item.setNum(cart.getNum());
            // 插入订单商品数据
            Integer rows2 = orderMapper.insertOrderItem(item);
            //删除购物车对应商品数据
            Integer rows3 = cartMapper.deleteCartById(cart.getCid());
            if (rows2 != 1) {
                System.out.println("插入订单商品数据时出现未知错误，请联系系统管理员");
            }else {
                System.out.println("订单项插入成功");
            }

            if (rows3 != 1) {
                System.out.println("删除购物车数据数据时出现未知错误，请联系系统管理员");
            }else {
                System.out.println("删除购物车成功");
            }

        }
//         返回
        return order;
    }

    //查询订单
    @Override
    public List<Order> findOrder(Integer uid) {
        return orderMapper.findOrderByUid(uid);
    }

    //查询订单项
    @Override
    public List<OrderItem> findItem(Integer oid) {
        return orderMapper.findItemByOid(oid);
    }

    //获取订单列表
    @Override
    public List<Order> getOrderList() {
        return orderMapper.getOrderList();
    }

    //删除订单
    @Override
    public Integer deleteOrder(Integer oid) {
        Integer integer = orderMapper.deleteOrderByOid(oid);
        if(integer > 0){
            return orderMapper.deleteOrderItemByOid(oid);
        } else {
            return -1;
        }
    }
}
