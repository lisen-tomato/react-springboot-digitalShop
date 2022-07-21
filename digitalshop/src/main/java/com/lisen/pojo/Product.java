package com.lisen.pojo;

public class Product {

    private int id;
    private int categoryId;
    private String title;
    private String des;
    private int price;
    private String image;

    public Product() {
    }

    public Product(int id, int categoryId, String title, String des, int price, String image) {
        this.id = id;
        this.categoryId = categoryId;
        this.title = title;
        this.des = des;
        this.price = price;
        this.image = image;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDes() {
        return des;
    }

    public void setDes(String des) {
        this.des = des;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", categoryId=" + categoryId +
                ", title='" + title + '\'' +
                ", des='" + des + '\'' +
                ", price=" + price +
                ", image='" + image + '\'' +
                '}';
    }
}
