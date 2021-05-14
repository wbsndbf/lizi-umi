import React from 'react'
import { Layout, Menu } from 'antd';
import { CopyrightOutlined } from '@ant-design/icons'

const { Footer } = Layout

const index = () => {
    return <Footer className='footer'>
        Copyright <CopyrightOutlined /> 2021 栗子在线
    </Footer>
}

export default index
