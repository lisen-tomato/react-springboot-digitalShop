package com.lisen.service;

import com.lisen.mapper.CategoryMapper;
import com.lisen.pojo.Category;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

@SpringBootTest
//表示启动这个单元测试类（单元测试类是不能运行的），需要传递一个参数，必须是SpringRunner的实例类型
@RunWith(SpringRunner.class)
public class CategoryServiceTest {

    @Autowired
    private CategoryService categoryService;

    //获取分类列表
    @Test
    public void categoryMapperTest(){
        List<Category> categorys = categoryService.getCategoryList();
        categorys.forEach(System.out::println);
    }

    //更新分类
    @Test
    public void updateCategory(){
        Category category = new Category(1,"手机333");
        int i = categoryService.updateCategory(category);
        System.out.println(i);
    }
}
