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
import { getCoverCount } from '../action';
import { getCoverCountSelector } from '../selector';

class FifthCard extends React.Component {
  onStatisticsClick = params => {
    this.props.getCoverCount(params);
  };
  render() {
    const { coverCount } = this.props;
    return (
      <Card
        title="覆盖规则趋势统计"
        extra={<CardExtra onStatisticsClick={this.onStatisticsClick} />}
        bordered={false}
        className="custom-card">
        {coverCount.length ? (
          <Chart
            height={300}
            padding={[60, 80, 40, 40]}
            data={coverCount}
            scale={{
              x: { min: coverCount[0].x },
              y: { range: [0, 1], alias: '覆盖项目数量（个）' },
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
    coverCount: getCoverCountSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCoverCount: parmas => dispatch(getCoverCount(parmas)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FifthCard);
