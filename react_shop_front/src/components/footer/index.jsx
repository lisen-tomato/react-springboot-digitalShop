import React, { Component } from 'react'
import { Row, Col } from 'antd'
import './index.css'


export default class Footer extends Component {
    render() {
        return (
            <div style={{ backgroundColor: '#fff' }}>
                <Row className='service'>
                    <Col span={2} />
                    <Col span={4}>预约维修服务</Col>
                    <Col span={4}>正品保障</Col>
                    <Col span={4}>极速物流</Col>
                    <Col span={4}>无忧售后</Col>
                    <Col span={4}>满69元包邮</Col>
                </Row>
                <Row className='help'>
                    <Col span={2} />
                    <Col span={4}>
                        <dl>
                            <dt>购物指南</dt>
                            <dd> 购物流程</dd>
                            <dd>会员介绍</dd>
                            <dd>生活旅行/团购</dd>
                            <dd>常见问题</dd>
                            <dd>大家电</dd>
                            <dd>联系客服</dd>
                        </dl>
                    </Col>
                    <Col span={4}>
                        <dl>
                            <dt>配送方式</dt>
                            <dd>上门自提</dd>
                            <dd>211限时达</dd>
                            <dd>配送服务查询</dd>
                            <dd>配送费收取标准</dd>
                            <dd>海外配送</dd>
                        </dl>
                    </Col>
                    <Col span={4}>
                        <dl>
                            <dt>支付方式</dt>
                            <dd>货到付款</dd>
                            <dd>在线支付</dd>
                            <dd>分期付款</dd>
                            <dd>邮局汇款</dd>
                            <dd>公司转账</dd>
                        </dl>
                    </Col>
                    <Col span={4}>
                        <dl>
                            <dt>售后服务</dt>
                            <dd> 售后政策</dd>
                            <dd>价格保护</dd>
                            <dd>退款说明</dd>
                            <dd>返修/退换货</dd>
                            <dd>取消订单</dd>
                        </dl>
                    </Col>
                    <Col span={4}>
                        <dl>
                            <dt>特色服务</dt>
                            <dd>夺宝岛</dd>
                            <dd>DIY装机</dd>
                            <dd>延保服务</dd>
                            <dd>品优购E卡</dd>
                            <dd>品优购通信</dd>
                        </dl>
                    </Col>
                </Row>
            </div>
        )
    }
}
