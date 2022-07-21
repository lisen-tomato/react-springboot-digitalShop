package com.lisen.service;

import com.lisen.pojo.Product;
import com.lisen.utils.PageRequest;
import com.lisen.utils.PageResult;
import com.lisen.utils.SearchPageRequest;

import java.util.List;

public interface ProductService {

    //所有商品分页查询
    PageResult selectPage(PageRequest pageRequest);

    //根据分类id查询商品
    List<Product> selectProductByCategoryId(Integer categoryId);

    //搜索分页查询
    PageResult searchPage(SearchPageRequest searchPageRequest);

    //根据商品id查询商品详情
    Product findProductById(Integer id);

    //添加商品
    Integer addProduct(Product product);

    //修改商品
    Integer updateProduct(Product product);

    //删除商品
    Integer deleteProduct(Integer id);
}
