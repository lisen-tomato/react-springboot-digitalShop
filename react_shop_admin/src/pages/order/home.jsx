import React, { Component } from 'react'
import {Table,Card,Button,message} from 'antd'
import {formateDate} from '../../utils/dateUtils'
import {reqGetOrderLsit,reqDeleteOrder} from '../../api/index'

export default class home extends Component {
    state = {
        orderList: []
      }
    
      initColumns = () => {
        this.columns = [
          {
            title: '订单编号',
            dataIndex: 'oid'
          },
          {
            title: '下单时间',
            key: 'orderTime',
            render: order => formateDate(order.orderTime)
          },
          {
            title: '支付时间',
            key: 'payTime',
            render: order => order.payTime ? formateDate(order.payTime) : '未支付'
          },
          {
            title: '操作',
            render: (order) => {
              return (
                <span>
                {/* 将product对象使用state传递给detail组件 整个{product}是state对象*/}
                  <Button type='primary' onClick={()=> 
                  this.props.history.push('/order/detail',order)}>详情</Button>
                  &nbsp; &nbsp; &nbsp;
                  <Button type='danger' onClick={()=>this.deleteOrder(order.oid)}>删除</Button>
                </span>
              )
            }
          },
        ]
      }
    
      getOrderList = async()=>{
        const result = await reqGetOrderLsit()
        // console.log(result);
        if(result.code === 200){
          this.setState({orderList: result.data})
        } else {
          message.error(result.msg)
        }
      }

      deleteOrder = async(id) =>{
        const result = await reqDeleteOrder(id)
        if(result.code===200){
          message.success(result.msg)
          this.getOrderList()
        } else {
          message.error(result.msg)
        }
      }
    
      UNSAFE_componentWillMount() {
        this.initColumns()
      }
    
      componentDidMount(){
        this.getOrderList()
      }
    
    
      render() {
    
        const {orderList} = this.state
    
        return (
          <div>
            <Card title='订单列表'>
              <Table
              rowKey={order => order.oid}
              bordered
              columns={this.columns}
              dataSource={orderList}
              ></Table>
            </Card>
          </div>
        )
      }
}
