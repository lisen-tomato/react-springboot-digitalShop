package com.lisen.controller;

import com.lisen.pojo.Address;
import com.lisen.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AddressController {

    @Autowired
    private AddressService addressService;

    @RequestMapping("/user/addNewAddress")
    public Object addNewAddress(@RequestBody Address address){
        return null;
    }
}
