// import React from 'react';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Layout, Menu, Icon, Row, Col, PageHeader,
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
      openKeys: ['dashboard'],
    };
    this.toggle = this.toggle.bind(this);
    this.onOpenChange = this.onOpenChange.bind(this);
  }

  toggle() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  componentWillMount() {
    console.log('MONTADOOOO');
    const pathname = this.props.location.pathname.split('/');
    if (pathname != null) {
      this.setState({
        openKeys: [pathname[1]],
      });
    }
  }

  onOpenChange(item) {
    const newOpenKey = item[item.length - 1];
    this.setState({
      openKeys: [newOpenKey],
    });
  }

  render() {
    console.log(this.props.location);
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Header className={`${css.header}`}>
          {/* <div className={css.header__icon}>Logo</div> */}
          <Icon
            className="trigger"
            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={this.toggle}
          />
        </Header>
        <Layout>
          <Sider
            width={250}
            style={{ background: '#fff' }}
            collapsible
            breakpoint="lg"
            // collapsedWidth="0"
            theme="dark"
            trigger={null}
            collapsed={this.state.collapsed}
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type);
            }}
          >
            {!this.state.collapsed && (
              <React.Fragment>
                <div className={css.sider__title}>
                  <span>Bienvenido: Sistemas</span>
                </div>
                <div className={css.sider__caption}>
                  <span>Menu Principal</span>
                </div>
              </React.Fragment>
            )}
            <Menu
              mode="inline"
              //   defaultSelectedKeys={['/']}
              selectedKeys={[this.props.location.pathname]}
              openKeys={this.state.openKeys}
              defaultOpenKeys={this.state.openKeys}
              onOpenChange={this.onOpenChange}
              style={{ minHeight: 'calc(100% - 95px)', borderRight: 0 }}
              theme="dark"
            >
              <SubMenu
                key="dashboard"
                className={css.menu__submenu}
                title={(
                  <span>
                    <i className="icon icon--md icon-home" />
                    Dashboard
                  </span>
)}
              >
                <Menu.Item key="/dashboard">
                  <Link to="/dashboard">
                    <span>
                      <i className="icon icon-circle-o" />
                      Global
                    </span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="/dashboard/ventas">
                  <Link to="/dashboard/ventas">
                    <span>
                      <i className="icon icon-circle-o" />
                      Ventas
                    </span>
                  </Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="test"
                className={css.menu__submenu}
                title={(
                  <span>
                    <Icon type="user" />
                    TEST
                  </span>
)}
              >
                <Menu.Item key="/test">
                  <Link to="/test">
                    <span>
                      <i className="icon icon-circle-o" />
                      Listado de Tests
                    </span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="/test/nuevo">
                  <Link to="/test/nuevo">Agregar Nuevo Test</Link>
                </Menu.Item>
                <Menu.Item key="/test/categorias">
                  <Link to="/test/categorias">Categorias de Test</Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub3"
                className={css.menu__submenu}
                title={(
                  <span>
                    <Icon type="laptop" />
                    Tours
                  </span>
)}
              >
                <Menu.Item key="sub3/item">option5</Menu.Item>
                <Menu.Item key="2">
                  <Icon type="desktop" />
                  <span>Option 2</span>
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout>
            <PageHeader
              className={css.sider__PageHeader}
              title={this.props.title}
              // subTitle="This is a subtitle"
              tags={this.props.button ? <Link to={this.props.button}>Agregar</Link> : null}
              extra={<CustomBreadCrumb location={this.props.location} />}
            />
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
                  <div>
                    <strong>Copyrigth Viaje Caribe Maya.</strong>
                    All rigths reserved
                  </div>
                </Col>
                <Col xs={12} lg={6} style={{ textAlign: 'right' }}>
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
