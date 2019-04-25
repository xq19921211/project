/**
 * Created by xu.long on 2018/5/12.
 */
import React from 'react';
import {
  Layout,
  Form,
  Input,
  Select,
  Radio,
  Modal,
  Button,
  Table,
  Pagination,
} from 'antd';
import { Toolbar } from '../../../../component/Toolbar/Toolbar';
import './style.scss';
import { connect } from 'react-redux';
import { submit } from './action';
import { getIceList } from './selector';
import { initIceList } from './action';
import { init, initAccountDetail } from '../AccountDetail/action';
import { getAccountDetail } from '../AccountDetail/selector';
const { Content } = Layout;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
class AddAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oaUserModalVisible: false,
      oaSelectedRows: [{}],
      options: {
        current: 1,
        pageSize: 10,
        pageSizeChange: this.pageChange,
        pageSizeOptions: ['10', '20', '100'],
      },
    };
  }

  componentWillMount() {
    if (this.props.match.params.action === 'edit') {
      this.props.initAccountDetail({ id: this.props.match.params.id });
    } else {
      this.props.init();
    }
    this.props.initIceList({
      pageIndex: this.state.options.current,
      pageSize: this.state.options.pageSize,
    });
  }
  componentWillUnmount() {
    this.props.init();
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
  onChange = e => {
    console.log('radio checked', e.target.value);
  };
  setOaUserModalVisible = oaUserModalVisible => {
    this.setState({ oaUserModalVisible });
  };
  isOk = (modalVisible, selectedRows, type) => {
    this.setOaUserModalVisible(modalVisible);
    this.setState({ oaSelectedRows: selectedRows });
    const { setFieldsValue } = this.props.form;
    if (selectedRows.length > 0) {
      setFieldsValue({
        realName: selectedRows[0].realName,
        accountName: selectedRows[0].account,
        sex: parseInt(selectedRows[0].sex),
        phoneNumber: selectedRows[0].phoneNumber,
        email: selectedRows[0].email,
        usingOrNot: selectedRows[0].usingOrNot,
        password: selectedRows[0].phoneNumber
          ? selectedRows[0].phoneNumber.substr(-6)
          : '',
      });
    }
  };
  handleSubmit = e => {
    e.preventDefault();
    let param;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (this.props.match.params.action === 'edit') {
          param = {
            mgrId: this.props.match.params.id,
            action: this.props.match.params.action,
          };
        } else {
          param = {
            mgrUuid: !this.state.oaSelectedRows[0].accountUuid
              ? ''
              : this.state.oaSelectedRows[0].accountUuid,
            job: !this.state.oaSelectedRows[0].jobType
              ? ''
              : this.state.oaSelectedRows[0].jobType,
            action: this.props.match.params.action,
          };
        }
        for (let item in values) {
          if (values[item] !== null || values[item] !== undefined) {
            switch (item) {
              case 'accountName':
                param['username'] = values[item];
                break;
              case 'realName':
                param['mgrName'] = values[item];
                break;
              case 'sex':
                param['mgrSex'] = values[item];
                break;
              case 'phoneNumber':
                param['mgrTel'] = values[item];
                break;
              case 'password':
                param['password'] = values[item];
                break;
              case 'usingOrNot':
                param['status'] = values[item];
                break;
            }
          }
        }
        this.props.submit(param);
      }
    });
  };

  render() {
    const {
      getFieldDecorator,
      setFieldsValue,
      getFieldValue,
    } = this.props.form;
    const { iceList, accountDetail, initIceList } = this.props;
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
        sm: { span: 4, offset: 8 },
      },
    };
    const isEdit = this.props.match.params.action === 'edit';
    const ToolbarTitle = isEdit ? '编辑账号' : '新增账号';
    const list = [
      '系统设置',
      {
        label: '账号管理',
        to: '/index/settingManagement',
      },
      {
        label: ToolbarTitle,
        to: `/index/addAccount/${this.props.match.params.action}/${
          this.props.match.params.id
        }`,
      },
    ];
    return (
      <Layout id="add_merchant_member">
        <Toolbar type={1} list={list} title={ToolbarTitle} />
        <Content className="content">
          <div>
            <Form onSubmit={this.handleSubmit}>
              <FormItem {...formItemLayout} label="账号名称" required={true}>
                {getFieldDecorator('accountName', {
                  initialValue: accountDetail.username,
                  rules: [
                    {
                      required: true,
                      message: '请输入账号名称',
                    },
                  ],
                })(
                  <Input
                    disabled={true}
                    placeholder="请输入账号名称"
                    type="text"
                    style={{
                      width: '50%',
                      marginRight: '3%',
                    }}
                  />,
                )}
                <Button
                  style={{
                    display:
                      this.props.match.params.action === 'edit' ? 'none' : '',
                  }}
                  icon="plus"
                  type="primary"
                  onClick={() => {
                    console.log('选择OA用户');
                    this.setOaUserModalVisible(true);
                  }}>
                  选择OA用户
                </Button>
                <OaUserModalForm
                  visible={this.state.oaUserModalVisible}
                  onOk={this.isOk}
                  onCancel={this.setOaUserModalVisible}
                  memberList={iceList}
                  options={this.state.options}
                  initIceList={initIceList}
                  selectedRowKeys={
                    this.props.match.params.action === 'edit'
                      ? accountDetail.mgrUuid
                        ? [accountDetail.mgrUuid]
                        : []
                      : []
                  }
                />
              </FormItem>
              <FormItem {...formItemLayout} label="真实姓名" required={true}>
                {getFieldDecorator('realName', {
                  initialValue: accountDetail.mgrName,
                  rules: [
                    {
                      required: true,
                      message: '请输入真实姓名',
                    },
                  ],
                })(
                  <Input
                    disabled={true}
                    placeholder="请输入真实姓名"
                    type="text"
                    style={{
                      width: '100%',
                      marginRight: '3%',
                    }}
                  />,
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="性别" require={true}>
                {getFieldDecorator('sex', {
                  initialValue:
                    this.props.match.params.action === 'edit'
                      ? accountDetail.mgrSex
                      : 0,
                  rules: [
                    {
                      required: true,
                      message: '请选择性别',
                    },
                  ],
                })(
                  <RadioGroup onChange={this.onChange}>
                    <Radio value={1}>男</Radio>
                    <Radio value={0}>女</Radio>
                  </RadioGroup>,
                )}
              </FormItem>
              <FormItem required={true} {...formItemLayout} label="手机号码">
                {getFieldDecorator('phoneNumber', {
                  initialValue: accountDetail.mgrTel,
                  rules: [
                    {
                      required: true,
                      message: '请输入11位手机号码',
                      min: 11,
                    },
                  ],
                })(
                  <Input
                    onBlur={() => {
                      setFieldsValue({
                        password: getFieldValue('phoneNumber').substr(-6),
                      });
                    }}
                    placeholder="请输入手机号码"
                    maxLength={11}
                    style={{
                      width: '100%',
                      marginRight: '3%',
                    }}
                  />,
                )}
              </FormItem>
              <FormItem
                {...{
                  labelCol: {
                    xs: { span: 12 },
                    sm: { offset: 5, span: 4 },
                  },
                  wrapperCol: {
                    xs: { span: 12 },
                    sm: { span: 15 },
                  },
                }}
                label="设置登录密码"
                required={true}>
                {getFieldDecorator('password', {
                  initialValue:
                    this.props.match.params.action === 'edit'
                      ? getFieldValue('phoneNumber')
                        ? getFieldValue('phoneNumber').substr(-6)
                        : ''
                      : '',
                  rules: [
                    {
                      required: true,
                      message: '请设置登录密码',
                    },
                  ],
                })(
                  <Input
                    disabled={true}
                    placeholder="默认手机号后六位"
                    type="password"
                    style={{
                      width: '66.6%',
                      marginRight: '1%',
                    }}
                  />,
                )}
                <span>注：默认密码为手机号后六位</span>
              </FormItem>
              <FormItem {...formItemLayout} label="是否启用" require={true}>
                {getFieldDecorator('usingOrNot', {
                  initialValue:
                    this.props.match.params.action === 'edit'
                      ? accountDetail.status
                      : 0,
                  rules: [{ required: true, message: '是否启用' }],
                })(
                  <RadioGroup onChange={this.onChange}>
                    <Radio value={1}>启用</Radio>
                    <Radio value={0}>禁用</Radio>
                  </RadioGroup>,
                )}
              </FormItem>
              <div className="submit">
                <FormItem
                  style={{
                    paddingBottom: '2.4rem',
                    marginBottom: 0,
                  }}
                  {...formItemLayoutWithOutLabel}>
                  <Button type="primary" htmlType="submit">
                    提交
                  </Button>
                  <Button
                    style={{ marginLeft: '2rem' }}
                    type="default"
                    onClick={() => {
                      this.props.history.goBack();
                    }}>
                    返回
                  </Button>
                </FormItem>
              </div>
            </Form>
          </div>
        </Content>
      </Layout>
    );
  }
}

