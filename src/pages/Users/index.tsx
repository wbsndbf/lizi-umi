import React, { useState, useEffect, useRef } from 'react'
import { Button, message, Popconfirm } from 'antd'
import { Content, Tool } from '@/components/Layout';
import Table from '@/components/Table';
import { connect } from 'dva'
import UserModal from './components/UserModal';

const index = ({ list, page, pageSize, total, loading, addLoading, dispatch }: any) => {
    const columns = [
        {
          title: '用户名',
          dataIndex: 'username',
          key: 'username',
          width: '25%',
        },
        {
          title: '姓名',
          dataIndex: 'nickname',
          key: 'nickname',
          width: '25%',
        },
        {
          title: '用户类型',
          dataIndex: 'type',
          key: 'type',
          width: '25%',
          render: (text: string) => <span>{text === '0' ? '管理员' : '普通用户'}</span>,
        },
        {
          title: '操作',
          key: 'operation',
          render: (record: any) => (
            <div>
                <UserModal title='编辑用户' record={ record } onAdd={ (value: any) => handleEdit(record.id, value) }>
                    <a>编辑</a>
                </UserModal>
                <Popconfirm
                    title="确定删除该用户吗？"
                    onConfirm={() => confirm(record.id)}
                >
                    <a>删除</a>
                </Popconfirm>
            </div>
          ),
        },
    ]

    const reload = () => {
        dispatch({ type: 'users/fetch', payload: { page: 1 } })
    }
    const handleAdd = (values: any) => {
        return dispatch({ type: 'users/add', payload: values }).then((res: any) => {
            if (res && res.state) {
                message.success(res.msg)
                reload()
                return res
            }
        })
    } 
    const handlePageChange = (page: number) => {
        dispatch({ type: 'users/fetch', payload: { page } })
    }
    
    const handleEdit = (id: string, value: any) => {
        return dispatch({ 
            type: 'users/edit', 
            payload: { id, value } }).then((res: any) => {
            if (res && res.state) {
                message.success(res.msg)
                reload()
                return res
            }
        })
    }

    const confirm = (id: string) => {
        dispatch({ 
            type: 'users/delete', 
            payload: id }).then((res: any) => {
            if (res && res.state) {
                message.success(res.msg)
                reload()
            }
        })
    }

    return (
        <Content>
            <Tool className='tool'>
                <UserModal onAdd={ (values: any) => handleAdd(values) }
                    addLoading={ addLoading }>
                    <Button type='primary'>添加用户</Button>
                </UserModal>
            </Tool>
            <Table
                columns={ columns } 
                loading={loading} 
                rowKey={(record: { id: string }) => record.id}
                dataSource={list}
                pagination={{
                    total: total,
                    current: page,
                    pageSize: pageSize,
                    onChange: handlePageChange
                }} />
        </Content>
    )
}

// 设置 loading 绑定事件：当绑定的事件在执行中时为 true，执行完成为 false
export default connect(({ users, loading }: any) => ({
    ...users,
    loading: loading.effects['users/fetch'],
    addLoading: loading.effects['users/add']
}))(index) 
