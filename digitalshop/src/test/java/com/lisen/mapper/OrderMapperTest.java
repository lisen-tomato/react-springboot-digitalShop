package com.lisen.mapper;

import com.lisen.pojo.Order;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Date;

@SpringBootTest
//表示启动这个单元测试类（单元测试类是不能运行的），需要传递一个参数，必须是SpringRunner的实例类型
@RunWith(SpringRunner.class)
public class OrderMapperTest {

    @Autowired
    private OrderMapper orderMapper;

    @Test
    public void insertOrderTest(){
        Order order = new Order();
        Date date = new Date();

        order.setUid(99);
        order.setRecvName("你好");
        order.setRecvPhone("110120");
        order.setRecvProvince("广东省");
        order.setRecvCity("梅州市");
        order.setRecvArea("梅江区");
        order.setRecvAddress("金山街道");
        order.setTotalPrice(1000);
        order.setOrderTime(date);
        order.setPayTime(date);

        System.out.println(order);
        Integer integer = orderMapper.insertOrder(order);
        System.out.println("影响行数：" + integer);
    }
}
