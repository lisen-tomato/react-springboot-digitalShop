package com.lisen.service;

import com.lisen.pojo.Admin;

public interface AdminService {

    //管理员登录
    public Admin login(String username,String password);
}
