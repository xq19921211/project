/**
 * Created by xu.long on 2018/5/10.
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
import { clone, isEmpty } from '../../../../util/util';
import { init, initMerchantDetail, submit } from './action';

import React from 'react';
import { Toolbar } from '../../../../component/Toolbar/Toolbar';
import { connect } from 'react-redux';
import { getIceList } from '../../../TenementContainer/OrganizationManagement/AddDepartment/selector';
import { getMerchantDetail } from './selector';
import { getProjectList } from '../../../TenementContainer/ProjectManagement/RootContainer/selector';
import { initIceList } from '../../../TenementContainer/OrganizationManagement/AddDepartment/action';
import { initProjectList } from '../../../TenementContainer/ProjectManagement/RootContainer/action';
import moment from 'moment';

const { Content } = Layout;
const FormItem = Form.Item;
const InputGroup = Input.Group;
const Option = Select.Option;
const RadioGroup = Radio.Group;
class AddMerchant extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.pageChange = this.pageChange.bind(this);
    this.state = {
      merchantSelectModalVisible: false,
      selectedRows: [],
      merchantSelectedRows: [{}],
      timeRange: [],
      options: {
        current: 1,
        pageSize: 10,
        pageSizeChange: this.pageChange,
        pageSizeOptions: ['10', '20', '100'],
      },
      providerType: window.basic.providerType,
    };
  }

  componentWillMount() {
    if (this.props.match.params.action === 'edit') {
      this.props.initMerchantDetail({ id: this.props.match.params.id });
    } else {
      this.props.init();
    }
    // this.props.initIceList(
    //     {
    //         pageIndex: this.state.options.current,
    //         pageSize: this.state.options.pageSize,
    //         orgType: '商户',
    //         parentId: '4280783e-5ebb-4683-bf6e-feb5de39034b'
    //
    //     });
    // this.props.initProjectList({current: this.state.options.current, pageSize: this.state.options.pageSize});
  }

  componentWillReceiveProps(nextProps) {
    console.log(
      `componentWillReceiveProps nextProps: ${JSON.stringify(nextProps)}`,
    );
    if (
      nextProps &&
      !isEmpty(nextProps.merchantDetail) &&
      this.state.selectedRows.length < 1
    ) {
      if (
        nextProps.merchantDetail.coverRules &&
        nextProps.merchantDetail.coverRules.length > 0
      ) {
        this.setState(
          Object.assign({}, this.state, {
            selectedRows: nextProps.merchantDetail.coverRules,
          }),
          () => {
            this.props.form.setFieldsValue({
              chooseCoverProject: 'true',
            });
          },
        );
      }
    }
    if (
      nextProps &&
      !isEmpty(nextProps.merchantDetail) &&
      this.state.timeRange.length < 1
    ) {
      let temp = ['00:00:00', '00:00:00'];
      if (nextProps.merchantDetail.startTime) {
        temp[0] = nextProps.merchantDetail.startTime;
      }
      if (nextProps.merchantDetail.endTime) {
        temp[1] = nextProps.merchantDetail.endTime;
      }
      this.setState(
        Object.assign({}, this.state, {
          timeRange: temp,
        }),
      );
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
    timeRange[0] = !timeString ? '00:00:000' : timeString;
    this.setState({
      timeRange: timeRange,
    });
  };
  endTimeChange = (e, timeString) => {
    console.log(e, timeString);
    let timeRange = clone(this.state.timeRange);
    timeRange[1] = !timeString ? '00:00:000' : timeString;
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
        supId: this.props.match.params.id,
        // coverRules: !this.state.selectedRows[0].projectName ? this.props.merchantDetail.name : this.state.selectedRows[0].projectName,
        startTime: this.state.timeRange[0],
        endTime: this.state.timeRange[1],
        action: this.props.match.params.action,
      };
    } else {
      param = {
        // coverRules: this.state.selectedRows.map((item, i) => {
        //     return {
        //         org_id: item.id,
        //         org_name: item.projectName
        //     }
        // }),
        startTime: this.state.timeRange[0],
        endTime: this.state.timeRange[1],
        supUuid: this.state.merchantSelectedRows[0].orgUuid,
        action: this.props.match.params.action,
      };
    }
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        for (let item in values) {
          if (values[item] !== undefined && values[item] !== null) {
            switch (item) {
              case 'provider':
                param['supName'] = values[item];
                break;
              case 'providerType':
                param['supType'] = this.state.providerType[values[item]];
                break;
              case 'area':
                param['province'] = values[item][0];
                param['city'] = values[item][1];
                param['region'] = values[item][2];
                break;
              case 'address':
                param['address'] = values[item];
                break;
              case 'contact':
                param['supTel'] = values[item];
                break;
              case 'providerRank':
                param['sort'] = values[item];
                break;
              case 'usingOrNot':
                param['supStatus'] = values[item];
                break;
              case 'supUuid':
                param['supUuid'] = values[item];
                break;
            }
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
  setMerchantSelectModalVisible = merchantSelectModalVisible => {
    console.log(`merchantSelectModalVisible: ${merchantSelectModalVisible}`);
    this.setState({ merchantSelectModalVisible });
  };

  merchantIsOk = (merchantSelectModalVisible, merchantSelectedRows) => {
    console.log(
      `merchantSelectModalVisible: ${merchantSelectModalVisible} and merchantSelectedRows: ${JSON.stringify(
        merchantSelectedRows,
      )}`,
    );
    const { setFieldsValue } = this.props.form;
    this.setMerchantSelectModalVisible(merchantSelectModalVisible);
    this.setState({ merchantSelectedRows });
    if (merchantSelectedRows.length > 0) {
      setFieldsValue({ provider: merchantSelectedRows[0].name });
    }
  };

  render() {
    const { getFieldDecorator, setFieldsValue } = this.props.form;
    const { projectList, merchantDetail, iceList, initIceList } = this.props;
    const { selectedRows, providerType, timeRange } = this.state;
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
    const isEdit = this.props.match.params.action === 'edit';
    const ToolbarTitle = isEdit ? '编辑保安公司' : '新增保安公司';

    const list = [
      '保安公司管理',
      {
        label: '保安公司管理',
        to: '/index/merchantManagement',
      },
      {
        label: ToolbarTitle,
        to: `/index/addMerchant/${this.props.match.params.action}/${
          this.props.match.params.id
        }`,
      },
    ];
    return (
      <Layout id="add_merchant">
        <Toolbar type={1} list={list} title={ToolbarTitle} />
        <Content className="content">
          <div>
            <Form onSubmit={this.handleSubmit}>
              <FormItem
                {...formItemLayout}
                label="保安公司名称"
                required={true}>
                {getFieldDecorator('provider', {
                  initialValue: !merchantDetail ? '' : merchantDetail.supName,
                  rules: [
                    {
                      required: true,
                      message: '请输入保安公司名称',
                    },
                  ],
                })(
                  <Input
                    // disabled={true}
                    placeholder="请输入保安公司名称"
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
                    console.log('选择保安公司名称');
                    this.setMerchantSelectModalVisible(true);
                    this.props.initIceList({
                      pageIndex: this.state.options.current,
                      pageSize: this.state.options.pageSize,
                      orgType: '商户',
                      parentId: '4280783e-5ebb-4683-bf6e-feb5de39034b',
                    });
                  }}>
                  选择OA保安公司
                </Button>
                <MerchantSelectModalForm
                  iceList={iceList}
                  visible={this.state.merchantSelectModalVisible}
                  onOk={this.merchantIsOk}
                  onCancel={this.setMerchantSelectModalVisible}
                  options={this.state.options}
                  initIceList={initIceList}
                  selectedRowKeys={
                    this.props.match.params.action === 'edit'
                      ? merchantDetail.supUuid
                        ? [merchantDetail.supUuid]
                        : []
                      : []
                  }
                />
              </FormItem>
              <FormItem {...formItemLayout} label="对公族谱UUID">
                {getFieldDecorator('supUuid', {
                  initialValue:
                    this.props.match.params.action === 'edit'
                      ? !merchantDetail.supUuid
                        ? ''
                        : merchantDetail.supUuid
                      : '',
                })(<Input placeholder="请输入对公族谱UUID" type="text" />)}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="保安公司类型"
                required={true}>
                {getFieldDecorator('providerType', {
                  initialValue: !merchantDetail.category
                    ? 0
                    : parseInt(merchantDetail.category),
                  rules: [
                    {
                      required: true,
                      message: '请输入保安公司类型',
                    },
                  ],
                })(
                  <Select onChange={this.handleChange}>
                    {providerType.map((item, i) => (
                      <Option key={i} value={i}>
                        {item}
                      </Option>
                    ))}
                  </Select>,
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="所在地区">
                {getFieldDecorator(
                  'area',
                  merchantDetail.province &&
                  merchantDetail.city &&
                  merchantDetail.region
                    ? {
                        initialValue: [
                          merchantDetail.province,
                          merchantDetail.city,
                          merchantDetail.region,
                        ],
                      }
                    : {},
                )(
                  <Cascader
                    placeholder="请选择所在地区"
                    options={options}
                    onChange={this.areaOnChange}
                    style={{
                      width: '100%',
                      marginRight: '3%',
                    }}
                  />,
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="详细地址">
                {getFieldDecorator('address', {
                  initialValue: !merchantDetail ? '' : merchantDetail.address,
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
              {/*<FormItem*/}
              {/*style={{paddingBottom: '2.4rem', marginBottom: 0}}*/}
              {/*{...formItemLayout}*/}
              {/*label='选择续覆盖项目'*/}
              {/*required={true}*/}
              {/*>*/}
              {/*{getFieldDecorator('chooseCoverProject', {*/}
              {/*rules: [{*/}
              {/*required: true,*/}
              {/*whitespace: true,*/}
              {/*message: "请选择续覆盖项目",*/}
              {/*}],*/}
              {/*})(*/}
              {/*<Input placeholder="请选择续覆盖项目" style={{display: 'none'}}/>*/}
              {/*)}*/}
              {/*<Button type="dashed" onClick={() => this.setCoverProjectModalVisible(true)}*/}
              {/*style={{width: '20rem'}}>*/}
              {/*<Icon type="plus"/>选择*/}
              {/*</Button>*/}
              {/*{selectedRows.map((item, i) => {*/}
              {/*return <span key={i}*/}
              {/*style={{marginLeft: '1.5rem'}}>{item.projectName ? item.projectName : item.org_name}</span>*/}
              {/*})}*/}
              {/*<CoverProjectModalForm*/}
              {/*visible={this.state.coverProjectModalVisible}*/}
              {/*onOk={this.isOk}*/}
              {/*onCancel={this.setCoverProjectModalVisible}*/}
              {/*projectList={projectList}*/}
              {/*setFieldsValue={setFieldsValue}*/}
              {/*/>*/}
              {/*</FormItem>*/}
              <FormItem {...formItemLayout} label="联系电话">
                {getFieldDecorator('contact', {
                  initialValue:
                    merchantDetail && merchantDetail.supTel
                      ? merchantDetail.supTel
                      : '',
                })(
                  <Input
                    placeholder="请输入联系电话"
                    type="text"
                    style={{
                      width: '100%',
                      marginRight: '3%',
                    }}
                  />,
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="营业时间">
                <TimePicker
                  onChange={this.startTimeChange}
                  value={moment(
                    timeRange.length > 0 ? timeRange[0] : '00:00:00',
                    'HH:mm:ss',
                  )}
                />
                <span>-</span>
                <TimePicker
                  onChange={this.endTimeChange}
                  value={moment(
                    timeRange.length > 1 ? timeRange[1] : '00:00:00',
                    'HH:mm:ss',
                  )}
                />
              </FormItem>
              <FormItem {...formItemLayout} label="商家排序">
                {getFieldDecorator('providerRank', {
                  initialValue:
                    merchantDetail && merchantDetail.sort
                      ? merchantDetail.sort
                      : '',
                })(
                  <Input
                    placeholder="请输入数字"
                    type="text"
                    style={{
                      width: '100%',
                      marginRight: '3%',
                    }}
                  />,
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="是否启用" require={true}>
                {getFieldDecorator('usingOrNot', {
                  initialValue:
                    merchantDetail && merchantDetail.supStatus
                      ? merchantDetail.supStatus
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

const AddMerchantForm = Form.create()(AddMerchant);
const mapStateToProps = state => {
  return {
    iceList: getIceList(state),
    merchantDetail: getMerchantDetail(state),
    projectList: getProjectList(state),
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
    initProjectList: param => {
      dispatch(initProjectList(param));
    },
    submit: param => {
      dispatch(submit(param));
    },
    initMerchantDetail: param => {
      dispatch(initMerchantDetail(param));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddMerchantForm);

class CoverProjectModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [], // Check here to configure the default column
      selectedRows: [],
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
    this.props.setFieldsValue({
      chooseCoverProject: selectedRows.length > 0 ? 'true' : null,
    });
  };

  render() {
    const { getFieldDecorator, resetFields } = this.props.form;
    const { projectList } = this.props;
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
            <Form layout="inline" onSubmit={this.handleSubmit}>
              <FormItem label="保安公司名称">
                {getFieldDecorator('name')(
                  <Input
                    onPressEnter={this.handleSubmit}
                    placeholder="请输入保安公司名称"
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
              onSelectChange={this.onSelectChange}
              projectList={projectList}
              options={this.props.options}
              initIceList={this.props.initIceList}
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
        key: i,
        id: item.pjId,
        projectName: item.pjName,
        departmentBelongTo: item.departId,
        regionBelongTo: '华南大区',
        tenementCompany: '彩生活物业有限公司',
        address: item.pjAddress,
      };
    });
    const options = {
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
        this.props.initIceList({
          pageIndex: page,
          pageSize: pageSize,
          orgType: '商户',
          parentId: '4280783e-5ebb-4683-bf6e-feb5de39034b',
        });
      },
      onShowSizeChange: (current, size) => {
        this.props.options.pageSizeChange(current, size);
        this.props.initIceList({
          pageIndex: current,
          pageSize: size,
          orgType: '商户',
          parentId: '4280783e-5ebb-4683-bf6e-feb5de39034b',
        });
      },
    };
    // const { selectedRowKeys } = this.state;
    const rowSelection = {
      // selectedRowKeys,
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
class MerchantSelectModal extends React.Component {
  count = 0;
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [], // Check here to configure the default column
      selectedRows: [],
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
  handleSubmit = e => {
    e.preventDefault();
    let param = {
      pageIndex: 1,
      pageSize: this.props.options.pageSize,
      orgType: '商户',
      parentId: '4280783e-5ebb-4683-bf6e-feb5de39034b',
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

  render() {
    const { getFieldDecorator, resetFields } = this.props.form;
    const { iceList } = this.props;
    const { selectedRowKeys } = this.state;
    return (
      <Modal
        maskClosable={false}
        width="90rem"
        wrapClassName="vertical-center-modal"
        visible={this.props.visible}
        onOk={() => this.props.onOk(false, this.state.selectedRows)}
        onCancel={() => this.props.onCancel(false)}
        cancelText="取消"
        okText="确定">
        <Form layout="inline">
          <FormItem label="保安公司名称">
            {getFieldDecorator('name')(
              <Input
                onPressEnter={this.handleSubmit}
                placeholder="请输入保安公司名称"
                type="text"
                style={{ width: '100%', marginRight: '3%' }}
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
        <MerchantCustomTable
          merchantList={iceList}
          onSelectChange={this.onSelectChange}
          options={this.props.options}
          initIceList={initIceList}
          selectedRowKeys={selectedRowKeys}
        />
      </Modal>
    );
  }
}
const MerchantSelectModalForm = Form.create()(MerchantSelectModal);

class MerchantCustomTable extends React.Component {
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
        title: '保安公司名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
      },
    ];
    const { merchantList } = this.props;
    const data = merchantList.content.map((item, i) => {
      return {
        key: item.orgUuid,
        id: item.id,
        name: item.name,
        createTime: item.createTs,
        orgUuid: item.orgUuid,
      };
    });
    const options = {
      current: this.props.options.current,
      defaultPageSize: this.props.options.pageSize,
      pageSizeOptions: this.props.options.pageSizeOptions,
      total: merchantList.totalRecord,
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
          orgType: '商户',
          parentId: '4280783e-5ebb-4683-bf6e-feb5de39034b',
        });
      },
      onShowSizeChange: (current, size) => {
        this.props.options.pageSizeChange(current, size);
        this.props.initIceList({
          pageIndex: current,
          pageSize: size,
          orgType: '商户',
          parentId: '4280783e-5ebb-4683-bf6e-feb5de39034b',
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
