import React, { useState } from 'react'
import { Layout, Form, Input, Button, message, Tabs, Divider, Row, Col  } from 'antd'
import {
    CopyrightOutlined,
    UserOutlined,
    LockOutlined
} from '@ant-design/icons'
import styles from './index.scss'
import { history } from 'umi'
import jwt from 'jwt-decode'
import { connect } from 'dva'



const { Content, Footer } = Layout
const { TabPane } = Tabs

const index = ({ history, dispatch, loading }: any) => {
    const [form] = Form.useForm()
    const [showAccount, setShowAccount] = useState(false)
    const onFinish = async () => {
        try {
            const values = await form.validateFields()
            dispatch({
                type: 'login/fetch',
                payload: values
            }).then((res: any) => {
                const { id, nickname, username, type }: any = jwt(res.token)
                localStorage.setItem('username', username)
                localStorage.setItem('nickname', nickname)
                localStorage.setItem('id', id)
                localStorage.setItem('authority', type === '0' ? 'admin' : 'user')
                history.push('/')
            })
        } catch (err) {
            message.error(err ? err.msg : '登录失败')
        }
    }

    return <Layout>
        <Content className={styles.content}>
            <div className={styles.form}>
                <h1>
                <img src={ require('@/assets/logo2.png') } alt="logo2"/>栗子管理系统
                </h1>
                <Form
                    form={form}
                    name="horizontal_login"
                    onFinish={onFinish}>
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input prefix={<UserOutlined className={styles['site-form-item-icon']} />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className={styles['site-form-item-icon']} />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item shouldUpdate>
                        {() => (
                            <Button
                                className={styles['login-btn']}
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                            // disabled={
                            // !form.isFieldsTouched(true) ||
                            // !!form.getFieldsError().filter(({ errors }) => errors.length).length
                            // }
                            >
                                Log in
                            </Button>
                        )}
                    </Form.Item>
                </Form>

                <Row justify="space-between" align="middle"
                    style={{color: '#b7b7b7', fontSize: '12px'}}>
                    <Col
                        >
                            所有账号密码均为：<span style={{color: '#1890ff'}}>123456</span>
                        </Col>
                    <Col>
                        <Button type="link"
                            onClick={ () => setShowAccount(!showAccount) }
                            style={{fontSize: '12px'}}>{ showAccount ? '收起' : '查看' }账号</Button>    
                    </Col>
                </Row>
                {
                    showAccount && <Tabs defaultActiveKey="1">
                        <TabPane tab="管理员" key="1">
                            账号：adminTest
                        </TabPane>
                        <TabPane tab="普通用户" key="2">
                            账号：userTest
                        </TabPane>
                    </Tabs>
                }
                
            </div>
        </Content>
        <Footer className={styles.footer}>
            Copyright <CopyrightOutlined /> 2021 栗子在线
        </Footer>
    </Layout>
}

export default connect(({ loading }: any) => ({
    loading: loading.effects['login/fetch']
}))(index)