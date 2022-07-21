package com.lisen.service.Impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.lisen.mapper.ProductMapper;
import com.lisen.pojo.Product;
import com.lisen.service.ProductService;
import com.lisen.utils.PageRequest;
import com.lisen.utils.PageResult;
import com.lisen.utils.PageUtils;
import com.lisen.utils.SearchPageRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductMapper productMapper;

    //分页查询结果
    @Override
    public PageResult selectPage(PageRequest pageRequest) {
        return PageUtils.getPageResult(pageRequest,getPageInfo(pageRequest));
    }

    public List<Product> selectProductByCategoryId(Integer categoryId){
        return productMapper.selectProductByCategoryId(categoryId);
    }

    //搜索查询结果
    @Override
    public PageResult searchPage(SearchPageRequest searchPageRequest) {
        return PageUtils.getSearchPageResult(searchPageRequest,getPageInfo(searchPageRequest));
    }

    //根据id查询商品
    @Override
    public Product findProductById(Integer id) {
        // 根据参数id调用私有方法执行查询，获取商品数据
        Product product = productMapper.findProductById(id);
        return product;
    }

    //添加商品
    @Override
    public Integer addProduct(Product product) {
        return productMapper.addProduct(product);
    }

    //修改商品
    @Override
    public Integer updateProduct(Product product) {
        return productMapper.updateProduct(product);
    }

    @Override
    public Integer deleteProduct(Integer id) {
        return productMapper.deleteProduct(id);
    }


    //调用分页插件完成分页所有商品分页
    private PageInfo<Product> getPageInfo(PageRequest pageRequest) {
        int pageNum = pageRequest.getPageNum();
        int pageSize = pageRequest.getPageSize();
        PageHelper.startPage(pageNum, pageSize);
        List<Product> productMenus = productMapper.selectPage();
        return new PageInfo<Product>(productMenus);
    }

    //查询商品分页
    private PageInfo<Product> getPageInfo(SearchPageRequest searchPageRequest){
        int pageNum = searchPageRequest.getPageNum();
        int pageSize = searchPageRequest.getPageSize();
        String searchType = searchPageRequest.getSearchType();
        String searchName = searchPageRequest.getSearchName();

        PageHelper.startPage(pageNum,pageSize);
        List<Product> products = productMapper.searchPage(searchType, searchName);
        return new PageInfo<Product>(products);
    }



}
