package com.lisen.service;

import com.lisen.pojo.District;

import java.util.List;

public interface DistrictService {

    //获取全国所有省/某省所有市/某市所有区
    List<District> getByParent(String parent);

    //根据省/市/区的行政代号获取省/市/区的名称
    String getNameByCode(String code);
}
