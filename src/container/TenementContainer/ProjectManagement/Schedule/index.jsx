import './style.scss';

import ModalContainer from '@/component/ModalContainer';
import {
  Button,
  Col,
  Form,
  Icon,
  Input,
  Layout,
  Modal,
  Radio,
  Row,
  Select,
  Tabs,
  TimePicker,
} from 'antd';
import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';

import { Toolbar } from '../../../../component/Toolbar/Toolbar';
import { init, initProjectDetail } from '../ProjectDetail/action';
import { getProjectDetail } from '../ProjectDetail/selector';
import * as actions from './action';
import BuilderList from './components/BuilderList';
import Calendar from './components/Calendar';
import EmptyData from './components/EmptyData';
import { getScheduleDetailListSelect } from './selector';

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const { Content } = Layout;
const format = 'HH:mm';
let uuid = 1;
class Schedule extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    currentDay: 1,
    tempSelectRowKeys: [],
    tempSelectRow: [],
  };
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getScheduleDetail({ id });
    this.props.initProjectDetail({ id });
  }
  findCurrentDayScheduleDetail = (currentDay = this.state.currentDay) => {
    return (
      this.props.scheduleDetailList.find(
        item => item.currentDay === currentDay,
      ) || {}
    );
  };
  submit = () => {
    const { form, addSchedule, match } = this.props;
    form.validateFields((err, values) => {
      if (err) return;
      const { pjTaskList } = values;
      addSchedule({
        projectId: match.params.id,
        currentDay: this.state.currentDay,
        ...values,
        pjTaskList: pjTaskList.filter(item => item.formatId),
      });
    });
  };
  onBuilderListModalOk = (index, modal) => {
    modal.hide();
    const { setFieldsValue, getFieldValue } = this.props.form;
    const pjTaskList = getFieldValue('pjTaskList');
    const current = this.state.tempSelectRow[0];
    pjTaskList[index].operatorName = current.oprName;
    pjTaskList[index].operatorId = current.oprId;
    setFieldsValue({ pjTaskList });
  };
  onFormatIdChange = (index, option) => {
    const { setFieldsValue, getFieldValue } = this.props.form;
    const pjTaskList = getFieldValue('pjTaskList');
    pjTaskList[index].formatName = option.props.children;
    setFieldsValue({ pjTaskList });
  };
  onDaysChange = currentDay => {
    this.setState({ currentDay });
    const currentDayScheduleDetail = this.findCurrentDayScheduleDetail(
      currentDay,
    );
    const pjTaskList = currentDayScheduleDetail.pjTaskList || [];
    const { id } = this.props.match.params;
   
    const { form } = this.props;
    if (!Object.keys(currentDayScheduleDetail).length && !pjTaskList.length) {
      form.resetFields();
      return;
    }

    console.log(form.getFieldsValue());

    const setFieldsValuePjTaskList =
      (form.getFieldsValue() || {}).pjTaskList || [];

    setFieldsValuePjTaskList.forEach((_, index) => {
      setFieldsValuePjTaskList[index] = pjTaskList[index] || { ...empty };
    });

    form.setFieldsValue({
      projectId: id,
      id: currentDayScheduleDetail.id,
      status: currentDayScheduleDetail.status || 2,
      currentDay,
      pjTaskList: setFieldsValuePjTaskList,x 
    });
  
    console.log(form.getFieldsValue());
  };
  resetRow = index => {
    const { getFieldValue, setFieldsValue } = this.props.form;
    const pjTaskList = getFieldValue('pjTaskList');

    ['formatId', 'formatName', 'operatorId', 'operatorName'].forEach(
      key => (pjTaskList[index][key] = ''),
    );

    setFieldsValue({ pjTaskList });
    setTimeout(() => {
      console.log(this.props.form.getFieldsValue());
    }, 3000);
  };

  normalizePjTaskList = (pjPostList, pjTaskList) => {
    return pjPostList.reduce((arr, item) => {
      const t = pjTaskList.find(task => task.postId == item.id);
      return arr.push(t || {}), arr;
    }, []);
  };

  render() {
    const list = [
      '物业管理',
      {
        label: '项目管理',
        to: '/index/projectManagement',
      },
      {
        label: '新增排班',
        to: `/index/Schedule/${this.props.match.params.id}`,
      },
    ];
    const formItemLayout = {
      labelCol: { span: 10 },
      wrapperCol: { span: 10 }, 
    };
    const {
      getFieldDecorator,
      getFieldValue,
      setFieldsValue,
      getFieldsValue,
    } = this.props.form;
    const { projectDetail } = this.props;
    const pjPostList = projectDetail.pjPostList || [];
    const pjFormatList = projectDetail.pjFormatList || [];
    const currentDayScheduleDetail = this.findCurrentDayScheduleDetail();

    console.log('currentDayScheduleDetail', currentDayScheduleDetail);

    const pjTaskList = this.normalizePjTaskList(
      pjPostList,
      currentDayScheduleDetail.pjTaskList || [],
    );

    getFieldDecorator('id', { initialValue: currentDayScheduleDetail.id });
    return (
      <Layout id="build_team_management">
        <Toolbar type={1} list={list} title="新增排班" />
        <Content className="content">
          <Form>
            <Row>
              <Col span={5} offset={1}>
                <h3 onClick={() => console.log(this)}>
                  {projectDetail.pjName}
                  岗位排班信息
                </h3>
              </Col>
            </Row>
            <Row>
              <Col span={1}> &nbsp;</Col>
              <Col span={13}>
                {pjPostList.length ? (
                  <React.Fragment>
                    {pjPostList.map((item, i) => {
                      return (
                        <Row
                          key={item}
                          style={{ marginBottom: '15px' }}
                          type="flex"
                          align="middle">
                          <Col span={4}>{`${item.name} 【${
                            ['', '白班', '中班', '夜班'][item.type]
                          }】 按照`}</Col>
                          {getFieldDecorator(`pjTaskList[${i}].postId`, {
                            initialValue: item.id,
                          })}
                          {getFieldDecorator(`pjTaskList[${i}].id`, {
                            initialValue: (pjTaskList[i] || {}).id || 0,
                          })}
                          {getFieldDecorator(`pjTaskList[${i}].postName`, {
                            initialValue: item.name,
                          })}

                          <Col span={5}>
                            {getFieldDecorator(`pjTaskList[${i}].formatId`, {
                              initialValue: (pjTaskList[i] || {}).formatId,
                            })(
                              <Select
                                onChange={(_, p) =>
                                  this.onFormatIdChange(i, p)
                                }>
                                {pjFormatList.map(item => (
                                  <Select.Option value={item.id}>
                                    {item.name}
                                  </Select.Option>
                                ))}
                              </Select>,
                            )}
                            {getFieldDecorator(`pjTaskList[${i}].formatName`, {
                              initialValue: (pjTaskList[i] || {}).formatName,
                            })}
                          </Col>
                          <Col span={1} offset={1}>
                            由
                          </Col>
                          <Col span={3}>
                            {getFieldDecorator(
                              `pjTaskList[${i}].operatorName`,
                              {
                                initialValue: (pjTaskList[i] || {})
                                  .operatorName,
                              },
                            )(<Input disabled />)}
                            {getFieldDecorator(`pjTaskList[${i}].operatorId`, {
                              initialValue: (pjTaskList[i] || {}).operatorId,
                            })}
                          </Col>
                          <Col span={3} offset={1}>
                            <ModalContainer>
                              {modal => (
                                <React.Fragment>
                                  <Button type="primary" onClick={modal.show}>
                                    + 选择
                                  </Button>
                                  <Modal
                                    visible={modal.visible}
                                    onCancel={modal.hide}
                                    onOk={() =>
                                      this.onBuilderListModalOk(i, modal)
                                    }
                                    width="800px"
                                    destroyOnClose>
                                    <BuilderList
                                      selectedRowKeys={
                                        this.state.tempSelectRowKeys
                                      }
                                      onSelectRowChange={(key, row) =>
                                        this.setState({
                                          tempSelectRowKeys: key,
                                          tempSelectRow: row,
                                        })
                                      }
                                    />
                                  </Modal>
                                </React.Fragment>
                              )}
                            </ModalContainer>
                          </Col>

                          <Col span={2}>&nbsp;&nbsp;完成工作</Col>
                          <Col span={1} offset={1}>
                            <Icon
                              type="close"
                              theme="outlined"
                              onClick={() => this.resetRow(i)}
                            />
                          </Col>
                        </Row>
                      );
                    })}
                    <Row style={{ marginTop: '10px' }}>
                      提示：无当前岗位+规格排班请留空
                    </Row>
                  </React.Fragment>
                ) : (
                  <EmptyData />
                )}
              </Col>
              <Col span={9}>
                <Calendar
                  onDaysChange={this.onDaysChange}
                  currentDay={this.state.currentDay}
                  scheduleDetailList={this.props.scheduleDetailList}
                />
              </Col>
            </Row>
            {pjPostList.length ? (
              <Row>
                <FormItem label="是否启用" {...formItemLayout}>
                  {getFieldDecorator('status', {
                    initialValue: currentDayScheduleDetail.status || 2,
                  })(
                    <Radio.Group>
                      <Radio value={1}>启用</Radio>
                      <Radio value={2}>禁用</Radio>
                    </Radio.Group>,
                  )}
                </FormItem>
              </Row>
            ) : null}

            <Row>
              <Col span={15}>
                <Row type="flex" justify="center">
                  <Button
                    type="primary"
                    onClick={this.submit}
                    style={{ marginRight: '10px' }}
                    disabled={!pjPostList.length}>
                    提交
                  </Button>
                  <Button onClick={() => window.myHistory.goBack()}>
                    返回
                  </Button>
                </Row>
              </Col>
            </Row>
          </Form>
        </Content>
      </Layout>
    );
  }
}
const mapStateToProps = state => {
  return {
    scheduleDetailList: getScheduleDetailListSelect(state),
    projectDetail: getProjectDetail(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getScheduleDetail: params => dispatch(actions.getScheduleDetail(params)),
    addSchedule: params => dispatch(actions.addSchedule(params)),
    initProjectDetail: param => {
      dispatch(initProjectDetail(param));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form.create()(Schedule));
