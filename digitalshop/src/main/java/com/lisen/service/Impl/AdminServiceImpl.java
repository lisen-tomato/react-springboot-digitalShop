package com.lisen.service.Impl;

import com.lisen.mapper.AdminMapper;
import com.lisen.pojo.Admin;
import com.lisen.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminServiceImpl implements AdminService {
    @Autowired
    private AdminMapper adminMapper;

    //用户登录
    @Override
    public Admin login(String username,String password) {
        return adminMapper.findAdmin(username,password);
    }
}
