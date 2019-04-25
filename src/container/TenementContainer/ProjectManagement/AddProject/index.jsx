import './style.scss';

import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Layout,
  Modal,
  Radio,
  Row,
  Select,
} from 'antd';
import React from 'react';
import { connect } from 'react-redux';

import ModalContainer from '../../../../component/ModalContainer';
import { Toolbar } from '../../../../component/Toolbar/Toolbar';
import { initUnit } from '../../../CommodityContainer/CommodityManagement/AddCommodity/action';
import { getUnitList } from '../../../CommodityContainer/CommodityManagement/AddCommodity/selector';
import { initTreeList } from '../../../CommodityContainer/CommodityManagement/RootContainer/action';
import { getTreeList } from '../../../CommodityContainer/CommodityManagement/RootContainer/selector';
import { initTenementCompanyList } from '../../TenementCompanyManagement/RootContainer/action';
import { getTenementCompanyList } from '../../TenementCompanyManagement/RootContainer/selector';
import { init, initProjectDetail } from '../ProjectDetail/action';
import { getProjectDetail } from '../ProjectDetail/selector';
import { submit } from './action';
import CommunityList from './components/CommunityList';
import generateAreaFormItem from './components/generateAreaFormItem';
import generatepjFormatFormItem from './components/generatepjFormatFormItem';
import generatepjPostFormItem from './components/generatepjPostFormItem';
import OrganizationList from './components/OrganizationList';

const { Content } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;

