import React, { Component } from 'react'
import { Card, List,Icon } from 'antd'
import LinkButton from '../../components/link-button'
import {reqCategory} from '../../api/index'
import {BASE_IMAGE_URL} from '../../utils/constants'
/**
 * 详情页
 */

const Item = List.Item
export default class ProductDetail extends Component {

  state = {
    categoryName: ''
  }

  async componentDidMount(){
    console.log(this.props);
    //得到当前商品的分类id
    const {categoryId} = this.props.location.state
    const result = await reqCategory(categoryId)
    const {categoryName} = result
    this.setState({categoryName})  
  }

  render() {
    const product = this.props.location.state
    const{categoryName} = this.state
    const title = (
      <span>
        <LinkButton>
          <Icon type='arrow-left' 
          style={{ marginRight: 10, fontSize: 20 }}
          onClick={()=>this.props.history.goBack()}/>
        </LinkButton>
        <span>商品详情</span>
      </span>
    )
    return (
      <Card title={title} className='product-detail'>
        <List>
          <Item>
            <span className='left'>商品名称:</span>
            <span>{product.title}</span>
          </Item>
          <Item>
            <span className='left'>商品描述:</span>
            <span>{product.des}</span>
          </Item>
          <Item>
            <span className='left'>商品价格:</span>
            <span>{product.price}</span>
          </Item>
          <Item>
            <span className='left'>所属分类:</span>
            <span>{categoryName}</span>
          </Item>
          <Item>
            <span className='left'>商品图片:</span>
            <span>
             <img className='product-img' src={BASE_IMAGE_URL + product.image} alt="" />
            </span>
          </Item>

        </List>
      </Card>
    )
  }
}
