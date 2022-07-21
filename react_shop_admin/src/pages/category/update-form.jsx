import React, { Component } from 'react'
import { Form,  Input } from 'antd'
import PropTypes from 'prop-types'

class UpdateForm extends Component {

    static propTypes = {
        categoryName: PropTypes.string.isRequired,
        setForm: PropTypes.func.isRequired
    }


//第一次render后执行一次，异步更新
    componentWillMount(){
        //将form对象通过setForm方法传递给父组件
        this.props.setForm(this.props.form)
    }

    render() {
        const {categoryName} = this.props

        const { getFieldDecorator } = this.props.form

        return (
            <Form>
                <Form.Item>
                    {
                        getFieldDecorator('categoryName', {
                            initialValue: categoryName,
                            rules:[
                                {
                                    required: true,message:'请输入分类名称'
                                    
                                }
                            ]
                        })(
                            <Input placeholder='请输入分类名称'></Input>
                        )
                    }
                </Form.Item>
            </Form>
        )
    }
}

export default Form.create()(UpdateForm)
