/**
 * Created by xu.long on 2018/4/22.
 */

import './style.scss';

import { DEADLINE, getCoutDown } from '../../util/util';
import { Dropdown, Form, Icon, Input, Layout, Menu, Modal } from 'antd';
import { getMenuListResult, getUserInfoResult } from './selector';
import { initMenuList, initUserInfo, modifyPassword } from './action';

import { Link } from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux';
import { generateRoutes } from '../../util';
import { logout } from '../LoginContainer/action';
import moment from 'moment';

const FormItem = Form.Item;
const { Header, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.onOpenChange = this.onOpenChange.bind(this);
    this.state = {
      collapsed: false,
      rootSubmenuKeys: [],
      openKeys: [],
      defaultOpenKeys: [],
      selectedKeys: [],
      modifyPasswordModalVisible: false,
    };
  }

  componentWillMount() {
    // let targetRoute = this.props.routes.find(
    //     (item, i) => this.props.location.pathname.indexOf(item.key) > -1,
    // );
    // if (targetRoute) {
    //     // props.location.pathname !== '/index'
    //     this.setState(
    //         Object.assign({}, this.state, {
    //             defaultOpenKeys: [targetRoute.parent],
    //             selectedKeys: [targetRoute.key],
    //             openKeys: [targetRoute.parent],
    //         }),
    //     );
    // }
    if (!window.hempConfig) {
      window.hempConfig = JSON.parse(window.localStorage.getItem('hempConfig'));
    }
    this.props.initMenuList();
    this.props.initUserInfo();
  }

  componentDidMount() {
    let routes = generateRoutes(this.props.routes);
    this.setState({
      routes: routes,
    });
  }

  componentWillReceiveProps(nextProps) {
    // console.log('componentWillReceiveProps: ', JSON.stringify(nextProps));
    let targetRoute = this.props.routes.find(
      item => this.props.location.pathname.indexOf(item.key) > -1,
    );
    if (
      nextProps &&
      nextProps.menuList.length > 0 &&
      this.state.rootSubmenuKeys.length < 1
    ) {
      let temp = [],
        obj;
      for (let i = 0; i < nextProps.menuList.length; i++) {
        if (nextProps.menuList[i].chrildren.length > 0) {
          temp.push(nextProps.menuList[i].menuId.toString());
        }
      }
      if (targetRoute) {
        for (let i = 0; i < nextProps.menuList.length; i++) {
          if (nextProps.menuList[i].chrildren.length > 0) {
            obj = nextProps.menuList[i].chrildren.find(
              item => item.menuUrl.indexOf(targetRoute.path) > -1,
            );
            if (obj) break;
          }
        }
      }
      if (obj) {
        this.setState({
          rootSubmenuKeys: temp,
          defaultOpenKeys: [obj.menuPid.toString()],
          openKeys: [obj.menuPid.toString()],
          selectedKeys: [obj.menuId.toString()],
        });
      } else {
        this.setState(
          {
            rootSubmenuKeys: temp,
            defaultOpenKeys: [nextProps.menuList[0].menuId.toString()],
            openKeys: [nextProps.menuList[0].menuId.toString()],
            selectedKeys: [
              nextProps.menuList[0].chrildren[0].menuId.toString(),
            ],
          },
          () => {
            window.myHistory.push(nextProps.menuList[0].chrildren[0].menuUrl);
          },
        );
      }
    }
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(
      key => this.state.openKeys.indexOf(key) === -1,
    );
    if (this.state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };
  handleClick = e => {
    this.setState(
      Object.assign({}, this.state, {
        selectedKeys: [e.key],
      }),
    );
  };
  generateMenu = data => {
    return data.map(item => {
      if (item.chrildren.length > 0) {
        return (
          <SubMenu
            key={item.menuId}
            title={
              <span>
                <Icon type={this.getIcon(item.menuName)} />
                <span>{item.menuName}</span>
              </span>
            }>
            {item.chrildren.map(ite => {
              return (
                <Menu.Item key={ite.menuId}>
                  <Link to={ite.menuUrl}>{ite.menuName}</Link>
                </Menu.Item>
              );
            })}
          </SubMenu>
        );
      }
    });
  };
  getIcon = menuName => {
    let iconName;
    switch (menuName) {
      case '数据统计':
        iconName = 'dashboard';
        break;
      case '商品管理':
        iconName = 'shop';
        break;
      case '保安公司管理':
        iconName = 'team';
        break;
      case '物业管理':
        iconName = 'home';
        break;
      case '订单管理':
        iconName = 'profile';
        break;
      case '系统管理':
        iconName = 'setting';
        break;
      default:
        iconName = 'table';
        break;
    }
    return iconName;
  };
  onDropMenuClick = ({ key }) => {
    if (key === 'modifyPassword') {
      this.setModalVisible(true);
    } else if (key === 'logout') {
      console.log('logout');
      this.props.logout({
        username: window.store.getState().getMenuListReducer.userInfo.username,
      });
    }
  };
  setModalVisible = modifyPasswordModalVisible => {
    this.setState({ modifyPasswordModalVisible });
  };

  render() {
    const { menuList, userInfo } = this.props;
    const { openKeys, defaultOpenKeys, selectedKeys } = this.state;
    let menuNodes = this.generateMenu(menuList);

    const menu = (
      <Menu onClick={this.onDropMenuClick}>
        <Menu.Item key="modifyPassword">
          <Icon type="lock" /> 修改密码
        </Menu.Item>
        <Menu.Item key="logout">
          <Icon type="logout" /> 退出
        </Menu.Item>
      </Menu>
    );
    return (
      <Layout id="index">
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            openKeys={openKeys}
            onOpenChange={this.onOpenChange}
            defaultOpenKeys={defaultOpenKeys}
            selectedKeys={selectedKeys}
            onClick={this.handleClick}>
            {menuNodes}
            {/*<Menu.Item*/}
            {/*key="statistics"*/}
            {/*>*/}
            {/*<Icon type="dashboard" />*/}
            {/*<span>工作台</span>*/}
            {/*</Menu.Item>*/}
            {/*<SubMenu*/}
            {/*key="commodity"*/}
            {/*title={*/}
            {/*<span>*/}
            {/*<Icon type="table"/>*/}
            {/*<span>商品管理</span>*/}
            {/*</span>*/}
            {/*}>*/}
            {/*<Menu.Item key="commodityManagement">*/}
            {/*<Link to="/index/commodityManagement">*/}
            {/*商品管理*/}
            {/*</Link>*/}
            {/*</Menu.Item>*/}
            {/*<Menu.Item key="commodityClassify">*/}
            {/*<Link to="/index/commodityClassify">*/}
            {/*商品分类管理*/}
            {/*</Link>*/}
            {/*</Menu.Item>*/}
            {/*/!*<Menu.Item key="4">作业设备</Menu.Item>*!/*/}
            {/*</SubMenu>*/}
            {/*<SubMenu*/}
            {/*key="merchant"*/}
            {/*title={*/}
            {/*<span>*/}
            {/*<Icon type="shop"/>*/}
            {/*<span>商家管理</span>*/}
            {/*</span>*/}
            {/*}>*/}
            {/*<Menu.Item key="merchantManagement">*/}
            {/*<Link to="/index/merchantManagement">*/}
            {/*供应商管理*/}
            {/*</Link>*/}
            {/*</Menu.Item>*/}
            {/*<Menu.Item key="merchantMemberManagement">*/}
            {/*<Link to="/index/merchantMemberManagement">*/}
            {/*供应商人员管理*/}
            {/*</Link>*/}
            {/*</Menu.Item>*/}
            {/*<Menu.Item key="buildTeamManagement">*/}
            {/*<Link to="/index/buildTeamManagement">*/}
            {/*施工队管理*/}
            {/*</Link>*/}
            {/*</Menu.Item>*/}
            {/*<Menu.Item key="builderManagement">*/}
            {/*<Link to="/index/builderManagement">*/}
            {/*施工队人员管理*/}
            {/*</Link>*/}
            {/*</Menu.Item>*/}
            {/*<Menu.Item key="coverRuleManagement">*/}
            {/*<Link to="/index/coverRuleManagement">*/}
            {/*覆盖规则*/}
            {/*</Link>*/}
            {/*</Menu.Item>*/}
            {/*</SubMenu>*/}
            {/*<SubMenu*/}
            {/*key="tenement"*/}
            {/*title={*/}
            {/*<span>*/}
            {/*<Icon type="user"/>*/}
            {/*<span>物业管理</span>*/}
            {/*</span>*/}
            {/*}>*/}
            {/*<Menu.Item key="tenementCompanyManagement">*/}
            {/*<Link to="/index/tenementCompanyManagement">*/}
            {/*物业公司管理*/}
            {/*</Link>*/}
            {/*</Menu.Item>*/}
            {/*<Menu.Item key="organizationManagement">*/}
            {/*<Link to="/index/organizationManagement">*/}
            {/*组织架构管理*/}
            {/*</Link>*/}
            {/*</Menu.Item>*/}
            {/*<Menu.Item key="projectManagement">*/}
            {/*<Link to="/index/projectManagement">*/}
            {/*项目管理*/}
            {/*</Link>*/}
            {/*</Menu.Item>*/}
            {/*<Menu.Item key="tenementMemberManagement">*/}
            {/*<Link to="/index/tenementMemberManagement">*/}
            {/*人员管理*/}
            {/*</Link>*/}
            {/*</Menu.Item>*/}
            {/*</SubMenu>*/}
            {/*<SubMenu*/}
            {/*key="order"*/}
            {/*title={*/}
            {/*<span>*/}
            {/*<Icon type="profile"/>*/}
            {/*<span>订单管理</span>*/}
            {/*</span>*/}
            {/*}>*/}
            {/*<Menu.Item key="orderManagement">*/}
            {/*<Link to="/index/orderManagement">*/}
            {/*订单列表*/}
            {/*</Link>*/}
            {/*</Menu.Item>*/}
            {/*</SubMenu>*/}
            {/*<SubMenu*/}
            {/*key="setting"*/}
            {/*title={*/}
            {/*<span>*/}
            {/*<Icon type="setting"/>*/}
            {/*<span>系统设置</span>*/}
            {/*</span>*/}
            {/*}>*/}
            {/*<Menu.Item key="settingManagement">*/}
            {/*<Link to="/index/settingManagement">*/}
            {/*账号管理*/}
            {/*</Link>*/}
            {/*</Menu.Item>*/}
            {/*<Menu.Item key="loginLogRecordManagement">*/}
            {/*<Link to="/index/loginLogRecordManagement">*/}
            {/*登陆日志*/}
            {/*</Link>*/}
            {/*</Menu.Item>*/}
            {/*<Menu.Item key="operateLogRecordManagement">*/}
            {/*<Link to="/index/operateLogRecordManagement">*/}
            {/*操作日志*/}
            {/*</Link>*/}
            {/*</Menu.Item>*/}
            {/*<Menu.Item key="homePictureManagement">*/}
            {/*<Link to="/index/homePictureManagement">*/}
            {/*首页轮播图管理*/}
            {/*</Link>*/}
            {/*</Menu.Item>*/}
            {/*<Menu.Item key="roleManagement">*/}
            {/*<Link to="/index/roleManagement">*/}
            {/*角色管理*/}
            {/*</Link>*/}
            {/*</Menu.Item>*/}
            {/*<Menu.Item key="menuManagement">*/}
            {/*<Link to="/index/menuManagement">*/}
            {/*菜单管理*/}
            {/*</Link>*/}
            {/*</Menu.Item>*/}
            {/*</SubMenu>*/}
          </Menu>
        </Sider>
        <Layout>
          <Header
            style={{
              background: '#fff',
              padding: 0,
              borderBottom: '1px solid #ddd',
            }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            <div
              style={{
                display: 'inline-block',
                fontSize: 16,
                color: 'red',
              }}>
              <CountDown />
            </div>
            <div
              style={{
                display: 'inline-block',
                float: 'right',
                padding: '0 1rem',
              }}>
              {/*<div*/}
              {/*style={{*/}
              {/*display: 'inline-block',*/}
              {/*padding: '0 1rem',*/}
              {/*}}>*/}
              {/*<Button*/}
              {/*shape="circle"*/}
              {/*icon="search"*/}
              {/*style={{verticalAlign: 'middle'}}*/}
              {/*/>*/}
              {/*/!*<Icon type="search" style={{fontSize: '2.2rem', verticalAlign: 'middle'}} />*!/*/}
              {/*</div>*/}
              {/*<div*/}
              {/*style={{*/}
              {/*display: 'inline-block',*/}
              {/*padding: '0 1rem',*/}
              {/*}}>*/}
              {/*<Button icon="bell"/>*/}
              {/*/!*<Icon type="bell" style={{fontSize: '2.2rem', verticalAlign: 'middle'}} />*!/*/}
              {/*</div>*/}
              <div
                style={{
                  display: 'inline-block',
                  padding: '0 1rem',
                }}>
                <img
                  style={{
                    width: '3rem',
                    height: '3rem',
                    borderRadius: '1.5rem',
                  }}
                  src="./image/head.png"
                />
                <Dropdown overlay={menu}>
                  <a
                    className="ant-dropdown-link"
                    style={{
                      padding: '10px 10px 5px 10px',
                    }}>
                    {userInfo.realname}
                    <Icon type="down" />
                  </a>
                </Dropdown>
                <ModifyPasswordModal
                  visible={this.state.modifyPasswordModalVisible}
                  setModalVisible={this.setModalVisible}
                  modifyPassword={this.props.modifyPassword}
                />
              </div>
            </div>
          </Header>
          {this.state.routes}
        </Layout>
      </Layout>
    );
  }
}
const ModifyPasswordModal = Form.create()(
  class extends React.Component {
    constructor(props) {
      super(props);
    }

    validateToNextPassword = (value, callback) => {
      const { validateFields, getFieldValue } = this.props.form;
      if (value && value === getFieldValue('oldPassword')) {
        return callback('新密码不能与原密码相同');
      }
      if (value && getFieldValue('confimPassword')) {
        validateFields(['confimPassword'], { force: true });
      }
      callback();
    };
    compareToFirstPassword = (value, callback) => {
      const { getFieldValue } = this.props.form;
      if (value && value !== getFieldValue('password')) {
        callback('两次输入的密码不符');
      } else {
        callback();
      }
    };
    closeModal = () => {
      this.props.form.resetFields();
      this.props.setModalVisible(false);
    };
    onOKButtonClick = () => {
      this.props.form.validateFields((err, values) => {
        if (err) return;
        const { oldPassword, password } = values;
        const {
          username,
        } = window.store.getState().getMenuListReducer.userInfo;
        this.props.modifyPassword({
          username,
          oldPassword,
          password,
        });
        this.closeModal();
      });
    };
    render() {
      const { getFieldDecorator } = this.props.form;
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 },
        },
      };
      return (
        <Modal
          visible={this.props.visible}
          title="修改密码"
          onCancel={this.closeModal}
          onOk={this.onOKButtonClick}>
          <Form>
            <FormItem label="原密码" {...formItemLayout}>
              {getFieldDecorator('oldPassword', {
                rules: [
                  {
                    required: true,
                    message: '请输入原密码',
                  },
                ],
              })(<Input type="password" placeholder="请输入原密码" />)}
            </FormItem>
            <FormItem label="新密码" {...formItemLayout}>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: '请输入新密码',
                  },
                  {
                    validator: this.validateToNextPassword,
                  },
                  {
                    len: 6,
                    message: '密码不能少于6位',
                  },
                ],
              })(<Input type="password" placeholder="请输入新密码" />)}
            </FormItem>
            <FormItem label="再次确认" {...formItemLayout}>
              {getFieldDecorator('confimPassword', {
                rules: [
                  {
                    required: true,
                    message: '请再次确认新密码',
                  },
                  {
                    validator: this.compareToFirstPassword,
                  },
                ],
              })(<Input type="password" placeholder="请再次确认新密码" />)}
            </FormItem>
          </Form>
        </Modal>
      );
    }
  },
);

class CountDown extends React.Component {
  constructor() {
    super();
    this.state = {
      countDownText: '',
    };
  }
  componentWillMount() {
    this.setCountDown();
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  setCountDown = () => {
    this.timer = setInterval(() => {
      if (moment().isAfter(DEADLINE)) {
        clearInterval(this.timer);
        this.setState({ countDownText: '' });
        return;
      }
      this.setState({ countDownText: getCoutDown() });
    }, 1000);
  };
  render() {
    return this.state.countDownText ? (
      <div>
        该系统尚未续费，请尽快续费，剩余使用时间：
        {this.state.countDownText}
      </div>
    ) : null;
  }
}

const mapStateToProps = state => {
  return {
    menuList: getMenuListResult(state),
    userInfo: getUserInfoResult(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initMenuList: () => {
      dispatch(initMenuList());
    },
    logout: param => {
      dispatch(logout(param));
    },
    initUserInfo: () => {
      dispatch(initUserInfo());
    },
    modifyPassword: params => dispatch(modifyPassword(params)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Index);
