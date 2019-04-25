import { Card } from 'antd';
import {
  Axis,
  Chart,
  Geom,
  Legend,
  Tooltip as TooltipFromBizcharts,
} from 'bizcharts';
import React from 'react';
import { connect } from 'react-redux';

import CardExtra from '../../components/CardExtra';
import { getOrderCount } from '../action';
import { getOrderCountSelector } from '../selector';

class ThirdCard extends React.Component {
  onStatisticsClick = params => {
    this.props.getOrderCount(params);
  };
  render() {
    const { orderCountData } = this.props;
    return (
      <Card
        title="订单趋势统计"
        extra={<CardExtra onStatisticsClick={this.onStatisticsClick} />}
        bordered={false}
        className="custom-card mb24">
        {orderCountData.length ? (
          <Chart
            height={300}
            padding={[60, 80, 40, 40]}
            data={orderCountData}
            scale={{
              x: { min: orderCountData[0].x },
              y: { range: [0, 1], alias: '订单数量（笔）' },
            }}
            forceFit>
            <Axis name="x" />
            <Axis name="y" />
            <TooltipFromBizcharts crosshairs={{ type: 'y' }} />
            <Legend name="x" position="top" />
            <Geom type="line" position="x*y" size={2} color="blue" />
          </Chart>
        ) : null}
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {
    orderCountData: getOrderCountSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getOrderCount: parmas => dispatch(getOrderCount(parmas)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ThirdCard);
