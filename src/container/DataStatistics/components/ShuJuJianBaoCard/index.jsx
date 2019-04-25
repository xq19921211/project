/*
 * @Author: LiaoYingLong
 * @Date: 2018-10-15 17:53:15
 * @Last Modified by: LiaoYingLong
 * @Last Modified time: 2018-11-26 19:57:24
 */

import './index.scss';

import { Card, Col, Divider, Row } from 'antd';
import React from 'react';
import { connect } from 'react-redux';

import BuleItem from '../BuleItem';
import CardExtraSelectDay from './CardExtraSelectDay';
import CardExtraSelectMonth from './CardExtraSelectMonth';

class ShuJuJianBaoCard extends React.Component {
  render() {
    /**
     * @param {array} this.props.monthStatistics 当月统计
     * @param {object} this.props.dayStatistics 当日统计
     */
    const { monthStatistics = [], dayStatistics = {} } = this.props;
    return (
      <div className="ShuJuJianBaoCard">
        <Card
          title="数据简报"
          extra={
            <CardExtraSelectMonth
              immediateCheck={this.props.immediateCheck}
              departId={this.props.departId}
            />
          }
          bordered={false}
          style={{ paddingBottom: 0 }}
          className="custom-card mb24 ">
          <div className="list">
            {monthStatistics.length &&
              monthStatistics.map(item => (
                <BuleItem
                  className="item"
                  key={item.label}
                  value={item.value}
                  label={item.label}
                />
              ))}
          </div>
        </Card>
        <Card
          className="custom-card mb24"
          extra={
            <CardExtraSelectDay
              immediateCheck={this.props.immediateCheck}
              departId={this.props.departId}
            />
          }>
          <Row>
            <Col className="divider-after" span={7}>
              <div className="title mb24">人</div>
              <div className="list">
                <BuleItem
                  className="item"
                  value={dayStatistics.onlineUser}
                  label="当日在线保安"
                />
                <BuleItem
                  className="item"
                  value={dayStatistics.prepareWork}
                  label="当日待值班"
                />
                <BuleItem
                  className="item"
                  value={dayStatistics.begingWork}
                  label="当日值班中"
                />
              </div>
            </Col>

            <Col className="divider-after" span={9}>
              <div className="title mb24">事</div>
              <div className="list">
                <BuleItem
                  className="item"
                  value={dayStatistics.sendOrderCount}
                  label="当日派单数"
                />
                <BuleItem
                  className="item"
                  value={dayStatistics.niceOrderCount}
                  label="当日好评数"
                />
                <BuleItem
                  className="item"
                  value={dayStatistics.badOrderCount}
                  label="当日差评数"
                />
                <BuleItem
                  className="item abnormal"
                  value={dayStatistics.exceptionOrderCount}
                  label="当日异常订单"
                />
              </div>
            </Col>

            <Col className="divider-after" span={4}>
              <div className="title mb24">物</div>
              <div className="list">
                <BuleItem
                  className="item"
                  value={dayStatistics.onlinePjCount}
                  label="当日在线项目数"
                />
              </div>
            </Col>

            <Col className="divider-after" span={4}>
              <div className="title mb24">财</div>
              <div className="list">
                <BuleItem
                  className="item"
                  value={dayStatistics.orderTotalPrice}
                  label="当日订单总额"
                />
              </div>
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShuJuJianBaoCard);
