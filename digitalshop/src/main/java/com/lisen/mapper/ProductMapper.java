package com.lisen.mapper;

import com.lisen.pojo.Product;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ProductMapper {
    //分页查询商品
    List<Product> selectPage();

    //根据分类id查询商品列表
    List<Product> selectProductByCategoryId(@Param("categoryId") Integer categoryId);

    //搜索分页商品
    List<Product> searchPage(@Param("searchType") String searchType,@Param("searchName") String searchName);

    //根据id搜索商品
    Product findProductById(Integer id);

    //添加商品
    Integer addProduct(Product product);

    //修改商品
    Integer updateProduct(Product product);

    //删除商品
    Integer deleteProduct(Integer id);
}