let pjPostListKey = 1;
let pjFormatListKey = 1;
class AddProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tempCommunitySelectRowKeys: [],
      tempCommunitySelectRow: [],
      tempOrganizationSelectRowKeys: [],
      tempOrganizationSelectRow: [],
    };
  }

  componentWillMount() {
    const { id, action } = this.props.match.params;
    if (action === 'edit') {
      this.props.initProjectDetail({ id });
    } else {
      this.props.init();
    }
    this.props.initUnit();
    this.props.initTenementCompanyList();
    this.props.initTreeList();
  }
  onCommunityModalOk = modal => {
    modal.hide();
    const { setFieldsValue } = this.props.form;
    const current = this.state.tempCommunitySelectRow[0];
    setFieldsValue({
      pjName: current.name,
      pjUuid: current.orgUuid,
    });
  };
  onOrganizationModalOk = modal => {
    modal.hide();
    const { setFieldsValue } = this.props.form;
    const current = this.state.tempOrganizationSelectRow[0];
    setFieldsValue({
      departName: current.name,
      departId: current.id,
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { id, action } = this.props.match.params;

    this.props.form.validateFields((err, values) => {
      if (err) return;
      const {
        pjFormatListKeys,
        pjPostListKeys,
        areaListKeys,
        ...others
      } = values;
      if (others.pjPostList) {
        others.pjPostList = others.pjPostList
          .filter(item => item.type)
          .map(item => ({
            ...item,
            startTime: item && item.startTime && item.startTime.valueOf(),
            endTime: item && item.endTime && item.endTime.valueOf(),
          }));
      }
      if (others.pjFormatList) {
        others.pjFormatList = others.pjFormatList.filter(item => item.unit);
      }
      if (others.areasList) {
        others.areasList = others.areasList.filter(item => item.unit);
      }
      this.props.submit({
        action,
        pjId: action === 'edit' ? id : '',
        ...others,
      });
    });
  };

  remove = (k, keysName) => {
    const { form } = this.props;
    const keys = form.getFieldValue(keysName);
    if (keys.length === 1) {
      return;
    }
    form.setFieldsValue({
      [keysName]: keys.filter(key => key !== k),
    });
  };

  add = keysName => {
    const { form } = this.props;
    const keys = form.getFieldValue(keysName);
    let nextKeys = [];
    if (keysName === 'pjPostListKeys') {
      pjPostListKey++;
      nextKeys = keys.concat(pjPostListKey);
    } else {
      pjFormatListKey++;
      nextKeys = keys.concat(pjFormatListKey);
    }
    form.setFieldsValue({
      [keysName]: nextKeys,
    });
  };

  render() {
    const {
      getFieldDecorator,
      getFieldValue,
      setFieldsValue,
    } = this.props.form;
    const { id, action } = this.props.match.params;
    const {
      tenementCompanyList,
      treeList,
      projectDetail,
      unitList,
    } = this.props;

    const pjPostList = projectDetail.pjPostList || [];
    const pjFormatList = projectDetail.pjFormatList || [];
    const areasList = projectDetail.areasList || [];
    const list = [
      '物业管理',
      {
        label: '项目管理',
        to: '/index/projectManagement',
      },
      {
        label: '新增项目',
        to: `/index/addProject/${action}/${id}`,
      },
    ];
    const oneFormitemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 13 },
    };
    const ThreeformItemWithButtonLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };
    const ThreeformItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 15 },
    };

    getFieldDecorator('pjPostListKeys', {
      initialValue: pjPostList.length ? pjPostList.map((_, i) => i) : [0],
    });
    getFieldDecorator('pjFormatListKeys', {
      initialValue: pjFormatList.length ? pjFormatList.map((_, i) => i) : [0],
    });
    getFieldDecorator('areaListKeys', {
      initialValue: areasList.length ? areasList.map((_, i) => i) : [0],
    });
    const pjPostListKeys = getFieldValue('pjPostListKeys');
    const pjFormatListKeys = getFieldValue('pjFormatListKeys');
    const areaListKeys = getFieldValue('areaListKeys');
    return (
      <Layout id="add_project">
        <Toolbar type={1} list={list} title="新增项目" />
        <Content className="content">
          <Row>
            <Col offset="1">
              <h3>项目基本信息</h3>
            </Col>
          </Row>
          <Divider />
          <Form onSubmit={this.handleSubmit}>
            <Row type="flex" justify="space-around">
              <Col span={8}>
                <FormItem label="项目名称" {...ThreeformItemWithButtonLayout}>
                  {getFieldDecorator('pjName', {
                    initialValue: projectDetail.pjName,
                  })(
                    <Input
                      style={{ width: '55%', marginRight: '10px' }}
                      disabled
                    />,
                  )}
                  {getFieldDecorator('pjUuid', {
                    initialValue: projectDetail.pjUuid,
                  })}
                  <ModalContainer>
                    {modal => (
                      <React.Fragment>
                        <Button type="primary" onClick={modal.show}>
                          + 选择小区
                        </Button>
                        <Modal
                          visible={modal.visible}
                          onCancel={modal.hide}
                          onOk={() => this.onCommunityModalOk(modal)}
                          width="800px">
                          <CommunityList
                            selectedRowKeys={
                              this.state.tempCommunitySelectRowKeys
                            }
                            onSelectRowChange={(key, row) =>
                              this.setState({
                                tempCommunitySelectRowKeys: key,
                                tempCommunitySelectRow: row,
                              })
                            }
                          />
                        </Modal>
                      </React.Fragment>
                    )}
                  </ModalContainer>
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  label="所属物业"
                  {...ThreeformItemWithButtonLayout}
                  wrapperCol={{ span: 15 }}>
                  {getFieldDecorator('propertyId', {
                    initialValue: Number.isNaN(Number(projectDetail.propertyId))
                      ? ''
                      : Number(projectDetail.propertyId),
                  })(
                    <Select>
                      {tenementCompanyList.dataSource.map(item => {
                        return (
                          <Option key={item.id} value={item.id}>
                            {item.name}
                          </Option>
                        );
                      })}
                    </Select>,
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label="所属事业部" {...ThreeformItemWithButtonLayout}>
                  {getFieldDecorator('departName', {
                    initialValue: projectDetail.departName,
                  })(
                    <Input
                      style={{ width: '55%', marginRight: '10px' }}
                      disabled
                    />,
                  )}
                  {getFieldDecorator('departId', {
                    initialValue: Number(projectDetail.departId),
                  })}
                  <ModalContainer>
                    {modal => (
                      <React.Fragment>
                        <Button type="primary" onClick={modal.show}>
                          + 选择事业部
                        </Button>
                        <Modal
                          visible={modal.visible}
                          onCancel={modal.hide}
                          onOk={() => this.onOrganizationModalOk(modal)}
                          width="800px">
                          <OrganizationList
                            selectedRowKeys={
                              this.state.tempOrganizationSelectRowKeys.length
                                ? this.state.tempOrganizationSelectRowKeys
                                : [Number(projectDetail.departId)]
                            }
                            onSelectRowChange={(key, row) => {
                              this.setState({
                                tempOrganizationSelectRowKeys: key,
                                tempOrganizationSelectRow: row,
                              });
                            }}
                          />
                        </Modal>
                      </React.Fragment>
                    )}
                  </ModalContainer>
                </FormItem>
              </Col>
            </Row>
            <FormItem label="项目地址" {...oneFormitemLayout}>
              {getFieldDecorator('pjAddress', {
                initialValue: projectDetail.pjAddress,
              })(<Input />)}
            </FormItem>
            <Row type="flex" justify="space-around">
              <Col span={8}>
                <FormItem label="项目预算" {...ThreeformItemLayout}>
                  {getFieldDecorator('pjBudget', {
                    initialValue: projectDetail.pjBudget || 0,
                  })(<Input />)}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label="合同金额" {...ThreeformItemLayout}>
                  {getFieldDecorator('contractMoney', {
                    initialValue: projectDetail.contractMoney || 0,
                    rules: [{ required: true, message: '请填写合同金额' }],
                  })(<Input />)}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label="充值饭票额度" {...ThreeformItemLayout}>
                  {getFieldDecorator('ticketLimit', {
                    initialValue: projectDetail.ticketLimit || 0,
                  })(<Input />)}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col offset="1">
                <h3>项目基本信息</h3>
              </Col>
            </Row>
            {generateAreaFormItem({
              getFieldDecorator,
              setFieldsValue,
              getFieldValue,
              keys: areaListKeys,
              areasList,
              unitList,
              add: () => this.add('areaListKeys'),
              remove: k => this.remove(k, 'areaListKeys'),
            })}
            <Divider />
            <Row>
              <Col offset="1">
                <h3>项目岗位信息</h3>
              </Col>
            </Row>
            {generatepjPostFormItem({
              getFieldDecorator,
              treeList,
              setFieldsValue,
              getFieldValue,
              keys: pjPostListKeys,
              pjPostList,
              add: () => this.add('pjPostListKeys'),
              remove: k => this.remove(k, 'pjPostListKeys'),
            })}
            <Divider />
            <Row>
              <Col offset="1">
                <h3>项目规格信息</h3>
              </Col>
            </Row>
            {generatepjFormatFormItem({
              getFieldDecorator,
              setFieldsValue,
              getFieldValue,
              keys: pjFormatListKeys,
              pjFormatList,
              getFieldValue,
              setFieldsValue,
              add: () => this.add('pjFormatListKeys'),
              remove: k => this.remove(k, 'pjFormatListKeys'),
            })}
            <Divider />
            <Row type="flex" justify="center">
              <Col>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginRight: '10px' }}>
                  提交
                </Button>
                <Button onClick={() => window.myHistory.goBack()}>返回</Button>
              </Col>
            </Row>
          </Form>
        </Content>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  let treeList = getTreeList(state);
  treeList.shift();
  return {
    projectDetail: getProjectDetail(state),
    unitList: getUnitList(state),
    tenementCompanyList: getTenementCompanyList(state),
    treeList,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    submit: param => {
      dispatch(submit(param));
    },
    initProjectDetail: param => {
      dispatch(initProjectDetail(param));
    },
    init: param => {
      dispatch(init(param));
    },
    initUnit: param => {
      dispatch(initUnit(param));
    },
    initTenementCompanyList: param => {
      dispatch(initTenementCompanyList(param));
    },
    initTreeList: param => {
      dispatch(initTreeList(param));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form.create()(AddProject));
