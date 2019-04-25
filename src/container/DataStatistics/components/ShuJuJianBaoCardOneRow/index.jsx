/*
 * @Author: LiaoYingLong
 * @Date: 2018-10-15 17:53:15
 * @Last Modified by: LiaoYingLong
 * @Last Modified time: 2018-11-05 10:55:01
 */

import './index.scss';

import { Card, Col, Divider, Row } from 'antd';
import React from 'react';
import { connect } from 'react-redux';

import BuleItem from '../BuleItem';
import CardExtraSelectDay from './CardExtraSelectDay';

class ShuJuJianBaoCardOneRow extends React.Component {
  render() {
    const { list = [] } = this.props;
    return (
      <div className="ShuJuJianBaoCardOneRow">
        <Card
          title="数据简报"
          extra={
            <CardExtraSelectDay
              value={this.props.value}
              onChange={this.props.onChange}
              fetchData={this.props.fetchData}
            />
          }
          bordered={false}
          style={{ paddingBottom: 0 }}
          className="custom-card mb24 ">
          <div className="list">
            {list.length &&
              list.map(item => (
                <BuleItem
                  className="item"
                  key={item.label}
                  value={item.value}
                  label={item.label}
                />
              ))}
          </div>
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
)(ShuJuJianBaoCardOneRow);
