// import React from 'react';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Layout, Menu, Icon, Row, Col,PageHeader
} from 'antd';
import CustomBreadCrumb from '../CustomBreadCrumb';
import css from './index.styl';

const { SubMenu } = Menu;
const {
  Header, Content, Sider, Footer,
} = Layout;
class MainLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Header className={`${css.header}`}>
          <div className={css.header__icon}>
            <img src="https://via.placeholder.com/140x30?text=Logo" alt="" />
          </div>
          {/* <Icon
            className="trigger"
            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={this.toggle}
          /> */}
          <div className="logo" />
        </Header>
        <Layout>
          <Sider
            width={250}
            style={{ background: '#fff' }}
            breakpoint="lg"
            collapsedWidth="0"
            theme="dark"
            // trigger={null}
            // collapsed={this.state.collapsed}
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type);
            }}
          >
            <div className={css.sider__title}>
              <span>Bienvenido: Sistemas</span>
            </div>
            <div className={css.sider__caption}>
              <span>Menu Principal</span>
            </div>
            <Menu
              mode="inline"
            //   defaultSelectedKeys={['/']}
              selectedKeys={[this.props.location.pathname]}
              defaultOpenKeys={['/']}
              style={{ minHeight: 'calc(100% - 93px)', borderRight: 0 }}
              theme="dark">
              <SubMenu key="/" title={(<span><Icon type="user" />Dashboard</span>)}>
                <Menu.Item key="/">
                  <Link to="/dashboard/global"><Icon type="user" />Test</Link>
                </Menu.Item>
                <Menu.Item key="/dashboard/ventas">
                  <Link to="/dashboard/ventas">Test</Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="/test" title={(<span><Icon type="user" />Hoteles</span>)}>
                <Menu.Item key="/test">
                  <Link to="/test">Test</Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub2"
                title={(
                  <span>
                    <Icon type="laptop" />
                    Tours
                  </span>
)}
              >
                <Menu.Item key="5">option5</Menu.Item>
                <Menu.Item key="6">option6</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub3"
                title={(
                  <span>
                    <Icon type="notification" />
                    Paquetes
                  </span>
)}
              >
                <Menu.Item key="9">option9</Menu.Item>
                <Menu.Item key="10">option10</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout>
            <PageHeader className={css.sider__PageHeader} title={this.props.title} subTitle="This is a subtitle" tags={this.props.button ?<Link to={this.props.button}>Agregar</Link>:null} extra={<CustomBreadCrumb location={this.props.location} />}/>
            <Content
              style={{
                background: '#fff',
                padding: 24,
                margin: 0,
                minHeight: 600,
              }}
            >
              
              {this.props.children}
            </Content>
            <Footer>
              <Row>
                <Col xs={12} lg={18}>
                  <strong>Copyrigth Viaje Caribe Maya</strong>. All rigths reserved
                </Col>
                <Col xs={12} lg={6} style={{textAlign:'right'}}>
                  Versión 1.0
                </Col>
              </Row>
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default MainLayout;
