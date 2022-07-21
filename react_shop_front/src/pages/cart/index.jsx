import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Icon, Layout, message, Table } from 'antd'
import { reqGetCarts, reqDeleteCart } from '../../api/index'
import { BASE_IMAGE_URL } from '../../utils/constants'
import Footer from '../../components/footer'
import './index.css'

const { Header, Content } = Layout


export default class Cart extends Component {

  state = {
    cartList: [],
    rowSelection: {},
    isSelected: false,
    selectedRows: [],
    total: 0,
    totalPrice: 0
  };


  handleRowSelectionChange = enable => {
    this.setState({ rowSelection: enable ? {} : undefined });
  };

  initColumns = () => {
    this.columns = [
      {
        title: '商品名称',
        key: 'title',
        render: cart => <span style={{ fontSize: 18, fontWeight: 700 }}>{cart.title}</span>
      },
      {
        title: '商品图片',
        key: 'image',
        render: cart => <img src={BASE_IMAGE_URL + cart.image} style={{ width: 80, height: 80 }} alt='' />
      },
      {
        title: '单价',
        key: 'price',
        render: cart => <span style={{ fontSize: 16 }}>{cart.price}元</span>
      },
      {
        title: '数量',
        key: 'num',
        render: cart => <span>{cart.num}</span>
      },
      {
        title: '小计',
        key: 'count',
        render: cart => <span style={{ color: '#ff6700', fontSize: 16 }}>{cart.price * cart.num}元</span>
      },
      {
        title: '操作',
        key: 'action',
        render: (cart) => {
          const { cid } = cart
          return (
            <span>
              <Button type='danger' onClick={() => this.deleteCart(cid)}>删除</Button>
            </span>
          )
        }
      },
    ];
  }

  getCarts = async (uid) => {
    const result = await reqGetCarts(uid)
    console.log(result);
    if (result.code === 200) {
      this.setState({ cartList: result.data })
    } else {
      this.setState({ cartList: [] })
    }
  }

  deleteCart = async (cid) => {
    // console.log(cid);
    const result = await reqDeleteCart(cid)
    // console.log(result);
    if (result.code === 200) {
      message.success(result.msg)
      const uid = JSON.parse(sessionStorage.getItem('uid'))
      this.getCarts(uid)
    } else {
      message.error(message.msg)
    }
  }

  goToSettle = () => {
    const {total,totalPrice,selectedRows} = this.state
    // console.log(11);
    this.props.history.replace('/order',[total,totalPrice,selectedRows])
  }

  UNSAFE_componentWillMount() {
    this.initColumns()
  }

  componentDidMount() {
    const uid = JSON.parse(sessionStorage.getItem('uid'))
    this.getCarts(uid)
    // console.log(this.state.selectedRows);
  }

  render() {

    const { rowSelection, cartList, total, totalPrice, isSelected } = this.state;

    return (
      <div className='cart'>
        <Layout>
          <Header className='cart-header'>
            <Link to='/home'>
              <Icon type='arrow-left' style={{ fontSize: 24 }} />
            </Link>
            <span className='cart-title'>我的购物车</span>
          </Header>

          <Content className='cart-content'>
            <Table
              style={{ backgroundColor: '#fff' }}
              showHeader
              pagination={false}
              rowKey={cart => cart.cid}
              rowSelection={{
                rowSelection,
                onSelect: (record, selected, selectedRows) => {
                  // 计算累计件数
                  let total = selectedRows.reduce((pre, cur) => {
                    return pre + cur.num
                  }, 0)

                  //计算累计总价
                  let totalPrice = selectedRows.reduce((pre, cur) => {
                    return pre + (cur.num * cur.price)
                  }, 0)

                  //选中后设置状态
                  this.setState({ total })
                  this.setState({ totalPrice })
                  this.setState({selectedRows})

                  //如果都没选中，结算不亮
                  if (selectedRows.length === 0) {
                    this.setState({ isSelected: false })
                  } else {
                    this.setState({ isSelected: true })
                  }
                },
                onSelectAll: (selected, selectedRows, changeRows) => {

                  let total = selectedRows.reduce((pre, cur) => {
                    return pre + cur.num
                  }, 0)

                  let totalPrice = selectedRows.reduce((pre, cur) => {
                    return pre + (cur.num * cur.price)
                  }, 0)

                  this.setState({ total })
                  this.setState({ totalPrice })
                  this.setState({ isSelected: !isSelected })
                  this.setState({selectedRows})
                }
              }}
              columns={this.columns.map(item => ({ ...item }))}
              dataSource={cartList}
            />
            <div className='cart-settle'>
              <span>
                已选择<span style={{ color: '#ff6700', marginLeft: 10, marginRight: 10, fontSize: 18 }}>{total}</span>件
              </span>
              <span>
                合计<span style={{ color: '#ff6700', marginLeft: 10, marginRight: 10, fontSize: 30 }}>{totalPrice}</span>元
              </span>
              <span>
                    <Button onClick={this.goToSettle} disabled={!isSelected} style={ isSelected ? {
                      height: 50,
                      width: 200,
                      backgroundColor: '#ff6700',
                      borderColor: '#ff6700',
                      color: '#fff',
                    } 
                    :
                    {
                      backgroundColor: '#e0e0e0',
                      borderColor: '#e0e0e0',
                      color: '#b0b0b0',
                      height: 50,
                      width: 200
                    }}>去结算</Button>
              </span>
            </div>
          </Content>
          <Footer />
        </Layout>
      </div >
    )
  }
}
