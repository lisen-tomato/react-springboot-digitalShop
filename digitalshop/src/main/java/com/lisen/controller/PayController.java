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
    private final String APP_ID = "2021000119696551";

    //应用私钥
    private final String APP_PRIVATE_KEY = "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCgqBqdrNu1Yzrf8iQTYgqp03pk1dR1gJamJa/rDPpn7Z/rA4s57SdKuz2yG6K/xYEI24YYjdem32xsZ4pes+aCoQkc9gI07SuT3WfvQGQoGO23ATo5ZETjNFsnTMAct234W814+BSVJKo+p0NO54Dtilifk7nbdp/tzoYHJ7voOLgrdD6Lo3uTgUGWyTPviMTyRyKU3k80YXmZYxfIIuXfD+N1g+EAytn9PK9C9m9NV6SSWpmVzZYQNvmxGjVUB0//uHAIq75xVFJHU7hqRqyJBRTzfHVAlZlwct814k7pYE2UyKAcWSMixOF1HSQLaRHMo1EOOp2iXAWxMHB7E9AtAgMBAAECggEAT/RZiq9EiPlhi6KOobbhZ7N/7j8dBX2BfB61dl13IdH5DJUu7R1BuMeG5OUsEhTRKv9VtVKiSMJYy3qcOpV92vUZ+/fTEVQXo/dEiqWZMvt1Eubhez6Tqh+cXeqskZ4YdMn7cIDGfZNJxvSnYtWELLP1dzWmAbr/zPJDcbwsoF0PqabAGbSwY9aZAYTHkqF9sgNFgWWWM9o7Y6pJ502Ds/8J1p+rb0jngzroktvegR0X+ZhnHa1TuyvJf6MQ7CNsuIuYCfXyrZbk/po06Ep/r9rQQzupCW0KH45rqs/wXiXJBIHKKPsmtnOo8An+nv8bsBVVzWR1Qpk5uEFKSmtMAQKBgQDZ6aeXnZjILqo0IuACEoNBLmJm41DS02YM3AECowzh3FQNM71E/1GlzLlvINsiSVyu3eqxz/soacCS7bpVUI9M0th2T8YowrX4pnnH/PAUGx5rOZIi7Zpy8McyQe14Nvm9c6xWSBRejuwkMHk94AOkLfipfBUGeRFruUmxqtjWDQKBgQC8vJGdUbd8YnZA0KvGvv+8P/YhUOSEh8ih8MO9+mR7LTjO/dLmfAIJFQ3NDepwQ9+jFPHAixPIcUg2k02pRAwBMpYg3EOcDx3LzXB8Lkzs/ZxRNLRJnnikbAM+flHu4vPpptV4Zgc8HpjCg3ilfJpnKJxq5KMGz8NQrejcO796oQKBgHwMCY5CdWWHQvaY38HuPe+N8xA02J6bHp21Y5HXtY6hOOunB1hOq3DhoLHFF1lmP69/voloJsYzpR8+2vKUAG8wG28GLHypkqMwSWTx9MzNPzy0sh7V+TTzIcHXS9JCIVqajYE0WPwXCg/z1CDH8+qzDLmWW/WqV6Nl/7B23CbFAoGBALMxWhOCtXIcTegl9yHA0C/cjoR9OCn4fW37mO0z4djtS6WDaoy4qnoTCkJo9vBWEOvWg91qboL9wzFF1BNkbv1oGQ/j8TEnTQPl7umIUDMmaxbSsmW/Vw3NG5tm9cWYpzps0vr36+CRsDnl91Mvpa1R6oi2wW5DLk7Yf2EyPQ9hAoGACXE1CK+pDae1e20ORaJYDK03Y+GY9odDlySJh+e4v3ujSqbs/LdHSZUkwh1m0WGTWEFXvjr9sMvrwWddtFNpK6EOFlKCdFhzMLr/KMCozhG8uRNAmC9L9zk8Y+oDj6+fLIvWiwrK4Uua8x4XtmCuKhp723P3UexS5HF3v/F4Zik=";

    private final String CHARSET = "UTF-8";

    //支付宝公钥
    private final String ALIPAY_PUBLIC_KEY = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAjkahl3QEA8M0yiTcxHL61Z5D6rBBXY7lNP91gRE+GCt1nVdk6Z5+S2ZtB2oCQk6Bea8ow1Xq7JkVrtn+2EQuEXoBEwoR7UJDHLcVdyhEUH1XORSs7B4OLTXJQCgH1GrNKSd8S4ESN2RZ/JnPwKE/YblxUTLlba55K1wqzLGGGXpkQgaH/IGKvQL/QYa09f+wAEdsnctaBo1JywbzjvGEEKVKehs3xX6gucI/l9NV61eU6IRPdd1yhMTd40JQSBswk+YEOotRaxdAtADM3FUPwqP7y8gOu36x63mEMG0G3Lh3Q1/dDxyNkDlUuTqazp/KM1Ffc80Fqi3t5SbKyuiq1wIDAQAB";
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
