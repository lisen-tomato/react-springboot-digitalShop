package com.lisen.controller;

import com.lisen.pojo.Product;
import com.lisen.service.ProductService;
import com.lisen.utils.PageRequest;
import com.lisen.utils.Response;
import com.lisen.utils.SearchPageRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class ProductController {

    @Autowired
    private ProductService productService;

    //商品分页
    @RequestMapping("/admin/product/selectPage")
    public Object selectPage(@RequestBody PageRequest pageRequest){
        System.out.println(pageRequest);
        return productService.selectPage(pageRequest);
    }
    //查找分页
    @RequestMapping("/admin/product/search")
    public Object search(@RequestBody SearchPageRequest searchPageRequest){
        System.out.println(searchPageRequest);
        return productService.searchPage(searchPageRequest);
    }

    //根据分类id查询商品
    @RequestMapping("/admin/product/productList")
    public Object selectProductByCategoryId(@RequestBody Map<String,Integer> map){
        Integer categoryId = map.get("categoryId");
        List<Product> products = productService.selectProductByCategoryId(categoryId);
        return products;
    }

    //添加商品
    @RequestMapping("/admin/product/addProduct")
    public Object addProduuct(@RequestBody Product product){
        System.out.println(product);
        Integer integer = productService.addProduct(product);
        if(integer > 0){
            return new Response(200,"商品添加成功");
        } else {
            return new Response(-1,"商品添加失败");
        }
    }

    //修改商品
    @RequestMapping("/admin/product/updateProduct")
    public Object updateProduuct(@RequestBody Product product){
        System.out.println(product);
        Integer integer = productService.updateProduct(product);

        if(integer > 0){
            return new Response(200,"商品修改成功");
        } else {
            return new Response(-1,"商品修改失败");
        }
    }

    //删除商品
    @RequestMapping("/admin/product/deleteProduct")
    public Object deleteProduct(@RequestBody Map<String,Integer> map){
        Integer id = map.get("id");
        Integer integer = productService.deleteProduct(id);
        if(integer > 0){
            return new Response(200,"商品删除成功");
        } else {
            return new Response(-1,"商品删除失败");
        }
    }


}
