import { Button, DatePicker } from 'antd';
import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';

import {
  getGoodsStatistisc,
  getPeopleStatistisc,
  getThingStatistisc,
} from '../../Overview/action';

class CardExtraSelectDay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: moment(),
    };
  }
  componentDidMount() {
    if (this.props.immediateCheck) {
      this.fetchData();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.departId !== this.props.departId) {
      this.fetchData();
    }
  }

  onChange = current => {
    this.setState({ current });
  };

  fetchData = () => {
    if (!this.props.immediateCheck && !this.props.departId) {
      message.error('必须先选择事业部');
      return;
    }
    const { current } = this.state;
    const params = {
      startDate: `${current.format('YYYY-MM-DD')} 00:00:00`,
      endDate: `${current.format('YYYY-MM-DD')} 23:59:59`,
      departId: this.props.departId,
    };

    this.props.getPeopleStatistisc(params);
    this.props.getThingStatistisc(params);
    this.props.getGoodsStatistisc(params);
  };
  render() {
    return (
      <div className="extra">
        <DatePicker
          value={this.state.current}
          style={{ marginRight: 10 }}
          allowClear={false}
          onChange={this.onChange}
        />

        <Button type="primary" onClick={this.fetchData}>
          统计
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    getPeopleStatistisc: parmas => dispatch(getPeopleStatistisc(parmas)),
    getThingStatistisc: parmas => dispatch(getThingStatistisc(parmas)),
    getGoodsStatistisc: parmas => dispatch(getGoodsStatistisc(parmas)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CardExtraSelectDay);
