package com.lisen.controller;

import com.lisen.pojo.Admin;
import com.lisen.service.AdminService;
import com.lisen.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.DigestUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
public class AdminController {

    @Autowired
    private AdminService adminService;

    @RequestMapping("/admin/login")
    public Object login(@RequestBody Admin admin){

        Admin login = adminService.login(admin.getUsername(), admin.getPassword());
        if(login != null){
            return new Response(0,"登录成功",login);
        } else {
            return new Response(-1,"用户名或密码错误");
        }
    }
}
