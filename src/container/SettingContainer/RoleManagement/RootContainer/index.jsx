/**
 * Created by xu.long on 2018/6/18.
 */

import './style.scss';

import {
  Button,
  Divider,
  Form,
  Input,
  Layout,
  Modal,
  Pagination,
  Table,
  Tree,
} from 'antd';
import {
  addRoleMenu,
  addUserRole,
  getAllUserList,
  getMenuListByRoleId,
  initRoleList,
  modifyListStatus,
} from './action';
import {
  getAllUserListSelector,
  getMenuListByRoleIdSelector,
  getRoleList,
} from './selector';

import React from 'react';
import { Toolbar } from '../../../../component/Toolbar/Toolbar';
import { connect } from 'react-redux';
import { getMenuList } from '../../MenuManagement/RootContainer/selector';
import { initMenuList } from '../../MenuManagement/RootContainer/action';

const { Content } = Layout;
const FormItem = Form.Item;
const TreeNode = Tree.TreeNode;
class RoleManagement extends React.Component {
  constructor(props) {
    super(props);
    this.pageChange = this.pageChange.bind(this);
    this.state = {
      allocatePersonModalVisible: false,
      allocateMenuModalVisible: false,
      selectedRows: [],
      selectedMenuRows: [],
      options: {
        current: 1,
        pageSize: 10,
        pageSizeChange: this.pageChange,
        pageSizeOptions: ['10', '20', '100'],
      },
      currentRoleId: 0,
    };
  }

  componentWillMount() {
    this.props.initRoleList({
      current: this.state.options.current,
      pageSize: this.state.options.pageSize,
    });
  }

  pageChange = (current, pageSize) => {
    this.setState(
      Object.assign({}, this.state, {
        options: Object.assign({}, this.state.options, {
          current: current,
          pageSize: pageSize,
        }),
      }),
    );
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        let param = {
          current: 1,
          pageSize: this.state.options.pageSize,
        };
        for (let item in values) {
          switch (item) {
            case 'name':
              param['keyword'] = values[item];
              break;
          }
        }
        this.props.initRoleList(param);
        this.pageChange(1, this.state.options.pageSize);
      }
    });
  };
  //新增物业人员
  add = () => {
    this.props.history.push('addRole/add/0');
  };
  //编辑物业人员
  edit = id => {
    this.props.history.push(`addRole/edit/${id}`);
  };
  changeStatus = param => {
    this.props.modifyListStatus(param);
  };
  setAllocatePersonModalVisible = allocatePersonModalVisible => {
    this.setState({ allocatePersonModalVisible });
  };
  setAllocateMenuModalVisible = allocateMenuModalVisible => {
    this.setState({ allocateMenuModalVisible });
  };
  menuIsOk = (modalVisible, selectedMenuRows) => {
    this.setAllocateMenuModalVisible(modalVisible);
    this.setState({ selectedMenuRows });
    this.props.addRoleMenu({
      roleId: this.state.currentRoleId,
      menuId: selectedMenuRows.join(','),
    });
  };
  setCurrentRole = roleId => {
    this.setState({ currentRoleId: roleId });
  };
  render() {
    const { getFieldDecorator, resetFields } = this.props.form;
    const { roleList, initRoleList, menuList, initMenuList } = this.props;

    const list = [
      '系统设置',
      {
        label: '角色管理',
        to: '/index/roleManagement',
      },
    ];
    return (
      <Layout id="role_management">
        <Toolbar type={1} list={list} title="列表查询" />
        <Content className="content">
          <div>
            <Form
              style={{
                display: 'flex',
                padding: '0 1.6rem 1rem 1.6rem',
                position: 'relative',
              }}
              layout="inline"
              onSubmit={this.handleSubmit}>
              <FormItem label="角色名称">
                {getFieldDecorator('name')(
                  <Input placeholder="请输入角色名称" type="text" />,
                )}
              </FormItem>
              <FormItem style={{ position: 'absolute', right: 0 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginRight: '1rem' }}>
                  查询
                </Button>
                <Button
                  type="default"
                  htmlType="reset"
                  style={{ marginRight: '1rem' }}
                  onClick={() => {
                    resetFields(['name']);
                  }}>
                  重置
                </Button>
                <Button icon="plus" type="primary" onClick={this.add}>
                  新增
                </Button>
              </FormItem>
            </Form>
          </div>
          <CustomTable
            options={this.state.options}
            roleList={roleList}
            edit={this.edit}
            changeStatus={this.changeStatus}
            initRoleList={initRoleList}
            setAllocateMenuModalVisible={this.setAllocateMenuModalVisible}
            getMenuListByRoleId={this.props.getMenuListByRoleId}
            setAllocatePersonModalVisible={this.setAllocatePersonModalVisible}
            initMenuList={initMenuList}
            setCurrentRole={this.setCurrentRole}
          />
          <AllocatePersonModal
            getAllUserList={this.props.getAllUserList}
            addUserRole={this.props.addUserRole}
            allUserList={this.props.allUserList}
            visible={this.state.allocatePersonModalVisible}
            roleId={this.state.currentRoleId}
            close={this.setAllocatePersonModalVisible}
          />
          <AllocateMenuModal
            visible={this.state.allocateMenuModalVisible}
            onOk={this.menuIsOk}
            onCancel={this.setAllocateMenuModalVisible}
            menuList={menuList}
            menuListByRoleId={this.props.menuListByRoleId}
          />
        </Content>
      </Layout>
    );
  }
}
const RoleManagementForm = Form.create()(RoleManagement);

