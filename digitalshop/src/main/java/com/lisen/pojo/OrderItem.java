package com.lisen.pojo;

import java.util.Objects;

/**
 * 订单中的商品数据
 */
public class OrderItem {

    private Integer id;
    private Integer oid;
    private Integer pid;
    private String title;
    private String image;
    private Integer price;
    private Integer num;

    public OrderItem() {
    }

    public OrderItem(Integer id, Integer oid, Integer pid, String title, String image, Integer price, Integer num) {
        this.id = id;
        this.oid = oid;
        this.pid = pid;
        this.title = title;
        this.image = image;
        this.price = price;
        this.num = num;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getOid() {
        return oid;
    }

    public void setOid(Integer oid) {
        this.oid = oid;
    }

    public Integer getPid() {
        return pid;
    }

    public void setPid(Integer pid) {
        this.pid = pid;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Integer getNum() {
        return num;
    }

    public void setNum(Integer num) {
        this.num = num;
    }

    @Override
    public String toString() {
        return "OrderItem{" +
                "id=" + id +
                ", oid=" + oid +
                ", pid=" + pid +
                ", title='" + title + '\'' +
                ", image='" + image + '\'' +
                ", price=" + price +
                ", num=" + num +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        OrderItem orderItem = (OrderItem) o;
        return Objects.equals(id, orderItem.id) && Objects.equals(oid, orderItem.oid) && Objects.equals(pid, orderItem.pid) && Objects.equals(title, orderItem.title) && Objects.equals(image, orderItem.image) && Objects.equals(price, orderItem.price) && Objects.equals(num, orderItem.num);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, oid, pid, title, image, price, num);
    }
}
