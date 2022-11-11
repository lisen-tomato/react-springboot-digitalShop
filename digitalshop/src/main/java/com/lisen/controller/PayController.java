package com.lisen.controller;


import com.alibaba.fastjson.JSONObject;
import com.alipay.api.AlipayApiException;
import com.alipay.api.AlipayClient;
import com.alipay.api.DefaultAlipayClient;
import com.alipay.api.request.AlipayTradePagePayRequest;
import com.alipay.api.response.AlipayTradePagePayResponse;
import com.lisen.mapper.OrderMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;
import java.util.Random;
import java.util.UUID;

@RestController
public class PayController {

    @Autowired
    private OrderMapper orderMapper;

    //App Id
    private final String APP_ID = "";

    //应用私钥
    private final String APP_PRIVATE_KEY = ""
    private final String CHARSET = "UTF-8";

    //支付宝公钥
    private final String ALIPAY_PUBLIC_KEY = "";
    //沙箱接口路径
    private final String GATEWAY_URL = "https://openapi.alipaydev.com/gateway.do";
    private final String FORMAT = "JSON";

    private final String SIGN_TYPE = "RSA2";

    //支付宝异步通知路径，付款完毕后会调用本项目的方法，必须为公网地址
//    private final String NOTIFY_URL = "http://127.0.0.1/notifyUrl";
    //支付宝同步通知路径，付款完毕后跳转本项目的页面，可以不是公网地址
    private final String RETURN_URL = "http://localhost:3000/myOrder";



    @RequestMapping("/user/pay")
    public String  pay(@RequestBody Map<String,Integer> map){

        AlipayClient alipayClient = new DefaultAlipayClient(GATEWAY_URL,APP_ID,APP_PRIVATE_KEY,FORMAT,CHARSET,ALIPAY_PUBLIC_KEY,SIGN_TYPE);
        AlipayTradePagePayRequest request = new AlipayTradePagePayRequest();

        //获取订单编号
        Integer oid = map.get("oid");

        String out_trade_no = map.get("oid").toString();
        Integer totalPrice = map.get("totalPrice");


        request.setNotifyUrl("");
        request.setReturnUrl(RETURN_URL);

        JSONObject bizContent = new JSONObject();
        bizContent.put("out_trade_no", out_trade_no);
        bizContent.put("total_amount", totalPrice);
        bizContent.put("subject", "测试商品");
        bizContent.put("product_code", "FAST_INSTANT_TRADE_PAY");


        request.setBizContent(bizContent.toString());

        AlipayTradePagePayResponse response = null;
        String form = null;
        try {
            response = alipayClient.pageExecute(request);
            form = response.getBody();
        } catch (AlipayApiException e) {
            e.printStackTrace();
        }

        if (response.isSuccess()){
            System.out.println("调用成功");
            Date payTime = new Date();
            Integer integer = orderMapper.updatePayTime(oid, payTime);
            System.out.println("支付时间影响行数：" + integer);

        } else {
            System.out.println("调用失败");
        }

        return form;

    }
}