const mapStateToProps = state => {
  return {
    roleList: getRoleList(state),
    menuList: getMenuList(state),
    allUserList: getAllUserListSelector(state),
    menuListByRoleId: getMenuListByRoleIdSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initRoleList: param => dispatch(initRoleList(param)),
    modifyListStatus: param => dispatch(modifyListStatus(param)),
    initMenuList: param => dispatch(initMenuList(param)),
    addRoleMenu: param => dispatch(addRoleMenu(param)),
    getAllUserList: param => dispatch(getAllUserList(param)),
    addUserRole: param => dispatch(addUserRole(param)),
    getMenuListByRoleId: param => dispatch(getMenuListByRoleId(param)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RoleManagementForm);

const TextButton = props => {
  const color = props.disabled ? '#c0c4cc' : '#409eff';
  return (
    <Button
      className="text-button"
      disabled={props.disabled}
      style={{
        color: color,
        backgroundColor: 'transparent',
        border: 0,
        padding: 0,
      }}
      {...props}>
      {props.children}
    </Button>
  );
};

class CustomTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const columns = [
      {
        title: '角色名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '已分配人员',
        dataIndex: 'member',
        key: 'member',
      },
      {
        title: '状态',
        dataIndex: 'statusName',
        key: 'statusName',
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => {
          let strValue;
          switch (record.status) {
            case 0:
              strValue = '启用';
              break;
            case 1:
            default:
              strValue = '停用';
              break;
          }
          const disabled = !!record.isSuperadmin;
          return (
            <span>
              <TextButton
                disabled={disabled}
                onClick={() => {
                  this.props.edit(record.id);
                }}>
                编辑
              </TextButton>
              <Divider type="vertical" />
              <TextButton
                disabled={disabled}
                onClick={() => {
                  this.props.setCurrentRole(record.id);
                  this.props.setAllocatePersonModalVisible(true);
                }}>
                分配人员
              </TextButton>
              <Divider type="vertical" />
              <TextButton
                disabled={disabled}
                onClick={() => {
                  this.props.setAllocateMenuModalVisible(true);
                  this.props.setCurrentRole(record.id);
                  this.props.initMenuList();
                  this.props.getMenuListByRoleId({
                    id: record.id,
                  });
                }}>
                分配菜单
              </TextButton>
              <Divider type="vertical" />
              <TextButton
                disabled={disabled}
                onClick={() => {
                  record.status = record.status === 0 ? 1 : 0;
                  this.props.changeStatus(record);
                }}>
                {strValue}
              </TextButton>
            </span>
          );
        },
      },
    ];
    const { roleList } = this.props;
    const data = roleList.dataSource.map((item, i) => {
      let statusName = item.roleStatus === 0 ? '已停用' : '已启用';
      return {
        key: i,
        id: item.roleId,
        name: item.roleName,
        member: item.userList.filter(item => item).map(item => item.realname).join('、'),
        status: item.roleStatus,
        statusName: statusName,
        isSuperadmin: item.isSuperadmin,
      };
    });
    const options = {
      current: this.props.options.current,
      defaultPageSize: this.props.options.pageSize,
      pageSizeOptions: this.props.options.pageSizeOptions,
      total: roleList.total,
      showTotal: total => `共 ${total} 条记录`,
      showSizeChanger: true,
      showQuickJumper: true,
      onChange: (page, pageSize) => {
        this.props.options.pageSizeChange(page, pageSize);
        this.props.initRoleList({ current: page, pageSize: pageSize });
      },
      onShowSizeChange: (current, size) => {
        this.props.options.pageSizeChange(current, size);
        this.props.initRoleList({ current: current, pageSize: size });
      },
    };
    return (
      <div>
        <Table columns={columns} dataSource={data} pagination={false} />
        <Pagination
          style={{
            float: 'right',
            marginTop: '2rem',
          }}
          {...options}
        />
      </div>
    );
  }
}

