import './style.scss';

import {
  Button,
  Col,
  Form,
  Icon,
  Input,
  Layout,
  Modal,
  Pagination,
  Radio,
  Row,
  Select,
  Table,
} from 'antd';
import { init, initProjectDetail } from '../ProjectDetail/action';

/**
 * Created by xu.long on 2018/5/12.
 */
import React from 'react';
import { Toolbar } from '../../../../component/Toolbar/Toolbar';
import { clone } from '../../../../util/util';
import { connect } from 'react-redux';
import { getIceList } from '../../OrganizationManagement/AddDepartment/selector';
import { getOrganizationList } from '../../OrganizationManagement/RootContainer/selector';
import { getProjectDetail } from '../ProjectDetail/selector';
import { getTenementCompanyList } from '../../TenementCompanyManagement/RootContainer/selector';
import { getUnitList } from '../../../CommodityContainer/CommodityManagement/AddCommodity/selector';
import { initIceList } from '../../OrganizationManagement/AddDepartment/action';
import { initOrganizationList } from '../../OrganizationManagement/RootContainer/action';
import { initTenementCompanyList } from '../../TenementCompanyManagement/RootContainer/action';
import { initUnit } from '../../../CommodityContainer/CommodityManagement/AddCommodity/action';
import moment from 'moment';
import { submit } from './action';
const { Content } = Layout;
const FormItem = Form.Item;
const InputGroup = Input.Group;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
class AddProject extends React.Component {
  count = 0;
  uuid = 0;

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      communitySelectModalVisible: false,
      departmentSelectModalVisible: false,
      tenementCompanySelectModalVisible: false,
      communitySelectedRows: [{}],
      departmentSelectedRows: [{}],
      tenementCompanySelectedRows: [{}],
      options: {
        current: 1,
        pageSize: 10,
        pageSizeChange: this.pageChange,
        pageSizeOptions: ['10', '20', '100'],
      },
      baseInfo: [],
      formItems: [],
    };
  }

  componentWillMount() {
    if (this.props.match.params.action === 'edit') {
      this.props.initProjectDetail({ id: this.props.match.params.id });
    } else {
      this.props.init();
    }
    this.props.initIceList({
      pageIndex: this.state.options.current,
      pageSize: this.state.options.pageSize,
      orgType: '小区',
    });
    this.props.initOrganizationList();
    this.props.initTenementCompanyList();
    this.props.initUnit();
  }

  componentWillReceiveProps(nextProps) {
    if (this.count < 1 && nextProps.unitList.length > 0) {
      if (this.props.match.params.action === 'edit') {
        if (nextProps && nextProps.projectDetail.areasList) {
          this.count++;
          const { getFieldDecorator, getFieldValue } = this.props.form;
          let temp = [];
          getFieldDecorator('keys', {
            initialValue: nextProps.projectDetail.areasList.map((item, i) => {
              temp.push({
                name: item.name,
                count: item.count,
                unit: item.unit,
                note: item.note,
              });
              return this.uuid++;
            }),
          });
          let keys = getFieldValue('keys');
          let formItems = keys.map((k, index) => {
            return (
              <FormItem required={false} key={k}>
                {getFieldDecorator(`names[${k}]`)(
                  <Item
                    action={this.props.match.params.action}
                    initial={nextProps.projectDetail.areasList[index]}
                    index={index}
                    alikey={k}
                    length={keys.length}
                    changeInfo={this.changeInfo}
                    remove={this.remove}
                    unitList={nextProps.unitList}
                  />,
                )}
              </FormItem>
            );
          });

          this.setState({
            formItems,
            baseInfo: temp,
          });
        }
      } else {
        this.count++;
        const { getFieldDecorator, getFieldValue } = this.props.form;
        getFieldDecorator('keys', {
          initialValue: [this.uuid],
        });
        let keys = getFieldValue('keys');
        let formItems = keys.map((k, index) => {
          return (
            <FormItem required={false} key={k}>
              {getFieldDecorator(`names[${k}]`)(
                <Item
                  action={this.props.match.params.action}
                  index={index}
                  alikey={k}
                  length={keys.length}
                  changeInfo={this.changeInfo}
                  remove={this.remove}
                  unitList={nextProps.unitList}
                />,
              )}
            </FormItem>
          );
        });
        this.setState({
          formItems,
          baseInfo: [
            {
              name: '',
              count: 0,
              unit: nextProps.unitList[0],
              note: '',
            },
          ],
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
  handleSubmit = e => {
    e.preventDefault();
    let param;
    if (this.props.match.params.action === 'edit') {
      param = {
        pjId: this.props.match.params.id,
        pjUuid: !this.state.communitySelectedRows[0].id
          ? this.props.projectDetail.pjUuid
          : this.state.communitySelectedRows[0].id,
        // pjName: !this.state.communitySelectedRows[0].name ? this.props.projectDetail.pjName : this.state.communitySelectedRows[0].name,
        departId: !this.state.departmentSelectedRows[0].id
          ? this.props.projectDetail.departId
          : this.state.departmentSelectedRows[0].id,
        // propertyId: !this.state.tenementCompanySelectedRows[0].id ? this.props.projectDetail.propertyId : this.state.tenementCompanySelectedRows[0].id,
        areasList: this.state.baseInfo,
        action: this.props.match.params.action,
      };
    } else {
      param = {
        pjUuid: this.state.communitySelectedRows[0].id,
        // pjName: this.state.communitySelectedRows[0].name,
        departId: this.state.departmentSelectedRows[0].id,
        // propertyId: this.state.tenementCompanySelectedRows[0].id,
        areasList: this.state.baseInfo,
        action: this.props.match.params.action,
      };
    }
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // param.managerArea = values.managementRange;
        console.log(
          'Received values of form: ',
          values + ' and param: ' + JSON.stringify(param),
        );
        for (let item in values) {
          if (values[item] !== null || values[item] !== undefined) {
            switch (item) {
              case 'companyBelongTo':
                param['propertyId'] = values[item];
                break;
              case 'projectName':
                param['pjName'] = values[item];
                break;
              case 'address':
                param['pjAddress'] = values[item];
                break;
              case 'managementRange':
                param['managerArea'] = values[item];
                break;
            }
          }
        }
        console.log('param: ' + JSON.stringify(param));
        this.props.submit(param);
      }
    });
  };
  setDepartmentSelectModalVisible = departmentSelectModalVisible => {
    console.log(
      `departmentSelectModalVisible: ${departmentSelectModalVisible}`,
    );
    this.setState({ departmentSelectModalVisible });
  };

  departmentIsOk = (departmentSelectModalVisible, departmentSelectedRows) => {
    console.log(
      `departmentSelectModalVisible: ${departmentSelectModalVisible} and departmentSelectedRows: ${JSON.stringify(
        departmentSelectedRows,
      )}`,
    );
    const { setFieldsValue } = this.props.form;
    this.setDepartmentSelectModalVisible(departmentSelectModalVisible);
    this.setState({ departmentSelectedRows });
    if (departmentSelectedRows.length > 0) {
      setFieldsValue({
        departmentBelongTo: departmentSelectedRows[0].name,
      });
    }
  };
  setCommunitySelectModalVisible = communitySelectModalVisible => {
    console.log(`projectSelectModalVisible: ${communitySelectModalVisible}`);
    this.setState({ communitySelectModalVisible });
  };

  communityIsOk = (communitySelectModalVisible, communitySelectedRows) => {
    console.log(
      `communitySelectModalVisible: ${communitySelectModalVisible} and communitySelectedRows: ${JSON.stringify(
        communitySelectedRows,
      )}`,
    );
    const { setFieldsValue } = this.props.form;
    this.setCommunitySelectModalVisible(communitySelectModalVisible);
    this.setState({ communitySelectedRows });
    if (communitySelectedRows.length > 0) {
      setFieldsValue({ projectName: communitySelectedRows[0].name });
    }
  };
  setTenementCompanySelectModalVisible = tenementCompanySelectModalVisible => {
    console.log(
      `tenementCompanySelectModalVisible: ${tenementCompanySelectModalVisible}`,
    );
    this.setState({ tenementCompanySelectModalVisible });
  };

  tenementCompanyIsOk = (
    tenementCompanySelectModalVisible,
    tenementCompanySelectedRows,
  ) => {
    console.log(
      `tenementCompanySelectModalVisible: ${tenementCompanySelectModalVisible} and tenementCompanySelectedRows: ${JSON.stringify(
        tenementCompanySelectedRows,
      )}`,
    );
    const { setFieldsValue } = this.props.form;
    this.setTenementCompanySelectModalVisible(
      tenementCompanySelectModalVisible,
    );
    this.setState({ tenementCompanySelectedRows });
    if (tenementCompanySelectedRows.length > 0) {
      setFieldsValue({
        companyBelongTo: tenementCompanySelectedRows[0].name,
      });
    }
  };
  remove = (index, k) => {
    const { form, unitList } = this.props;
    let temp = clone(this.state.baseInfo);
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    const tempKeys = keys.filter(key => key !== k);
    const { getFieldDecorator, getFieldValue } = this.props.form;
    let formItems = tempKeys.map((item, index) => {
      return (
        <FormItem required={false} key={item}>
          {getFieldDecorator(`names[${item}]`)(
            <Item
              action={this.props.match.params.action}
              index={index}
              alikey={item}
              length={tempKeys.length}
              changeInfo={this.changeInfo}
              remove={this.remove}
              unitList={unitList}
            />,
          )}
        </FormItem>
      );
    });
    // can use data-binding to set
    form.setFieldsValue({
      keys: tempKeys,
    });
    temp.splice(index, 1);
    this.setState(
      {
        formItems,
        baseInfo: temp,
      },
      () => {
        console.log(this.state);
      },
    );
  };
  add = () => {
    const { form, unitList } = this.props;
    let temp = clone(this.state.baseInfo);
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    this.uuid++;
    const nextKeys = keys.concat(this.uuid);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
    temp.push({
      name: '',
      count: 0,
      unit: unitList[0],
      note: '',
    });
    const { getFieldDecorator, getFieldValue } = this.props.form;
    let formItems = nextKeys.map((k, index) => {
      return (
        <FormItem required={false} key={k}>
          {getFieldDecorator(`names[${k}]`)(
            <Item
              action={this.props.match.params.action}
              index={index}
              alikey={k}
              length={nextKeys.length}
              changeInfo={this.changeInfo}
              remove={this.remove}
              unitList={unitList}
            />,
          )}
        </FormItem>
      );
    });
    this.setState(
      {
        formItems,
        baseInfo: temp,
      },
      () => {
        console.log(this.state);
      },
    );
  };
  changeInfo = (key, value, index) => {
    let temp = clone(this.state.baseInfo);
    switch (key) {
      case 'name':
        temp[index].name = value;
        break;
      case 'count':
        temp[index].count = value;
        break;
      case 'unit':
        temp[index].unit = value;
        break;
      case 'note':
        temp[index].note = value;
        break;
    }
    this.setState({
      baseInfo: temp,
    });
  };

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const {
      projectDetail,
      organizationList,
      iceList,
      tenementCompanyList,
      initIceList,
      initOrganizationList,
      initTenementCompanyList,
    } = this.props;
    const { communitySelectedRows, formItems } = this.state;
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
      '物业管理',
      {
        label: '项目管理',
        to: '/index/projectManagement',
      },
      {
        label: '新增项目',
        to: `/index/addProject/${this.props.match.params.action}/${
          this.props.match.params.id
        }`,
      },
    ];
    return (
      <Layout id="add_project">
        <Toolbar type={1} list={list} title="新增项目" />
        <Content className="content">
          <div>
            <Form onSubmit={this.handleSubmit}>
              <Row>
                <Col span={9}>
                  <div
                    style={{
                      marginRight: '1rem',
                      textAlign: 'right',
                      fontSize: '2rem',
                    }}>
                    新增项目基本信息
                  </div>
                </Col>
                <Col />
              </Row>
              <FormItem {...formItemLayout} label="项目名称" required={true}>
                {getFieldDecorator('projectName', {
                  initialValue: projectDetail.pjName,
                  rules: [
                    {
                      required: true,
                      message: '请输入项目名称',
                    },
                  ],
                })(
                  <Input
                    placeholder="请输入项目名称"
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
                    console.log('选择小区');
                    this.setCommunitySelectModalVisible(true);
                  }}>
                  选择小区
                </Button>
                {/*{communitySelectedRows.map((item, i) => {*/}
                {/*return <span style={{marginLeft: '1.5rem'}}>*/}
                {/*{item.name}*/}
                {/*</span>*/}
                {/*})}*/}
                <CommunitySelectModalForm
                  communityList={iceList}
                  visible={this.state.communitySelectModalVisible}
                  onOk={this.communityIsOk}
                  onCancel={this.setCommunitySelectModalVisible}
                  initIceList={initIceList}
                  options={this.state.options}
                  selectedRowKeys={
                    this.props.match.params.action === 'edit'
                      ? projectDetail.pjUuid
                        ? [projectDetail.pjUuid]
                        : []
                      : []
                  }
                />
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="所属物业公司"
                required={true}>
                {getFieldDecorator('companyBelongTo', {
                  initialValue:
                    this.props.match.params.action === 'edit'
                      ? projectDetail.company
                        ? projectDetail.company.id
                        : ''
                      : tenementCompanyList.dataSource.length > 0
                        ? tenementCompanyList.dataSource[0].id
                        : '',
                  rules: [
                    {
                      required: true,
                      message: '请选择物业公司名称',
                    },
                  ],
                })(
                  <Select>
                    {tenementCompanyList.dataSource.map((item, i) => {
                      return <Option value={item.id}>{item.name}</Option>;
                    })}
                  </Select>,
                )}
              </FormItem>

              <FormItem
                {...formItemLayout}
                label="所属组织架构"
                required={true}>
                {getFieldDecorator('departmentBelongTo', {
                  initialValue: !projectDetail.department
                    ? ''
                    : projectDetail.department.name,
                  rules: [
                    {
                      required: true,
                      message: '请选择所属组织架构',
                    },
                  ],
                })(
                  <Input
                    disabled={true}
                    placeholder="请选择所属组织架构"
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
                    this.setDepartmentSelectModalVisible(true);
                  }}>
                  选择部门
                </Button>
                <DepartmentSelectModalForm
                  departmentList={organizationList}
                  visible={this.state.departmentSelectModalVisible}
                  onOk={this.departmentIsOk}
                  onCancel={this.setDepartmentSelectModalVisible}
                  options={this.state.options}
                  initOrganizationList={initOrganizationList}
                  selectedRowKeys={
                    this.props.match.params.action === 'edit'
                      ? projectDetail.departId
                        ? [parseInt(projectDetail.departId)]
                        : []
                      : []
                  }
                />
              </FormItem>
              <FormItem {...formItemLayout} label="项目地址" required={true}>
                {getFieldDecorator('address', {
                  initialValue: projectDetail.pjAddress,
                  rules: [
                    {
                      required: true,
                      message: '请输入详细地址',
                    },
                  ],
                })(
                  <Input
                    placeholder="请输入详细地址"
                    type="text"
                    style={{
                      width: '100%',
                      marginRight: '3%',
                    }}
                  />,
                )}
              </FormItem>
              <Row>
                <Col span={9}>
                  <div
                    style={{
                      marginRight: '1rem',
                      textAlign: 'right',
                      fontSize: '2rem',
                    }}>
                    新增项目基本信息
                  </div>
                </Col>
              </Row>
              <Row>
                <Col offset={4} span={16}>
                  <div className="project_region_info">
                    <Row className="header">
                      <Col span={7}>
                        <span>区域名称</span>
                      </Col>
                      <Col span={5}>
                        <span>数量</span>
                      </Col>
                      <Col span={3}>
                        <span>计量单位</span>
                      </Col>
                      <Col span={8}>
                        <span>区域备注</span>
                      </Col>
                    </Row>
                    {formItems}
                    <FormItem
                      xs={{ span: 24, offset: 0 }}
                      sm={{ span: 20, offset: 4 }}>
                      <Button
                        type="dashed"
                        onClick={this.add}
                        style={{ width: '60%' }}>
                        <Icon type="plus" />
                      </Button>
                    </FormItem>
                  </div>
                </Col>
              </Row>

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

const AddProjectForm = Form.create()(AddProject);
const mapStateToProps = state => {
  return {
    iceList: getIceList(state),
    projectDetail: getProjectDetail(state),
    tenementCompanyList: getTenementCompanyList(state),
    organizationList: getOrganizationList(state),
    unitList: getUnitList(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initIceList: param => {
      dispatch(initIceList(param));
    },
    initOrganizationList: param => {
      dispatch(initOrganizationList(param));
    },
    init: () => {
      dispatch(init());
    },
    initTenementCompanyList: param => {
      dispatch(initTenementCompanyList(param));
    },
    submit: param => {
      dispatch(submit(param));
    },
    initProjectDetail: param => {
      dispatch(initProjectDetail(param));
    },
    initUnit: param => {
      dispatch(initUnit(param));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddProjectForm);

class CommunitySelectModal extends React.Component {
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
      pageSize: this.props.options.pageSize,
      orgType: '小区',
    };
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        for (let item in values) {
          switch (item) {
            case 'name':
              param['key'] = values[item];
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
    const { communityList } = this.props;
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
              communityList={communityList}
              onSelectChange={this.onSelectChange}
              initIceList={this.props.initIceList}
              options={this.props.options}
              selectedRowKeys={selectedRowKeys}
            />
          </div>
        </Modal>
      </div>
    );
  }
}
const CommunitySelectModalForm = Form.create()(CommunitySelectModal);

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
        title: '项目名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '项目地址',
        dataIndex: 'address',
        key: 'address',
      },
    ];
    const { communityList } = this.props;
    const data = communityList.content.map((item, i) => {
      return {
        key: item.orgUuid,
        id: item.orgUuid,
        name: item.name,
        address: item.province + item.city,
      };
    });
    // const data = [{
    //     key: '1',
    //     projectName: '江南苑景',
    //     projectAddress: '江苏省苏州市古城区青夜路32号',
    // }, {
    //     key: '2',
    //     projectName: '江南苑景',
    //     projectAddress: '江苏省苏州市古城区青夜路32号',
    // }, {
    //     key: '3',
    //     projectName: '江南苑景',
    //     projectAddress: '江苏省苏州市古城区青夜路32号',
    // }];
    const options = {
      current: this.props.options.current,
      defaultPageSize: this.props.options.pageSize,
      pageSizeOptions: this.props.options.pageSizeOptions,
      total: communityList.totalRecord,
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
          orgType: '小区',
        });
      },
      onShowSizeChange: (current, size) => {
        this.props.options.pageSizeChange(current, size);
        this.props.initIceList({
          pageIndex: current,
          pageSize: size,
          orgType: '小区',
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

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.nameChange = this.nameChange.bind(this);
    this.countChange = this.countChange.bind(this);
    this.uniteChange = this.uniteChange.bind(this);
    this.noteChange = this.noteChange.bind(this);
  }

  nameChange(e) {
    console.log(`${e.target.value}`);
    this.props.changeInfo('name', e.target.value, this.props.index);
  }

  countChange(e) {
    console.log(`${e.target.value}`);
    this.props.changeInfo('count', e.target.value, this.props.index);
  }

  uniteChange(value) {
    console.log(`${value}`);
    this.props.changeInfo('unit', value, this.props.index);
  }

  noteChange(e) {
    console.log(`${e.target.value}`);
    this.props.changeInfo('note', e.target.value, this.props.index);
  }

  generateUnitOption = data => {
    return data.map((item, i) => {
      return (
        <Option key={i} value={i}>
          {item}
        </Option>
      );
    });
  };

  render() {
    const { action, initial, unitList, index, alikey } = this.props;
    return (
      <Row gutter={5}>
        <Col span={7}>
          <Input
            defaultValue={
              action === 'edit' ? (initial ? initial.name : '') : ''
            }
            placeholder="北大门广场区域(示例)"
            type="text"
            onChange={this.nameChange}
          />
        </Col>
        <Col span={5}>
          <Input
            defaultValue={
              action === 'edit' ? (initial ? initial.count : '') : ''
            }
            placeholder="1288.00"
            type="text"
            onChange={this.countChange}
          />
        </Col>
        <Col
          span={3}
          style={{ paddingTop: '0.35rem', paddingBottom: '0.35rem' }}>
          <InputGroup>
            <Select
              onSelect={this.uniteChange}
              style={{ width: '100%' }}
              defaultValue={
                action === 'edit'
                  ? initial
                    ? initial.unit
                    : unitList[0]
                  : unitList[0]
              }>
              {unitList.map((item, i) => {
                return (
                  <Option key={i} value={item}>
                    {item}
                  </Option>
                );
              })}
              {/*<Option value="平米">平米</Option>*/}
              {/*<Option value="米">米</Option>*/}
              {/*<Option value="立方米">立方米</Option>*/}
              {/*<Option value="个">个</Option>*/}
            </Select>
          </InputGroup>
        </Col>
        <Col span={8}>
          <Input
            defaultValue={
              action === 'edit' ? (initial ? initial.note : '') : ''
            }
            placeholder="默认可不填写"
            type="text"
            onChange={this.noteChange}
          />
        </Col>
        <Col span={1}>
          {this.props.length > 1 ? (
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              disabled={this.props.length === 1}
              onClick={() => this.props.remove(index, alikey)}
            />
          ) : null}
        </Col>
      </Row>
    );
  }
}

class CompanySelectModal extends React.Component {
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
    let param = {};
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
        this.props.initTenementCompanyList(param);
      }
    });
  };

  render() {
    const { getFieldDecorator, resetFields } = this.props.form;
    const { tenementCompanyList } = this.props;
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
              <FormItem label="公司名称">
                {getFieldDecorator('name')(
                  <Input
                    placeholder="请输入公司名称"
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
            <CompanyCustomTable
              tenementCompanyList={tenementCompanyList}
              onSelectChange={this.onSelectChange}
              initTenementCompanyList={initTenementCompanyList}
              options={this.props.options}
              selectedRowKeys={selectedRowKeys}
            />
          </div>
        </Modal>
      </div>
    );
  }
}
const CompanySelectModalForm = Form.create()(CompanySelectModal);

