package com.lisen.controller;

import com.lisen.pojo.Cart;
import com.lisen.pojo.CartData;
import com.lisen.pojo.Product;
import com.lisen.pojo.User;
import com.lisen.service.CartService;
import com.lisen.service.UserService;
import com.lisen.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

@RestController
public class  UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private CartService cartService;

    //用户注册
    @RequestMapping("/user/register")
    public Object register (@RequestBody User user){
        System.out.println(user);
        userService.register(user);
        return new Response(200,"注册成功");
    }

    //用户名验证
    @RequestMapping("/user/checkUsername")
    public Object checkUsername(@RequestBody Map<String,String> map){
        System.out.println(map);
        String username = map.get("username");
        System.out.println(username);
        User user = userService.checkUsername(username);
        if(user != null){
            return new Response(200,"用户名可用");
        } else {
            return new Response(-1,"用户名不存在，请注册");
        }
    }


    //用户登录
    @RequestMapping("/user/login")
    public Object login(@RequestBody Map<String,String> map){
        String username = map.get("username");
        String password = map.get("password");
        User loginUser = userService.login(username, password);
        if(loginUser!=null){
            return new Response(200,"登录成功",loginUser);
        } else {
            return new Response(-1,"用户名或密码错误");
        }
    }

    //根据用户id获取用户信息
    @RequestMapping("/user/getUser")
    public Object getUser(@RequestBody Map<String,Integer> map){
        Integer uid = map.get("uid");
        User user = userService.getByUid(uid);
        if(user != null){
            return new Response(200,"ok",user);
        } else {
            return new Response(-1,"failed");
        }
    }

    //用户信息修改
    @RequestMapping("/user/updateUser")
    public Object updateUser(@RequestBody User user){
        System.out.println(user);
        userService.changeInfo(user);
        return new Response(200,"修改成功");
    }

    //根据商品名搜索商品
    @RequestMapping("/user/getProduct")
    public Object getProduct(@RequestBody Map<String,String> map){
        System.out.println(map);
        String productName = map.get("productName");
        List<Product> productList = userService.getProductByName(productName);
        System.out.println("list:"+productList);
        if(!productList.isEmpty()){
            return new Response(200,"ok",productList);
        } else {
            return new Response(-1,"商品不存在");
        }
    }

    //用户添加商品至购物车
    @RequestMapping("/user/addToCart")
    public Object addToCart(@RequestBody Map<String,Integer> map){
        //System.out.println(map);
        Integer uid = map.get("uid");
        Integer pid = map.get("pid");
        Integer num = map.get("num");
        Integer price = map.get("price");

        Integer integer = cartService.addToCart(uid, pid, price, num);

        if(integer > 0){
            return new Response(200,"购物车添加成功");
        } else{
            return new Response(-1,"购物车添加异常，请联系管理员");
        }
    }

    //根据用户id获取用户购物车数据
    @RequestMapping("/user/getCartByUid")
    public Object getCartByUid(@RequestBody Map<String,Integer> map){
        Integer uid = map.get("uid");
        final List<CartData> carts = cartService.getCartByUid(uid);
        if(carts != null){
            return new Response(200,"ok",carts);
        } else {
            return new Response(-1,"购物车为空");
        }
    }

    @RequestMapping("/user/deleteCartByid")
    public Object deleteCartByid(@RequestBody Map<String,Integer> map){
        System.out.println(map);
        Integer cid = map.get("cid");
        Integer integer = cartService.deleteCartById(cid);
        if(integer > 0) {
            return new Response(200,"删除成功");
        } else {
            return new Response(-1,"删除异常，请联系管理员");
        }
    }
}
