/**
 * Created by xu.long on 2018/4/23.
 */

import './style.scss';

import {
  Button,
  Col,
  Form,
  Input,
  Layout,
  Pagination,
  Row,
  Select,
  Table,
  DatePicker,
} from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { exportExcel } from 'xlsx-oc'
import { Toolbar } from '../../../component/Toolbar/Toolbar';
import { dateFormat } from '../../../util/util';
import { initOrderList } from './action';
import { getOrderList } from './selector';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

const { Content } = Layout;
const FormItem = Form.Item;
const InputGroup = Input.Group;
const Option = Select.Option;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;


function onChange(date, dateString) {
  console.log(dateString );
}

class OrderManagement extends React.Component {
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
  

  componentWillMount() {
    this.props.initOrderList({
      current: this.state.options.current,
      pageSize: this.state.options.pageSize,
    });
  }
  goOrderDetail = orderNum => {
    this.props.history.push(`orderDetail/${orderNum}`);
  };
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
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        let param = {
          current: 1,
          pageSize: this.state.options.pageSize,
        };
        for (let item in values) {
          if (values[item]) {
            switch (item) {
              case 'orderNumber':
                param['orderNum'] = values[item];
                break;
              case 'humantraNo1':
                param['humantraNo'] = values[item];
                break;
              case 'productName':
                param['proName'] = values[item];
                break;
              case 'project':
                param['projectName'] = values[item];
                break;
              case 'projectid':
                param['projectId'] = values[item];
                break;
              case 'createTime':
                param['createTime'] = values[item];
                break;
              case 'orderStatus':
                param['orderStatus'] =
                  values[item] === '-1' ? '' : values[item];
                break;
              case 'orderOwner':
                param['cusName'] = values[item];
                break;
              case 'startDate':
                param['startTime'] = values[item];
                break;  
              case 'endtDate':
                param['endTime'] = values[item];
                break;  
            }
          }
          // console.log('item: ' + item);
        }
        // console.log('param: ' + JSON.stringify(param));
        this.props.initOrderList(param);
        this.pageChange(1, this.state.options.pageSize);
      }
    });
  };
  initOrderList = temp => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        let param = {
          current: temp.current,
          pageSize: temp.pageSize,
        };
        for (let item in values) {
          if (values[item]) {
            switch (item) {
              case 'orderNumber':
                param['orderNum'] = values[item];
                break;
              case 'humantraNo1':
                param['humantraNo'] = values[item];
                break;
              case 'productName':
                param['proName'] = values[item];
                break;
              case 'project':
                param['projectName'] = values[item];
                break;
              case 'projectid':
                param['projectId'] = values[item];
                break;
              case 'createTime':
                param['createTime'] = values[item];
                break;
              case 'orderStatus':
                param['orderStatus'] =
                  values[item] === '-1' ? '' : values[item];
                break;
              case 'orderOwner':
                param['cusName'] = values[item];
                break;
              case 'startDate':
                param['startTime'] = values[item];
                break;  
              case 'endtDate':
                param['endTime'] = values[item];
                break;  
            }
          }
          // console.log('item: ' + item);
        }
        // console.log('param: ' + JSON.stringify(param));
        this.props.initOrderList(param);
      }
    });
  };

  render() {
    const { getFieldDecorator, resetFields,} = this.props.form;
    const { orderList } = this.props;
    const list = [
      '订单管理',
      {
        label: '订单列表',
        to: '/index/orderManagement',
      },
    ];
    
    const exportDefaultExcel = (item) => {    
      console.log(item)
      for(var i in item){}
       const obj=item[i]
       let url = "/api/excel/exportOrderExcel?startDate=2019-3-9 00:00:00&endDate=2019-3-9 11:00:23&projectid=1&orderStatus=1";//接口地址

       let formData = new FormData();
       formData.append('startDate',obj.createTime);
       formData.append('endDate', obj.createTime);
       formData.append('projectid',obj.projectId);
       formData.append('orderStatus',obj.orderStatus);
       
       fetch(url,{
           method: 'post',
           body: formData,
       }).then(function (res) {
           return res.json();
       }).then(function (json) {

       })
      };
    return (
      <Layout id="order_management">
        <Toolbar type={1} list={list} title="查询列表" />
        <Content className="content">
          <div>
            <Form
              style={{
                display: 'flex',
                padding: '0 2rem 1rem 2rem',
                position: 'relative',
                justifyContent: 'space-between',
                              }}
              layout="inline"
              onSubmit={this.handleSubmit}>
              <FormItem label="订单单号">
                {getFieldDecorator('orderNumber')(
                  <Input
                    onPressEnter={this.handleSubmit}
                    placeholder="请输入订单单号"
                    type="text"
                  />,
                )}
              </FormItem>
              <FormItem label="人资订单号">
                {getFieldDecorator('humantraNo1')(
                  <Input
                    onPressEnter={this.handleSubmit}
                    placeholder="请输入人资订单号"
                    type="text"
                  />,
                )}
              </FormItem>
              <FormItem label="商品名称">
                {getFieldDecorator('productName')(
                  <Input
                    onPressEnter={this.handleSubmit}
                    placeholder="请输入商品名称"
                    type="text"
                  />,
                )}
              </FormItem>
                <FormItem label="下单项目">
                {getFieldDecorator('project')(
                  <Input
                    onPressEnter={this.handleSubmit}
                    placeholder="请输入项目名称"
                    type="text"
                  />,
                )}
              </FormItem>
              </Form>
          </div>
          
          <div>
          <Form style={{
                display: 'flex',
                padding: '0 2rem 1rem 2rem',
                position: 'relative',
                justifyContent: 'space-between',
              }}
              layout="inline"
              onSubmit={this.handleSubmit}>
          
              <FormItem label="下单人">
                {getFieldDecorator('orderOwner')(
                  <Input placeholder="请输入姓名" type="text" />,
                )}
              </FormItem>
              <FormItem label="创建时间" style={{ }}>
                {getFieldDecorator('createTime')(
                  <DatePicker 
                  onChange={onChange}
                  locale={locale} 
                  format='YYYY-MM-DD'
                  onPressEnter={this.handleSubmit}
                  />
                )
              }
              </FormItem>
              
              <FormItem label="订单状态" style={{ marginRight:"10rem"}}>
                {getFieldDecorator('orderStatus', {
                  initialValue: '-1',
                })(
                  <Select>
                    <Option value="-1">--全部--</Option>
                    <Option value="0">待派单</Option>
                    <Option value="1">待接单</Option>
                    <Option value="2">待验收</Option>
                    <Option value="3">待评价</Option>
                    <Option value="4">待支付</Option>
                    <Option value="5">已完成</Option>
                  </Select>,
                )}
              </FormItem>

              <FormItem>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginRight: '1rem' }}>
                  查询
                </Button>
                <Button
                  type="default"
                  htmlType="reset"
                  style={{ marginRight: '1rem' }}
                  onClick={() => {
                    resetFields([
                      'orderNumber',
                      'humantraNo1',
                      'productName',
                      'project',
                      'orderStatus',
                      'orderOwner',
                      'createTime',
                    ]);
                  }}>
                  重置
                </Button>
                <Button type="warning"
                        style={{ marginRight: '0rem' }}
                        onClick={() => exportDefaultExcel(
                          this.props.orderList.dataSource
                        )}
                >导出</Button>
              </FormItem>
            </Form>
          </div>
          <CustomTable
            options={this.state.options}
            orderList={orderList}
            goOrderDetail={this.goOrderDetail}
            initOrderList={this.initOrderList}
          />
        </Content>
      </Layout>
    );
  }
}
const OrderManagementForm = Form.create()(OrderManagement);

