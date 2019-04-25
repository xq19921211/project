/**
 * Created by xu.long on 2018/6/18.
 */
import React from 'react';
import { Layout, Row, Col, Table } from 'antd';
import { Toolbar } from '../../../../component/Toolbar/Toolbar';
import './style.scss';
import { connect } from 'react-redux';
import { getCoverRuleDetail } from './selector';
// import {initCoverRuleDetail} from './action';
import { initBuildTeamDetail } from '../../BuildTeamManagement/AddBuildTeam/action';
import { getBuildTeamDetail } from '../../BuildTeamManagement/AddBuildTeam/selector';
import { initCoverRuleList } from '../RootContainer/action';
import { getCoverRuleList } from '../RootContainer/selector';
const { Content } = Layout;
class CoverRuleDetail extends React.Component {
  constructor(props) {
    super(props);
    this.pageChange = this.pageChange.bind(this);
    this.state = {
      options: {
        current: 1,
        pageSize: 10,
        pageSizeChange: this.pageChange,
        pageSizeOptions: ['10', '20', '100'],
      },
    };
  }
  //初始化
  componentWillMount() {
    // this.props.initCoverRuleDetail({id: this.props.match.params.id});
    this.props.initBuildTeamDetail({ id: this.props.match.params.id });
    this.props.initCoverRuleList({ team_id: this.props.match.params.id });
  }
  pageChange = (current, pageSize) => {
    this.setState(
      Object.assign({}, this.state, {
        options: Object.assign({}, this.state.options, {
          current: current,
          pageSize: pageSize,
        }),
      }),
    );
  };
  render() {
    const { buildTeamDetail, coverRuleList } = this.props;
    const columns = [
      {
        title: '项目名称',
        dataIndex: 'projectName',
        key: 'projectName',
      },
      {
        title: '所属物业',
        dataIndex: 'tenement',
        key: 'tenement',
      },
      {
        title: '所属部门',
        dataIndex: 'department',
        key: 'department',
      },
      {
        title: '项目地址',
        dataIndex: 'projectAddress',
        key: 'projectAddress',
      },
    ];
    const data = coverRuleList.dataSource.map((item, i) => {
      return {
        key: i,
        id: item.org_id,
        projectName: item.org_name,
        tenement: item.company,
        department: item.department,
        projectAddress: item.org_address,
      };
    });
    // const data = [{
    //     key: '1',
    //     actionType: '评价完成',
    //     actionOwner: '汗牙牙',
    //     actionTime: '2017-10-01 12:00:09',
    // },{
    //     key: '2',
    //     actionType: '作业完成',
    //     actionOwner: '周毛毛',
    //     actionTime: '2017-10-01 12:00:09',
    // },{
    //     key: '3',
    //     actionType: '供应商安排作业',
    //     actionOwner: '周毛毛',
    //     actionTime: '2017-10-01 12:00:09',
    // },{
    //     key: '4',
    //     actionType: '提交订单',
    //     actionOwner: '汗牙牙',
    //     actionTime: '2017-10-01 12:00:09',
    // },{
    //     key: '5',
    //     actionType: '创建订单',
    //     actionOwner: '汗牙牙',
    //     actionTime: '2017-10-01 12:00:09',
    // }];
    const list = [
      '保安公司管理',
      {
        label: '覆盖规则',
        to: '/index/coverRuleManagement',
      },
      {
        label: '覆盖规则详情',
        to: `/index/coverRuleDetail/${this.props.match.params.id}`,
      },
    ];
    return (
      <Layout id="cover_rule_detail">
        <Toolbar type={1} list={list} title="覆盖规则详情" />
        <Content className="content">
          <div className="title">保安队信息</div>
          <div className="basic_info">
            <Row style={{ marginBottom: '1.5rem' }}>
              <Col span={8}>
                <span>保安队名称：</span>
                <span>
                  {!buildTeamDetail.team_name ? '' : buildTeamDetail.team_name}
                </span>
              </Col>
              <Col span={8}>
                <span>保安队长：</span>
                <span>
                  {buildTeamDetail.team_leader &&
                  buildTeamDetail.team_leader.length > 0
                    ? buildTeamDetail.team_leader.map((item, i) => {
                        if (i !== 0) {
                          return '、' + item.oprName;
                        } else {
                          return item.oprName;
                        }
                      })
                    : ''}
                </span>
              </Col>
              <Col span={8}>
                <span>保安公司：</span>
                <span>
                  {!buildTeamDetail.sup_name ? '' : buildTeamDetail.sup_name}
                </span>
              </Col>
            </Row>
            <Row>
              <Col>
                <span>备注：</span>
                <span>{buildTeamDetail.note}</span>
              </Col>
            </Row>
          </div>
          <div className="title">覆盖项目</div>
          <div className="provider_info">
            <Table columns={columns} dataSource={data} />
          </div>
        </Content>
      </Layout>
    );
  }
}
const mapStateToProps = state => {
  return {
    // coverRuleDetail: getCoverRuleDetail(state),
    buildTeamDetail: getBuildTeamDetail(state),
    coverRuleList: getCoverRuleList(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // initCoverRuleDetail: (param) => {
    //
    //     dispatch(initCoverRuleDetail(param));
    // },
    initBuildTeamDetail: param => {
      dispatch(initBuildTeamDetail(param));
    },
    initCoverRuleList: param => {
      dispatch(initCoverRuleList(param));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CoverRuleDetail);
