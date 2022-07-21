import React, { Component } from 'react'
import { Table } from 'antd'
import {BASE_IMAGE_URL} from '../../utils/constants'
import {reqFindItem} from '../../api/index'

export default class OrderItem extends Component {

    state = {
        orderItemList: []
    }

    initColumns = () => {
        this.columns = [
            {
                title: '商品名称',
                key: 'title',
                render: item => <span style={{ fontSize: 18, fontWeight: 700 }}>{item.title}</span>
            },
            {
                title: '商品图片',
                key: 'image',
                render: item=> <img src={BASE_IMAGE_URL + item.image} style={{ width: 80, height: 80 }} alt=''/>
            },
            {
                title: '价格',
                dataIndex: 'price',
                key: 'price',
            },
            {
                title: '数量',
                key: 'num',
                dataIndex: 'num',
            }
        ];
    }

    findItem = async()=>{
        console.log(this.props);
        const {oid} = this.props
        const result = await reqFindItem(oid)
        console.log(result);
        if(result.code===200){
            this.setState({orderItemList: result.data})
        } else {
            this.setState({orderItemList: []})
        }
    }

    UNSAFE_componentWillMount() {
        this.initColumns()
    }

    componentDidMount(){
        this.findItem()
    }

    render() {
        const { orderItemList } = this.state
        return (
            <div>
                <Table bodyStyle={{backgroundColor: '#f5f5f5'}} columns={this.columns} dataSource={orderItemList} pagination={false} />
            </div>
        )
    }
}
