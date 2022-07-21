package com.lisen.mapper;

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
public class CategoryMapperTest {

    @Autowired
    private CategoryMapper categoryMapper;

    //查询分类
    @Test
    public void categoryMapperTest(){
        List<Category> categoryList = categoryMapper.getCategoryList();
        System.out.println(categoryList);
    }

    //根据id查询分类
    @Test
    public void findCategoryByIdTest(){
        Category categoryById = categoryMapper.findCategoryById(1);
        System.out.println(categoryById);
    }

    //修改分类
    @Test
    public void updateCategoryTest(){
        int rows = categoryMapper.updateCategory(1, "手机22");
        System.out.println(rows);

    }

    //增加分类
    @Test
    public void addCategoryTest(){
        int rows = categoryMapper.addCategory(new Category(6,"你好"));
        System.out.println(rows);
    }

    //删除分类
    @Test
    public void deleteCategoryTest(){
        int i = categoryMapper.deleteCategoryById(9);
        System.out.println(i);
    }

}
