package com.lisen.mapper;

import com.lisen.pojo.Address;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
import java.util.List;

@Mapper
public interface AddressMapper {

    /*插入收货地址数据*/
    Integer insert(Address address);


    /*查询某用户的收货地址列表数据*/
    List<Address> findByUid(Integer uid);

    /* 根据收货地址aid值，查询收货地址详情*/
    Address findByAid(Integer aid);

    /* 根据收货地址id删除数据*/
    Integer deleteByAid(Integer aid);

}
