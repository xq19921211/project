/*
 * @Author: LiaoYingLong
 * @Date: 2018-10-15 17:53:15
 * @Last Modified by: LiaoYingLong
 * @Last Modified time: 2018-10-25 14:50:45
 */

import { Card, Col, Divider, Form, Row } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../action';
import * as selectors from '../selector';

const FormItem = Form.Item;
class FirstCard extends React.Component {
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.projectId !== this.props.projectId) {
      this.props.getProjectInfo({ projectId: this.props.projectId });
    }
  }
  render() {
    const { projectInfo } = this.props;
    return (
      <Card className="inline-block-form-item mb24">
        <Form>
          <Row>
            <Col span={8}>
              <FormItem label="项目面积">
                {projectInfo.projectArea ? `${projectInfo.projectArea}m²` : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="收费面积">
                {projectInfo.chargeArea ? `${projectInfo.chargeArea}m²` : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="绿化面积">
                {projectInfo.greenArea ? `${projectInfo.greenArea}m²` : '-'}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem label="项目楼栋数">
                {projectInfo.buildingCount
                  ? `${projectInfo.buildingCount}栋`
                  : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="房屋数">
                {projectInfo.houseCount || '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="住户数">
                {projectInfo.householdCount
                  ? `${projectInfo.householdCount}户`
                  : '-'}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem label="入住率">
                {projectInfo.occupancyRate || '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="合同金额">
                {projectInfo.contractAmount
                  ? `${projectInfo.contractAmount}元`
                  : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="预算金额">
                {projectInfo.budgetaryAmount
                  ? `${projectInfo.budgetaryAmount}元`
                  : '-'}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormItem label="项目地址">{projectInfo.address || '-'}</FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem label="项目类型">{projectInfo.type || '-'}</FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="作业间隔时间">
                {projectInfo.timeInterval
                  ? `${projectInfo.timeInterval}天`
                  : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="累计作业人数">
                {projectInfo.workerCount ? `${projectInfo.workerCount}人` : '-'}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem label="最近一次作业时间">
                {projectInfo.lastWorkTime || '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="最近一次作业人">
                {(projectInfo.workerName || [])
                  .map(worker => worker.username)
                  .join('、') || '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="供应商">
                {(projectInfo.supplier || [])
                  .map(item => item.cusName)
                  .join('、') || '-'}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem label="最近一次评价时间">
                {projectInfo.lastEvaluateTime || '-'}
              </FormItem>
            </Col>
            <Col span={16}>
              <FormItem label="项目负责人">
                {(projectInfo.projectLeaders || [])
                  .map(leader => leader.cusName)
                  .join('、') || '-'}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {
    projectInfo: selectors.getProjectInfoSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProjectInfo: bindActionCreators(actions.getProjectInfo, dispatch),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FirstCard);
