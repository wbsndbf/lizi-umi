import React from 'react'
import { Layout, Menu, ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN'
import styles from './index.scss'
import '@/common/global.scss'
import { Link, useHistory } from 'umi'
import Header from './Header';
import Footer from './Footer';
const { Content } = Layout;


const index = (props: { children: React.ReactChild }) => {
    const { location } = useHistory()
    if (location.pathname === '/login') {
        return props.children
    }

    return <ConfigProvider locale={ zhCN }>
        <Layout className={styles.layout}>
            <Header></Header>
            <Content className='content'>
                {props.children}
            </Content>
            <Footer></Footer>

        </Layout>
    </ConfigProvider>
}

export default index
