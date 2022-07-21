package com.lisen.pojo;

import java.util.Date;
import java.util.Objects;

/**
 * 订单数据的实体类
 */
public class Order {

    private Integer oid;
    private Integer uid;
    private String recvName;
    private String recvPhone;
    private String recvProvince;
    private String recvCity;
    private String recvArea;
    private String recvAddress;
    private Integer totalPrice;
    private Date orderTime;
    private Date payTime;

    public Order() {

    }

    public Order(Integer oid, Integer uid, String recvName, String recvPhone, String recvProvince, String recvCity, String recvArea, String recvAddress, Integer totalPrice, Date orderTime, Date payTime) {
        this.oid = oid;
        this.uid = uid;
        this.recvName = recvName;
        this.recvPhone = recvPhone;
        this.recvProvince = recvProvince;
        this.recvCity = recvCity;
        this.recvArea = recvArea;
        this.recvAddress = recvAddress;
        this.totalPrice = totalPrice;
        this.orderTime = orderTime;
        this.payTime = payTime;
    }

    public Integer getOid() {
        return oid;
    }

    public void setOid(Integer oid) {
        this.oid = oid;
    }

    public Integer getUid() {
        return uid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }

    public String getRecvName() {
        return recvName;
    }

    public void setRecvName(String recvName) {
        this.recvName = recvName;
    }

    public String getRecvPhone() {
        return recvPhone;
    }

    public void setRecvPhone(String recvPhone) {
        this.recvPhone = recvPhone;
    }

    public String getRecvProvince() {
        return recvProvince;
    }

    public void setRecvProvince(String recvProvince) {
        this.recvProvince = recvProvince;
    }

    public String getRecvCity() {
        return recvCity;
    }

    public void setRecvCity(String recvCity) {
        this.recvCity = recvCity;
    }

    public String getRecvArea() {
        return recvArea;
    }

    public void setRecvArea(String recvArea) {
        this.recvArea = recvArea;
    }

    public String getRecvAddress() {
        return recvAddress;
    }

    public void setRecvAddress(String recvAddress) {
        this.recvAddress = recvAddress;
    }

    public Integer getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Integer totalPrice) {
        this.totalPrice = totalPrice;
    }

    public Date getOrderTime() {
        return orderTime;
    }

    public void setOrderTime(Date orderTime) {
        this.orderTime = orderTime;
    }

    public Date getPayTime() {
        return payTime;
    }

    public void setPayTime(Date payTime) {
        this.payTime = payTime;
    }

    @Override
    public String toString() {
        return "Order{" +
                "oid=" + oid +
                ", uid=" + uid +
                ", recvName='" + recvName + '\'' +
                ", recvPhone='" + recvPhone + '\'' +
                ", recvProvince='" + recvProvince + '\'' +
                ", recvCity='" + recvCity + '\'' +
                ", recvArea='" + recvArea + '\'' +
                ", recvAddress='" + recvAddress + '\'' +
                ", totalPrice=" + totalPrice +
                ", orderTime=" + orderTime +
                ", payTime=" + payTime +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Order order = (Order) o;
        return Objects.equals(oid, order.oid) && Objects.equals(uid, order.uid) && Objects.equals(recvName, order.recvName) && Objects.equals(recvPhone, order.recvPhone) && Objects.equals(recvProvince, order.recvProvince) && Objects.equals(recvCity, order.recvCity) && Objects.equals(recvArea, order.recvArea) && Objects.equals(recvAddress, order.recvAddress) && Objects.equals(totalPrice, order.totalPrice) && Objects.equals(orderTime, order.orderTime) && Objects.equals(payTime, order.payTime);
    }

    @Override
    public int hashCode() {
        return Objects.hash(oid, uid, recvName, recvPhone, recvProvince, recvCity, recvArea, recvAddress, totalPrice, orderTime, payTime);
    }
}
