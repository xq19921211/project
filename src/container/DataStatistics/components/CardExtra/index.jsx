import './index.scss';

import { Button, DatePicker } from 'antd';
import moment from 'moment';
import React from 'react';

const { RangePicker } = DatePicker;
export const TIME_TYPES = {
  DAY: 0,
  MONTH: 1,
  YEAR: 2,
};

/**
 * 获取最近三个月时间段
 */
const getNearlyMonth = () => {
  const format = date => moment(date).format('YYYY-MM-DD');
  const now = new Date();
  const endDate = format(now);
  const preDate = moment(now).subtract(3, 'months');
  const startDate = format(preDate);
  return [startDate, endDate];
};

class CardExtra extends React.Component {
  constructor(props) {
    super(props);
    const [startDate, endDate] = getNearlyMonth();
    this.state = {
      startDate,
      endDate,
      type: TIME_TYPES.MONTH,
    };
  }
  static defaultProps = {
    immediateCheck: true,
  };
  componentWillMount() {
    if (this.props.immediateCheck) {
      this.fetchData();
    }
  }

  fetchData = () => {
    this.props.onStatisticsClick({ ...this.state });
  };

  onTimeTypeChange = type => {
    this.setState({ ...this.state, type });
  };

  onRangePickerChange = (startDate, endDate) => {
    this.setState({ ...this.state, startDate, endDate });
  };

  render() {
    const { startDate, endDate } = this.state;
    const list = [
      { text: '按日', type: TIME_TYPES.DAY },
      { text: '按月', type: TIME_TYPES.MONTH },
      { text: '按年', type: TIME_TYPES.YEAR },
    ];
    return (
      <div className="extra">
        <div className="extra-time-item">
          {list.map(item => (
            <a
              className={this.state.type === item.type ? 'active' : ''}
              onClick={() => this.onTimeTypeChange(item.type)}
              key={item.type}>
              {item.text}
            </a>
          ))}
        </div>
        <RangePicker
          value={[moment(startDate), moment(endDate)]}
          allowClear={false}
          style={{ width: 300, marginRight: 10 }}
          onChange={(_, [startDate, endDate]) =>
            this.onRangePickerChange(startDate, endDate)
          }
        />
        <Button type="primary" onClick={this.fetchData}>
          统计
        </Button>
      </div>
    );
  }
}

export default CardExtra;
