/**
 * Created by xu.long on 2018/4/27.
 */

import './style.scss';

import { Input, Layout, Pagination, Table, Tabs } from 'antd';
import { init, initCommodityDetail } from './action';

import React from 'react';
import { Toolbar } from '../../../../component/Toolbar/Toolbar';
import { connect } from 'react-redux';
import { getCommodityDetail } from './selector';

const TabPane = Tabs.TabPane;
const Search = Input.Search;
class CommodityDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  //初始化
  componentWillMount() {
    this.props.initCommodityDetail({
      id: this.props.match.params.id,
      from: 'commodityDetail',
    });
  }

  componentWillUnmount() {
    this.props.init();
  }

  callback = key => {
    console.log(key);
  };

  render() {
    const { commodityDetail } = this.props;
    const list = [
      '商品管理',
      {
        label: '商品管理',
        to: '/index/commodityManagement',
      },
      {
        label: '商品详情',
        to: `/index/commodityDetail/${this.props.match.params.id}`,
      },
    ];
    return (
      <Layout id="commodity_detail">
        <Toolbar data={commodityDetail} type={2} list={list} title="列表搜索" />
        <Tabs
          style={{ backgroundColor: '#ffffff' }}
          defaultActiveKey="1"
          onChange={this.callback}>
          <TabPane tab="图片介绍" key="1">
            <PictureIntro imgList={commodityDetail.pics} />
          </TabPane>
          <TabPane tab="服务介绍" key="2">
            <ServiceIntro info={commodityDetail.detail} />
          </TabPane>
          {/*<TabPane tab="订单记录" key="3">*/}
          {/*<OrderRecordIntro />*/}
          {/*</TabPane>*/}
          {/*<TabPane tab="评价" key="4">*/}
          {/*<EvaluateIntro />*/}
          {/*</TabPane>*/}
        </Tabs>
      </Layout>
    );
  }
}
const mapStateToProps = state => {
  return {
    commodityDetail: getCommodityDetail(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initCommodityDetail: param => {
      dispatch(initCommodityDetail(param));
    },
    init: () => {
      dispatch(init());
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommodityDetail);

class PictureIntro extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { imgList } = this.props;
    const srcList = !imgList ? [] : imgList;
    const content = srcList.map((item, i) => {
      return (
        <img
          key={i}
          style={{ width: '128rem' }}
          src={!item ? './image/default.png' : item.filepath}
        />
      );
    });
    return (
      <div className="content">
        {/*<div className="title">图片介绍</div>*/}
        {content}
      </div>
    );
  }
}
class ServiceIntro extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="content">
        {/*<div className="title">服务介绍</div>*/}
        <span>{this.props.info}</span>
      </div>
    );
  }
}
class OrderRecordIntro extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const columns = [
      {
        title: '订单单号',
        dataIndex: 'orderNumber',
        key: 'orderNumber',
      },
      {
        title: '下单项目',
        dataIndex: 'project',
        key: 'project',
      },
      {
        title: '下单人',
        dataIndex: 'buyer',
        key: 'buyer',
      },
      {
        title: '下单时间',
        dataIndex: 'orderTime',
        key: 'orderTime',
      },
      {
        title: '订单状态',
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: '订单金额',
        dataIndex: 'orderAmount',
        key: 'orderAmount',
      },
    ];
    const data = [
      {
        key: '1',
        orderNumber: '20180418003495090',
        project: '财富港大厦',
        buyer: '曲丽丽',
        orderTime: '2017-10-01 12:00',
        status: '进行中',
        orderAmount: '2000.00',
      },
      {
        key: '2',
        orderNumber: '20180418003495090',
        project: '万科生活广场',
        buyer: '曲丽丽',
        orderTime: '2017-10-01 12:00',
        status: '进行中',
        orderAmount: '2000.00',
      },
      {
        key: '3',
        orderNumber: '20180418003495090',
        project: '财富港大厦',
        buyer: '曲丽丽',
        orderTime: '2017-10-01 12:00',
        status: '进行中',
        orderAmount: '2000.00',
      },
      {
        key: '4',
        orderNumber: '20180418003495090',
        project: '财富港大厦',
        buyer: '曲丽丽',
        orderTime: '2017-10-01 12:00',
        status: '进行中',
        orderAmount: '2000.00',
      },
      {
        key: '5',
        orderNumber: '20180418003495090',
        project: '财富港大厦',
        buyer: '曲丽丽',
        orderTime: '2017-10-01 12:00',
        status: '已完成',
        orderAmount: '2000.00',
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
      <div className="content">
        <div>
          <div className="title">
            订单记录
            <div style={{ display: 'inline-block', float: 'right' }}>
              <Search
                placeholder="订单单号"
                onSearch={value => console.log(value)}
                style={{ width: 200 }}
              />
            </div>
          </div>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          onRow={(record, index) => {
            return {
              onClick: () => {}, // 点击行
              onMouseEnter: () => {}, // 鼠标移入行
            };
          }}
        />
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
class EvaluateIntro extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="content">
        <div className="title">评价</div>
      </div>
    );
  }
}
