import React, { Component } from 'react'
import { Modal, Button, Form, Input, Radio } from 'antd'
import { withClick } from '@/utils/hoc'
import { FormInstance } from 'antd/lib/form'


class UserModal extends Component {
    state = {
        visible: false
    }
    layout = {
        labelCol: { span: 4 }
    }
    formRef = React.createRef<FormInstance>()

    handleOk = async () => {

        try {
            const values = await this.formRef.current?.validateFields();
            (this.props as any).onAdd(values).then((res: any) => {
                if (res.state === 'success') {
                    this.handleCancel()
                }
            })
  
        } catch (err) {
            console.error(err)
        }

        
    }
    handleCancel = () => {
        this.setState({
            visible: false
        })
    }
    handleOpenClick = () => {
        this.setState({
            visible: true
        })
    }
    render() {
        const { title } = this.props
        const { username, nickname, type } = this.props.record
        return <>
            {/* 克隆拷贝元素 */}
            { withClick(this.props.children, this.handleOpenClick) }
            <Modal
                title={ title }
                visible={this.state.visible}
                centered={ true }
                maskClosable={ false } 
                onOk={this.handleOk}
                confirmLoading={(this.props as any).addLoading}
                destroyOnClose={ true }
                onCancel={this.handleCancel}>
                <Form 
                    { ...this.layout } 
                    initialValues={ { type, username, nickname } }
                    ref={ this.formRef }>
                    <Form.Item
                        label="用户名"
                        name="username"
                        rules={[{ required: true, message: '请输入用户名' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="姓名"
                        name="nickname"
                        rules={[{ required: true, message: '请输入姓名' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item label="用户类型" name="type">
                        <Radio.Group>
                            <Radio value={'0'}>管理员</Radio>
                            <Radio value={'1'}>普通用户</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    }
}
(UserModal as any).defaultProps = {
    title: '添加用户',
    record: {
        username: '',
        nickname: '',
        type: '1'
    }
}

export default UserModal
