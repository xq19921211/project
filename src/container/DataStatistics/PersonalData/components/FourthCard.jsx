/*
 * @Author: LiaoYingLong
 * @Date: 2018-07-20 14:31:59
 * @Last Modified by: LiaoYingLong
 * @Last Modified time: 2018-11-26 19:53:55
 */

import DataSet from '@antv/data-set';
import { Bar, Pie, yuan } from 'ant-design-pro/lib/Charts';
import { Card, Col, Row, message } from 'antd';
import { Axis, Chart, Geom, Legend, Tooltip } from 'bizcharts';
import numeral from 'numeral';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CardExtra from '../../components/CardExtra';
import * as actions from '../action';
import * as selectors from '../selector';

class FourthCard extends React.Component {
  onStatisticsClick = params => {
    const { type, startDate, endDate } = params;
    const { getOperatorIncome, oprId } = this.props;
    if (!oprId) {
      message.error('请先选择人员');
      return;
    }
    getOperatorIncome({
      ...params,
      oprid: oprId,
    });
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.oprId !== this.props.oprId) {
      this.instance.fetchData();
    }
  }
  getPieData = operatorIncome => {
    return [
      {
        x: '扣款',
        y: operatorIncome.deductionsMoney,
      },
      {
        x: '奖励收入',
        y: operatorIncome.rewardMoney,
      },
      {
        x: '正常收入',
        y: operatorIncome.normalMoney,
      },
    ];
  };
  render() {
    const { operatorIncome } = this.props;
    const pieData = this.getPieData(operatorIncome);

    const { chartData, fields } = this.props.histogramData;
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
        title="收入画像"
        extra={
          <CardExtra
            ref={instance => (this.instance = instance)}
            onStatisticsClick={this.onStatisticsClick}
            immediateCheck={false}
          />
        }
        bordered={false}
        className="custom-card mb24">
        <Row gutter={24}>
          <Col xs={24} sm={24} md={24} lg={12} xl={10}>
            <Pie
              hasLegend
              title="消费金额"
              subTitle="收入总数"
              total={() => <span>{operatorIncome.totalMoney || '-'}</span>}
              data={pieData}
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
            <Chart height={400} data={dv} scale={cols} forceFit>
              <Axis name="日期" />
              <Axis name="统计数据" />
              <Legend />
              <Tooltip crosshairs={{ type: 'y' }} />
              <Geom
                type="interval"
                position="日期*统计数据"
                color="type"
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
    operatorIncome: selectors.getOperatorIncomeSelector(state),
    histogramData: selectors.getOperatorIncomeHistogramDataSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getOperatorIncome: bindActionCreators(actions.getOperatorIncome, dispatch),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FourthCard);
