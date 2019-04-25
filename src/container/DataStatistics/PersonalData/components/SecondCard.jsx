/*
 * @Author: LiaoYingLong
 * @Date: 2018-10-15 17:53:15
 * @Last Modified by: LiaoYingLong
 * @Last Modified time: 2018-11-26 19:57:13
 */

import { Card, Col, Divider, Row, message } from 'antd';
import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ShuJuJianBaoCardOneRow from '../../components/ShuJuJianBaoCardOneRow';
import * as actions from '../action';
import * as selectors from '../selector';

class SecondCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: moment(),
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.oprId !== this.props.oprId) {
      this.fetchData();
    }
  }

  fetchData = () => {
    if (!this.props.oprId) {
      message.error('请先选择人员');
      return;
    }

    this.props.getOperatorAllDataReport({
      startDate: `${this.state.value.format('YYYY-MM-DD')} 00:00:00`,
      endDate: `${this.state.value.format('YYYY-MM-DD')} 23:59:59`,
      oprid: this.props.oprId,
    });
  };
  render() {
    const { operatorAllDataReport } = this.props;
    const arr = [
      { label: '当日接单数', value: operatorAllDataReport.orderNum },
      {
        label: '当日异常订单数',
        value: operatorAllDataReport.abnormalOrderNum,
        type: 'abnormal',
      },
      { label: '当日好评数', value: operatorAllDataReport.niceCommentNum },
      { label: '当日差评数', value: operatorAllDataReport.negativeComment },
      {
        label: '当日工作时长（小时）',
        value: operatorAllDataReport.jobTotalTime,
      },
      { label: '当日作业中', value: operatorAllDataReport.onDuty },
      { label: '当日待作业', value: operatorAllDataReport.waitDuty },
      { label: '当日订单金额', value: operatorAllDataReport.totalMoney },
    ];
    return (
      <ShuJuJianBaoCardOneRow
        list={arr}
        value={this.state.value}
        onChange={value => this.setState({ value })}
        fetchData={this.fetchData}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    operatorAllDataReport: selectors.getOperatorAllDataReportSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getOperatorAllDataReport: bindActionCreators(
      actions.getOperatorAllDataReport,
      dispatch,
    ),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SecondCard);
