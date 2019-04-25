/**
 * Created by xu.long on 2018/5/7.
 */
import React from 'react';
import { Layout, Row, Col, Table, Rate, Upload, Icon, Modal } from 'antd';
import Zmage from 'react-zmage';
import { Toolbar } from '../../../component/Toolbar/Toolbar';
import './style.scss';
import { connect } from 'react-redux';
import { getOrderDetail } from './selector';
import { initOrderDetail } from './action';
import { dateFormat } from '../../../util/util';
const { Content } = Layout;
class OrderDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  //初始化
  componentWillMount() {
    this.props.initOrderDetail({
      orderNum: this.props.match.params.orderNum,
    });
  }

  getOrderStatus(status) {
    let strValue = '待派单';
    switch (status) {
      case 0:
        strValue = '待派单';
        break;
      case 1:
        strValue = '待接单';
        break;
      case 2:
        strValue = '待验收';
        break;
      case 3:
        strValue = '待评价';
        break;
      case 4:
        strValue = '待支付';
        break;
      case 5:
        strValue = '已完成';
        break;
    }
    return strValue;
  }

  orderStateFormat(value) {
    var str = '下单';
    if (value.ordStatus == 1) {
      str = '派单';
    } else if (value.ordStatus == 2) {
      str = '接单';
    } else if (value.ordStatus == 3) {
      str = '验收';
    } else if (value.ordStatus == 4) {
      str = '评价';
    } else if (value.ordStatus == 5) {
      str = '分账成功';
    } else {
      if (value.content == 'workstarttime') {
        str = '工作开始';
      } else if (value.content == 'workendtime') {
        str = '工作结束';
      }
    }
    return str;
  }

  createTrack = item => {
    console.log(item);

    return (
      <div className="track" key={item.key}>
        <div className="item">{item.operateTime}</div>
        <div className="item">
          <span className="note">操作人:</span>
          <span>{item.userName}</span>
        </div>
        <div className="item">
          <span className="note">操作记录:</span>
          <span>{this.orderStateFormat(item)}</span>
        </div>
        <div className="item">
          <span className="note">定位记录:</span>
          <span>{item.address ? item.address : '-'}</span>
        </div>
        {item.ordStatus === 4 ? (
          <div className="item">
            <div>
              <span className="note">评价内容:</span>
              <span>{item.evaluatContent}</span>
            </div>

            <div className="rateWrap">
              <div>
                <span>仪容仪表</span>
                <Rate disabled value={item.appearanceScore} />
              </div>
              <div>
                <span>行为规范</span>
                <Rate disabled value={item.behaviourScore} />
              </div>
              <div>
                <span>工作配合</span>
                <Rate disabled value={item.coordinationScore} />
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
        {item.ordStatus === 5 ? (
          <div className="item">
            <div>
              <span className="note">分账记录:</span>
            </div>

            <div className="rateWrap">
              {item.proOrderBalances.map((item, i) => {
                return (
                  <div key={i}>
                    <span>
                      {item.accountName}
                      收入:
                    </span>
                    <span>￥{item.money}元</span>
                    <span>【 {item.rate * 100} %】</span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          ''
        )}
        <div className="item">
          <PicturesWall
            initFile={item.img}
          />
          {/*item.img.map((item, i) => {
            return <Zmage key={i} className="operateImg" src={item} />;
          })*/}
        </div>
        <div className="process">
          <span className="circleOne" />
        </div>
      </div>
    );
  };

  render() {
    const { orderDetail } = this.props;
    const columns = [
      {
        title: '操作类型',
        dataIndex: 'actionType',
        key: 'actionType',
      },
      {
        title: '操作人',
        dataIndex: 'actionOwner',
        key: 'actionOwner',
      },
      {
        title: '操作时间',
        dataIndex: 'actionTime',
        key: 'actionTime',
      },
    ];
    const data = orderDetail.operates.map((item, i) => {
      return {
        key: i,
        operateTime: item.createTime,
        img: item.imageUrl ? item.imageUrl.split(',') : [],
        proOrderBalances: orderDetail.proOrderBalances,
        ...item,
        ...orderDetail.proOrder,
      };
    });
    const proOrderColumns = [
      {
        title: '商品编号',
        dataIndex: 'code',
        key: 'code',
      },
      {
        title: '商品名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '单价',
        dataIndex: 'price',
        key: 'price',
      },
      {
        title: '促销单价',
        dataIndex: 'promotionPrice',
        key: 'promotionPrice',
      },
      {
        title: '数量',
        dataIndex: 'count',
        key: 'count',
      },
      {
        title: '金额',
        dataIndex: 'amount',
        key: 'amount',
      },
      {
        title: '总计',
        dataIndex: 'total',
        key: 'total',
      },
    ];
    const proOrder = [
      {
        code: !orderDetail.proOrder ? '' : orderDetail.proOrder.resourceSn,
        name: !orderDetail.proOrder ? '' : orderDetail.proOrder.proName,
        price: !orderDetail.proOrder ? '' : orderDetail.proOrder.proPrice,
        promotionPrice: !orderDetail.proOrder
          ? ''
          : orderDetail.proOrder.proPromotionPrice,
        count: !orderDetail.proOrder ? '' : orderDetail.proOrder.proNum,
        amount: !orderDetail.proOrder ? '' : orderDetail.proOrder.orderPrice,
        total: !orderDetail.proOrder ? '' : orderDetail.proOrder.orderPrice,
      },
    ];
    const signInColumns = [
      {
        title: '序号',
        dataIndex: 'sequence',
        key: 'sequence',
      },
      {
        title: '打卡时间',
        dataIndex: 'time',
        key: 'time',
      },
      {
        title: '打卡地点',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: '现场图片',
        dataIndex: 'picture',
        key: 'picture',
      },
    ];
    const signInData =
      orderDetail.proOrder && orderDetail.proOrder.orderCheckList
        ? orderDetail.proOrder.orderCheckList.map((item, i) => {
            return {
              key: i,
              sequence: i,
              time: item.createtime,
              address: item.address,
              picture: item.imageurl.split(',').map((item, i) => {
                return (
                  <img
                    style={{ width: 40, height: 40 }}
                    key={i}
                    src={window.hempConfig.basePath + item}
                  />
                );
              }),
            };
          })
        : [];
    const list = [
      '订单管理',
      {
        label: '订单列表',
        to: '/index/orderManagement',
      },
      {
        label: '订单详情',
        to: `/index/orderDetail/${this.props.match.params.orderNum}`,
      },
    ];
    return (
      <Layout id="order_detail">
        <Toolbar type={1} list={list} title="订单详情" />
        <Content className="content">
          <div className="title">基础信息</div>
          <div className="basic_info">
            <Row style={{ marginBottom: '1.5rem' }}>
              <Col span={8}>
                <span>订单单号：</span>
                <span>
                  {!orderDetail.proOrder ? '' : orderDetail.proOrder.orderNum}
                </span>
              </Col>
              <Col span={8}>
                <span>订单状态：</span>
                <span>
                  {!orderDetail.proOrder
                    ? ''
                    : this.getOrderStatus(orderDetail.proOrder.orderState)}
                </span>
              </Col>
              <Col span={8}>
                <span>创建时间：</span>
                <span>
                  {!orderDetail.proOrder
                    ? ''
                    : !orderDetail.proOrder.createTime
                      ? ''
                      : orderDetail.proOrder.createTime}
                </span>
              </Col>
            </Row>
            <Row>
              {/*<Col span={8}>*/}
              {/*<span>付款时间：</span>*/}
              {/*<span></span>*/}
              {/*</Col>*/}
              <Col span={8}>
                <span>最后更新时间：</span>
                <span>
                  {!orderDetail.proOrder
                    ? ''
                    : !orderDetail.proOrder.updateTime
                      ? ''
                      : orderDetail.proOrder.updateTime}
                </span>
              </Col>
            </Row>
          </div>
          <div className="title">商品信息</div>
          <Table columns={proOrderColumns} dataSource={proOrder} />
          <div className="title">下单项目及保安公司信息</div>
          <div className="provider_info">
            <div style={{ marginBottom: '1.5rem' }}>物业小区信息</div>
            <Row style={{ marginBottom: '1.5rem' }}>
              <Col span={8}>
                <span>小区名称：</span>
                <span>
                  {!orderDetail.proOrder
                    ? ''
                    : orderDetail.proOrder.projectName}
                </span>
              </Col>
              <Col span={8}>
                <span>所属事业部：</span>
                <span>
                  {!orderDetail.supplier ? '' : orderDetail.supplier.supName}
                </span>
              </Col>
              <Col span={8}>
                <span>所属大区：</span>
                <span>
                  {!orderDetail.supplier ? '' : orderDetail.supplier.region}
                </span>
              </Col>
            </Row>
            <Row style={{ marginBottom: '1.5rem' }}>
              <Col span={8}>
                <span>下单人：</span>
                <span>
                  {!orderDetail.proOrder ? '' : orderDetail.proOrder.cusName}
                </span>
              </Col>
              <Col span={8}>
                <span>下单人电话：</span>
                <span />
              </Col>
              <Col span={8}>
                <span>小区地址：</span>
                <span>
                  {!orderDetail.supplier ? '' : orderDetail.supplier.address}
                </span>
              </Col>
            </Row>
            <div style={{ marginBottom: '1.5rem' }}>保安公司信息</div>
            <Row style={{ marginBottom: '1.5rem' }}>
              <Col span={8}>
                <span>保安公司名称：</span>
                <span>
                  {!orderDetail.supplier ? '' : orderDetail.supplier.supName}
                </span>
              </Col>
              {/*<Col span={8}>*/}
              {/*<span>作业队长：</span>*/}
              {/*<span></span>*/}
              {/*</Col>*/}
              <Col span={8}>
                <span>保安公司联系电话：</span>
                <span>
                  {!orderDetail.supplier ? '' : orderDetail.supplier.supContact}
                </span>
              </Col>
            </Row>
          </div>
          <div className="title">订单操作记录</div>
          <div className="trackWrap">{data.map(this.createTrack)}</div>
          {/*<Table columns={columns} dataSource={data} />*/}
          <div className="title">打卡记录</div>
          <Table columns={signInColumns} dataSource={signInData} />
        </Content>
      </Layout>
    );
  }
}
const mapStateToProps = state => {
  return {
    orderDetail: getOrderDetail(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initOrderDetail: param => {
      dispatch(initOrderDetail(param));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderDetail);

class PicturesWall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.initFile)
    if (nextProps && nextProps.initFile) {
      if (this.state.fileList.length < 1) {
        if (nextProps.initFile.length > 0) {
          this.setState(
            Object.assign({}, this.state, {
              fileList: nextProps.initFile.map((item, i) => {
                // console.log(item);
                return {
                  uid: -i,
                  status: 'done',
                  fileid: item,
                  url: item,
                  thumbUrl: item,
                };
              }),
            }),
          );
        }
      }
    }
  }

  handleCancel = () => {
    // console.log('handleCancel');
    this.setState({ previewVisible: false });
  };

  handlePreview = file => {
    // console.log('handlePreview');
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    return (
      <div className="clear_fix" style={{ display: 'inline-block'}}>
        <Upload
          accept="image/png, image/jpeg, image/gif, image/jpg"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}>
        </Upload>
        <Modal
          wrapClassName="vertical-center-modal"
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
