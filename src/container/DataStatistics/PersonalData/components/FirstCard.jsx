/*
 * @Author: LiaoYingLong
 * @Date: 2018-10-15 17:53:15
 * @Last Modified by: LiaoYingLong
 * @Last Modified time: 2018-11-05 14:12:03
 */

import { Card, Col, Divider, Form, Row } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../action';
import * as selectors from '../selector';

const FormItem = Form.Item;

class FirstCard extends React.Component {
  render() {
    const { operator = {} } = this.props.operatorAllDataReport;
    return (
      <Card className="inline-block-form-item mb24">
        <Form>
          <Row>
            <Col span={20}>
              <Row>
                <Col span={8}>
                  <FormItem label="性别">
                    {['男', '女'][operator.sex] || '-'}
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem label="年龄">-</FormItem>
                </Col>
                <Col span={8}>
                  <FormItem label="身份证号">-</FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <FormItem label="学历">-</FormItem>
                </Col>
                <Col span={8}>
                  <FormItem label="电话">{operator.oprTel || '-'}</FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <FormItem label="身份证地址">-</FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <FormItem label="联系地址">-</FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <FormItem label="银行卡账户">-</FormItem>
                </Col>
                <Col span={8}>
                  <FormItem label="银行卡号">-</FormItem>
                </Col>
                <Col span={8}>
                  <FormItem label="开户行">-</FormItem>
                </Col>
              </Row>
            </Col>
            <Col span={4}>
              <img
                src={require('../images/avatar.png')}
                style={{ maxWidth: '100%', display: 'block' }}
              />
            </Col>
          </Row>
        </Form>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {
    operatorAllDataReport: selectors.getOperatorAllDataReportSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FirstCard);
