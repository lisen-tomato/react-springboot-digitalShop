package com.lisen;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.lisen.mapper")
public class DigitalshopApplication {

    public static void main(String[] args) {
        SpringApplication.run(DigitalshopApplication.class, args);
    }

}
