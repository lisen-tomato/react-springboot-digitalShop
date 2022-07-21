package com.lisen.mapper;
import com.lisen.pojo.Product;
import com.lisen.pojo.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface UserMapper {

    //用户注册
    Integer addUser(User user);

    //验证用户名
    User checkUsername(String username);

    //用户登录
    User findByUsername(String username);

    //根据id查询用户数据
    User findByUid(Integer uid);

    //根据uid更新用户资料,user封装用户id和新个人资料，返回行数
    Integer updateInfoByUid(User user);

    //根据商品名称搜索商品
    List<Product>  getProductByName(@Param("productName") String productName);

}
