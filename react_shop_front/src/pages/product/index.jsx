import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { reqGetProductS } from '../../api/index'
import { BASE_IMAGE_URL } from '../../utils/constants'
import { Row, Col } from 'antd'
import './index.css'

export default class Product extends Component {
  state = {
    productList: []
  }

  getProducts = async (categoryId) => {

    const result = await reqGetProductS(categoryId)
    // console.log(result);
    if (result.length!==0) {
      this.setState({ productList: result })
    } else {
      this.setState({ productList: [] })
    }

  }

  componentDidMount() {
    const { categoryId } = this.props
    this.getProducts(categoryId)
  }

  render() {
    const { productList } = this.state

    return (
      <div className='product'>
          <Row>
          {
            productList.map(product => {
            return (
              <Link key={product.id} to={
                {
                  pathname: '/detail',
                  state: product
                }
              }>
              <Col push={1} span={5} className='product-item'>
                  <img src={BASE_IMAGE_URL + product.image} alt="" />
                  <h3 className='title'>{product.title}</h3>
                  <p className='desc'>{product.des}</p>
                  <p className='price'>{product.price}元</p>
                </Col>
              </Link>  
            )
          })
          }
          </Row>
      </div>
    )
  }
}
