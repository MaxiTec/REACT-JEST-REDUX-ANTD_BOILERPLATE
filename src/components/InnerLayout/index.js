// import React from 'react';
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
  Layout, Menu, Dropdown, Row, Button, Col, PageHeader,
} from 'antd';
import CustomBreadCrumb from '../CustomBreadCrumb';
import css from './_index.styl';
import AppContext from '../AppContext';
import {MenuRoutes, rootSubmenuKeys} from './menu'

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

  onOpenChange(openKeys) {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    // const latestOpenKey = openKeys[openKeys.length - 1];
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      // Si no es ninguna de l raiz, abre los dos submenus
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
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
                <i style={{color:'#fff'}} className="icon icon--xl icon-bars" onClick={this.toggle} />
              </Col>
              <Col xs={12} lg={12} style={{ textAlign: 'right' }}>
                <Dropdown
                  overlay={() => (
                    <Menu>
                      <Menu.Item key="idioma">
                        <button style={{ padding: 0, background: 'none', border: '0px' }}>
                          Cambiar Idioma
                        </button>
                      </Menu.Item>
                      <Menu.Item key="password">
                        <Link to="/change-password">Cambiar Contraseña</Link>
                      </Menu.Item>
                      <Menu.Divider />
                      <Menu.Item key="salir">
                        <button
                          style={{ padding: 0, background: 'none', border: '0px' }}
                          onClick={() => this.logout()}
                        >
                          Salir
                        </button>
                      </Menu.Item>
                    </Menu>
                  )}
                  trigger={['click']}
                >
                  <i style={{color:'#fff'}} className="icon icon--xl icon-cog" />
                </Dropdown>
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
              console.log(collapsed,type)
                this.setState({
                  collapsed: collapsed,
                });
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
              className={css.custom__menu}
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
              {MenuRoutes.map(itemMenu => (
                <SubMenu
                  key={itemMenu.key}
                  className={css.menu__submenu}
                  title={(
                    <span>
                      <i className={`icon icon--md ${itemMenu.icon}`} />
                      {!collapsed && itemMenu.name}
                    </span>
)}
                >
                  {itemMenu.children.map(item => {
                    if(item.path){
                      return (
                        <Menu.Item key={item.path}>
                            <Link to={item.path}>
                              <span>
                                <i className="icon icon-circle-o" />
                                {item.name}
                              </span>
                            </Link>
                          </Menu.Item>
                      )
                    }else{
                      return (
                        <SubMenu key={item.key} title={<span>
                          <i className="icon icon-circle-o" />
                          {item.name}
                        </span>}>
                          {item.children.map(item=>{
                            return (
                              <Menu.Item key={item.path}>
                                <Link to={item.path}>
                                <span>
                                  <i className="icon icon-circle-o" />
                                  {item.name}
                                </span>
                              </Link>
                              </Menu.Item>
                            )
                          })}
                        </SubMenu>
                      )
                    }
                  })}
                </SubMenu>
              ))}
            </Menu>
          </Sider>
          <Layout>
            <AppContext.Consumer>
              {context => {
                  return (
                    <PageHeader
                    className={css.sider__PageHeader}
                    title={context.title}
                    tags={context.link!=='' ? <Button size="small" type="primary"><Link to={context.link}> <span className="icon icon-plus"></span> Nuevo</Link></Button> : null}
                    extra={(context.title==''||context.title=='...')?'':<CustomBreadCrumb location={this.props.location} title={context.title}/>}
                  />
                  )
              }}
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
                    <p><strong>Copyrigth Viaje Caribe Maya.</strong>
                     &nbsp;All rigths reserved</p>
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
