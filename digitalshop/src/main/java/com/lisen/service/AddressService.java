package com.lisen.service;

import com.lisen.pojo.Address;

import java.util.List;

public interface AddressService {
        //创建新的收货地址
        void addNewAddress(Integer uid, String username, Address address);

        //查询某用户的收货地址列表数据
        List<Address> getByUid(Integer uid);

        //删除收货地址
        void delete(Integer aid, Integer uid, String username);

        //根据收货地址数据的id，查询收货地址详情
        Address getByAid(Integer aid, Integer uid);
}
