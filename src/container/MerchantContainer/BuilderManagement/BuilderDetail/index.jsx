/**
 * Created by xu.long on 2018/6/18.
 */
import React from 'react';
import { Layout, Row, Col, Divider } from 'antd';
import { Toolbar } from '../../../../component/Toolbar/Toolbar';
import './style.scss';
import { connect } from 'react-redux';
import { getBuilderDetail } from './selector';
import { initBuilderDetail } from './action';
const { Content } = Layout;

class BuilderDetail extends React.Component {
  constructor(props) {
    super(props);
  }
  //初始化
  componentWillMount() {
    this.props.initBuilderDetail({ id: this.props.match.params.id });
  }
  render() {
    const { builderDetail } = this.props;
    const list = [
      '保安公司管理',
      {
        label: '保安队人员管理',
        to: '/index/builderManagement',
      },
      {
        label: '保安队人员详情',
        to: `/index/builderDetail/${this.props.match.params.id}`,
      },
    ];
    return (
      <Layout id="builder_detail">
        <Toolbar type={1} list={list} title="保安队人员详情" />
        <Content className="content">
          <div className="header_info">
            <img src="./image/default.png" />
            <span>
              <span>{builderDetail ? builderDetail.oprName : ''}</span>
              <div>
                <span>{builderDetail ? builderDetail.teamName : ''}</span>
                <Divider type="vertical" />
                <span>
                  {builderDetail
                    ? builderDetail.isLeader === 1
                      ? '保安队长'
                      : '保安队人员'
                    : ''}
                </span>
              </div>
            </span>
          </div>
          <div className="title">基础信息</div>
          <div className="basic_info">
            <Row style={{ marginBottom: '1.5rem' }}>
              <Col span={8}>
                <span>用户名称：</span>
                <span>{builderDetail ? builderDetail.username : ''}</span>
              </Col>
              <Col span={8}>
                <span>真实姓名：</span>
                <span>{builderDetail ? builderDetail.oprName : ''}</span>
              </Col>
              <Col span={8}>
                <span>性别：</span>
                <span>
                  {!builderDetail ? '' : builderDetail.sex === 0 ? '女' : '男'}
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
                <span>{builderDetail ? builderDetail.oprTel : ''}</span>
              </Col>
              {/*<Col span={8}>*/}
              {/*<span>电子邮箱：</span>*/}
              {/*<span>{builderDetail.email}</span>*/}
              {/*</Col>*/}
              {/*<Col span={8}>*/}
              {/*<span>联系地址：</span>*/}
              {/*<span>无</span>*/}
              {/*</Col>*/}
            </Row>
          </div>
        </Content>
      </Layout>
    );
  }
}
const mapStateToProps = state => {
  return {
    builderDetail: getBuilderDetail(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initBuilderDetail: param => {
      dispatch(initBuilderDetail(param));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BuilderDetail);