const AddAccountForm = Form.create()(AddAccount);
const mapStateToProps = state => {
  return {
    iceList: getIceList(state),
    accountDetail: getAccountDetail(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initIceList: param => {
      dispatch(initIceList(param));
    },
    submit: param => {
      dispatch(submit(param));
    },
    init: () => {
      dispatch(init());
    },
    initAccountDetail: param => {
      dispatch(initAccountDetail(param));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddAccountForm);

class OaUserModal extends React.Component {
  count = 0;
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [], // Check here to configure the default column
      selectedRows: [],
    };
  }
  componentWillReceiveProps(nextProps) {
    console.log(
      `componentWillReceiveProps nextProps: ${JSON.stringify(nextProps)}`,
    );
    if (this.count < 1) {
      if (
        nextProps &&
        nextProps.selectedRowKeys.length > 0 &&
        this.state.selectedRowKeys.length < 1
      ) {
        this.count++;
        this.setState(
          Object.assign({}, this.state, {
            selectedRowKeys: nextProps.selectedRowKeys,
          }),
        );
      }
    }
  }
  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRowKeys, selectedRows });
  };
  handleSubmit = e => {
    e.preventDefault();
    let param = {
      pageIndex: 1,
      pageSize: this.props.options.pageSize,
    };
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        for (let item in values) {
          switch (item) {
            case 'name':
              param['keyword'] = values[item];
              break;
          }
        }
        console.log('param: ' + JSON.stringify(param));
        this.props.initIceList(param);
        this.props.options.pageSizeChange(1, this.props.options.pageSize);
      }
    });
  };
  render() {
    const { getFieldDecorator, resetFields } = this.props.form;
    const { memberList } = this.props;
    const { selectedRowKeys } = this.state;
    return (
      <div>
        <Modal
          maskClosable={false}
          width="90rem"
          wrapClassName="vertical-center-modal"
          visible={this.props.visible}
          onOk={() => this.props.onOk(false, this.state.selectedRows, 'oa')}
          onCancel={() => this.props.onCancel(false)}
          cancelText="取消"
          okText="确定">
          <div>
            <Form layout="inline">
              <FormItem label="关键字">
                {getFieldDecorator('name')(
                  <Input
                    onPressEnter={this.handleSubmit}
                    placeholder="请输入OA账号或真实姓名"
                    type="text"
                    style={{
                      width: '100%',
                      marginRight: '3%',
                    }}
                  />,
                )}
              </FormItem>
              <FormItem>
                <Button
                  type="primary"
                  style={{ marginRight: '1rem' }}
                  onClick={this.handleSubmit}>
                  查询
                </Button>
                <Button
                  type="default"
                  onClick={() => {
                    resetFields(['name']);
                  }}>
                  重置
                </Button>
              </FormItem>
            </Form>
            <OaUserCustomTable
              onSelectChange={this.onSelectChange}
              memberList={memberList}
              options={this.props.options}
              initIceList={this.props.initIceList}
              selectedRowKeys={selectedRowKeys}
            />
          </div>
        </Modal>
      </div>
    );
  }
}
const OaUserModalForm = Form.create()(OaUserModal);
class OaUserCustomTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: this.props.selectedRowKeys,
    };
  }
  componentWillReceiveProps(nextProps) {
    console.log(
      `componentWillReceiveProps nextProps: ${JSON.stringify(nextProps)}`,
    );
    if (nextProps) {
      this.setState(
        Object.assign({}, this.state, {
          selectedRowKeys: nextProps.selectedRowKeys,
        }),
      );
    }
  }
  render() {
    const columns = [
      {
        title: '账号',
        dataIndex: 'account',
        key: 'account',
      },
      {
        title: '真实姓名',
        dataIndex: 'realName',
        key: 'realName',
      },
      {
        title: '手机号码',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
      },
    ];

    const { memberList } = this.props;
    const data = memberList.content.map((item, i) => {
      return {
        key: item.accountUuid,
        accountUuid: item.accountUuid,
        jobType: item.jobType,
        account: item.username,
        realName: item.name,
        phoneNumber: item.mobile,
        sex: item.sex,
        email: item.email,
        usingOrNot: item.status,
      };
    });
    const options = {
      current: this.props.options.current,
      defaultPageSize: this.props.options.pageSize,
      pageSizeOptions: this.props.options.pageSizeOptions,
      total: memberList.totalRecord,
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
        this.props.initIceList({
          pageIndex: page,
          pageSize: this.pageSize,
        });
      },
      onShowSizeChange: (current, size) => {
        this.props.options.pageSizeChange(current, size);
        this.props.initIceList({ pageIndex: current, pageSize: size });
      },
    };
    const { onSelectChange, selectedRowKeys } = this.props;
    const rowSelection = {
      onChange: onSelectChange,
      type: 'radio',
      selectedRowKeys,
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