const mapStateToProps = state => {
  return {
    orderList: getOrderList(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initOrderList: param => {
      //
      dispatch(initOrderList(param));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderManagementForm);

class CustomTable extends React.Component {
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
        title: '人资订单单号',
        dataIndex: 'humantraNo1',
        key: 'humantraNo1',
      },
      {
        title: '商品名称',
        dataIndex: 'commodityName',
        key: 'commodityName',
      },
      {
        title: '下单项目',
        dataIndex: 'project',
        key: 'project',
      },
      {
        title: '下单人',
        dataIndex: 'orderOwner',
        key: 'orderOwner',
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
      },
      {
        title: '数量',
        dataIndex: 'amount',
        key: 'amount',
      },
      {
        title: '订单金额',
        dataIndex: 'orderPrice',
        key: 'orderPrice',
      },
      {
        title: '订单状态',
        dataIndex: 'orderStatusName',
        key: 'orderStatusName',
        filters: [
          {
            text: '待派单',
            value: 0,
          },
          {
            text: '待接单',
            value: 1,
          },
          {
            text: '待验收',
            value: 2,
          },
          {
            text: '待评价',
            value: 3,
          },
          {
            text: '待支付',
            value: 4,
          },
          {
            text: '已完成',
            value: 5,
          },
        ],
        onFilter: (value, record) => {
          let strVlue;
          switch (parseInt(value)) {
            case 0:
              strVlue = '待派单';
              break;
            case 1:
              strVlue = '待接单';
              break;
            case 2:
              strVlue = '待验收';
              break;
            case 3:
              strVlue = '待评价';
              break;
            case 4:
              strVlue = '待支付';
              break;
            case 5:
              strVlue = '已完成';
              break;
          }
          // console.log(`value: ${value}, record: ${JSON.stringify(record)}, result: ${record.orderStatusName.indexOf(strVlue)}`);
          return record.orderStatusName.indexOf(strVlue) === 0;
        },
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <a
              onClick={() => {
                // console.log(`action: ${JSON.record}`);
                this.props.goOrderDetail(record.orderNumber);
              }}>
              查看
            </a>
          </span>
        ),
      },
    ];
    const { orderList } = this.props;
    const data = orderList.dataSource.map((item, i) => {
      let strVlue = '';
      const ishumanOrder = !!item.humantraNo;
      if (ishumanOrder) {
        const humanStatusMap = {
          0: '待接单',
          1: '待支付',
          2: '待服务',
          3: '待验收',
          4: '待结算',
          5: '已完成',
          9: '已取消',
          default: '-',
        };
        strVlue = humanStatusMap[item.orderState] || humanStatusMap.default;
      } else {
        const eBaStatusMap = {
          0: '待派单',
          1: '待接单',
          2: '待验收',
          3: '待评价',
          4: '待支付',
          5: '待派单',
          default: '-',
        };
        strVlue = eBaStatusMap[item.orderState] || eBaStatusMap.default;
      }
      const { startDate, endDate} = createTime;
      return {
        key: i,
        id: item.id,
        commodityName: item.proName,
        orderNumber: item.orderNum,
        humantraNo1:item.humantraNo,
        project: item.projectName,
        projectid: item.projectId,
        orderOwner: item.cusName,
        createTime: !item.createTime ? '' : item.createTime,
        amount: item.proNum,
        orderPrice: item.orderPrice,
        orderStatus: item.orderState,
        orderStatusName: strVlue,
      };
    });
    const options = {
      current: this.props.options.current,
      defaultPageSize: this.props.options.pageSize,
      pageSizeOptions: this.props.options.pageSizeOptions,
      total: orderList.total,
      showTotal: total => `共 ${total} 条记录`,
      showSizeChanger: true,
      showQuickJumper: true,
      onChange: (page, pageSize) => {
        // console.log('页码改变的回调，参数是改变后的页码: ' + page + ',及每页条数: ' + pageSize);
        this.props.options.pageSizeChange(page, pageSize);
        this.props.initOrderList({ current: page, pageSize: pageSize });
      },
      onShowSizeChange: (current, size) => {
        // console.log('pageSize 变化的回调: ' + current + ',及每页条数: ' + size);
        this.props.options.pageSizeChange(1, size);
        this.props.initOrderList({ current: 1, pageSize: size });
      },
    };
    return (
      <div>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          scroll={{ x: 1500 }}
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
