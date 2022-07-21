package com.lisen.controller;


import com.lisen.pojo.Category;
import com.lisen.service.CategoryService;
import com.lisen.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class CategoryController {
    
    @Autowired
    private CategoryService categoryService;

    //获取分类列表
    @RequestMapping("/admin/category/getCategoryList")
    public Object getCategoryList(){
        List<Category> category = categoryService.getCategoryList();
        System.out.println(category);
        if(category != null){
            return new Response(200,"ok",category);
        }
        return new Response(400,"获取分类列表失败");
    }

    //根据id查询分类
    @RequestMapping("/admin/category/findCategoryById")
    public Object findCategoryById(@RequestBody Map<String,Integer> map){
        Integer categoryId = map.get("categoryId");
        return categoryService.findCategoryById(categoryId);
    } 

    //修改分类
    @RequestMapping("/admin/category/updateCategory")
    public Object updateCategory(@RequestBody Category category){
        System.out.println(category);
        int i = categoryService.updateCategory(category);
        if(i > 0 ){
            return new Response(200,"修改成功");
        }
        return new Response(400,"修改失败");
    }

    //增加分类
    @RequestMapping("/admin/category/addCategory")
    public Object addCategory(@RequestBody Map<String,String> map){
        String categoryName = map.get("categoryName");

        Category category = new Category();
        category.setCategoryName(categoryName);

        int row = categoryService.addCategory(category);
        if(row > 0){
            return new Response(200,"添加成功");
        }
        return new Response(400,"添加失败");
    }

    //删除分类
    @RequestMapping("/admin/category/deleteCategory")
    public Object deleteCategory(@RequestBody Map<String,Integer> map){
        Integer categoryId = map.get("categoryId");
        System.out.println(categoryId);
        int i = categoryService.deleteCategory(categoryId);
        if(i > 0){
            return new Response(200,"删除成功");
        }
        return new Response(400,"删除失败");
    }
}
