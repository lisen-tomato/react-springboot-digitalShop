import React, { Component } from 'react'
import { Card, Select, Input, Button,Table,Icon, message} from "antd"
import { reqProducts,reqSearchProducts,reqDeleteProduct } from '../../api'
import { PAGE_SIZE } from '../../utils/constants'
/**
 * product组件的默认界面
 */
const Option = Select.Option

export default class ProductHome extends Component {

  state = {
    totalSize: 0, //商品总数量
    loading: false,
    products: [
    ],
    searchName: '',   //搜所的关键字
    searchType: 'productName',   //根据哪个字段搜索,默认选中
    pageNumber: 0
  }

  initColumns = () => {
    this.columns = [
      {
        title: '商品名称',
        dataIndex: 'title'
      },
      {
        title: '商品描述',
        dataIndex: 'des'
      },
      {
        title: '价格',
        dataIndex: 'price',
        render: (price) => '￥' + price
      },
      
      {
        title: '操作',
        render: (product) => {
          return (
            <span>
            {/* 将product对象使用state传递给detail组件 整个{product}是state对象*/}
              <Button type='primary' onClick={()=> 
              this.props.history.push('/product/detail',product)}>详情</Button>
              &nbsp; &nbsp; &nbsp;
              <Button type='primary' onClick={()=> 
              this.props.history.push('/product/addupdate',product)}>修改</Button>
              &nbsp; &nbsp; &nbsp;
              <Button type='danger' onClick={()=>{this.deleteProduct(product.id)}}>删除</Button>
            </span>
          )
        }
      },
    ]
  }

  deleteProduct = async(id) =>{
    const result = await reqDeleteProduct(id)
    if(result.code===200){
      this.getProducts()
      message.success(result.msg)
    } else {
      message.error(result.msg)
    }
  }

  getProducts = async (pageNum) => {
    this.pageNum = pageNum //保存pageNum，让其他方法可以看到

    const {searchName,searchType} = this.state
    //如果搜索关键字有值，调用搜索分页
    let result
    if(searchName){
      console.log(pageNum,PAGE_SIZE,searchName,searchType)
       result = await reqSearchProducts(pageNum,PAGE_SIZE,searchName,searchType)
    } else {
      result = await reqProducts(pageNum,PAGE_SIZE)
    }

    this.setState({ loading: true })
    this.setState({ loading: false })
    if (result.code === 200) {
      const { totalSize, content } = result
      this.setState({
        totalSize,
        products: content
      })
    }
  }



  UNSAFE_componentWillMount() {
    this.initColumns()
  }

  componentDidMount() {
    this.getProducts()
  }

  

  render() {

    const { products, totalSize, loading,searchType,searchName } = this.state

    const title = (
      <span>
        <Select 
        value={searchType}  
        style={{ width: 150 }}
        // 根据选中的option的value来确定搜索类型
        onChange={value => this.setState({searchType: value})}
        >
          <Option value="productName">按名称搜索</Option>
          <Option value="productDesc">按描述搜索</Option>
        </Select>
        <Input 
        placeholder='关键字' 
        value={searchName} 
        style={{ width: 150, margin: '0 15px' }}
        onChange={event=> {this.setState({searchName: event.target.value})}}
        ></Input>
        <Button type='primary' onClick={() => this.getProducts(1)}>搜索</Button>
      </span>
    )

    const extra = (
      <Button type='primary' onClick={()=>this.props.history.push('/product/addupdate')}>
        <Icon type='plus'/>
        添加商品
      </Button>
    )
    return (
      <Card title={title} extra={extra}>
        <Table
          bordered
          rowKey='id'
          loading={loading}
          dataSource={products}
          columns={this.columns}
          pagination={{
            total: totalSize,
            defaultPageSize: PAGE_SIZE,
            showQuickJumper: true,
            onChange: this.getProducts
          }}
        >
        </Table>
      </Card>
    )
  }
}


