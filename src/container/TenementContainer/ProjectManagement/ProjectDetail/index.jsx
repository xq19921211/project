/**
 * Created by xu.long on 2018/5/12.
 */

import './style.scss';

import { Col, Layout, Pagination, Row, Table, TimePicker } from 'antd';
import { getAreaProList, getProjectDetail } from './selector';
import { initAreProjectList, initProjectDetail } from './action';

import React from 'react';
import { Toolbar } from '../../../../component/Toolbar/Toolbar';
import { connect } from 'react-redux';
import moment from 'moment';

const { Content } = Layout; 
const gangWeiColumns = [
    {
      title: '岗位名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '岗位属性',
      dataIndex: 'catName',
      key: 'catName',
    },
    {
      title: '班次属性',
      dataIndex: 'type',
      key: 'type',
      render: (text,record,index) =>{
        return(
          <div>
            <span>
              {text== 1 ? "白班" : text == 2 ? '中班' : '晚班'} 
            </span>
          </div>
        )
      }
    },
    {
      title: '岗位时间',
      dataIndex: 'startTime',
      key: 'startTime',
      render: (text,record,index) =>{
        return(
          <div>
            <TimePicker format={'HH:mm'} disabled={true} defaultValue={moment(record.startTime)} />-
            <TimePicker format={'HH:mm'} disabled={true} defaultValue={moment(record.endTime)} />
          </div>
        )
      }
    },
    {
      title: '每月上班天数',
      dataIndex: 'workDay',
      key: 'workDay',
    },
];
const guigeColumns = [
    {
      title: '规格名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '最小单位',
      dataIndex: 'unit',
      key: 'unit',
    },
    {
      title: '岗位单价（元）',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '分配比例',
      dataIndex: 'platformRate',
      key: 'platformRate',
      render: (text,record,index) =>{
        return(
          <div>
            <p>平台比例{record.platformRate}%</p>
            <p>供应商比例{record.supplierRate}%</p>
            <p>员工比例{record.operatorRate}%</p>
          </div>
        )
      }
    },
    {
      title: '打卡频次',
      dataIndex: 'signFrequency',
      key: 'signFrequency',
      render: (text,record,index) =>{
        return(
          <div>
            <span>每隔 {text}小时/次</span>
          </div>
        )
      }
    },
];
class ProjectDetail extends React.Component {
  constructor(props) {
    super(props);
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
    this.props.initProjectDetail({ id: this.props.match.params.id });
    this.props.initAreProjectList({
      project: this.props.match.params.id,
      current: this.state.options.current,
      pageSize: this.state.options.pageSize,
    });
  }
  render() {
    const { projectDetail, areaProList, initAreProjectList } = this.props;
    const list = [
      '物业管理',
      {
        label: '项目管理',
        to: '/index/projectManagement',
      },
      {
        label: '项目详情',
        to: `/index/projectDetail/${this.props.match.params.id}`,
      },
    ];
    return (
      <Layout id="project_detail">
        <Toolbar type={1} list={list} title="项目详情" />
        <Content className="content">
          <div className="title">基础信息</div>
          <div className="basic_info">
            <Row style={{ marginBottom: '1.5rem' }}>
              <Col span={8}>
                <span>项目名称：</span>
                <span>{projectDetail.pjName}</span>
              </Col>
              <Col span={8}>
                <span>所属事业部：</span>
                <span>深圳事业部</span>
              </Col>
              <Col span={8}>
                <span>所属大区：</span>
                <span>华南大区</span>
              </Col>
            </Row>
            <Row style={{ marginBottom: '1.5rem' }}>
              <Col span={8}>
                <span>项目地址：</span>
                <span>{projectDetail.pjAddress}</span>
              </Col>
              <Col span={8}>
                <span>创建人：</span>
                <span>{projectDetail.creatorName}</span>
              </Col>
              <Col span={8}>
                <span>创建时间：</span>
                <span>{projectDetail.createTime}</span>
              </Col>
            </Row>
            <Row>
            <Col span={8}>
                <span>合同金额：</span>
                <span>{projectDetail.contractMoney}</span>
              </Col>
              <Col span={8}>
                <span>饭票余额：</span>
                <span>{projectDetail.ticketLimit}</span>
              </Col>
              <Col span={8}>
                <span>最后更新时间：</span>
                <span>{projectDetail.updateTime}</span>
              </Col>
            </Row>
          </div>
          <div className="title">项目区域数据</div>
          <RegionDataCustomTable
            options={this.state.options}
            areaProList={areaProList}
            id={this.props.match.params.id}
            initAreProjectList={initAreProjectList}
          />
          <div className="title" style={{ marginTop: '1.5rem' }}>项目岗位信息</div>
          <Table columns={gangWeiColumns} dataSource={projectDetail.pjPostList} pagination={false} />
          <div className="title" style={{ marginTop: '1.5rem' }}>项目规格信息</div>
          <Table columns={guigeColumns} dataSource={projectDetail.pjFormatList} pagination={false} />
          {/*<div className="title">项目物业管理人员</div>*/}
          {/*<TenementMemberCustomTable/>*/}
        </Content>
      </Layout>
    );
  }
}
const mapStateToProps = state => {
  return {
    projectDetail: getProjectDetail(state),
    areaProList: getAreaProList(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initProjectDetail: param => {
      dispatch(initProjectDetail(param));
    },
    initAreProjectList: param => {
      dispatch(initAreProjectList(param));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectDetail);
class RegionDataCustomTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const columns = [
      {
        title: '区域名称',
        dataIndex: 'regionName',
        key: 'regionName',
      },
      {
        title: '数量',
        dataIndex: 'count',
        key: 'count',
      },
      {
        title: '计量单位',
        dataIndex: 'unit',
        key: 'unit',
      },
      {
        title: '区域备注',
        dataIndex: 'regionRemark',
        key: 'regionRemark',
      },
    ];
    const { areaProList } = this.props;
    const data = areaProList.dataSource.map((item, i) => {
      return {
        key: i,
        regionName: item.name,
        count: item.count,
        unit: item.unit,
        regionRemark: item.note,
      };
    });
    // const data = [{
    //     key: '1',
    //     regionName: '南门外广场',
    //     amount: '1800',
    //     unit: '平米',
    //     regionRemark: '从南门到复兴路，东至栅栏，西至停车场'
    // }, {
    //     key: '2',
    //     regionName: '南门外广场',
    //     amount: '1800',
    //     unit: '平米',
    //     regionRemark: '从南门到复兴路，东至栅栏，西至停车场'
    // }, {
    //     key: '3',
    //     regionName: '南门外广场',
    //     amount: '1800',
    //     unit: '平米',
    //     regionRemark: '从南门到复兴路，东至栅栏，西至停车场'
    // }, {
    //     key: '4',
    //     regionName: '南门外广场',
    //     amount: '1800',
    //     unit: '平米',
    //     regionRemark: '从南门到复兴路，东至栅栏，西至停车场'
    // }, {
    //     key: '5',
    //     regionName: '南门外广场',
    //     amount: '1800',
    //     unit: '平米',
    //     regionRemark: '从南门到复兴路，东至栅栏，西至停车场'
    // }];
    const options = {
      defaultPageSize: this.props.options.pageSize,
      pageSizeOptions: this.props.options.pageSizeOptions,
      total: areaProList.total,
      showSizeChanger: true,
      showQuickJumper: true,
      onChange: (page, pageSize) => {
        console.log(
          '页码改变的回调，参数是改变后的页码: ' +
            page +
            ',及每页条数: ' +
            pageSize,
        );
        this.props.initAreProjectList({
          id: this.props.id,
          current: page,
          pageSize: pageSize,
        });
      },
      onShowSizeChange: (current, size) => {
        this.props.initAreProjectList({
          id: this.props.id,
          current: current,
          pageSize: size,
        });
      },
    };
    return (
      <div>
        <Table columns={columns} dataSource={data} pagination={false} />
        <Pagination
          style={{
            float: 'right',
            marginTop: '2rem',
          }}
          {...options}
        />
      </div>
    );
  }
}
class TenementMemberCustomTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const columns = [
      {
        title: '账号',
        dataIndex: 'account',
        key: 'account',
      },
      {
        title: '真实姓名',
        dataIndex: 'realName',
        key: 'realName',
      },
      {
        title: '手机号码',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
      },
      {
        title: '账号状态',
        dataIndex: 'accountStatus',
        key: 'accountStatus',
      },
    ];

    const data = [
      {
        key: '1',
        account: 'zhangsan',
        realName: '张三',
        phoneNumber: '18620008330',
        accountStatus: '已启用',
      },
      {
        key: '2',
        account: 'zhangsan',
        realName: '张三',
        phoneNumber: '18620008330',
        accountStatus: '已启用',
      },
      {
        key: '3',
        account: 'zhangsan',
        realName: '张三',
        phoneNumber: '18620008330',
        accountStatus: '已启用',
      },
      {
        key: '4',
        account: 'zhangsan',
        realName: '张三',
        phoneNumber: '18620008330',
        accountStatus: '已启用',
      },
    ];
    const options = {
      defaultPageSize: 4,
      pageSizeOptions: ['4', '5', '6'],
      total: 40,
      showSizeChanger: true,
      showQuickJumper: true,
      onChange: (page, pageSize) => {
        console.log(
          '页码改变的回调，参数是改变后的页码: ' +
            page +
            ',及每页条数: ' +
            pageSize,
        );
      },
      onShowSizeChange: (current, size) => {},
    };
    return (
      <div>
        <Table columns={columns} dataSource={data} pagination={false} />
        <Pagination
          style={{
            float: 'right',
            marginTop: '2rem',
          }}
          {...options}
        />
      </div>
    );
  }
}