class AllocatePersonModal extends React.Component {
  constructor(props) {
    super(props);
    const USER_TYPES = {
      Manager: '管理员',
      Customer: '物业',
      SupplierStaff: '保安公司',
      Operator: '保安队长',
    };
    this.state = {
      selectedRowKeys: [],
      allUserList: [],
      keyWord: '',
      columns: [
        {
          title: '账号',
          dataIndex: 'username',
        },
        {
          title: '真实姓名',
          dataIndex: 'realname',
        },
        {
          title: '人员类型',
          dataIndex: 'userType',
          render(userType) {
            return USER_TYPES[userType];
          },
        },
      ],
    };
  }
  componentWillReceiveProps(next) {
    if (next.visible && next.visible !== this.props.visible) {
      // 此时刚开始打开弹框，需要获取全部用的列表
      this.props.getAllUserList();
    } else {
      this.setState({
        keyWord: '',
      });
    }
    if (next.allUserList !== this.props.allUserList) {
      this.getSelectedRowKeys(next.allUserList);
    }
  }
  getSelectedRowKeys = allUserList => {
    const selectedRowKeys = allUserList.reduce((next, user) => {
      const isInRoles = user.roles.filter(role => {
        return role.roleId === this.props.roleId;
      });
      if (isInRoles.length) {
        next.push(user.userId);
      }
      return next;
    }, []);
    this.setState({
      selectedRowKeys,
      allUserList,
    });
  };
  onSubmit() {
    this.props.addUserRole({
      roleId: this.props.roleId,
      userId: this.state.selectedRowKeys.join(','),
    });
    this.props.close(false);
  }
  onKeyWordChange = e => {
    this.setState({ keyWord: e.target.value });
  };
  onSearchButtonClick = () => {
    const { allUserList } = this.props;
    const { keyWord } = this.state;
    if (keyWord === '') {
      this.setState({ allUserList });
      return;
    }
    const res = allUserList.filter(user => {
      return user.realname.includes(keyWord);
    });
    this.setState({ allUserList: res });
  };
  onRestButtonClick = () => {
    const { allUserList } = this.props;
    this.setState({ keyWord: '', allUserList });
  };
  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: selectedRowKeys => this.setState({ selectedRowKeys }),
    };
    return (
      <Modal
        width="90rem"
        wrapClassName="vertical-center-modal"
        visible={this.props.visible}
        onCancel={() => this.props.close()}
        onOk={this.onSubmit.bind(this)}
        cancelText="取消"
        okText="确定">
        <Form layout="inline">
          <FormItem label="人员名称">
            <Input
              onPressEnter={this.handleSubmit}
              placeholder="请输入人员名称"
              type="text"
              value={this.state.keyWord}
              onInput={this.onKeyWordChange}
            />
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              style={{ marginRight: '1rem' }}
              onClick={this.onSearchButtonClick}>
              查询
            </Button>
            <Button type="default" onClick={this.onRestButtonClick}>
              重置
            </Button>
          </FormItem>
        </Form>
        <Table
          style={{
            overflow: 'scroll',
            maxHeight: '50rem',
            minHeight: '40rem',
          }}
          columns={this.state.columns}
          dataSource={this.state.allUserList}
          pagination={false}
          rowKey="userId"
          rowSelection={rowSelection}
        />
      </Modal>
    );
  }
}

