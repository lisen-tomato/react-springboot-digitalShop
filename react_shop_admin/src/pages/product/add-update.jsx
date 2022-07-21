import React, { Component } from 'react'
import{Card,Input,Button,Form,Cascader,Icon,Upload, message} from 'antd'
import LinkButton from '../../components/link-button'
import {reqCategorys,reqAddProduct,reqUpdateProduct} from '../../api/index'
import './pictures-wall'
import PicturesWall from './pictures-wall'


const {Item} = Form
const {TextArea} = Input

 class ProductAddUpdate extends Component {

  state = {
    options: []
  }

  constructor(props){
    super(props)
    //创建用来保存ref标识的标签对象的容器
    this.pw = React.createRef()
  }


  initOptions = (categorys) => {
    //根据categorys生成options数组
    const options = categorys.map(c => ({
      value: c.categoryId,
      label: c.categoryName,
    }))

    console.log(options);
    //更新options状态
    this.setState({options})
  }
  
  //获取分类列表
  getCategorys = async()=>{
    const result = await reqCategorys()
    // console.log(result);
    if(result.code===200){
      const categorys = result.data
      this.initOptions(categorys)
    }

  }

  componentDidMount(){
    this.getCategorys()
  }

  componentWillMount(){
    const product = this.props.location.state
    console.log(product);
    //保存是否是更新的标识
    this.isUpdate = !!product
    //保存商品
    this.product = product || {}
  }

  sumbit = () =>{
    this.props.form.validateFields(async(error,values)=>{
      if(!error){
        // alert('发送请求')
        console.log(values);
        const {title,des,price,categoryIds} = values
        const imgs = this.pw.current.getImgs()
        //更新商品，如果商品id存在
        if(this.isUpdate){
          const product = {
            id: this.product.id,
            title,
            des,
            price,
            categoryId: categoryIds[0],
            image: imgs[0]
          }
          const result = await reqUpdateProduct(product)
          // console.log(result);
          if(result.code===200){
            message.success(result.msg)
          } else {
            message.error(result.msg)
          }

        } else {
          const product = {
            title,
            des,
            price,
            categoryId: categoryIds[0],
            image: imgs[0]
          }
          const result = await reqAddProduct(product)
          // console.log(result);
          if(result.code===200){
            message.success(result.msg)
          } else {
            message.error(result.msg)
          }
        }
      }
    })
  }

  validatePrice = (rule,value,callback) => {
    if(value*1 >  0){
      callback()
    }else{
      callback('价格必须大于0')
    }
  }

  render() {

    const {isUpdate,product} = this
    const {categoryId,image} = this.product
    //用来接收分类的id数组
    const categoryIds = []

    if(isUpdate){
      categoryIds.push(categoryId)
    }

    //指定item布局的配置对象
    const formItemLayout = {
      labelCol: {span: 2},  //左侧宽度
      wrapperCol: {span: 8},  //右侧宽度
    }

    const title = (
      <span>
        <LinkButton onClick={()=> this.props.history.goBack()}>
          <Icon type='arrow-left'/>
        </LinkButton>
        <span>{isUpdate ? '修改商品' : '添加商品'}</span>
      </span>
    )

    const {getFieldDecorator} =  this.props.form

    return (
      <Card title={title}>
        <Form {...formItemLayout}>
          <Item label='商品名称'>
            {
              getFieldDecorator('title',{
                initialValue: product.title,
                rules: [
                  {
                    required: true, message: '必须输入商品名称'
                  }
                ]
              }
              )(<Input placeholder='请输入商品名称'></Input>)
            }
          </Item>
          <Item label='商品描述'>
          {
              getFieldDecorator('des',{
                initialValue: product.des,
                rules: [
                  {
                    required: true, message: '必须输入商品描述'
                  }
                ]
              }
              )(<TextArea placeholder='请输入商品描述' autoSize={{minRows: 2,maxRows: 6}}></TextArea>)
            }
          </Item>
          <Item label='商品价格'>
          {
              getFieldDecorator('price',{
                initialValue: product.price,
                rules: [
                  {required: true, message: '必须输入商品价格'},
                  {validator: this.validatePrice}
                ]
              }
              )(<Input type='number' placeholder='请输入商品价格' addonAfter='元'></Input>)
            }
          </Item>
          <Item label='商品分类'>
          {
              getFieldDecorator('categoryIds',{
                initialValue: categoryIds,
                rules: [
                  {required: true, message: '必须指定商品分类'}
                ]
              }
              )( 
                <Cascader
                placeholder='请指定商品分类' 
                options={this.state.options}/>)  //需要显示的列表数据数组
            }
          </Item>
          <Item label='商品图片'>
            <PicturesWall ref={this.pw} image={image}/>
          </Item>
          <Item>
            <Button type='primary' onClick={this.sumbit}>提交</Button>
          </Item>
        </Form>
      </Card>
    )
  }
}

export default Form.create()(ProductAddUpdate)
