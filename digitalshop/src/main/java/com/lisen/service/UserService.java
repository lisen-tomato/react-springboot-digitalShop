package com.lisen.service;

import com.lisen.pojo.Product;
import com.lisen.pojo.User;

import java.util.List;

public interface UserService {

    //用户注册方法，传user用户数据对象
    void register(User user);

    //用户名验证
    User checkUsername(String username);

    //传用户名和密码，返回用户名，若没有，返回null
    User login(String username,String password);

    //获取当前登录用户的信息,返回当前的登录用户的信息
    User getByUid(Integer uid);

    //修改用户个人资料
    void changeInfo(User user);

    //根据商品名模糊搜索
    List<Product> getProductByName(String productName);

}
