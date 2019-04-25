/**
 * Created by xu.long on 2018/5/12.
 */
import React from 'react';
import { Layout, Row, Col, Divider } from 'antd';
import { Toolbar } from '../../../../component/Toolbar/Toolbar';
import './style.scss';
import { connect } from 'react-redux';
import { getAccountDetail } from './selector';
import { initAccountDetail } from './action';
import { dateFormat } from '../../../../util/util';
const { Content } = Layout;

class AccountDetail extends React.Component {
  constructor(props) {
    super(props);
  }
  //初始化
  componentWillMount() {
    this.props.initAccountDetail({ id: this.props.match.params.id });
  }
  render() {
    let { accountDetail } = this.props;
    const list = [
      '系统设置',
      {
        label: '账号管理',
        to: '/index/settingManagement',
      },
      {
        label: '账号详情',
        to: `/index/accountDetail/${this.props.match.params.id}`,
      },
    ];
    return (
      <Layout id="account_Detail">
        <Toolbar type={1} list={list} title="账号详情" />
        <Content className="content">
          <div className="title">基础信息</div>
          <div className="basic_info">
            <Row style={{ marginBottom: '1.5rem' }}>
              <Col span={8}>
                <span>账号：</span>
                <span>{accountDetail ? accountDetail.username : ''}</span>
              </Col>
              <Col span={8}>
                <span>姓名：</span>
                <span>{accountDetail ? accountDetail.mgrName : ''}</span>
              </Col>
              <Col span={8}>
                <span>手机号码：</span>
                <span>{accountDetail ? accountDetail.mgrTel : ''}</span>
              </Col>
            </Row>
            <Row style={{ marginBottom: '1.5rem' }}>
              <Col span={8}>
                <span>角色：</span>
                <span>
                  {accountDetail
                    ? accountDetail.roles
                      ? accountDetail.roles.map((item, i) => {
                          if (i !== 0) {
                            return '、' + item.roleName;
                          } else {
                            return item.roleName;
                          }
                        })
                      : ''
                    : ''}
                </span>
              </Col>
              <Col span={8}>
                <span>启用状态：</span>
                <span>
                  {accountDetail
                    ? accountDetail.status === 0
                      ? '已停用'
                      : '已启用'
                    : ''}
                </span>
              </Col>
              <Col span={8}>
                <span>创建时间：</span>
                <span>{accountDetail ? accountDetail.createTime : ''}</span>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <span>最后更新时间：</span>
                <span>{accountDetail ? accountDetail.lastTime : ''}</span>
              </Col>
            </Row>
          </div>
        </Content>
      </Layout>
    );
  }
}
const mapStateToProps = state => {
  return {
    accountDetail: getAccountDetail(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initAccountDetail: param => {
      dispatch(initAccountDetail(param));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccountDetail);
