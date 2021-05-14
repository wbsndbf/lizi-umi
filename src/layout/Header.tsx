import React from 'react'
import { Affix, Menu, Dropdown } from 'antd'
import { withRouter, Link } from 'umi'
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { history } from 'umi'


const MenuItem = Menu.Item

const logout = () => {
    localStorage.clear()
    history.push('/login')
}

const Header = ({ location }: any) => {
    const DropdownMenu = <Menu>
        <Menu.Item onClick={ logout }>
            退出
        </Menu.Item>
    </Menu>
    return <Affix offsetTop={ 0 }>
        <div className='header'>
            <img className='logo' src={require('@/assets/logo.png')} alt='logo' />
            <Menu className='menus'
                mode="horizontal"
                theme='dark'
                selectedKeys={[location.pathname]}>
                <MenuItem key="/">
                    <Link to='/'>首页</Link>
                </MenuItem>
                {
                    localStorage.authority === 'admin' && <MenuItem key="/users">
                    <Link to="/users">用户</Link>
                </MenuItem>
                }
                
                <MenuItem key="/report">
                    <Link to="/report">周报</Link>
                </MenuItem>
            </Menu>
            <div className="right">
                <Dropdown overlay={DropdownMenu}>
                    <div>
                        <UserOutlined /> { localStorage.nickname } <DownOutlined />
                    </div>
                </Dropdown>
            </div>
        </div>
    </Affix>

}

export default withRouter(Header)
