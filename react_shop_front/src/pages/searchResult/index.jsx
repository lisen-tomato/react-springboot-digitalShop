import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import notSearch from '../../assets/images/search.png'
import { BASE_IMAGE_URL } from '../../utils/constants'
import { Row, Col } from 'antd'
import { reqGetProduct } from '../../api/index'

export default class searchResult extends Component {


    state = {
        productList: []
    }

    getProduct = async (productName) => {
        console.log(productName);
        const result = await reqGetProduct(productName)
        console.log(result);
        if (result.code === 200) {
            this.setState({ productList: result.data })
        } else {
            this.setState({ productList: [] })
        }
    }

    componentDidMount() {
        const productName = this.props.location.state
        this.getProduct(productName)
    }

    componentDidUpdate(preProps) {
        // console.log(preProps.location.state);
        //如果先前的productName更目前搜索的productName不同，就发送网络请求更新
        if (preProps.location.state !== this.props.location.state) {
            const productName = this.props.location.state
            this.getProduct(productName)
        }
    }

    render() {
        const { productList } = this.state
        //   console.log(this.props.location.state);
        return (
            <div className='product'>
                <Row>
                    {
                        productList.length === 0 ?
                            <Row style={{ marginTop: 50, marginBottom: 50 }}>
                                <Col push={10} span={8}>
                                    <img src={notSearch} alt="" />
                                    <p style={{ marginTop: 30 }}>找不到对应商品，换个商品名称吧</p>
                                </Col>
                            </Row>
                            :
                            productList.map(product => {
                                return (
                                    <Link key={product.id} to={
                                        {
                                            pathname: '/detail',
                                            state: product
                                        }
                                    }>
                                        <Col push={2} span={5} className='product-item'>
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
