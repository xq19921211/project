/**
 * Created by xu.long on 2018/6/18.
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
import { clone, isEmpty } from '../../../../util/util';
import { initProjectList } from '../../../TenementContainer/ProjectManagement/RootContainer/action';
import { getProjectList } from '../../../TenementContainer/ProjectManagement/RootContainer/selector';
import { initBuilderList } from '../../BuilderManagement/RootContainer/action';
import { getBuilderList } from '../../BuilderManagement/RootContainer/selector';
import { initMerchantList } from '../../MerchantManagement/RootContainer/action';
import { getMerchantList } from '../../MerchantManagement/RootContainer/selector';
import { init, initBuildTeamDetail, submit } from './action';
import { getBuildTeamDetail } from './selector';

const { Content } = Layout;
const FormItem = Form.Item;
const InputGroup = Input.Group;
const Option = Select.Option;
const RadioGroup = Radio.Group;
class AddBuildTeam extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.pageChange = this.pageChange.bind(this);
    this.state = {
      coverProjectModalVisible: false,
      builderSelectModalVisible: false,
      selectedRows: [],
      builderSelectedRows: [],
      timeRange: [],
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
      this.props.initBuildTeamDetail({ id: this.props.match.params.id });
    } else {
      this.props.init();
    }
    this.props.initProjectList({
      current: this.state.options.current,
      pageSize: this.state.options.pageSize,
    });
    this.props.initMerchantList();
    // this.props.initBuilderList({current: this.state.options.current, pageSize: this.state.options.pageSize});
  }

  componentWillReceiveProps(nextProps) {
    console.log(
      `componentWillReceiveProps nextProps: ${JSON.stringify(nextProps)}`,
    );
    if (
      nextProps &&
      !isEmpty(nextProps.buildTeamDetail) &&
      this.state.selectedRows.length < 1
    ) {
      if (
        nextProps.buildTeamDetail.coverRules &&
        nextProps.buildTeamDetail.coverRules.length > 0
      ) {
        this.setState(
          Object.assign({}, this.state, {
            selectedRows: nextProps.buildTeamDetail.coverRules,
          }),
          () => {
            this.props.form.setFieldsValue({
              chooseCoverProject: 'true',
            });
          },
        );
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

  onChange = e => {
    console.log('radio checked', e.target.value);
  };
  areaOnChange = e => {
    console.log(e);
  };
  startTimeChange = (e, timeString) => {
    console.log(e, timeString);
    let timeRange = clone(this.state.timeRange);
    timeRange[0] = timeString;
    this.setState({
      timeRange: timeRange,
    });
  };
  endTimeChange = (e, timeString) => {
    console.log(e, timeString);
    let timeRange = clone(this.state.timeRange);
    timeRange[1] = timeString;
    this.setState({
      timeRange: timeRange,
    });
  };
  setCoverProjectModalVisible = coverProjectModalVisible => {
    console.log(`coverProjectModalVisible: ${coverProjectModalVisible}`);
    this.setState({ coverProjectModalVisible });
  };

  isOk = (coverProjectModalVisible, selectedRows) => {
    console.log(
      `coverProjectModalVisible: ${coverProjectModalVisible} and selectedRows: ${JSON.stringify(
        selectedRows,
      )}`,
    );
    this.setCoverProjectModalVisible(coverProjectModalVisible);
    this.setState({ selectedRows });
  };
  handleSubmit = e => {
    e.preventDefault();
    let param;
    if (this.props.match.params.action === 'edit') {
      param = {
        team_id: this.props.match.params.id,
        coverRules: this.state.selectedRows.map((item, i) => {
          return {
            org_id: item.org_id,
            org_name: item.org_name,
          };
        }),
        action: this.props.match.params.action,
      };
    } else {
      param = {
        coverRules: this.state.selectedRows.map((item, i) => {
          return {
            org_id: item.org_id,
            org_name: item.org_name,
          };
        }),
        // creator: this.state.builderSelectedRows[0].oprId,
        action: this.props.match.params.action,
      };
    }
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        for (let item in values) {
          switch (item) {
            case 'buildTeamName':
              param['team_name'] = values[item];
              break;
            case 'provider':
              param['sup_id'] = values[item];
              break;
            case 'usingOrNot':
              param['team_status'] = values[item];
              break;
          }
        }
        console.log('item: ' + JSON.stringify(param));
        this.props.submit(param);
      }
    });
  };
  handleChange = value => {
    console.log(`selected ${value}`);
  };
  setBuilderSelectModalVisible = builderSelectModalVisible => {
    console.log(`builderSelectModalVisible: ${builderSelectModalVisible}`);
    this.setState({ builderSelectModalVisible });
  };

  builderIsOk = (builderSelectModalVisible, builderSelectedRows) => {
    console.log(
      `builderSelectModalVisible: ${builderSelectModalVisible} and builderSelectedRows: ${JSON.stringify(
        builderSelectedRows,
      )}`,
    );
    const { setFieldsValue } = this.props.form;
    this.setBuilderSelectModalVisible(builderSelectModalVisible);
    this.setState({ builderSelectedRows });
    if (builderSelectedRows.length > 0) {
      setFieldsValue({ builderCaptain: builderSelectedRows[0].name });
    }
  };

  render() {
    const { getFieldDecorator, setFieldsValue } = this.props.form;
    const {
      merchantList,
      builderList,
      buildTeamDetail,
      projectList,
      initProjectList,
    } = this.props;
    const { selectedRows } = this.state;
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
    const options = window.address;
    const list = [
      '保安公司管理',
      {
        label: '保安队管理',
        to: '/index/buildTeamManagement',
      },
      {
        label: '新增保安队',
        to: `/index/addBuildTeam/${this.props.match.params.action}/${
          this.props.match.params.id
        }`,
      },
    ];
    return (
      <Layout id="add_build_team">
        <Toolbar type={1} list={list} title="新增保安队" />
        <Content className="content">
          <div>
            <Form onSubmit={this.handleSubmit}>
              <FormItem {...formItemLayout} label="保安队名称" required={true}>
                {getFieldDecorator('buildTeamName', {
                  initialValue: !buildTeamDetail
                    ? ''
                    : buildTeamDetail.team_name,
                  rules: [
                    {
                      required: true,
                      message: '请输入保安队名称',
                    },
                  ],
                })(<Input placeholder="请输入保安队名称" type="text" />)}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="所属保安公司"
                required={true}>
                {getFieldDecorator('provider', {
                  initialValue:
                    this.props.match.params.action === 'edit' &&
                    buildTeamDetail.sup_id
                      ? parseInt(buildTeamDetail.sup_id)
                      : merchantList.dataSource.length > 0
                      ? merchantList.dataSource[0].supId
                      : null,
                  rules: [
                    {
                      required: true,
                      message: '请选择所属保安公司',
                    },
                  ],
                })(
                  <Select>
                    {merchantList.dataSource.map((item, i) => {
                      return (
                        <Option key={i} value={item.supId}>
                          {item.supName}
                        </Option>
                      );
                    })}
                  </Select>,
                )}
              </FormItem>
              <FormItem
                style={{
                  paddingBottom: '2.4rem',
                  marginBottom: 0,
                }}
                {...formItemLayout}
                label="选择覆盖项目"
                required={true}>
                {getFieldDecorator('chooseCoverProject', {
                  rules: [
                    {
                      required: true,
                      whitespace: true,
                      message: '请选择覆盖项目',
                    },
                  ],
                })(
                  <Input
                    placeholder="请选择覆盖项目"
                    style={{ display: 'none' }}
                  />,
                )}
                <Button
                  type="dashed"
                  onClick={() => this.setCoverProjectModalVisible(true)}
                  style={{ width: '20rem' }}>
                  <Icon type="plus" />
                  选择
                </Button>
                {selectedRows.map((item, i) => {
                  if (item) {
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
                        {item && item.org_name ? item.org_name : ''}
                      </span>
                    );
                  }
                })}
                <CoverProjectModalForm
                  visible={this.state.coverProjectModalVisible}
                  onOk={this.isOk}
                  onCancel={this.setCoverProjectModalVisible}
                  projectList={projectList}
                  setFieldsValue={setFieldsValue}
                  options={this.state.options}
                  initProjectList={initProjectList}
                  selectedRowKeys={
                    this.props.match.params.action === 'edit'
                      ? buildTeamDetail.coverRules &&
                        buildTeamDetail.coverRules.length > 0
                        ? buildTeamDetail.coverRules.map(item => {
                            if (item) {
                              return parseInt(item.org_id);
                            }
                          })
                        : []
                      : []
                  }
                  selectedRows={
                    this.props.match.params.action === 'edit'
                      ? buildTeamDetail.coverRules &&
                        buildTeamDetail.coverRules.length > 0
                        ? buildTeamDetail.coverRules.map(item => {
                            if (item) {
                              return {
                                key: parseInt(item.org_id),
                                org_id: parseInt(item.org_id),
                                org_name: item.org_name,
                              };
                            }
                          })
                        : []
                      : []
                  }
                />
              </FormItem>
              {/*<FormItem*/}
              {/*{...formItemLayout}*/}
              {/*label="施工队队长"*/}
              {/*required={true}*/}
              {/*>*/}
              {/*{getFieldDecorator('builderCaptain', {*/}
              {/*initialValue: !buildTeamDetail ? '' : buildTeamDetail.supName,*/}
              {/*rules: [*/}
              {/*{required: true, message: '请选择施工队队长'},*/}
              {/*]*/}
              {/*})(<Input*/}
              {/*disabled={true}*/}
              {/*placeholder="请选择施工队队长"*/}
              {/*type="text"*/}
              {/*style={{width: '50%', marginRight: '3%'}}*/}
              {/*/>)}*/}
              {/*<Button*/}
              {/*icon="plus"*/}
              {/*type="primary"*/}
              {/*onClick={() => {*/}
              {/*console.log('选择施工队队长');*/}
              {/*this.setBuilderSelectModalVisible(true)*/}
              {/*}}*/}
              {/*>选择</Button>*/}
              {/*<BuilderSelectModalForm*/}
              {/*builderList={builderList}*/}
              {/*visible={this.state.builderSelectModalVisible}*/}
              {/*onOk={this.builderIsOk}*/}
              {/*onCancel={this.setBuilderSelectModalVisible}*/}
              {/*/>*/}
              {/*</FormItem>*/}
              <FormItem {...formItemLayout} label="是否启用" require={true}>
                {getFieldDecorator('usingOrNot', {
                  initialValue:
                    buildTeamDetail && buildTeamDetail.team_status
                      ? parseInt(buildTeamDetail.team_status)
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

const AddBuildTeamForm = Form.create()(AddBuildTeam);
const mapStateToProps = state => {
  return {
    buildTeamDetail: getBuildTeamDetail(state),
    merchantList: getMerchantList(state),
    projectList: getProjectList(state),
    builderList: getBuilderList(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    init: () => {
      dispatch(init());
    },
    initMerchantList: param => {
      dispatch(initMerchantList(param));
    },
    submit: param => {
      dispatch(submit(param));
    },
    initBuildTeamDetail: param => {
      dispatch(initBuildTeamDetail(param));
    },
    initBuilderList: param => {
      dispatch(initBuilderList(param));
    },
    initProjectList: param => {
      dispatch(initProjectList(param));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddBuildTeamForm);

class CoverProjectModal extends React.Component {
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
            selectedRows: nextProps.selectedRows,
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
    let tempRows = clone(this.state.selectedRows);
    tempRows = tempRows.filter(item => {
      if (item) {
        return item;
      }
    });
    // let tempRowKeys = clone(this.state.selectedRowKeys);
    // let resultRowKeys = tempRowKeys.concat(selectedRowKeys);
    let resultRows = [],
      result = [];
    let temp = tempRows.concat(selectedRows);
    for (let i = 0; i < temp.length; i++) {
      //去重
      for (let j = i + 1; j < temp.length; j++) {
        if (temp[i].org_id === temp[j].org_id) {
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
    this.props.setFieldsValue({
      chooseCoverProject: selectedRowKeys.length > 0 ? 'true' : null,
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    let param = {
      current: 1,
      pageSize: this.props.options.pageSize,
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
        this.props.options.pageSizeChange(1, this.props.options.pageSize);
      }
    });
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
          onOk={() => this.props.onOk(false, this.state.selectedRows)}
          onCancel={() => this.props.onCancel(false)}
          cancelText="取消"
          okText="确定">
          <div>
            <Form layout="inline">
              <FormItem label="项目名称">
                {getFieldDecorator('name')(
                  <Input
                    onPressEnter={this.handleSubmit}
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
              options={this.props.options}
              onSelectChange={this.onSelectChange}
              projectList={projectList}
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
const CoverProjectModalForm = Form.create()(CoverProjectModal);
class CustomTable extends React.Component {
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
        dataIndex: 'org_name',
        key: 'org_name',
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
        org_id: item.pjId,
        org_name: item.pjName,
        departmentBelongTo: item.departId,
        regionBelongTo: '华南大区',
        tenementCompany: '彩生活物业有限公司',
        address: item.pjAddress,
      };
    });
    const options = {
      current: this.props.options.current,
      defaultPageSize: this.props.options.pageSize,
      pageSizeOptions: this.props.options.pageSizeOptions,
      total: projectList.total,
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
class BuilderSelectModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [], // Check here to configure the default column
      selectedRows: [{}],
    };
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

  render() {
    const { getFieldDecorator } = this.props.form;
    const { builderList } = this.props;
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
              <FormItem label="保安员名称">
                {getFieldDecorator('builderName')(
                  <Input
                    placeholder="请输入保安员名称"
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
            <BuilderCustomTable
              builderList={builderList}
              onSelectChange={this.onSelectChange}
            />
          </div>
        </Modal>
      </div>
    );
  }
}
const BuilderSelectModalForm = Form.create()(BuilderSelectModal);

class BuilderCustomTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const columns = [
      {
        title: '保安员名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
      },
    ];
    const { builderList } = this.props;
    const data = builderList.dataSource.map((item, i) => {
      return {
        key: i,
        id: item.oprId,
        name: item.oprName,
        createTime: item.createTime,
      };
    });
    const options = {
      defaultPageSize: this.props.options.pageSize,
      pageSizeOptions: this.props.options.pageSizeOptions,
      total: builderList.total,
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
      onShowSizeChange: (current, size) => {},
    };
    // const { selectedRowKeys } = this.state;
    const rowSelection = {
      // selectedRowKeys,
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
