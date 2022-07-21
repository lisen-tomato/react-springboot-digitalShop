package com.lisen.utils;

public class SearchPageRequest {

    /**
     * 当前页码
     */
    private int pageNum;
    /**
     * 每页数量
     */
    private int pageSize;

    /**
     * 搜索类型
     */
    private String searchType;

    /**
     * 搜索名字
     */
    private String searchName;

    public SearchPageRequest() {
    }


    public SearchPageRequest(int pageNum, int pageSize, String searchType, String searchName) {
        this.pageNum = pageNum;
        this.pageSize = pageSize;
        this.searchType = searchType;
        this.searchName = searchName;
    }

    public int getPageNum() {
        return pageNum;
    }

    public void setPageNum(int pageNum) {
        this.pageNum = pageNum;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public String getSearchType() {
        return searchType;
    }

    public void setSearchType(String searchType) {
        this.searchType = searchType;
    }

    public String getSearchName() {
        return searchName;
    }

    public void setSearchName(String searchName) {
        this.searchName = searchName;
    }

    @Override
    public String toString() {
        return "PageRequest{" +
                "pageNum=" + pageNum +
                ", pageSize=" + pageSize +
                ", searchType='" + searchType + '\'' +
                ", searchName='" + searchName + '\'' +
                '}';
    }
}
