import { Button, DatePicker } from 'antd';
import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';

import { getDataPresentation } from '../../Overview/action';

class CardExtraSelectDay extends React.Component {
  render() {
    return (
      <div className="extra">
        <DatePicker
          value={this.props.value}
          style={{ marginRight: 10 }}
          allowClear={false}
          onChange={this.props.onChange}
        />

        <Button type="primary" onClick={this.props.fetchData}>
          统计
        </Button>
      </div>
    );
  }
}

export default CardExtraSelectDay;
