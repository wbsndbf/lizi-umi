import React, { Component } from 'react'
import { Form, Input, Select, Button, message } from 'antd'
import { Content, Tool } from '@/components/Layout';
import { FormInstance } from 'antd/lib/form';
import { connect } from 'dva'
import E from 'wangeditor'
import { history } from 'umi'
import { getReportInfo, update } from '../services/report';

const { Option } = Select



class index extends Component {
    constructor(props: any) {
        super(props)
        this.state = {
            editorContent: null,
            usersList: [],
            reportId: props.match.params.id
        }
    }
    formRef = React.createRef<FormInstance>()
    editMenu: any = React.createRef()

    initEditor () {
        const editor = new E((this.editMenu as any).current)
        editor.config.onchange =  (html: string) => {
            if (!html || html === '<p><br></p>') {
                this.setState({
                    editorContent: null,
                })
            } else {
                this.setState({
                    editorContent: html,
                })
            }
            this.formRef.current!.setFieldsValue({ content: (this.state as any).editorContent })
            this.formRef.current!.validateFields()

        }
        editor.create()
        editor.txt.html((this.state as any).editorContent)
    }

    onFinish = (values: any) => {
        if (!(this.state as any).reportId) {
            (this.props as any).dispatch({
                type: 'report/add',
                payload: values
            }).then((res: any) => {
                if (res && res.state === 'success') {
                    message.success(res.msg)
                    history.push('/report')
                }
            })
        } else {
            values.id = (this.state as any).reportId
            update(values).then((res: any) => {
                if (res && res.state === 'success') {
                    message.success(res.msg)
                    history.push('/report')
                }
            })
        }
        
    };

    onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    cancel = () => {
        history.push('/report')
    }

    initDatas = () => {
        const reportId = (this.state as any).reportId
        if (reportId) {
            getReportInfo(reportId).then((res: any) => {
                const { title, content, receiverName } = res.data
                this.formRef.current!.setFieldsValue({ 
                    content,
                    title,
                    username: receiverName
                })
                this.setState({ editorContent: content })
                this.initEditor()
            })
            
        } else {
            this.initEditor()
        }
    }

    componentDidMount() {
        this.initDatas()
    }
    render() {
        return <Content>
            <Form
                ref={this.formRef}
                layout='vertical'
                name="basic"
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
            >
                <Form.Item
                    label="标题"
                    name="title"
                    rules={[{ required: true, message: '请输入标题!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="接收人"
                    name="username"
                    rules={[{ required: true, message: '请选择接收人' }]}
                >
                    <Select>
                        {
                         (this.props as any).allUsersList && (this.props as any).allUsersList.map((user: any) => (
                                <Option key={ user.id } value={user.username}>{ user.username }</Option>
                            ))
                        }
                    </Select>
                </Form.Item>

                <Form.Item
                    label='周报内容'
                    name="content"
                    rules={[{ required: true, message: '请输入周报内容' },
                        () => ({
                            validator(_, value) {
                                if ((value && value !== ' ') || value === undefined) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('请输入周报内容'));
                            },
                        })
                    ]}
                >
                    <div ref={this.editMenu}></div>
                </Form.Item>
                <Form.Item>
                    <Button 
                        onClick={ this.cancel }
                        style={{marginRight: '8px'}}>取消</Button>
                    <Button 
                        type="primary" 
                        loading={ (this.props as any).loading } htmlType="submit">
                        提交
                    </Button>
                </Form.Item>
            </Form>
        </Content>
    }
}

export default connect(({ report, login, loading }: any) => ({
    ...report,
    ...login,
    loading: loading.effects['report/add']
}))(index) 