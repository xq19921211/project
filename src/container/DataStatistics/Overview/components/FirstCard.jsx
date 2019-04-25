/*
 * @Author: LiaoYingLong
 * @Date: 2018-10-15 17:53:15
 * @Last Modified by: LiaoYingLong
 * @Last Modified time: 2018-11-05 10:54:48
 */

import React from 'react';
import { connect } from 'react-redux';

import ShuJuJianBaoCard from '../../components/ShuJuJianBaoCard';
import * as selectors from '../selector';

class FirstCard extends React.Component {
  fetchData = params => {
    this.props.getDataPresentation(params);
    this.props.getPeopleStatistisc(params);
    this.props.getThingStatistisc(params);
    this.props.getGoodsStatistisc(params);
  };

  render() {
    const {
      dataPresentation,
      peopleStatistisc,
      thingStatistisc,
      goodsStatistisc,
    } = this.props;
    // 当月统计-数据简报
    const monthStatistics = [
      { label: '当月新增用户', value: dataPresentation.userConut },
      { label: '当月消费金额', value: dataPresentation.consumTotalMoney },
      { label: '当月订单量', value: dataPresentation.orderCount },
      { label: '当月覆盖项目数', value: dataPresentation.pjCount },
      { label: '当月覆盖项目总数', value: dataPresentation.pjTotalCount },
      { label: '当前覆盖率', value: dataPresentation.pjPercent },
    ];
    // 当日统计
    const dayStatistics = {
      onlineUser: peopleStatistisc.onlineUser, //当前在线员工
      prepareWork: peopleStatistisc.prepareWork, //当日待作业
      begingWork: peopleStatistisc.begingWork, //当日作业中

      sendOrderCount: thingStatistisc.sendOrderCount, //当日派单数
      niceOrderCount: thingStatistisc.niceOrderCount, //当日好评数
      badOrderCount: thingStatistisc.badOrderCount, //当日订单差评数
      exceptionOrderCount: thingStatistisc.exceptionOrderCount, //当日异常订单

      onlinePjCount: goodsStatistisc.onlinePjCount, //当日在线项目数
      orderTotalPrice: goodsStatistisc.orderTotalPrice, //当日订单总额
    };
    return (
      <ShuJuJianBaoCard
        monthStatistics={monthStatistics}
        dayStatistics={dayStatistics}
        immediateCheck={this.props.immediateCheck}
        departId={this.props.departId}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    dataPresentation: selectors.getDataPresentationSelector(state),
    peopleStatistisc: selectors.getPeopleStatistiscSelector(state),
    thingStatistisc: selectors.getThingStatistiscSelector(state),
    goodsStatistisc: selectors.getGoodsStatistiscSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FirstCard);
