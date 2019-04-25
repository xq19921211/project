/**
 * Created by xu.long on 2018/4/22.
 */
import React from 'react';
import {
  Layout,
  Button,
  Input,
  Form,
  Select,
  Table,
  Pagination,
  Divider,
  Modal,
  Popconfirm,
} from 'antd';
import { Toolbar } from '../../../../component/Toolbar/Toolbar';
import './style.scss';
import { connect } from 'react-redux';
import { getSettingList } from './selector';
import { initSettingList, modifyListStatus, deleteAccount } from './action';
import { dateFormat } from '../../../../util/util';
const { Content } = Layout;
const FormItem = Form.Item;
class SettingManagement extends React.Component {
  constructor(props) {
    super(props);
    this.pageChange = this.pageChange.bind(this);
    this.state = {
      options: {
        current: 1,
        pageSize: 10,
        pageSizeChange: this.pageChange,
        pageSizeOptions: ['10', '20', '100'],
      },
    };
  }

  onChange = value => {
    console.log(value);
  };

  goAccountDetail = id => {
    this.props.history.push(`accountDetail/${id}`);
  };

  componentWillMount() {
    this.props.initSettingList({
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
          if (values[item]) {
            switch (item) {
              case 'keyword':
                param['keyword'] = values[item];
                break;
            }
          }
        }
        this.props.initSettingList(param);
        this.pageChange(1, this.state.options.pageSize);
      }
    });
  };
  //新增管理人员
  add = () => {
    this.props.history.push('addAccount/add/0');
  };
  //编辑管理人员
  edit = id => {
    console.log('edit id: ' + id);
    this.props.history.push(`addAccount/edit/${id}`);
  };
  changeStatus = param => {
    console.log('启用');
    this.props.modifyListStatus(param);
  };

  //删除账号
  deleteAccount = param =>{
    console.log('删除');
    this.props.deleteAccount(param);
    setTimeout(()=>{
      this.props.initSettingList({
        current: this.state.options.current,
        pageSize: this.state.options.pageSize,
      });
    },500)
  };

  render() {
    const { getFieldDecorator, resetFields } = this.props.form;
    const { settingList, initSettingList } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 12 },
        sm: { offset: 5, span: 4 },
      },
      wrapperCol: {
        xs: { span: 12 },
        sm: { span: 10 },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 4, offset: 0 },
        sm: { span: 3, offset: 9 },
      },
    };
    const list = [
      '系统设置',
      {
        label: '账号管理',
        to: '/index/settingManagement',
      },
    ];
    return (
      <Layout id="setting_management">
        <Toolbar type={1} list={list} title="查询列表" />
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
              <FormItem label="关键字">
                {getFieldDecorator('keyword')(
                  <Input
                    onPressEnter={this.handleSubmit}
                    placeholder="请输入账号/真实姓名"
                    type="text"
                  />,
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
                    resetFields(['keyword']);
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
            settingList={settingList}
            goAccountDetail={this.goAccountDetail}
            changeStatus={this.changeStatus}
            edit={this.edit}
            initSettingList={initSettingList}
            deleteAccount={this.deleteAccount}
          />
        </Content>
      </Layout>
    );
  }
}
const SettingManagementForm = Form.create()(SettingManagement);

