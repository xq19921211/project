/*
 * @Author: LiaoYingLong
 * @Date: 2018-07-20 14:31:59
 * @Last Modified by: LiaoYingLong
 * @Last Modified time: 2018-07-20 15:07:41
 */

import { Bar, Pie, yuan } from 'ant-design-pro/lib/Charts';
import { Card, Col, Row } from 'antd';
import React from 'react';
import { connect } from 'react-redux';

import CardExtra from '../../components/CardExtra';
import { getClassify, getOrderMoney } from '../action';
import { getClassifySelector, getOrderMoneySelector } from '../selector';

class SecondCard extends React.Component {
  onStatisticsClick = params => {
    const { type, startDate, endDate } = params;
    const { getClassifyData, getOrderMoney } = this.props;
    getClassifyData({ startDate, endDate });
    getOrderMoney({ type, startDate, endDate });
  };
  render() {
    return (
      <Card
        title="消费统计分析"
        extra={<CardExtra onStatisticsClick={this.onStatisticsClick} />}
        bordered={false}
        className="custom-card mb24">
        <Row gutter={24}>
          <Col xs={24} sm={24} md={24} lg={12} xl={10}>
            <Pie
              hasLegend
              title="消费金额"
              subTitle="销售额"
              total={() => (
                <span
                  dangerouslySetInnerHTML={{
                    __html: yuan(
                      this.props.classifyData.reduce(
                        (pre, now) => now.y + pre,
                        0,
                      ),
                    ),
                  }}
                />
              )}
              data={this.props.classifyData}
              valueFormat={val => (
                <span
                  dangerouslySetInnerHTML={{
                    __html: yuan(val),
                  }}
                />
              )}
              height={294}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={14}>
            <Bar
              height={292}
              title={<strong>销售额趋势</strong>}
              data={this.props.orderMoneyData}
            />
          </Col>
        </Row>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {
    classifyData: getClassifySelector(state),
    orderMoneyData: getOrderMoneySelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getClassifyData: params => dispatch(getClassify(params)),
    getOrderMoney: params => dispatch(getOrderMoney(params)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SecondCard);
