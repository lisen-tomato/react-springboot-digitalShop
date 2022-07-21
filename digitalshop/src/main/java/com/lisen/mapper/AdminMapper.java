package com.lisen.mapper;

import com.lisen.pojo.Admin;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface AdminMapper {
    //查找用户
    public Admin findAdmin(@Param("username") String username,@Param("password") String password);
}
