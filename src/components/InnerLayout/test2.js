// import React from 'react';
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
  Layout, Menu, Icon, Dropdown, Row, Col, PageHeader,
} from 'antd';
import CustomBreadCrumb from '../CustomBreadCrumb';
import css from './index.styl';
import AppContext from '../AppContext';

const { SubMenu } = Menu;
const {
  Header, Content, Sider, Footer,
} = Layout;
class MainLayout extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      collapsed: false,
      openKeys: ['dashboard'],
    };
    this.toggle = this.toggle.bind(this);
    this.onOpenChange = this.onOpenChange.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  toggle() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  logout() {
    this.context.signOut();
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions() {
    this.setState({ width: window.innerWidth });
  }

  componentWillMount() {
    this.updateDimensions();
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
    const { collapsed, width } = this.state;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Header className={`${css.header}`}>
          <div className={css.header__icon}>Logo</div>
          <div className={css.header__nav}>
            <Row justify="space-between" style={{ width: '100%' }}>
              <Col xs={12} lg={12}>
                {/* <button onClick={this.toggle}> */}
                <i className="icon icon-md icon-bars" onClick={this.toggle} />
                {/* </button> */}
              </Col>
              <Col xs={12} lg={12} style={{ textAlign: 'right' }}>
                <Dropdown
                  overlay={() => (
                    <Menu>
                      <Menu.Item key="idioma">
                        <button style={{ padding:0,background: 'none', border: '0px' }}>
                          Cambiar Idioma
                        </button>
                      </Menu.Item>
                      <Menu.Item key="password">
                        <Link to="/change-password">Cambiar Contraseña</Link>
                      </Menu.Item>
                      <Menu.Divider />
                      <Menu.Item key="salir">
                        <button
                          style={{ padding:0,background: 'none', border: '0px' }}
                          onClick={() => this.logout()}
                        >
                          Salir
                        </button>
                      </Menu.Item>
                    </Menu>
                  )}
                  trigger={['click']}
                >
                  <i className="icon icon-md icon-cog" />
                </Dropdown>
                {/* <Icon
                  className="openMenu"
                  type="menu-fold"
                  // onClick={this.toggle}
                /> */}
              </Col>
            </Row>
          </div>
        </Header>
        <Layout>
          <Sider
            width={250}
            style={{ background: '#fff', overflow: 'hidden' }}
            collapsible
            breakpoint="lg"
            collapsedWidth={width <= 768 ? 0 : 80}
            theme="dark"
            trigger={null}
            collapsed={collapsed}
            onCollapse={(collapsed, type) => {
              if (collapsed) {
                this.setState({
                  collapsed: true,
                });
              }
            }}
          >
            {!collapsed && (
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
              style={{
                minHeight: this.state.collapsed ? '100%' : 'calc(100% - 95px)',
                borderRight: 0,
              }}
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
                    <i className="icon icon--md icon-user-plus" />
                    Test
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
                    <i className="icon icon--md icon-home" />
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
            <AppContext.Consumer>
              {context => (
                <PageHeader
                  className={css.sider__PageHeader}
                  title={context.title}
                  tags={context.button ? <Link to={this.props.button}>Agregar</Link> : null}
                  extra={<CustomBreadCrumb location={this.props.location} />}
                />
              )}
            </AppContext.Consumer>

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
                <Col xs={24} lg={18}>
                  <div>
                    <strong>Copyrigth Viaje Caribe Maya.</strong>
                    All rigths reserved
                  </div>
                </Col>
                <Col xs={24} lg={6} style={{ textAlign: 'right' }}>
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
MainLayout.contextType = AppContext;
export default withRouter(MainLayout);