class CompanyCustomTable extends React.Component {
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
        title: '公司名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '公司地址',
        dataIndex: 'address',
        key: 'address',
      },
    ];
    const { tenementCompanyList } = this.props;
    const data = tenementCompanyList.dataSource.map((item, i) => {
      return {
        key: item.id,
        id: item.id,
        name: item.name,
        address: item.address,
      };
    });
    // const options = {
    //     defaultPageSize: this.props.options.pageSize,
    //     pageSizeOptions: this.props.options.pageSizeOptions,
    //     total: tenementCompanyList.total,
    //     showSizeChanger: true,
    //     showQuickJumper: true,
    //     onChange: (page, pageSize) => {
    //         console.log('页码改变的回调，参数是改变后的页码: ' + page + ',及每页条数: ' + pageSize);
    //         this.props.initTenementCompanyList({
    //             current: page,
    //             pageSize: pageSize
    //         });
    //     },
    //     onShowSizeChange: (current, size) => {
    //
    //         this.props.options.pageSizeChange(current, size);
    //         this.props.initTenementCompanyList({
    //             current: current,
    //             pageSize: size
    //         });
    //     }
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
          style={{ overflow: 'scroll', maxHeight: '50rem' }}
          columns={columns}
          dataSource={data}
          pagination={false}
          rowSelection={rowSelection}
        />
        {/*<Pagination*/}
        {/*style={{*/}
        {/*marginTop: '2rem'*/}
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
      current: this.props.options.current,
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
            <DepartmentCustomTable
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
const DepartmentSelectModalForm = Form.create()(DepartmentSelectModal);

class DepartmentCustomTable extends React.Component {
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
    //         console.log('页码改变的回调，参数是改变后的页码: ' + page + ',及每页条数: ' + pageSize);
    //         this.props.initOrganizationList({
    //             current: page,
    //             pageSize: pageSize
    //         });
    //     },
    //     onShowSizeChange: (current, size) => {
    //
    //         this.props.options.pageSizeChange(current, size);
    //         this.props.initOrganizationList({
    //             current: current,
    //             pageSize: size
    //         });
    //     }
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
        {/*marginTop: '2rem'*/}
        {/*}}*/}
        {/*{...options}*/}
        {/*/>*/}
      </div>
    );
  }
}
