/**
 * Created by xu.long on 2018/6/18.
 */
import React from 'react';
import {
  Layout,
  Form,
  Input,
  Select,
  Radio,
  Icon,
  Modal,
  Button,
  Cascader,
  TimePicker,
  Table,
  Pagination,
} from 'antd';
import moment from 'moment';
import { Toolbar } from '../../../../component/Toolbar/Toolbar';
import './style.scss';
import { connect } from 'react-redux';
import { getBuildTeamList } from '../../BuildTeamManagement/RootContainer/selector';
import { getBuilderDetail } from '../BuilderDetail/selector';
import { submit } from './action';
import { initBuildTeamList } from '../../BuildTeamManagement/RootContainer/action';
import { init, initBuilderDetail } from '../BuilderDetail/action';
import { getIceList } from '../../../TenementContainer/TenementMemberManagement/AddTenementMember/selector';
import { initIceList } from '../../../TenementContainer/TenementMemberManagement/AddTenementMember/action';
const { Content } = Layout;
const FormItem = Form.Item;
const InputGroup = Input.Group;
const Option = Select.Option;
const RadioGroup = Radio.Group;
class AddBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      oaUserModalVisible: false,
      selectedRows: [],
      options: {
        current: 1,
        pageSize: 10,
        pageSizeChange: this.pageChange,
        pageSizeOptions: ['10', '20', '100'],
      },
      // passwordStatus: false, //false为密码输入可编辑
      sup_id: 0,
    };
  }

  componentWillMount() {
    if (this.props.match.params.action === 'edit') {
      this.props.initBuilderDetail({ id: this.props.match.params.id });
      // this.setState({
      //     passwordStatus: true
      // });
    } else {
      this.props.init();
    }
    this.props.initIceList({
      pageIndex: this.state.options.current,
      pageSize: this.state.options.pageSize,
    });
    this.props.initBuildTeamList();
  }

  componentWillReceiveProps(nextProps) {
    // console.log('componentWillReceiveProps: ', JSON.stringify(nextProps));
    if (
      nextProps.buildTeamList &&
      nextProps.buildTeamList.dataSource.length > 0 &&
      this.state.sup_id === 0
    ) {
      this.setState({
        sup_id: nextProps.buildTeamList.dataSource[0].sup_id,
      });
    }
  }
  componentWillUnmount() {
    this.props.init();
  }

  onChange = e => {
    console.log('radio checked', e.target.value);
  };
  handleSubmit = e => {
    e.preventDefault();
    let param;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (this.props.match.params.action === 'edit') {
          param = {
            oprId: this.props.match.params.id,
            sup_id: this.state.sup_id,
            action: this.props.match.params.action,
          };
        } else {
          param = {
            oprUuid:
              this.state.selectedRows.length > 0 &&
              this.state.selectedRows[0].accountUuid
                ? this.state.selectedRows[0].accountUuid
                : '',
            job:
              this.state.selectedRows.length > 0 &&
              this.state.selectedRows[0].jobType
                ? this.state.selectedRows[0].jobType
                : '',
            sup_id: this.state.sup_id,
            action: this.props.match.params.action,
          };
        }
        console.log('Received values of form: ', values);
        for (let item in values) {
          switch (item) {
            case 'realName':
              param['oprName'] = values[item];
              break;
            // case 'identityNumber':
            //     param['identity'] = values[item];
            //     break;
            case 'sex':
              param['sex'] = values[item];
              break;
            case 'buildTeam':
              param['teamId'] = values[item];
              break;
            case 'isLeader':
              param['isLeader'] = values[item];
              break;
            case 'phoneNumber':
              param['oprTel'] = values[item];
              break;
            case 'setUserName':
              param['username'] = values[item];
              break;
            case 'password':
              // if (!this.state.passwordStatus) {
              param['password'] = values[item];
              // }
              break;
            // case 'email':
            //     param['email'] = values[item];
            // break;
            // case 'address':
            //     param['address'] = values[item];
            //     break;
            case 'usingOrNot':
              param['oprStatus'] = values[item];
              break;
          }
        }
        console.log('param: ' + JSON.stringify(param));
        this.props.submit(param);
      }
    });
  };
  setOaUserModalVisible = oaUserModalVisible => {
    console.log(`oaUserModalVisible: ${oaUserModalVisible}`);
    this.setState({ oaUserModalVisible });
  };
  isOk = (modalVisible, selectedRows) => {
    console.log(
      `oaUserModalVisible: ${modalVisible} and oaSelectedRows: ${JSON.stringify(
        selectedRows,
      )}`,
    );
    this.setOaUserModalVisible(modalVisible);
    this.setState({ selectedRows });
    const { setFieldsValue } = this.props.form;
    if (selectedRows.length > 0) {
      setFieldsValue({
        realName: selectedRows[0].realName,
        setUserName: selectedRows[0].account,
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

  render() {
    const {
      getFieldDecorator,
      setFieldsValue,
      getFieldValue,
    } = this.props.form;
    const { iceList, buildTeamList, builderDetail, initIceList } = this.props;
    // const {passwordStatus} = this.state;
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
    const list = [
      '保安公司管理',
      {
        label: '保安队人员管理',
        to: '/index/builderManagement',
      },
      {
        label: '新增保安队人员',
        to: `/index/addBuilder/${this.props.match.params.action}/${
          this.props.match.params.id
        }`,
      },
    ];
    return (
      <Layout id="add_builder">
        <Toolbar type={1} list={list} title="新增保安队人员" />
        <Content className="content">
          <div>
            <Form onSubmit={this.handleSubmit}>
              <FormItem {...formItemLayout} label="真实姓名" required={true}>
                {getFieldDecorator('realName', {
                  initialValue:
                    this.props.match.params.action === 'edit'
                      ? builderDetail.oprName
                      : '',
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
                  selectedRowKeys={
                    this.props.match.params.action === 'edit'
                      ? builderDetail.oprUuid
                        ? [builderDetail.oprUuid]
                        : []
                      : []
                  }
                />
              </FormItem>
              {/*<FormItem*/}
              {/*{...formItemLayout}*/}
              {/*label="身份证号码"*/}
              {/*>*/}
              {/*{getFieldDecorator('identityNumber', {*/}
              {/*initialValue: ''*/}
              {/*})(<Input*/}
              {/*placeholder="请输入身份证号码"*/}
              {/*type="text"*/}
              {/*style={{width: '100%', marginRight: '3%'}}*/}
              {/*/>)}*/}
              {/*</FormItem>*/}
              <FormItem {...formItemLayout} label="性别" require={true}>
                {getFieldDecorator('sex', {
                  initialValue:
                    this.props.match.params.action === 'edit'
                      ? builderDetail.sex
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
              <FormItem {...formItemLayout} label="选择保安队" require={true}>
                {getFieldDecorator('buildTeam', {
                  initialValue: builderDetail.teamId
                    ? builderDetail.teamId.toString()
                    : buildTeamList.dataSource.length > 0
                      ? buildTeamList.dataSource[0].team_id
                      : null,
                  rules: [
                    {
                      required: true,
                      message: '请选择保安队',
                    },
                  ],
                })(
                  <Select
                    onChange={(value, option) => {
                      console.log(value, option);
                      this.setState({
                        sup_id:
                          buildTeamList.dataSource[parseInt(option.key)].sup_id,
                      });
                    }}>
                    {buildTeamList.dataSource.map((item, i) => {
                      return (
                        <Option key={i} value={item.team_id}>
                          {item.team_name}
                        </Option>
                      );
                    })}
                  </Select>,
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="是否是队长" require={true}>
                {getFieldDecorator('isLeader', {
                  initialValue:
                    this.props.match.params.action === 'edit'
                      ? builderDetail.isLeader
                      : 0,
                  rules: [
                    {
                      required: true,
                      message: '是否是队长',
                    },
                  ],
                })(
                  <RadioGroup onChange={this.onChange}>
                    <Radio value={1}>是</Radio>
                    <Radio value={0}>否</Radio>
                  </RadioGroup>,
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="手机号码" required={true}>
                {getFieldDecorator('phoneNumber', {
                  initialValue:
                    this.props.match.params.action === 'edit'
                      ? builderDetail.oprTel
                      : '',
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
                    placeholder="请输手机号码"
                    type="text"
                    maxLength={11}
                    style={{
                      width: '100%',
                      marginRight: '3%',
                    }}
                  />,
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="设置用户名称"
                required={true}>
                {getFieldDecorator('setUserName', {
                  initialValue:
                    this.props.match.params.action === 'edit'
                      ? builderDetail.username
                      : '',
                  rules: [
                    {
                      required: true,
                      message: '请设置用户名称',
                    },
                  ],
                })(
                  <Input
                    disabled={true}
                    placeholder="用于登录彩管家App，请使用英文或数字组合"
                    type="text"
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
                {/*<Button disabled={passwordStatus ? false : true}*/}
                {/*type='default'*/}
                {/*onClick={() => {*/}
                {/*setFieldsValue({'password': ''});*/}
                {/*this.setState({*/}
                {/*passwordStatus: false*/}
                {/*});*/}
                {/*}}*/}
                {/*>修改</Button>*/}
              </FormItem>
              {/*<FormItem*/}
              {/*{...formItemLayout}*/}
              {/*label="电子邮箱"*/}
              {/*>*/}
              {/*{getFieldDecorator('email', {*/}
              {/*initialValue: builderDetail.email,*/}
              {/*})(<Input*/}
              {/*placeholder="如：name@example.com"*/}
              {/*type="text"*/}
              {/*style={{width: '100%', marginRight: '3%'}}*/}
              {/*/>)}*/}
              {/*</FormItem>*/}
              {/*<FormItem*/}
              {/*{...formItemLayout}*/}
              {/*label="联系地址"*/}
              {/*>*/}
              {/*{getFieldDecorator('address', {*/}
              {/*initialValue: '',*/}
              {/*})(<Input*/}
              {/*placeholder="请输入联系地址"*/}
              {/*type="text"*/}
              {/*style={{width: '100%', marginRight: '3%'}}*/}
              {/*/>)}*/}
              {/*</FormItem>*/}
              <FormItem {...formItemLayout} label="是否启用" require={true}>
                {getFieldDecorator('usingOrNot', {
                  initialValue:
                    this.props.match.params.action === 'edit'
                      ? builderDetail.oprStatus
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

const AddBuilderForm = Form.create()(AddBuilder);
const mapStateToProps = state => {
  return {
    iceList: getIceList(state),
    builderDetail: getBuilderDetail(state),
    buildTeamList: getBuildTeamList(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initIceList: param => {
      dispatch(initIceList(param));
    },
    init: () => {
      dispatch(init());
    },
    initBuildTeamList: param => {
      dispatch(initBuildTeamList(param));
    },
    submit: param => {
      dispatch(submit(param));
    },
    initBuilderDetail: param => {
      dispatch(initBuilderDetail(param));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddBuilderForm);
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
  render() {
    const { getFieldDecorator, resetFields } = this.props.form;
    const { memberList, initIceList } = this.props;
    const { options, selectedRowKeys } = this.state;
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
              options={options}
              initIceList={initIceList}
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
        this.props.initIceList({ pageIndex: page, pageSize: pageSize });
      },
      onShowSizeChange: (current, size) => {
        this.props.options.pageSizeChange(current, size);
        this.props.initIceList({ pageIndex: current, pageSize: size });
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
