package com.lisen.mapper;

import com.lisen.pojo.Order;
import com.lisen.pojo.OrderItem;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
import java.util.List;

@Mapper
public interface OrderMapper {
    //插入订单数据
    Integer insertOrder(Order order);

    //插入订单商品数据
    Integer insertOrderItem(OrderItem orderItem);

    //根据用户id查询订单
    List<Order> findOrderByUid(@Param("uid") Integer uid);

    //根据订单id查询订单项
    List<OrderItem> findItemByOid(@Param("oid") Integer oid);

    //获取所有订单
    List<Order> getOrderList();

    //根据订单id删除订单
    Integer deleteOrderByOid(@Param("oid") Integer oid);

    //根据订单id删除订单项
    Integer deleteOrderItemByOid(@Param("oid") Integer oid);

    //订单支付时间
    Integer updatePayTime(@Param("oid") Integer oid, @Param("payTime") Date payTime);

}