const mapStateToProps = state => {
  return {
    settingList: getSettingList(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initSettingList: param => {
      dispatch(initSettingList(param));
    },
    modifyListStatus: param => {
      dispatch(modifyListStatus(param));
    },
    deleteAccount: param => {
      dispatch(deleteAccount(param));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingManagementForm);

class CustomTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roleSettingModalVisible: false,
      selectedRows: [],
    };
  }

  setRoleSettingModalVisible = roleSettingModalVisible => {
    console.log(`roleSettingModalVisible: ${roleSettingModalVisible}`);
    this.setState({ roleSettingModalVisible });
  };

  isOk = (roleSettingModalVisible, selectedRows) => {
    console.log(
      `roleSettingModalVisible: ${roleSettingModalVisible} and selectedRows: ${JSON.stringify(
        selectedRows,
      )}`,
    );
    this.setRoleSettingModalVisible(roleSettingModalVisible);
    this.setState({ selectedRows });
  };

  render() {
    const columns = [
      {
        title: '账号',
        dataIndex: 'account',
        key: 'account',
      },
      {
        title: '姓名',
        dataIndex: 'realName',
        key: 'realName',
      },
      {
        title: '手机号码',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
      },
      {
        title: '启用状态',
        dataIndex: 'statusName',
        key: 'statusName',
        filters: [
          {
            text: '已启用',
            value: 'start',
          },
          {
            text: '已停用',
            value: 'stop',
          },
        ],
        onFilter: (value, record) => {
          let strValue = value === 'start' ? '已启用' : '已停用';

          return record.statusName.indexOf(strValue) === 0;
        },
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
          return (
            <span>
              {
                record.id != 1 ? (
                  <Popconfirm title="是否确认删除？" onConfirm={() => this.props.deleteAccount(record)} okText="是" cancelText="否">
                    <a href="#">删除</a>
                  </Popconfirm>
                ):null
              }
              <Divider type="vertical" />
              <a onClick={() => this.props.goAccountDetail(record.id)}>查看</a>
              <Divider type="vertical" />
              <a
                onClick={() => {
                  if (record.status === 0) {
                    record.status = 1;
                  } else {
                    record.status = 0;
                  }
                  this.props.changeStatus(record);
                }}>
                {strValue}
              </a>
              <Divider type="vertical" />
              <a
                onClick={() => {
                  this.props.edit(record.id);
                }}>
                编辑
              </a>
            </span>
          );
        },
      },
    ];
    const { settingList } = this.props;
    const data = settingList.dataSource.map((item, i) => {
      let statusName = item.status === 1 ? '已启用' : '已停用';
      return {
        key: i,
        id: item.mgrId,
        account: item.username,
        realName: item.mgrName,
        phoneNumber: item.mgrTel,
        department: '财务部',
        role: '财务人员，管理员',
        createTime: !item.createTime ? '' : item.createTime,
        status: item.status,
        statusName: statusName,
      };
    });
    const options = {
      current: this.props.options.current,
      defaultPageSize: this.props.options.pageSize,
      pageSizeOptions: this.props.options.pageSizeOptions,
      total: settingList.total,
      showTotal: total => `共 ${total} 条记录`,
      showSizeChanger: true,
      showQuickJumper: true,
      onChange: (page, pageSize) => {
        console.log(
          '页码改变的回调，参数是改变后的页码: ' +
            page +
            ',及每页条数: ' +
            pageSize,
        );
        this.props.options.pageSizeChange(page, pageSize);
        this.props.initSettingList({
          current: page,
          pageSize: pageSize,
        });
      },
      onShowSizeChange: (current, size) => {
        this.props.options.pageSizeChange(current, size);
        this.props.initSettingList({
          current: current,
          pageSize: size,
        });
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
        <RoleSettingModalForm
          visible={this.state.roleSettingModalVisible}
          onOk={this.isOk}
          onCancel={this.setRoleSettingModalVisible}
        />
      </div>
    );
  }
}
class RoleSettingModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      selectedRows: [],
      options: {
        current: 1,
        pageSize: 4,
        pageSizeChange: this.pageChange,
        pageSizeOptions: ['4', '5', '6'],
      },
    };
  }

  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRowKeys, selectedRows });
  };
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
        let param = {
          current: this.state.options.current,
          pageSize: this.state.options.pageSize,
        };
        for (let item in values) {
          if (values[item]) {
            switch (item) {
              case 'name':
                param['name'] = values[item];
                break;
            }
          }
        }
        this.props.initSettingList(param);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { roleList } = this.props;
    return (
      <div>
        <Modal
          width="90rem"
          wrapClassName="vertical-center-modal"
          visible={this.props.visible}
          onOk={() => this.props.onOk(false, this.state.selectedRows)}
          onCancel={() => this.props.onCancel(false)}
          cancelText="取消"
          okText="确定">
          <div>
            <Form layout="inline" onSubmit={this.handleSubmit}>
              <FormItem label="角色名称">
                {getFieldDecorator('name')(
                  <Input
                    onPressEnter={this.handleSubmit}
                    placeholder="请输入角色名称"
                    type="text"
                    style={{
                      width: '100%',
                      marginRight: '3%',
                    }}
                  />,
                )}
              </FormItem>
              <FormItem>
                <Button type="primary" style={{ marginRight: '1rem' }}>
                  查询
                </Button>
                <Button type="default">重置</Button>
              </FormItem>
            </Form>
            <CustomTableNext
              options={this.state.options}
              roleList={roleList}
              onSelectChange={this.onSelectChange}
            />
          </div>
        </Modal>
      </div>
    );
  }
}
const RoleSettingModalForm = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form.create()(RoleSettingModal));

class CustomTableNext extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const columns = [
      {
        title: '角色名称',
        dataIndex: 'roleName',
        key: 'roleName',
      },
      {
        title: '角色说明',
        dataIndex: 'roleRemark',
        key: 'roleRemark',
      },
    ];
    const { roleList } = this.props;
    const data = roleList.dataSource.map((item, i) => {
      return {
        key: i,
        roleName: '保安公司管理员',
        roleRemark: '负责分发订单给到作业队长、和物业对接的相关事物',
      };
    });

    const options = {
      defaultPageSize: this.props.options.pageSize,
      pageSizeOptions: this.props.options.pageSizeOptions,
      total: roleList.total,
      showSizeChanger: true,
      showQuickJumper: true,
      onChange: (page, pageSize) => {
        console.log(
          '页码改变的回调，参数是改变后的页码: ' +
            page +
            ',及每页条数: ' +
            pageSize,
        );
      },
      onShowSizeChange: (current, size) => {
        this.props.options.pageSizeChange(current, size);
      },
    };
    const rowSelection = {
      onChange: this.props.onSelectChange,
      type: 'checkbox',
    };
    return (
      <div>
        <Table
          style={{ overflow: 'scroll', maxHeight: '50rem' }}
          columns={columns}
          dataSource={data}
          pagination={false}
          rowSelection={rowSelection}
        />
        <Pagination
          style={{
            marginTop: '2rem',
          }}
          {...options}
        />
      </div>
    );
  }
}
