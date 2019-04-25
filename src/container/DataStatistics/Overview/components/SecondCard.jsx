/*
 * @Author: LiaoYingLong
 * @Date: 2018-07-20 14:31:59
 * @Last Modified by: LiaoYingLong
 * @Last Modified time: 2018-10-24 11:49:50
 */

import { Bar, Pie, yuan } from 'ant-design-pro/lib/Charts';
import { Card, Col, Row } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CardExtra from '../../components/CardExtra';
import * as actions from '../action';
import * as selectors from '../selector';

class SecondCard extends React.Component {
  onStatisticsClick = params => {
    const { startDate, endDate } = params;
    const { departId, immediateCheck } = this.props;
    // 非初始化加载 && 没有选择事业部
    if (!immediateCheck && !departId) {
      message.error('请先选择事业部');
      return;
    }
    this.props.getOrderMoneyByPieChart({
      startDate,
      endDate,
      departId,
    });
    this.props.getOrderMoneyData({ ...params, departId });
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.departId !== this.props.departId) {
      this.instance.fetchData();
    }
  }
  render() {
    return (
      <Card
        title="消费统计分析"
        extra={
          <CardExtra
            ref={instance => (this.instance = instance)}
            immediateCheck={this.props.immediateCheck}
            onStatisticsClick={this.onStatisticsClick}
          />
        }
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
                      this.props.orderMoneyByPieChart.reduce(
                        (pre, now) => now.y + pre,
                        0,
                      ),
                    ),
                  }}
                />
              )}
              data={this.props.orderMoneyByPieChart}
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
    orderMoneyByPieChart: selectors.getOrderMoneyByPieChartSelector(state),
    orderMoneyData: selectors.getOrderMoneyDataSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getOrderMoneyByPieChart: bindActionCreators(
      actions.getOrderMoneyByPieChart,
      dispatch,
    ),
    getOrderMoneyData: bindActionCreators(actions.getOrderMoneyData, dispatch),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SecondCard);
