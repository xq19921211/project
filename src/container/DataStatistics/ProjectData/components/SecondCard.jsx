/*
 * @Author: LiaoYingLong
 * @Date: 2018-10-15 17:53:15
 * @Last Modified by: LiaoYingLong
 * @Last Modified time: 2018-11-26 19:57:01
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
    if (prevProps.projectId !== this.props.projectId) {
      this.fetchData();
    }
  }
  fetchData = () => {
    if (!this.props.projectId) {
      message.error('请先选择项目');
      return;
    }
    this.props.getProjectData({
      startDate: `${this.state.value.format('YYYY-MM-DD')} 00:00:00`,
      endDate: `${this.state.value.format('YYYY-MM-DD')} 23:59:59`,
      projectId: this.props.projectId,
    });
  };
  render() {
    const { projectData } = this.props;
    const arr = [
      { label: '当日派单数', value: projectData.pendingOrderCount },
      {
        label: '当日异常订单数',
        value: projectData.abnormalOrderCount,
        type: 'abnormal',
      },
      { label: '当日好评数', value: projectData.goodEvaluateCount },
      { label: '当日差评数', value: projectData.badEvaluateCount },
      { label: '当日在线人数', value: projectData.onlineCount },
      { label: '当日作业中', value: projectData.workingCount },
      { label: '当日待作业', value: projectData.pendingWorkCount },
      { label: '当日订单金额', value: projectData.orderAmount },
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
    projectData: selectors.getProjectDataSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProjectData: bindActionCreators(actions.getProjectData, dispatch),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SecondCard);
