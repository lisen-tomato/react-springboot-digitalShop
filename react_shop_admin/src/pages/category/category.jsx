import React, { Component } from 'react'
import { Card, Table, Button, message, Modal, Icon } from 'antd'
import { reqCategorys, reqUpdateCategory, reqAddCategory,reqDeleteCategory } from '../../api/index'
import AddForm from './add-form'
import UpdateForm from './update-form'

export default class Category extends Component {

  state = {
    categorys: [], //分类列表
    loading: false, //是否正在获取数据中
    categoryId: '',  //当前需要显示的分类Id
    categoryName: '',  //分类名称
    showStatus: 0, //0表示两个确认框都比不显示 1：显示添加 2：显示更新
  }

  //初始化table所有列数
  initColunms = () => {
    this.columns = [
      {
        title: '分类id',
        dataIndex: 'categoryId',
        key: 'catregoryId'
      },
      {
        title: '分类名称',
        dataIndex: 'categoryName',
        key: 'categoryName',
      },
      {
        title: '操作',
        width: 300,
        dataIndex: '',
        key: 'x',
        // 向字段传递categorys数组，render会被传递每个category对象
        render: (category) => (
            <span>
              <Button type='primary' onClick={() => this.showUpdate(category)}>修改</Button>
              &nbsp;&nbsp;&nbsp;
              <Button type='danger' onClick={() => this.deleteCategory(category.categoryId)}>删除</Button>
            </span>
        )
      }
    ];
  }

  //隐藏确定框
  handleCanle = () => {
    this.form.resetFields()

    this.setState({
      showStatus: 0
    })
  }

  //显示添加框
  showAdd = () => {
    this.setState({
      showStatus: 1
    })
  }

  //添加分类
  addCategory = () => {
    //开启表单验证
    this.form.validateFields(async (err, values) => {
      if (!err) {
        //隐藏确认框
        this.setState({
          showStatus: 0
        })

        console.log(values);
        const {categoryName } = values

        //清除输入数据
        this.form.resetFields()
        const result = await reqAddCategory(categoryName)
        if (result.code === 200) {
          this.getCategorys()
          message.success(result.msg)
        } else {
          message.error(result.msg)
        }
      }
    })


  }

  //显示更新框
  showUpdate = (category) => {
    //保存分类对象
    this.category = category
    //更新状态
    this.setState({
      showStatus: 2
    })
  }
  //更新分类
  updateCategory = () => {
    //进行表单验证
    this.form.validateFields(async (err, values) => {
      if (!err) {
        //隐藏确认框
        this.setState({
          showStatus: 0
        })

        //准备数据
        const categoryId = this.category.categoryId
        console.log(categoryId);
        const { categoryName } = values
        //清除输入数据  不清则下一个修改的项会保持先前修改后的数据
        this.form.resetFields()
        console.log(categoryName);
        //发送请求保存更新
        const result = await reqUpdateCategory({ categoryId, categoryName })
        //成功
        if (result.code === 200) {
          //重新显示列表
          this.getCategorys()
          message.success(result.msg)
        } else {
          message.error(result.msg)
        }

      }
    })


  }

  deleteCategory =  async (categoryId)=>{
    console.log(categoryId);
    const result = await reqDeleteCategory(categoryId)
    console.log(result);
      //成功
      if (result.code === 200) {
        //重新显示列表
        this.getCategorys()
        message.success(result.msg)
      } else {
        message.error(result.msg)
      }

  }

  //异步获取分类列表展示
  getCategorys = async () => {

    //发请求前,显示loading
    this.setState({ loading: true })
    // const { parentId } = this.state
    // const result = await reqCategorys('0')
    const result = await reqCategorys();
    //请求完成后隐藏loading
    this.setState({ loading: false })
    if (result.code === 200) {
      const categorys = result.data
      this.setState({ categorys })
    } else {
      message.error(result.msg)
    }
  }

  UNSAFE_componentWillMount() {
    this.initColunms()
  }

  componentDidMount() {
    //发异步ajax请求
    this.getCategorys()
  }


  render() {
    const { categorys, loading, showStatus } = this.state
    //读取指定分类
    const category = this.category || {} //如果没有指定空对象，防止报错，因为是点击才显示保存，render先于点击运行

    const title = '分类列表'
    //card右侧
    const extra = (
      <Button type='primary' onClick={this.showAdd}>
        <Icon type='plus'/>
        添加
      </Button>
    )



    return (
      <Card title={title} extra={extra} >
        <Table
          dataSource={categorys}
          //设置每一行的唯一的key
          rowKey={category => category.categoryId}
          loading={loading}
          columns={this.columns}
          bordered
          pagination={{ defaultPageSize: 5, showQuickJumper: true }}></Table>

        <Modal
          title='添加分类'
          visible={showStatus === 1}
          okText='确定'
          cancelText='取消'
          onOk={this.addCategory}
          onCancel={this.handleCanle}
        >
          <AddForm setForm={(form) => { this.form = form }} />
        </Modal>

        <Modal
          title='更新分类'
          visible={showStatus === 2}
          okText='确定'
          cancelText='取消'
          onOk={this.updateCategory}
          onCancel={this.handleCanle}
        >
          {/* 因为需要获取表单的值，需要表单属性，通过给子组件传递函数，子组件执行函数传递自身的form对象给category父组件 */}
          <UpdateForm categoryName={category.categoryName} setForm={(form) => { this.form = form }}></UpdateForm>
        </Modal>
      </Card>
    )
  }
}
