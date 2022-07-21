package com.lisen.mapper;

import com.lisen.pojo.Product;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

@SpringBootTest
//表示启动这个单元测试类（单元测试类是不能运行的），需要传递一个参数，必须是SpringRunner的实例类型
@RunWith(SpringRunner.class)
public class ProductMapperTest {

    @Autowired
    private ProductMapper productMapper;

    @Test
    public void selectPageTest(){
        List<Product> products = productMapper.selectPage();
        products.forEach(System.out::println);
    }

    @Test
    public void searchPageTest(){
        List<Product> products = productMapper.searchPage("productName", "广");
        products.forEach(System.out::println);
    }

    @Test
    public void selectProductByCategoryIdTest() {
        List<Product> products = productMapper.selectProductByCategoryId(1);
        products.forEach(System.out::println);
    }
}
