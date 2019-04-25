import './Calendar.scss';

import { Card, Col, Row } from 'antd';
import React from 'react';

import { DATE_TYPE, DAYS } from '../constant';

const padLeftZero = num => ('00' + num).substr(('' + num).length);
class Calendar extends React.Component {
  constructor(props) {
    super(props);
  }
  static defaultProps = {
    currentDay: 1,
    selectDateTypeValue: DATE_TYPE.SAN_SHI_YI.value,
    onDaysChange: () => {},
  };

  selectDay = currentDay => {
    if (currentDay === this.props.currentDay) return;
    this.props.onDaysChange(currentDay);
  };
  getArrangedDay = () => {
    return (this.props.scheduleDetailList || [])
      .filter(item => item.pjTaskList && item.pjTaskList.length)
      .map(item => item.currentDay);
  };
  render() {
    const { selectDateTypeValue, currentDay } = this.props;

    const days = new Array(DAYS[selectDateTypeValue]).fill(0);

    const arrangedDay = this.getArrangedDay();
    return (
      <Card className="Calendar">
        <Row>
          {days.map((_, index) => (
            <Col key={index} span={2} offset={1}>
              <span
                onClick={() => this.selectDay(index + 1)}
                className={`day-item ${
                  index + 1 === currentDay ? 'active' : ''
                } ${arrangedDay.includes(index + 1) ? 'arranged' : ''}`}>
                {padLeftZero(index + 1)}
              </span>
            </Col>
          ))}
        </Row>
      </Card>
    );
  }
}

export default Calendar;
