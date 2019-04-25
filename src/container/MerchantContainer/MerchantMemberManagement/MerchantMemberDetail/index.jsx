/**
 * Created by xu.long on 2018/5/10.
 */
import React from 'react';
import { Layout, Row, Col, Divider } from 'antd';
import { Toolbar } from '../../../../component/Toolbar/Toolbar';
import './style.scss';
import { connect } from 'react-redux';
import { getMerchantMemberDetail } from './selector';
import { initMerchantMemberDetail } from './action';
const { Content } = Layout;

class MerchantMemberDetail extends React.Component {
  constructor(props) {
    super(props);
  }
  //初始化
  componentWillMount() {
    this.props.initMerchantMemberDetail({ id: this.props.match.params.id });
  }
  render() {
    const { merchantMemberDetail } = this.props;
    const list = [
      '保安公司管理',
      {
        label: '保安公司人员管理',
        to: '/index/merchantMemberManagement',
      },
      {
        label: '保安公司管理员详情',
        to: `/index/merchantMemberDetail/${this.props.match.params.id}`,
      },
    ];
    return (
      <Layout id="merchant_member_detail">
        <Toolbar type={1} list={list} title="保安公司管理员详情" />
        <Content className="content">
          <div className="header_info">
            <img src="./image/default.png" />
            <span>
              <div>
                {!merchantMemberDetail.realname
                  ? '无'
                  : merchantMemberDetail.realname}
              </div>
              <div>
                <span>
                  {!merchantMemberDetail.supName
                    ? '无'
                    : merchantMemberDetail.supName}
                </span>
                <Divider type="vertical" />
                <span>
                  {!merchantMemberDetail.job ? '无' : merchantMemberDetail.job}
                </span>
              </div>
            </span>
          </div>
          <div className="title">基础信息</div>
          <div className="basic_info">
            <Row style={{ marginBottom: '1.5rem' }}>
              <Col span={8}>
                <span>用户名称：</span>
                <span>
                  {!merchantMemberDetail.username
                    ? '无'
                    : merchantMemberDetail.username}
                </span>
              </Col>
              <Col span={8}>
                <span>真实姓名：</span>
                <span>
                  {!merchantMemberDetail.realname
                    ? '无'
                    : merchantMemberDetail.realname}
                </span>
              </Col>
              <Col span={8}>
                <span>性别：</span>
                <span>
                  {!merchantMemberDetail.sex
                    ? '无'
                    : merchantMemberDetail.sex === 0
                      ? '女'
                      : '男'}
                </span>
              </Col>
            </Row>
            {/*<Row>*/}
            {/*<Col span={24}>*/}
            {/*<span>身份证号码：</span>*/}
            {/*<span>无</span>*/}
            {/*</Col>*/}
            {/*</Row>*/}
          </div>
          <div className="title">联系方式</div>
          <div className="contact_info">
            <Row style={{ marginBottom: '1.5rem' }}>
              <Col span={8}>
                <span>联系电话：</span>
                <span>
                  {!merchantMemberDetail.mobile
                    ? '无'
                    : merchantMemberDetail.mobile}
                </span>
              </Col>
              <Col span={8}>
                <span>电子邮箱：</span>
                <span>
                  {!merchantMemberDetail.email
                    ? '无'
                    : merchantMemberDetail.email}
                </span>
              </Col>
              <Col span={8}>
                <span>联系地址：</span>
                <span>
                  {!merchantMemberDetail.address
                    ? '无'
                    : merchantMemberDetail.address}
                </span>
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
    merchantMemberDetail: getMerchantMemberDetail(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initMerchantMemberDetail: param => {
      dispatch(initMerchantMemberDetail(param));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MerchantMemberDetail);
