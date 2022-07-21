import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Layout, Icon, Row, Col, Table, Select, Form, Input, Cascader, Button, Card, message } from 'antd'
import Footer from '../../components/footer'
import { reqGetDistrict,reqCreateOrder } from '../../api/index'
import { BASE_IMAGE_URL } from '../../utils/constants'
import './index.css'

const { Header, Content } = Layout


class Order extends Component {

  state = {
    options: [],
    orderItemList: [],
    total: 0,
    totalPrice: 0,
  }

  handleSubmit = e => {
    e.preventDefault();
    // console.log(this.state.options);
    this.props.form.validateFieldsAndScroll(async(err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const {totalPrice,orderItemList} = this.state
        const uid = JSON.parse(sessionStorage.getItem('uid'))
        const {recvName,recvPhone,recvAddress} = values
        const {options:[recvProvince,recvCity,recvArea]} = values
        // console.log(uid,recv_name,recv_phone,recv_province,recv_city,recv_area,recv_address,totalPrice,orderItemList);
        // console.log(1111);
        const result = await reqCreateOrder(uid,recvName,recvPhone,recvProvince,recvCity,recvArea,recvAddress,totalPrice,orderItemList)
        // console.log(result);
        if(result.code === 200){
         message.success(result.msg)
         //清除输入数据
        this.props.form.resetFields()

        this.timer = setTimeout(()=>{
          //跳转我的订单界面
        this.props.history.replace('/myOrder')
        },1000)
        
        } else {
          message.error(result.msg)
        }
      }
    });

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
      }
    ];
  }


  getDistrict = async (parent) => {
    const result = await reqGetDistrict(parent)
    result.data.forEach(item => {
      item.value = item.name
      item.label = item.name
      item.isLeaf = false
    })

    this.setState({ options: result.data })
    // this.options = result.data
  }

  loadData = (selectedOptions) => {
   
    let targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    /**获取市列表 */
    if (selectedOptions.length === 1) {
      // console.log(targetOption.value);
      let parent = targetOption.code
      reqGetDistrict(parent).then(res => {
        targetOption.loading = false;
        let list = [];
        res.data.forEach(el =>
          list.push({
            label: el.name,
            value: el.name,
            code: el.code,
            isLeaf: false
          })
        );
        targetOption.children = list;
        this.setState({
          options: [...this.state.options]
        });
      });
    }
    else {
      /**获取区列表 */
      // console.log(targetOption);
      // console.log(targetOption.value);
      let parent = targetOption.code
      reqGetDistrict(parent).then(res => {
        targetOption.loading = false;
        let list = [];
        res.data.forEach(el =>
          list.push({
            label: el.name,
            value: el.name
          })
        );
        targetOption.children = list;
        this.setState({
          options: [...this.state.options]
        });
      });
    }

  }



  UNSAFE_componentWillMount() {
    this.initColumns()

  }

  componentDidMount() {
    // console.log(this.props.location.state);
    const [total, totalPrice, selectedRows] = this.props.location.state
    this.setState({ orderItemList: selectedRows })
    this.setState({ total })
    this.setState({ totalPrice })
    this.getDistrict('86')

  }

  componentWillUnmount(){
    clearTimeout(this.timer)
  }

 

  render() {
    const { getFieldDecorator } = this.props.form;
    // console.log(this.props.location.state);
    const { total, totalPrice, orderItemList } = this.state
    // console.log( this.state);

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
    };

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    // console.log(this.state.options);

    return (
      <div>
        <Layout className='order'>
          <Header className='order-header'>
            <Link to='/home'>
              <Icon type='arrow-left' style={{ fontSize: 24 }} />
            </Link>
            <span className='order-title'>确认订单</span>
          </Header>
          <Content className='order-content'>
            <Row>
              <Card headStyle={{ fontSize: 24 }} title="商品" bordered={false} style={{ width: '100%' }}>
                <Table
                  bordered
                  rowKey={orderItem => orderItem.cid}
                  showHeader
                  pagination={false}
                  columns={this.columns.map(item => ({ ...item }))}
                  dataSource={orderItemList}
                />
              </Card>
            </Row>

            <Row type='flex' justify='space-around' align="middle" style={{ backgroundColor: '#f5f5f5', height: 100 }}>
              <Col>商品件数：<span style={{ color: '#FF6700', fontSize: 14 }}>{total}件</span></Col>
              <Col>商品总价：<span style={{ color: '#FF6700', fontSize: 14 }}>{totalPrice}元</span></Col>
              <Col>应付总额：<span style={{ color: '#FF6700', fontSize: 30 }}>{totalPrice}元</span></Col>
            </Row>
            <Row>
              <Card title="收货地址" headStyle={{ fontSize: 24 }} bordered={false} style={{ width: '100%' }}>
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                  <Form.Item
                    label={
                      <span>
                        姓名&nbsp;
                      </span>
                    }
                  >
                    {getFieldDecorator('recvName', {
                      rules: [{ required: true, message: '请输入姓名', whitespace: true }],
                    })(<Input />)}
                  </Form.Item>

                  <Form.Item label="手机号">
                    {getFieldDecorator('recvPhone', {
                      rules: [{ required: true, message: '请输入手机号!' }],
                    })(<Input style={{ width: '100%' }} />)}
                  </Form.Item>

                  <Form.Item label="选择省/市/区">
                    {getFieldDecorator('options', {
                      rules: [
                        { type: 'array', required: true, message: '请选择收货地址!' },
                      ],
                    })(<Cascader
                      loadData={selectedOptions => this.loadData(selectedOptions)}
                      changeOnSelect
                      fieldNames={{ label: 'label', value: 'value', children: 'children' }}
                      options={this.state.options}
                      placeholder='请选择' />)}
                  </Form.Item>

                  <Form.Item label="详细地址">
                    {getFieldDecorator('recvAddress', {
                      rules: [{ required: true, message: '请输入详细地址!' }],
                    })(<Input.TextArea rows={4} style={{ width: '100%' }} />)}
                  </Form.Item>
                  <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                      提交订单
                    </Button>
                  </Form.Item>
                </Form>
              </Card>

            </Row>

          </Content>
          <Footer />
        </Layout>
      </div>
    )
  }
}

export default Form.create({ name: 'order' })(Order)
