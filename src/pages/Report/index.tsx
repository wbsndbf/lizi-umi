import React, { Component } from 'react'
import { Content, Tool } from '@/components/Layout';
import { Link } from 'umi'
import { Button, Row, Col, Spin, Popconfirm, message } from 'antd'
import { connect } from 'dva'
import { Card, Pagination } from 'antd'
import './index.scss'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { remove } from './services/report';

class index extends Component {

    getReportsList = () => {
        (this.props as any).dispatch({
            type: 'report/getAllReports',
            payload: {
                page: 1, pageSize: 6
            }
        })
    }

    handleChangeList = (page: any, pageSize: any) => {
        (this.props as any).dispatch({
            type: 'report/getAllReports',
            payload: {
                page, 
                pageSize
            }
        })

    }

    removeReport = (id: string) => {
        remove(id).then((res: any) => {
            if (res && res.state === 'success') {
                message.success(res.msg)
                this.getReportsList()
            }
        })
    }

    componentDidMount() {
        this.getReportsList()
    }
    render() {
        const { reportsList, loading, page, pageSize, total }: any = this.props
        return <Content>
            <Tool>
                <Button type="primary">
                    <Link to='/report/write'>添加周报</Link>
                </Button>
            </Tool>
            {
                loading ? <div className='spin-box'>
                    <Spin />
                </div> : <Row gutter={[16, 16]}>
                {
                    reportsList && reportsList.map((item: any) => (
                        <Col span={ 8 } key={ item.id }>
                            <Card 
                                title={ item.createTime }
                                extra={(
                                    <>
                                        <Button type="link" 
                                            icon={<EditOutlined />}
                                            href={`/report/edit/${ item.id }`}></Button>
                                        <Popconfirm
                                            title="确定删除此周报吗？"
                                            onConfirm={() => this.removeReport(item.id)}
                                            okText="确认"
                                            cancelText="取消"
                                        >
                                            <Button type="link"
                                                icon={<DeleteOutlined />} ></Button>
                                        </Popconfirm>
                                        
                                    </>
                                )}>
                                <p>标题: { item.title }</p>
                                <p>接收人: { item.receiverName }</p>
                                <p>创建人: { item.createUserName }</p>
                            </Card>
                        </Col>
                    ))
                }
                {
                    reportsList.length > 0 && 
                    <Pagination
                        current={ page }
                        pageSize={ pageSize } 
                        hideOnSinglePage={ true }
                        total={total}
                        onChange={ this.handleChangeList } />
                }
            </Row>
            }
            
            
        </Content>
    }
}

export default connect(({ report, loading }: any) => ({
    ...report,
    loading: loading.effects['report/getAllReports']
}))(index)