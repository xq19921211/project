/**
 * Created by xu.long on 2018/5/12.
 */

import './style.scss';

import {
  Button,
  Cascader,
  Form,
  Icon,
  Input,
  Layout,
  Modal,
  Pagination,
  Radio,
  Select,
  Table,
  TimePicker,
} from 'antd';
import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';

import { Toolbar } from '../../../../component/Toolbar/Toolbar';
import { arrayDistinct, clone, isEmpty } from '../../../../util/util';
import { initProjectList } from '../../ProjectManagement/RootContainer/action';
import { getProjectList } from '../../ProjectManagement/RootContainer/selector';
import { init, initTenementMemberDetail } from '../TenementMemberDetail/action';
import { getTenementMemberDetail } from '../TenementMemberDetail/selector';
import { submit } from './action';
import { initIceList } from './action';
import { getIceList } from './selector';

const { Content } = Layout;
const FormItem = Form.Item;
const InputGroup = Input.Group;
const Option = Select.Option;
const RadioGroup = Radio.Group;
class AddTenementMember extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      oaUserModalVisible: false,
      projectManagementModalVisible: false,
      oaSelectedRows: [{}],
      projectSelectedRows: [],
      options: {
        current: 1,
        pageSize: 10,
        // pageSizeChange: this.pageChange,
        // pageSizeOptions: ['10', '20', '100'],
      },
    };
  }
  componentWillMount() {
    if (this.props.match.params.action === 'edit') {
      this.props.initTenementMemberDetail({
        id: this.props.match.params.id,
      });
    } else {
      this.props.init();
    }
    this.props.initIceList({
      pageIndex: this.state.options.current,
      pageSize: this.state.options.pageSize,
    });
    this.props.initProjectList({
      current: this.state.options.current,
      pageSize: this.state.options.pageSize,
    });
  }
  componentWillReceiveProps(nextProps) {
    console.log(
      `componentWillReceiveProps nextProps: ${JSON.stringify(nextProps)}`,
    );
    if (
      nextProps &&
      !isEmpty(nextProps.tenementMemberDetail) &&
      this.state.projectSelectedRows.length < 1
    ) {
      if (nextProps.tenementMemberDetail.projects) {
        this.setState(
          Object.assign({}, this.state, {
            projectSelectedRows: nextProps.tenementMemberDetail.projects,
          }),
          () => {
            this.props.form.setFieldsValue({
              managedProject: 'true',
            });
          },
        );
      }
    }
  }
  // pageChange = (current, pageSize) => {
  //     this.setState(
  //         Object.assign({}, this.state, {
  //             options: Object.assign({}, this.state.options, {
  //                 current: current,
  //                 pageSize: pageSize,
  //             }),
  //         }),
  //     );
  // };
  onChange = e => {
    console.log('radio checked', e.target.value);
  };
  setOaUserModalVisible = oaUserModalVisible => {
    console.log(`oaUserModalVisible: ${oaUserModalVisible}`);
    this.setState({ oaUserModalVisible });
  };
  setProjectManagementModalVisible = projectManagementModalVisible => {
    console.log(
      `projectManagementModalVisible: ${projectManagementModalVisible}`,
    );
    this.setState({ projectManagementModalVisible });
  };
  isOk = (modalVisible, selectedRows, type) => {
    const { setFieldsValue } = this.props.form;
    switch (type) {
      case 'oa':
        console.log(
          `oaUserModalVisible: ${modalVisible} and oaSelectedRows: ${JSON.stringify(
            selectedRows,
          )}`,
        );
        this.setOaUserModalVisible(modalVisible);
        this.setState({ oaSelectedRows: selectedRows });
        if (selectedRows.length > 0) {
          setFieldsValue({
            realName: selectedRows[0].realName,
            accountName: selectedRows[0].username,
            sex: parseInt(selectedRows[0].sex),
            phoneNumber: selectedRows[0].phoneNumber,
            usingOrNot: selectedRows[0].status,
            password: selectedRows[0].phoneNumber
              ? selectedRows[0].phoneNumber.substr(-6)
              : '',
          });
        }
        break;
      case 'pro':
        console.log(
          `projectManagementModalVisible: ${modalVisible} and projectSelectedRows: ${JSON.stringify(
            selectedRows,
          )}`,
        );
        this.setProjectManagementModalVisible(modalVisible);
        this.setState({ projectSelectedRows: selectedRows });
        break;
    }
  };
  handleSubmit = e => {
    e.preventDefault();
    let param;
    this.props.form.setFieldsValue({
      managedProject: this.state.projectSelectedRows.length > 0 ? 'true' : null,
    });
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        if (this.props.match.params.action === 'edit') {
          param = {
            cusId: this.props.match.params.id,
            projects: this.state.projectSelectedRows.map((item, i) => {
              return {
                pjId: item.id,
                pjName: item.projectName,
              };
            }),
            action: this.props.match.params.action,
          };
        } else {
          param = {
            accountuuid: !this.state.oaSelectedRows[0].accountUuid
              ? ''
              : this.state.oaSelectedRows[0].accountUuid,
            job: !this.state.oaSelectedRows[0].jobType
              ? ''
              : this.state.oaSelectedRows[0].jobType,
            projects: this.state.projectSelectedRows.map((item, i) => {
              return {
                pjId: item.id,
                pjName: item.projectName,
              };
            }),
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
                param['name'] = values[item];
                break;
              case 'sex':
                param['sex'] = values[item];
                break;
              case 'phoneNumber':
                param['mobile'] = values[item];
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
        console.log('param: ' + JSON.stringify(param));
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
    const { oaSelectedRows, projectSelectedRows } = this.state;
    const {
      iceList,
      tenementMemberDetail,
      projectList,
      initIceList,
      initProjectList,
    } = this.props;
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
    const ToolbarTitle = isEdit ? '编辑物业人员' : '新增物业人员';
    const list = [
      '物业管理',
      {
        label: '物业人员管理',
        to: '/index/tenementMemberManagement',
      },
      {
        label: ToolbarTitle,
        to: `/index/addTenementMember/${this.props.match.params.action}/${
          this.props.match.params.id
        }`,
      },
    ];
    return (
      <Layout id="add_merchant_member">
        <Toolbar type={1} list={list} title={ToolbarTitle} />
        <Content className="content">
          <div>
            <Form>
              <FormItem {...formItemLayout} label="账号名称" required={true}>
                {getFieldDecorator('accountName', {
                  initialValue: tenementMemberDetail.username,
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
                  initIceList={initIceList}
                  options={this.state.options}
                  selectedRowKeys={
                    this.props.match.params.action === 'edit'
                      ? tenementMemberDetail.accountuuid
                        ? [tenementMemberDetail.accountuuid]
                        : []
                      : []
                  }
                />
              </FormItem>
              <FormItem {...formItemLayout} label="真实姓名" required={true}>
                {getFieldDecorator('realName', {
                  initialValue: tenementMemberDetail.name,
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
                  initialValue: tenementMemberDetail.sex
                    ? tenementMemberDetail.sex
                    : 1,
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
                  initialValue: tenementMemberDetail.mobile,
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
                    placeholder="请设置登录密码"
                    type="password"
                    style={{
                      width: '66.6%',
                      marginRight: '1%',
                    }}
                  />,
                )}
                <span>注：默认密码为手机号后六位</span>
              </FormItem>
              <FormItem
                style={{
                  paddingBottom: '2.4rem',
                  marginBottom: 0,
                }}
                {...formItemLayout}
                label="可管理项目"
                required={true}>
                {getFieldDecorator('managedProject', {
                  rules: [
                    {
                      required: true,
                      whitespace: true,
                      message: '请选择可管理项目',
                    },
                  ],
                })(
                  <Input
                    placeholder="请选择可管理项目"
                    style={{ display: 'none' }}
                  />,
                )}
                <Button
                  type="dashed"
                  onClick={() => this.setProjectManagementModalVisible(true)}
                  style={{ width: '20rem' }}>
                  <Icon type="plus" />
                  添加
                </Button>
                {projectSelectedRows.map((item, i) => {
                  return (
                    <span
                      key={i}
                      style={{
                        marginLeft: '1.5rem',
                        display: 'inline-block',
                        height: '32px',
                        lineHeight: '32px',
                        padding: '0 20px',
                        backgroundColor: '#2692fc',
                        borderRadius: '3px',
                        color: '#ffffff',
                      }}>
                      {!item.projectName ? item.pjName : item.projectName}
                    </span>
                  );
                })}
                <ProjectManagementModalForm
                  visible={this.state.projectManagementModalVisible}
                  onOk={this.isOk}
                  onCancel={this.setProjectManagementModalVisible}
                  projectList={projectList}
                  options={this.state.options}
                  initProjectList={initProjectList}
                  selectedRowKeys={
                    this.props.match.params.action === 'edit'
                      ? tenementMemberDetail.projects &&
                        tenementMemberDetail.projects.length > 0
                        ? tenementMemberDetail.projects.map(item =>
                            parseInt(item.pjId),
                          )
                        : []
                      : []
                  }
                  selectedRows={
                    this.props.match.params.action === 'edit'
                      ? tenementMemberDetail.projects &&
                        tenementMemberDetail.projects.length > 0
                        ? tenementMemberDetail.projects.map((item, i) => {
                            return {
                              key: item.pjId,
                              id: item.pjId,
                              projectName: item.pjName,
                            };
                          })
                        : []
                      : []
                  }
                />
              </FormItem>
              <FormItem {...formItemLayout} label="是否启用" require={true}>
                {getFieldDecorator('usingOrNot', {
                  initialValue:
                    this.props.match.params.action === 'edit'
                      ? tenementMemberDetail.status
                      : 0,
                  rules: [{ required: true, message: '是否启用' }],
                })(
                  <RadioGroup onChange={this.onChange}>
                    <Radio value={1}>启用</Radio>
                    <Radio value={0}>停用</Radio>
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
                  <Button type="primary" onClick={this.handleSubmit}>
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

const AddTenementMemberForm = Form.create()(AddTenementMember);
const mapStateToProps = state => {
  return {
    iceList: getIceList(state),
    tenementMemberDetail: getTenementMemberDetail(state),
    projectList: getProjectList(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initIceList: param => {
      dispatch(initIceList(param));
    },
    initProjectList: param => {
      dispatch(initProjectList(param));
    },
    init: () => {
      dispatch(init());
    },
    submit: param => {
      dispatch(submit(param));
    },
    initTenementMemberDetail: param => {
      dispatch(initTenementMemberDetail(param));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddTenementMemberForm);

class OaUserModal extends React.Component {
  count = 0;
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [], // Check here to configure the default column
      selectedRows: [],
      options: {
        current: 1,
        pageSize: 10,
        pageSizeChange: this.pageChange,
        pageSizeOptions: ['10', '20', '100'],
      },
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
    console.log(
      'selectedRowKeys changed: ',
      selectedRowKeys +
        ' selectedRows changed: ' +
        JSON.stringify(selectedRows),
    );
    this.setState({ selectedRowKeys, selectedRows });
  };
  handleSubmit = e => {
    e.preventDefault();
    let param = {
      pageIndex: 1,
      pageSize: this.state.options.pageSize,
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
        this.pageChange(1, this.state.options.pageSize);
      }
    });
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
            <Form layout="inline" onSubmit={this.handleSubmit}>
              <FormItem label="关键字">
                {getFieldDecorator('name')(
                  <Input
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
                  htmlType="submit"
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
              initIceList={this.props.initIceList}
              options={this.state.options}
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
        dataIndex: 'username',
        key: 'username',
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
        username: item.username,
        realName: item.name,
        phoneNumber: item.mobile,
        sex: item.sex,
        status: item.status,
      };
    });
    // const data = [{
    //     key: '1',
    //     account: 'lisicheng',
    //     realName: '李思成',
    //     phoneNumber: '18620008330',
    // }, {
    //     key: '2',
    //     account: 'lisicheng',
    //     realName: '李思成',
    //     phoneNumber: '18620008330',
    // }, {
    //     key: '3',
    //     account: 'lisicheng',
    //     realName: '李思成',
    //     phoneNumber: '18620008330',
    // }];
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
          pageSize: pageSize,
        });
      },
      onShowSizeChange: (current, size) => {
        this.props.options.pageSizeChange(current, size);
        this.props.initIceList({
          pageIndex: current,
          pageSize: size,
        });
      },
    };
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.props.onSelectChange,
      type: 'radio',
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
class ProjectManagementModal extends React.Component {
  count = 0;
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [], // Check here to configure the default column
      selectedRows: [],
      options: {
        current: 1,
        pageSize: 10,
        pageSizeChange: this.pageChange,
        pageSizeOptions: ['10', '20', '100'],
      },
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
            selectedRows: nextProps.selectedRows,
          }),
        );
      }
    }
  }
  onSelectChange = (selectedRowKeys, selectedRows) => {
    //selectedRowKeys为所有选中，selectedRows新增的选中
    console.log(
      'selectedRowKeys changed: ',
      selectedRowKeys +
        ' selectedRows changed: ' +
        JSON.stringify(selectedRows),
    );
    let tempRows = clone(this.state.selectedRows);
    // let tempRowKeys = clone(this.state.selectedRowKeys);
    // let resultRowKeys = tempRowKeys.concat(selectedRowKeys);
    let resultRows = [],
      result = [];
    let temp = tempRows.concat(selectedRows);
    for (let i = 0; i < temp.length; i++) {
      //去重
      for (let j = i + 1; j < temp.length; j++) {
        if (temp[i].id === temp[j].id) {
          j = ++i;
        }
      }
      resultRows.push(temp[i]);
    }
    for (let i = 0; i < resultRows.length; i++) {
      //取选中的对象
      for (let j = 0; j < selectedRowKeys.length; j++) {
        if (resultRows[i].key === selectedRowKeys[j]) {
          result.push(resultRows[i]);
          break;
        }
      }
    }
    this.setState(
      {
        selectedRowKeys: selectedRowKeys,
        selectedRows: result,
      },
      () => {
        console.log(
          `resolved selectedRowKeys: ${JSON.stringify(
            this.state.selectedRowKeys,
          )}, selectedRows: ${JSON.stringify(this.state.selectedRows)}`,
        );
      },
    );
  };
  handleSubmit = e => {
    e.preventDefault();
    let param = {
      current: 1,
      pageSize: this.state.options.pageSize,
    };
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        for (let item in values) {
          switch (item) {
            case 'name':
              param['name'] = values[item];
              break;
          }
        }
        console.log('param: ' + JSON.stringify(param));
        this.props.initProjectList(param);
        this.pageChange(1, this.state.options.pageSize);
      }
    });
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
  render() {
    const { getFieldDecorator, resetFields } = this.props.form;
    const { projectList } = this.props;
    const { selectedRowKeys, selectedRows } = this.state;
    return (
      <div>
        <Modal
          maskClosable={false}
          width="90rem"
          wrapClassName="vertical-center-modal"
          visible={this.props.visible}
          onOk={() => this.props.onOk(false, this.state.selectedRows, 'pro')}
          onCancel={() => this.props.onCancel(false)}
          cancelText="取消"
          okText="确定">
          <div>
            <Form layout="inline" onSubmit={this.handleSubmit}>
              <FormItem label="项目名称">
                {getFieldDecorator('name')(
                  <Input
                    placeholder="请输入项目名称"
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
                  onClick={this.handleSubmit}
                  htmlType="submit">
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
            <ProjectManagementCustomTable
              onSelectChange={this.onSelectChange}
              projectList={projectList}
              options={this.state.options}
              initProjectList={this.props.initProjectList}
              selectedRowKeys={selectedRowKeys}
              selectedRows={selectedRows}
            />
          </div>
        </Modal>
      </div>
    );
  }
}
const ProjectManagementModalForm = Form.create()(ProjectManagementModal);
class ProjectManagementCustomTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: this.props.selectedRowKeys,
      selectedRows: this.props.selectedRows,
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
          selectedRows: nextProps.selectedRows,
        }),
      );
    }
  }
  render() {
    const columns = [
      {
        title: '项目名称',
        dataIndex: 'projectName',
        key: 'projectName',
      },
      {
        title: '物业公司',
        dataIndex: 'tenementCompany',
        key: 'tenementCompany',
      },
      {
        title: '具体地址',
        dataIndex: 'address',
        key: 'address',
      },
    ];
    const { projectList } = this.props;
    const data = projectList.dataSource.map((item, i) => {
      return {
        key: item.pjId,
        id: item.pjId,
        projectName: item.pjName,
        tenementCompany: item.companyName,
        address: item.pjAddress,
      };
    });
    // const data = [{
    //     key: '1',
    //     projectName: '深航假日名居',
    //     tenementCompany: '深圳市彩之云物业管理有限公司',
    //     address.json: '深圳市宝安区宝源路206号',
    // }, {
    //     key: '2',
    //     projectName: '深航假日名居',
    //     tenementCompany: '深圳市彩之云物业管理有限公司',
    //     address.json: '深圳市宝安区宝源路206号',
    // }, {
    //     key: '3',
    //     projectName: '深航假日名居',
    //     tenementCompany: '深圳市彩之云物业管理有限公司',
    //     address.json: '深圳市宝安区宝源路206号',
    // }, {
    //     key: '4',
    //     projectName: '深航假日名居',
    //     tenementCompany: '深圳市彩之云物业管理有限公司',
    //     address.json: '深圳市宝安区宝源路206号',
    // }, {
    //     key: '5',
    //     projectName: '深航假日名居',
    //     tenementCompany: '深圳市彩之云物业管理有限公司',
    //     address.json: '深圳市宝安区宝源路206号',
    // }, {
    //     key: '6',
    //     projectName: '富通城项目',
    //     tenementCompany: '深圳市武当物业管理有限公司',
    //     address.json: '深圳市宝安区宝源路206号',
    // }, {
    //     key: '7',
    //     projectName: '深航假日名居',
    //     tenementCompany: '深圳市彩之云物业管理有限公司',
    //     address.json: '深圳市宝安区宝源路206号',
    // }, {
    //     key: '8',
    //     projectName: '深航假日名居',
    //     tenementCompany: '深圳市彩之云物业管理有限公司',
    //     address.json: '深圳市宝安区宝源路206号',
    // }, {
    //     key: '9',
    //     projectName: '深航假日名居',
    //     tenementCompany: '深圳市彩之云物业管理有限公司',
    //     address.json: '深圳市宝安区宝源路206号',
    // }, {
    //     key: '10',
    //     projectName: '深航假日名居',
    //     tenementCompany: '深圳市彩之云物业管理有限公司',
    //     address.json: '深圳市宝安区宝源路206号',
    // }];
    const options = {
      current: this.props.options.current,
      defaultPageSize: this.props.options.pageSize,
      pageSizeOptions: this.props.options.pageSizeOptions,
      total: projectList.total,
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
        this.props.initProjectList({
          current: page,
          pageSize: pageSize,
        });
      },
      onShowSizeChange: (current, size) => {
        this.props.options.pageSizeChange(current, size);
        this.props.initProjectList({
          current: current,
          pageSize: size,
        });
      },
    };
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
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
