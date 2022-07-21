package com.lisen.controller;

import com.lisen.utils.Response;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.Map;

@RestController
public class FileUploadController {

    @RequestMapping("/upload")
    public Object fileupload(@RequestParam("image") MultipartFile file) throws Exception{
        String originalFilename = file.getOriginalFilename();
        System.out.println(originalFilename);
        String realPath = this.getClass().getResource("/upload/").getPath();
        File folder = new File(realPath);
        if(!folder.exists()){
            folder.mkdirs();
        }

        try{
            file.transferTo(new File(folder,originalFilename));
        }catch (IOException e){
            e.getMessage();
        }

        return new Response(200,"图片上传成功",originalFilename,"http://localhost:8080/upload/"+originalFilename);
    }

    @RequestMapping("/deleteImg")
    public Object deleteImg(@RequestBody Map<String,String> map){

        String name = map.get("name");
        System.out.println(name);
        //获取图片存储文件夹
        String realPath = this.getClass().getResource("/upload/").getPath();
        //拼接图片路径
        String imgPath = realPath + name;
        //根据图片路径创建文件
        File file = new File(imgPath);
        //如果文件存在，删除
        if(file.exists()){
            if(file.delete()){
                return new Response(200,"图片删除成功");
            } else {
                return new Response(-1,"图片删除失败");
            }
        } else {
            return new Response(-1,"图片删除失败");
        }

    }
}
