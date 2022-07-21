package com.lisen.mapper;

import com.lisen.pojo.Category;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface CategoryMapper {

    //查询分类列表
    List<Category> getCategoryList();
    //根据id查询分类名称
    Category findCategoryById(@Param("categoryId") int categoryId);
    //修改分类
    int updateCategory(@Param("categoryId") int categoryId, @Param("categoryName") String categoryName);
    //添加分类
    int addCategory(Category category);
    //删除分类
    int deleteCategoryById(@Param("categoryId") int categoryId);
}