class AllocateMenuModal extends React.Component {
  constructor(props) {
    super(props);
    this.combine = this.combine.bind(this);
    this.state = {
      expandedKeys: [],
      autoExpandParent: true,
      checkedKeys: [],
      halfCheckedKeys: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    const { menuListByRoleId, menuList } = nextProps;
    if (
      menuList &&
      menuList.dataSource.length &&
      this.state.expandedKeys.length < 1
    ) {
      this.setState({
        expandedKeys: this.combine(menuList.dataSource),
      });
    }
    if (
      menuListByRoleId &&
      menuListByRoleId.length &&
      menuList &&
      menuList.dataSource.length &&
      menuListByRoleId !== this.props.menuListByRoleId
    ) {
      this.setState({
        checkedKeys: this.findCheckedKeys(
          menuListByRoleId,
          menuList.dataSource,
        ),
      });
    }
  }
  findHalfCheckedKeys = menuList => {
    return menuList.reduce((arr, next) => {
      if (next.chrildren && next.chrildren.length) {
        arr.push(next.menuId);
        return [...arr, ...this.findHalfCheckedKeys(next.chrildren)];
      }
      return arr;
    }, []);
  };

  findCheckedKeys = (roleList, menuList) => {
    const halfCheckedKeys = this.findHalfCheckedKeys(menuList);
    const res = roleList
      .filter(role => !halfCheckedKeys.includes(role.menuId))
      .map(item => item.menuId);
    return res;
  };
  onExpand = expandedKeys => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };
  onCheck = (checkedKeys, { halfCheckedKeys }) => {
    this.setState({ checkedKeys, halfCheckedKeys });
  };
  renderTreeNodes = data => {
    return data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} />;
    });
  };
  convert = data => {
    return data.map((item, i) => {
      //cat_id作为节点的key
      return {
        key: item.menuId,
        id: item.menuId,
        title: item.menuName,
        children: this.convert(item.chrildren),
      };
    });
  };
  combine = data => {
    let result = [];
    data.map((item, i) => {
      if (item.chrildren && item.chrildren.length > 0) {
        result = result.concat(this.combine(item.chrildren));
      } else {
        result.push(item.menuId.toString());
      }
    });
    return result;
  };

  render() {
    const { menuList } = this.props;
    const data = this.convert(menuList.dataSource);
    return (
      <div>
        <Modal
          width="90rem"
          wrapClassName="vertical-center-modal"
          visible={this.props.visible}
          onOk={() => {
            this.setState({
              checkedKeys: [],
            });
            this.props.onOk(false, [
              ...this.state.checkedKeys,
              ...this.state.halfCheckedKeys,
            ]);
          }}
          onCancel={() => this.props.onCancel(false)}
          cancelText="取消"
          okText="确定">
          <Tree
            checkable
            onExpand={this.onExpand}
            expandedKeys={this.state.expandedKeys}
            autoExpandParent={this.state.autoExpandParent}
            onCheck={this.onCheck}
            checkedKeys={this.state.checkedKeys}>
            {this.renderTreeNodes(data)}
          </Tree>
        </Modal>
      </div>
    );
  }
}
