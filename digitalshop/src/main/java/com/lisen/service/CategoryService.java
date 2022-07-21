package com.lisen.service;

import com.lisen.pojo.Category;

import java.util.List;

public interface CategoryService {

    //获取分类列表
    public List<Category> getCategoryList();

    //根据id查询分类
    public Category findCategoryById(int categoryId);

    //更新分类
    public int updateCategory(Category category);

    //添加分类
    public int addCategory(Category category);

    //删除分类
    public int deleteCategory(int categoryId);
}
