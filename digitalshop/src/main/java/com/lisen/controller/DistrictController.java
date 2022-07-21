package com.lisen.controller;

import com.lisen.pojo.District;
import com.lisen.service.DistrictService;
import com.lisen.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class DistrictController {

    @Autowired
    private DistrictService districtService;

    @RequestMapping("/user/district")
    public Object getByParent(@RequestBody Map<String,String> map){
        String parent = map.get("parent");
        System.out.println(parent);
        List<District> data = districtService.getByParent(parent);
        return new Response(200,"ok",data);
    }
}   
