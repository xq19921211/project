/**
 * Created by xu.long on 2018/5/12.
 */
import React from 'react';
import { Layout, Row, Col, Divider } from 'antd';
import { Toolbar } from '../../../../component/Toolbar/Toolbar';
import './style.scss';
import { connect } from 'react-redux';
import { getTenementMemberDetail } from './selector';
import { initTenementMemberDetail } from './action';
const { Content } = Layout;

class TenementMemberDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  //初始化
  componentWillMount() {
    this.props.initTenementMemberDetail({ id: this.props.match.params.id });
  }

  render() {
    const { tenementMemberDetail } = this.props;
    const list = [
      '物业管理',
      {
        label: '物业人员管理',
        to: '/index/tenementMemberManagement',
      },
      {
        label: '物业人员详情',
        to: `/index/tenementMemberDetail/${this.props.match.params.id}`,
      },
    ];
    return (
      <Layout id="tenement_member_detail">
        <Toolbar type={1} list={list} title="物业人员详情" />
        <Content className="content">
          <div className="header_info">
            <img src="./image/default.png" />
            <span>
              <div>{tenementMemberDetail.name}</div>
              <div>
                <span>广州事业部</span>
              </div>
            </span>
          </div>
          <div className="title">基础信息</div>
          <div className="basic_info">
            <Row style={{ marginBottom: '1.5rem' }}>
              <Col span={8}>
                <span>账号名称：</span>
                <span>{tenementMemberDetail.username}</span>
              </Col>
              <Col span={8}>
                <span>账号状态：</span>
                <span>
                  {tenementMemberDetail.status === 0 ? '已停用' : '已启用'}
                </span>
              </Col>
              <Col span={8}>
                <span>性别：</span>
                <span>{tenementMemberDetail.sex === 0 ? '女' : '男'}</span>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <span>创建时间：</span>
                <span>{tenementMemberDetail.createTime}</span>
              </Col>
              <Col span={8}>
                <span>最后更新时间：</span>
                <span>{tenementMemberDetail.updatets}</span>
              </Col>
              <Col span={8}>
                <span>联系电话：</span>
                <span>{tenementMemberDetail.mobile}</span>
              </Col>
            </Row>
          </div>
          <div className="title">所管理项目</div>
          <div className="management_info">
            <Row style={{ marginBottom: '1.5rem' }}>
              <Col span={24}>
                <span>项目名称：</span>
                {!tenementMemberDetail.projects
                  ? ''
                  : tenementMemberDetail.projects.map((item, i) => {
                      if (i === 0) {
                        return <span>{item.pjName}</span>;
                      } else {
                        return <span>、{item.pjName}</span>;
                      }
                    })}
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
    tenementMemberDetail: getTenementMemberDetail(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initTenementMemberDetail: param => {
      dispatch(initTenementMemberDetail(param));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TenementMemberDetail);
