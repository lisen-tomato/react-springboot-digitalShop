package com.lisen.mapper;

import com.lisen.controller.FileUploadController;
import com.lisen.pojo.District;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

@SpringBootTest
//表示启动这个单元测试类（单元测试类是不能运行的），需要传递一个参数，必须是SpringRunner的实例类型
@RunWith(SpringRunner.class)
public class DistrictMapperTest {

    @Autowired
    private DistrictMapper districtMapper;

    @Test
    public void findByParentTest(){
//        List<District> districtList = districtMapper.findByParent("86");
        List<District> districtList = districtMapper.findByParent("650000");
        districtList.forEach(System.out::println);
    }

    @Test
    public void findNameByCodeTest(){
        String name = districtMapper.findNameByCode("820000");
        System.out.println(name);
    }


}
