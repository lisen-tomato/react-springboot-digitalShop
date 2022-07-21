import React, { Component } from 'react'
import { Form, Input } from 'antd'
import PropTypes from 'prop-types'

class AddForm extends Component {

    static propTypes = {
        setForm: PropTypes.func.isRequired
    }

    componentWillMount(){
        //将form对象通过setForm方法传递给父组件
        this.props.setForm(this.props.form)
    }

    render() {

        const { getFieldDecorator } = this.props.form

        return (
            <Form>
                <Form.Item>
                    {
                        getFieldDecorator('categoryName', {
                            initialValue: '',
                            rules:[
                                {
                                    required:true,message:'请输入分类名称'
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

export default Form.create()(AddForm)
