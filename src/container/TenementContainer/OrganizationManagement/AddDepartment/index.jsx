/**
 * Created by xu.long on 2018/5/12.
 */
import './style.scss';

import {
  Button,
  Form,
  Input,
  Layout,
  Modal,
  Pagination,
  Radio,
  Select,
  Table,
} from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { Toolbar } from '../../../../component/Toolbar/Toolbar';
import { initTenementCompanyList } from '../../TenementCompanyManagement/RootContainer/action';
import { getTenementCompanyList } from '../../TenementCompanyManagement/RootContainer/selector';
import { initOrganizationList } from '../RootContainer/action';
import { getOrganizationList } from '../RootContainer/selector';
import { init, initDepartmentDetail, initIceList, submit } from './action';
import { getDepartmentDetail, getIceList } from './selector';

const { Content } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
class AddDepartment extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      preDepartmentSelectModalVisible: false,
      departmentSelectModalVisible: false,
      tenementCompanySelectModalVisible: false,
      preSelectedRows: [{}],
      departmentSelectedRows: [{}],
      tenementCompanySelectedRows: [{}],
      departmentType: '',
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
      this.props.initDepartmentDetail({ id: this.props.match.params.id });
    } else {
      this.props.init();
    }
    this.props.initIceList({
      pageIndex: this.state.options.current,
      pageSize: this.state.options.pageSize,
      orgType: this.state.departmentType,
    });
    this.props.initOrganizationList();
    this.props.initTenementCompanyList({
      current: this.state.options.current,
      pageSize: this.state.options.pageSize,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (
      !this.state.departmentType ||
      !this.state.tenementCompanySelectedRows[0].name
    ) {
      if (
        this.props.match.params.action !== 'edit' &&
        nextProps.tenementCompanyList &&
        nextProps.tenementCompanyList.dataSource.length > 0
      ) {
        this.setState({
          tenementCompanySelectedRows: [
            {
              name: nextProps.tenementCompanyList.dataSource[0].name,
              id: nextProps.tenementCompanyList.dataSource[0].id,
            },
          ],
        });
      }
      if (
        this.props.match.params.action === 'edit' &&
        nextProps.departmentDetail &&
        nextProps.departmentDetail.company
      ) {
        this.setState({
          tenementCompanySelectedRows: [
            {
              name: nextProps.departmentDetail.company.name,
              id: nextProps.departmentDetail.company.id,
            },
          ],
        });
      }
      if (
        nextProps.departmentDetail.type !== this.props.departmentDetail.type
      ) {
        this.setState({
          departmentType: nextProps.departmentDetail.type,
        });
      }
    }
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

  setPreDepartmentSelectModalVisible = preDepartmentSelectModalVisible => {
    this.setState({ preDepartmentSelectModalVisible });
  };

  preIsOk = (preDepartmentSelectModalVisible, preSelectedRows) => {
    const { setFieldsValue } = this.props.form;
    this.setPreDepartmentSelectModalVisible(preDepartmentSelectModalVisible);
    this.setState({ preSelectedRows });
    if (preSelectedRows.length > 0) {
      setFieldsValue({ preDepartmentName: preSelectedRows[0].name });
    }
  };
  setDepartmentSelectModalVisible = departmentSelectModalVisible => {
    this.setState({ departmentSelectModalVisible });
  };

  departmentIsOk = (departmentSelectModalVisible, departmentSelectedRows) => {
    const { setFieldsValue } = this.props.form;
    this.setDepartmentSelectModalVisible(departmentSelectModalVisible);
    this.setState({ departmentSelectedRows });
    if (departmentSelectedRows.length > 0) {
      setFieldsValue({ departmentName: departmentSelectedRows[0].name });
    }
  };

  areaOnChange = e => {
    console.log(value);
  };
  handleSubmit = e => {
    e.preventDefault();
    let param;
    if (this.props.match.params.action === 'edit') {
      param = {
        id: this.props.match.params.id,
        pid: !this.state.preSelectedRows[0].id
          ? this.props.departmentDetail.pid
          : this.state.preSelectedRows[0].id,
        companyId: this.state.tenementCompanySelectedRows[0].id,
        code: !this.state.departmentSelectedRows[0].id
          ? this.props.departmentDetail.code
          : this.state.departmentSelectedRows[0].id,
        type: this.state.departmentType,
        action: this.props.match.params.action,
      };
    } else {
      param = {
        pid:
          this.state.preSelectedRows.length < 1
            ? 0
            : this.state.preSelectedRows[0].id,
        companyId: this.state.tenementCompanySelectedRows[0].id,
        code: this.state.departmentSelectedRows[0].id,
        type: this.state.departmentType,
        action: this.props.match.params.action,
      };
    }
    this.props.form.validateFields((err, values) => {
      if (!err) {
        for (let item in values) {
          if (values[item]) {
            switch (item) {
              case 'managementRange':
                param['managerArea'] = values[item];
                break;
              case 'departmentName':
                param['name'] = values[item];
                break;
            }
          }
          console.log('item: ' + item);
        }
        this.props.submit(param);
      }
    });
  };
  handleChange = value => {
    this.setState({
      tenementCompanySelectedRows: [
        {
          name: value.split(',')[0],
          id: parseInt(value.split(',')[1]),
        },
      ],
    });
  };
  handleDepTypeChange = value => {
    this.setState({ departmentType: value });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      departmentDetail,
      organizationList,
      iceList,
      tenementCompanyList,
      initIceList,
      initOrganizationList,
    } = this.props;
    const { tenementCompanySelectedRows, departmentType } = this.state;
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
    const ToolbarTitle = isEdit ? '编辑事业部' : '新增事业部';
    const list = [
      '物业管理',
      {
        label: '组织架构管理',
        to: '/index/organizationManagement',
      },
      {
        label: ToolbarTitle,
        to: `/index/addDepartment/${this.props.match.params.action}/${
          this.props.match.params.id
        }`,
      },
    ];
    return (
      <Layout id="add_department">
        <Toolbar type={1} list={list} title={ToolbarTitle} />
        <Content className="content">
          <div>
            <Form onSubmit={this.handleSubmit}>
              <FormItem {...formItemLayout} label="部门类型" required={true}>
                {getFieldDecorator('departmentType', {
                  initialValue: !departmentType ? '大区' : departmentType,
                  rules: [
                    {
                      required: true,
                      message: '请选择部门类型',
                    },
                  ],
                })(
                  <Select
                    style={{
                      width: '50%',
                      marginRight: '3%',
                    }}
                    onChange={this.handleDepTypeChange}>
                    <Option key="1" value="大区">
                      大区
                    </Option>
                    <Option key="2" value="事业部">
                      事业部
                    </Option>
                  </Select>,
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="部门名称" required={true}>
                {getFieldDecorator('departmentName', {
                  initialValue: departmentDetail.name,
                  rules: [
                    {
                      required: true,
                      message: '请选择部门',
                    },
                  ],
                })(
                  <Input
                    // disabled={true}
                    placeholder="请选择OA部门"
                    type="text"
                    style={{
                      width: '50%',
                      marginRight: '3%',
                    }}
                  />,
                )}
                <Button
                  icon="plus"
                  type="primary"
                  onClick={() => {
                    console.log('选择OA部门');
                    this.setDepartmentSelectModalVisible(true);
                  }}>
                  选择OA部门
                </Button>
                <DepartmentSelectModalForm
                  departmentList={iceList}
                  visible={this.state.departmentSelectModalVisible}
                  onOk={this.departmentIsOk}
                  onCancel={this.setDepartmentSelectModalVisible}
                  options={this.state.options}
                  initIceList={initIceList}
                  departmentType={this.state.departmentType}
                  selectedRowKeys={
                    this.props.match.params.action === 'edit'
                      ? departmentDetail.code
                        ? [departmentDetail.code]
                        : []
                      : []
                  }
                />
              </FormItem>
              <FormItem {...formItemLayout} label="上一级部门">
                {getFieldDecorator('preDepartmentName', {
                  initialValue: isEdit
                    ? departmentDetail.parentDept &&
                      departmentDetail.parentDept.name
                    : '',
                })(
                  <Input
                    disabled={true}
                    placeholder="请选择上一级部门"
                    type="text"
                    style={{
                      width: '50%',
                      marginRight: '3%',
                    }}
                  />,
                )}
                <Button
                  icon="plus"
                  type="primary"
                  onClick={() => {
                    console.log('选择部门');
                    this.setPreDepartmentSelectModalVisible(true);
                  }}>
                  选择上一级部门
                </Button>

                <PreDepartmentSelectModalForm
                  departmentList={organizationList}
                  visible={this.state.preDepartmentSelectModalVisible}
                  onOk={this.preIsOk}
                  onCancel={this.setPreDepartmentSelectModalVisible}
                  options={this.state.options}
                  initOrganizationList={initOrganizationList}
                  selectedRowKeys={
                    this.props.match.params.action === 'edit'
                      ? departmentDetail.pid
                        ? [parseInt(departmentDetail.pid)]
                        : []
                      : []
                  }
                />
              </FormItem>
              <FormItem {...formItemLayout} label="物业公司" required={true}>
                {getFieldDecorator('tenementCompanyName', {
                  initialValue: tenementCompanySelectedRows[0].name,
                  rules: [
                    {
                      required: true,
                      message: '请选择物业公司名称',
                    },
                  ],
                })(
                  <Select
                    style={{
                      width: '50%',
                      marginRight: '3%',
                    }}
                    onChange={this.handleChange}>
                    {tenementCompanyList.dataSource.map((item, i) => {
                      return (
                        <Option
                          key={i}
                          value={item.name.toString() + ',' + item.id}>
                          {item.name}
                        </Option>
                      );
                    })}
                  </Select>,
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="管理范围">
                {getFieldDecorator('managementRange', {
                  initialValue: departmentDetail.managerArea,
                })(
                  <TextArea
                    rows={4}
                    placeholder="请输入管理范围"
                    type="text"
                    style={{
                      width: '100%',
                      marginRight: '3%',
                    }}
                  />,
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

const AddDepartmentForm = Form.create()(AddDepartment);
const mapStateToProps = state => {
  return {
    iceList: getIceList(state),
    departmentDetail: getDepartmentDetail(state),
    organizationList: getOrganizationList(state),
    tenementCompanyList: getTenementCompanyList(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initIceList: param => dispatch(initIceList(param)),
    init: () => dispatch(init()),
    initOrganizationList: param => dispatch(initOrganizationList(param)),
    submit: param => dispatch(submit(param)),
    initDepartmentDetail: param => dispatch(initDepartmentDetail(param)),
    initTenementCompanyList: param => dispatch(initTenementCompanyList(param)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddDepartmentForm);

class PreDepartmentSelectModal extends React.Component {
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
    let param = {};
    this.props.form.validateFields((err, values) => {
      if (!err) {
        for (let item in values) {
          switch (item) {
            case 'name':
              param['keyword'] = values[item];
              break;
          }
        }
        this.props.initOrganizationList(param);
      }
    });
  };
  render() {
    const { getFieldDecorator, resetFields } = this.props.form;
    const { departmentList } = this.props;
    const { selectedRowKeys } = this.state;
    return (
      <div>
        <Modal
          maskClosable={false}
          width="90rem"
          wrapClassName="vertical-center-modal"
          visible={this.props.visible}
          onOk={() => this.props.onOk(false, this.state.selectedRows)}
          onCancel={() => this.props.onCancel(false)}
          cancelText="取消"
          okText="确定">
          <div>
            <Form layout="inline">
              <FormItem label="部门名称">
                {getFieldDecorator('name')(
                  <Input
                    onPressEnter={this.handleSubmit}
                    placeholder="请输入部门名称"
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
            <PreCustomTable
              departmentList={departmentList}
              onSelectChange={this.onSelectChange}
              options={this.props.options}
              initOrganizationList={this.props.initOrganizationList}
              selectedRowKeys={selectedRowKeys}
            />
          </div>
        </Modal>
      </div>
    );
  }
}
const PreDepartmentSelectModalForm = Form.create()(PreDepartmentSelectModal);

class PreCustomTable extends React.Component {
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
  combine = data => {
    let result = [];
    data.map((item, i) => {
      if (item.chrildren && item.chrildren.length > 0) {
        result.push({
          key: item.id,
          id: item.id,
          name: item.name,
          managementRange: item.managerArea,
          children: this.combine(item.chrildren),
        });
      } else {
        result.push({
          key: item.id,
          id: item.id,
          name: item.name,
          managementRange: item.managerArea,
        });
      }
    });
    return result;
  };
  render() {
    const columns = [
      {
        title: '部门名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '管理范围',
        dataIndex: 'managementRange',
        key: 'managementRange',
      },
    ];
    const { departmentList } = this.props;
    const data = this.combine(departmentList.dataSource);
    // const data = departmentList.dataSource.map((item, i) => {
    //     return {
    //         key: item.id,
    //         id: item.id,
    //         name: item.name,
    //         managementRange: item.managerArea,
    //     };
    // });
    // const options = {
    //     defaultPageSize: this.props.options.pageSize,
    //     pageSizeOptions: this.props.options.pageSizeOptions,
    //     total: departmentList.total,
    //     showSizeChanger: true,
    //     showQuickJumper: true,
    //     onChange: (page, pageSize) => {
    //         this.props.initOrganizationList({
    //             current: page,
    //             pageSize: pageSize,
    //         });
    //     },
    //     onShowSizeChange: (current, size) => {
    //         this.props.options.pageSizeChange(current, size);
    //         this.props.initOrganizationList({
    //             current: current,
    //             pageSize: size,
    //         });
    //     },
    // };
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.props.onSelectChange,
      type: 'radio',
    };
    return (
      <div>
        <Table
          defaultExpandAllRows={true}
          style={{ overflow: 'scroll', maxHeight: '50rem' }}
          columns={columns}
          dataSource={data}
          pagination={false}
          rowSelection={rowSelection}
        />
        {/*<Pagination*/}
        {/*style={{*/}
        {/*marginTop: '2rem',*/}
        {/*}}*/}
        {/*{...options}*/}
        {/*/>*/}
      </div>
    );
  }
}

class DepartmentSelectModal extends React.Component {
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
      orgType: this.props.departmentType,
    };
    this.props.form.validateFields((err, values) => {
      if (!err) {
        for (let item in values) {
          switch (item) {
            case 'name':
              param['key'] = values[item];
              break;
          }
        }
        this.props.initIceList(param);
        this.props.options.pageSizeChange(1, this.props.options.pageSize);
      }
    });
  };
  render() {
    const { getFieldDecorator, resetFields } = this.props.form;
    const { departmentList } = this.props;
    const { selectedRowKeys } = this.state;
    return (
      <div>
        <Modal
          maskClosable={false}
          width="90rem"
          wrapClassName="vertical-center-modal"
          visible={this.props.visible}
          onOk={() => this.props.onOk(false, this.state.selectedRows)}
          onCancel={() => this.props.onCancel(false)}
          cancelText="取消"
          okText="确定">
          <div>
            <Form layout="inline">
              <FormItem label="部门名称">
                {getFieldDecorator('name')(
                  <Input
                    placeholder="请输入部门名称"
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
            <CustomTable
              departmentList={departmentList}
              onSelectChange={this.onSelectChange}
              options={this.props.options}
              initIceList={this.props.initIceList}
              departmentType={this.props.departmentType}
              selectedRowKeys={selectedRowKeys}
            />
          </div>
        </Modal>
      </div>
    );
  }
}
const DepartmentSelectModalForm = Form.create()(DepartmentSelectModal);

class CustomTable extends React.Component {
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
        title: '部门名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '管理范围',
        dataIndex: 'managementRange',
        key: 'managementRange',
      },
    ];
    const { departmentList } = this.props;
    const data = departmentList.content.map((item, i) => {
      return {
        key: item.orgUuid,
        id: item.orgUuid,
        name: item.name,
        managementRange: !item.region ? '管理范围未知' : item.region,
      };
    });
    const options = {
      current: this.props.options.current,
      defaultPageSize: this.props.options.pageSize,
      pageSizeOptions: this.props.options.pageSizeOptions,
      total: departmentList.totalRecord,
      showSizeChanger: true,
      showQuickJumper: true,
      onChange: (page, pageSize) => {
        this.props.options.pageSizeChange(page, pageSize);
        this.props.initIceList({
          pageIndex: page,
          pageSize: pageSize,
          orgType: this.props.departmentType,
        });
      },
      onShowSizeChange: (current, size) => {
        this.props.options.pageSizeChange(current, size);
        this.props.initIceList({
          pageIndex: current,
          pageSize: size,
          orgType: this.props.departmentType,
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
