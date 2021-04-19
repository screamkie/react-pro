import React from 'react'
import { Layout } from 'antd';
import logo from '../../logo.svg'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons';
import SideMenu from '../main/SideMenu'

const { Header, Sider, Content } = Layout;
const logoStyle = { width: '32px', height: '32px'}
class App extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout>
        <Sider className="my-sider" trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" >
            <img src={ logo } style = { logoStyle } alt=""/>
            { this.state.collapsed ? null : '嗨购管理系统' }
          </div>
         <SideMenu />
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
            })}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default App    