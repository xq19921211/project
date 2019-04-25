/*
 * @Author: LiaoYingLong
 * @Date: 2018-07-20 14:32:04
 * @Last Modified by: LiaoYingLong
 * @Last Modified time: 2018-07-21 21:06:31
 */

import { ChartCard, Field } from 'ant-design-pro/lib/Charts';
import { Col, Icon, Row, Tooltip } from 'antd';

import React from 'react';
import { connect } from 'react-redux';
import { getMonthStatistics } from '../selector';
import { getMonthStatisticsRelated } from '../action';
import numeral from 'numeral';

/**
 * 12356413 =》  12,356,413
 */
export const formatInteger = number => numeral(number).format('0,0');
export const formatDecimal = number => numeral(number).format('0,0.00');

const colResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  className: 'mb24',
};

const chartCardProps = {
  contentHeight: 48,
};

const TooltipTitle = ({ tipInfo }) => (
  <Tooltip title={tipInfo}>
    <Icon type="info-circle-o" />
  </Tooltip>
);

class HeaderCardList extends React.Component {
  componentWillMount() {
    this.props.getMonthData();
  }
  render() {
    const { monthData } = this.props;

    if (!monthData) return null;

    // 覆盖率
    const Coverage = (monthData.projectCount / monthData.projectTotal) * 100;
    return (
      <Row gutter={24}>
        <Col {...colResponsiveProps}>
          <ChartCard
            {...chartCardProps}
            action={
              <TooltipTitle tipInfo="统计系统中本月新增的素有人员信息，包括供应商管理员、施工队人员、物业人员以及系统后台管理员" />
            }
            title="本月新增用户数（个）"
            total={formatInteger(monthData.userCount)}
            footer={
              <Field
                label="总用户数："
                value={formatInteger(monthData.userTotal)}
              />
            }
          />
        </Col>
        <Col {...colResponsiveProps}>
          <ChartCard
            {...chartCardProps}
            action={
              <TooltipTitle tipInfo="统计状态为“已完成”，且完成时间在本月内的订单金额总和" />
            }
            title="本月消费金额（元）"
            total={formatDecimal(monthData.orderMoney)}
            footer={
              <Field
                label="总消费金额："
                value={formatDecimal(monthData.orderMoneyTotal)}
              />
            }
          />
        </Col>
        <Col {...colResponsiveProps}>
          <ChartCard
            {...chartCardProps}
            action={
              <TooltipTitle tipInfo="统计状态为“已完成”，且完成时间在本月内的订单总数" />
            }
            title="本月订单量（笔）"
            total={formatInteger(monthData.orderCount)}
            footer={
              <Field
                label="总订单量："
                value={formatInteger(monthData.orderTotal)}
              />
            }
          />
        </Col>
        <Col {...colResponsiveProps}>
          <ChartCard
            {...chartCardProps}
            action={
              <TooltipTitle tipInfo="统计已经被施工队覆盖的项目除以总项目数量，从而得到覆盖率" />
            }
            title="覆盖率"
            total={
              <div>
                {Math.floor(Coverage)}%
                <span className="total-item-tips">
                  （ 覆盖项目：
                  {formatInteger(monthData.projectCount)} ）
                </span>
              </div>
            }
            footer={
              <Field
                label="总项目数（个）："
                value={formatInteger(monthData.projectTotal)}
              />
            }
          />
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => {
  return {
    monthData: getMonthStatistics(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getMonthData: () => dispatch(getMonthStatisticsRelated()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HeaderCardList);
