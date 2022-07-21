package com.lisen.service.Impl;

import com.lisen.mapper.CategoryMapper;
import com.lisen.pojo.Category;
import com.lisen.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryMapper categoryMapper;

    //获取分类列表
    @Override
    public List<Category> getCategoryList() {
        return categoryMapper.getCategoryList();
    }

    //根据id查找分类
    @Override
    public Category findCategoryById(int categoryId) {
        return categoryMapper.findCategoryById(categoryId);
    }

    //修改分类
    @Override
    public int updateCategory(Category category) {
        int categoryId = category.getCategoryId();
        String categoryName = category.getCategoryName();
        return categoryMapper.updateCategory(categoryId,categoryName);
    }

    //添加分类
    @Override
    public int addCategory(Category category) {
        return categoryMapper.addCategory(category);
    }

    //删除分类
    @Override
    public int deleteCategory(int categoryId) {
        return categoryMapper.deleteCategoryById(categoryId);
    }


}
