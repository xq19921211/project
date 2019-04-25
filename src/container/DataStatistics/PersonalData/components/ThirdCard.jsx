/*
 * @Author: LiaoYingLong
 * @Date: 2018-07-20 14:31:59
 * @Last Modified by: LiaoYingLong
 * @Last Modified time: 2018-10-25 11:14:40
 */

import DataSet from '@antv/data-set';
import { Bar, Pie, yuan } from 'ant-design-pro/lib/Charts';
import { Card, Col, Row } from 'antd';
import { Axis, Chart, Geom, Legend, Tooltip } from 'bizcharts';
import numeral from 'numeral';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CardExtra from '../../components/CardExtra';
import * as actions from '../action';
import * as selectors from '../selector';

class ThirdCard extends React.Component {
  onStatisticsClick = params => {
    const { type, startDate, endDate } = params;
    const { getOperatorAnalysis, oprId } = this.props;
    if (!oprId) {
      message.error('请先选择人员');
      return;
    }
    getOperatorAnalysis({
      ...params,
      oprid: oprId,
    });
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.oprId !== this.props.oprId) {
      this.instance.fetchData();
    }
  }
  getPieData = operatorAnalysis => {
    return [
      {
        x: '异常订单',
        y: operatorAnalysis.abnormalOrderNum,
      },
      {
        x: '差评订单',
        y: operatorAnalysis.negativeComment,
      },
      {
        x: '好评订单',
        y: operatorAnalysis.niceComment,
      },
      {
        x: '未评价订单',
        y: operatorAnalysis.noComment,
      },
      {
        x: '其他',
        y: operatorAnalysis.other,
      },
    ];
  };
  render() {
    const { operatorAnalysis } = this.props;
    const pieData = this.getPieData(operatorAnalysis);

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
        title="订单画像"
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
              subTitle="订单总数"
              total={() => <span>{operatorAnalysis.total || '-'}</span>}
              data={pieData}
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
    operatorAnalysis: selectors.getOperatorAnalysisSelector(state),
    histogramData: selectors.getOperatorAnalysisHistogramDataSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getOperatorAnalysis: bindActionCreators(
      actions.getOperatorAnalysis,
      dispatch,
    ),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ThirdCard);
