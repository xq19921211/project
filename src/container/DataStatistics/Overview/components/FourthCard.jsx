/*
 * @Author: LiaoYingLong
 * @Date: 2018-07-20 14:31:59
 * @Last Modified by: LiaoYingLong
 * @Last Modified time: 2018-10-24 11:56:04
 */

import DataSet from '@antv/data-set';
import { Pie } from 'ant-design-pro/lib/Charts';
import { Card, Col, Row } from 'antd';
import { Axis, Chart, Geom, Legend, Tooltip } from 'bizcharts';
import numeral from 'numeral';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CardExtra from '../../components/CardExtra';
import * as actions from '../action';
import * as selectors from '../selector';

export const formatInteger = number => numeral(number).format('0,0');

class FourthCard extends React.Component {
  onStatisticsClick = params => {
    const { type, startDate, endDate } = params;
    const { departId, immediateCheck } = this.props;
    // 非初始化加载 && 没有选择事业部
    if (!immediateCheck && !departId) {
      message.error('请先选择事业部');
      return;
    }
    this.props.getUserCountDataByPieChart({ startDate, endDate, departId });
    this.props.getUserCountData({ ...params, departId });
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.departId !== this.props.departId) {
      this.instance.fetchData();
    }
  }
  render() {
    const { chartData, fields } = this.props.userCountData;
    const ds = new DataSet();
    const dv = ds.createView().source(chartData);
    dv.transform({
      type: 'fold',
      fields, // 展开字段集
      key: '日期', // key字段
      value: '统计数据', // value字段
    });
    const cols = {
      日期: { tickInterval: 20, type: 'cat' },
    };
    return (
      <Card
        title="用户数据统计"
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
              title="用户数"
              subTitle="用户数（人）"
              total={() => (
                <span
                  dangerouslySetInnerHTML={{
                    __html: formatInteger(
                      this.props.userCountDataByPieChart.reduce(
                        (pre, now) => now.y + pre,
                        0,
                      ),
                    ),
                  }}
                />
              )}
              data={this.props.userCountDataByPieChart}
              valueFormat={val => (
                <span
                  dangerouslySetInnerHTML={{
                    __html: val,
                  }}
                />
              )}
              height={294}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={14}>
            <Chart height={400} data={dv} scale={cols} forceFit>
              <Axis name="日期" />
              <Axis name="统计数据" />
              <Legend />
              <Tooltip crosshairs={{ type: 'y' }} />
              <Geom
                type="interval"
                position="日期*统计数据"
                color="userType"
                adjust={[{ type: 'dodge', marginRatio: 1 / 16 }]}
              />
            </Chart>
          </Col>
        </Row>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {
    userCountDataByPieChart: selectors.getUserCountDataByPieChartSelector(
      state,
    ),
    userCountData: selectors.getUserCountDataSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserCountDataByPieChart: bindActionCreators(
      actions.getUserCountDataByPieChart,
      dispatch,
    ),
    getUserCountData: bindActionCreators(actions.getUserCountData, dispatch),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FourthCard);
