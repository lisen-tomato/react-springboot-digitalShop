package com.lisen.service.Impl;

import com.lisen.mapper.UserMapper;
import com.lisen.pojo.Product;
import com.lisen.pojo.User;
import com.lisen.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    //用户注册
    @Override
    public void register(User user) {
        Integer rows = userMapper.addUser(user);
    }

    @Override
    public User checkUsername(String username) {
        return userMapper.checkUsername(username);
    }

    //用户登录
    @Override
    public User login(String username, String password) {
        // 调用userMapper的findByUsername()方法，根据参数username查询用户数据
        User result = userMapper.findByUsername(username);
        // 判断查询结果是否为null
        if (result == null) {
            System.out.println("用户数据不存在");
            return result;
        }

        if (!result.getPassword().equals(password)) {
            System.out.println("密码验证失败的错误");
        }

        // 创建新的User对象
        User user = new User();
        // 将查询结果中的uid、username、avatar封装到新的user对象中
        user.setUid(result.getUid());
        user.setUsername(result.getUsername());
        user.setAvatar(result.getAvatar());
        // 返回新的user对象
        return user;
    }



    //获取当前登录用户的信息
    @Override
    public User getByUid(Integer uid) {
        // 调用userMapper的findByUid()方法，根据参数uid查询用户数据
        User result = userMapper.findByUid(uid);
        // 创建新的User对象
        User user = new User();
        // 将以上查询结果中的username/phone/email/gender封装到新User对象中
        user.setUid(result.getUid());
        user.setUsername(result.getUsername());
        user.setPassword(result.getPassword());
        user.setPhone(result.getPhone());
        user.setEmail(result.getEmail());
        // 返回新的User对象
        return user;
    }

    //修改用户个人资料
    @Override
    public void changeInfo( User user) {
        // 调用userMapper的findByUid()方法，根据参数uid查询用户数据
        User result = userMapper.findByUid(user.getUid());
        // 判断查询结果是否为null
        if (result == null) {
            System.out.println("用户数据不存在");
        }

        // 向参数user中补全数据：uid
        user.setUid(user.getUid());
        // 调用userMapper的updateInfoByUid(User user)方法执行修改，并获取返回值
        Integer rows = userMapper.updateInfoByUid(user);
        // 判断以上返回的受影响行数是否不为1
        if (rows != 1) {
            System.out.println("更新用户数据时出现未知错误，请联系系统管理员");
        }
    }

    //根据商品名称搜索商品
    @Override
    public List<Product> getProductByName(String productName) {
//        System.out.println("service"+productName);
        return userMapper.getProductByName(productName);
    }
}
