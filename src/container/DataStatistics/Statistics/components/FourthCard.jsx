/*
 * @Author: LiaoYingLong
 * @Date: 2018-07-20 14:31:59
 * @Last Modified by: LiaoYingLong
 * @Last Modified time: 2018-07-22 15:53:27
 */

import DataSet from '@antv/data-set';
import { Pie } from 'ant-design-pro/lib/Charts';
import { Card, Col, Row } from 'antd';
import { Axis, Chart, Geom, Legend, Tooltip } from 'bizcharts';
import React from 'react';
import { connect } from 'react-redux';

import CardExtra from '../../components/CardExtra';
import { getUserCount, getUserTypeCount } from '../action';
import { getUserTypeCountSelector, getuserCountSelector } from '../selector';
import { formatInteger } from './HeaderCardList';

class FourthCard extends React.Component {
  onStatisticsClick = params => {
    const { type, startDate, endDate } = params;
    const { getUserTypeCount, getUserCount } = this.props;
    getUserTypeCount({ startDate, endDate });
    getUserCount({ type, startDate, endDate });
  };
  render() {
    const { chartData, fields } = this.props.userCount;
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
        extra={<CardExtra onStatisticsClick={this.onStatisticsClick} />}
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
                      this.props.userTypeCount.reduce(
                        (pre, now) => now.y + pre,
                        0,
                      ),
                    ),
                  }}
                />
              )}
              data={this.props.userTypeCount}
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
    userTypeCount: getUserTypeCountSelector(state),
    userCount: getuserCountSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserTypeCount: params => dispatch(getUserTypeCount(params)),
    getUserCount: params => dispatch(getUserCount(params)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FourthCard);
