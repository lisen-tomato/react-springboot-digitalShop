import React, { Component } from 'react'
import { reqCategorys } from '../../api/index'
import { Row, Col } from 'antd'
import Product from '../product/index'
import './index.css'

export default class Category extends Component {

  state = {
    categoryList: []
  }

  getCategorys = async () => {
    const result = await reqCategorys()
    // console.log(result);
    if (result.code === 200) {
      this.setState({ categoryList: result.data })
    } else {
      this.setState({ categoryList: [] })
    }
  }

  componentDidMount() {
    this.getCategorys()
  }

  render() {

    const { categoryList } = this.state

    return (
      <div className='category'>
        {
          categoryList.map(category => {
            return (
              <div key={category.categoryId}>
              <Row >
                <Col push={3} span={20}>
                  <h2 className='category-title'>{category.categoryName}</h2>
                </Col>
              </Row>
              <Product categoryId={category.categoryId}/>
              </div>
             
            )
          })
        }
      </div>
    )
  }
}
