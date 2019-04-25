/**
 * Created by xu.long on 2018/4/23.
 */
import React from 'react';
import {
  Layout,
  Icon,
  Button,
  Input,
  Form,
  Select,
  Table,
  Pagination,
  Row,
  Col,
  Cascader,
  Divider,
} from 'antd';
import { connect } from 'react-redux';
import { Toolbar } from '../../../../component/Toolbar/Toolbar';
import './style.scss';
import { getMerchantList } from './selector';
import { initMerchantList, modifyListStatus } from './action';
const { Content } = Layout;
const FormItem = Form.Item;
const InputGroup = Input.Group;
const Option = Select.Option;
class MerchantManagement extends React.Component {
  constructor(props) {
    super(props);
    this.pageChange = this.pageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      options: {
        current: 1,
        pageSize: 10,
        pageSizeChange: this.pageChange,
        pageSizeOptions: ['10', '20', '100'],
      },
      providerType: ['--全部--'].concat(window.basic.providerType),
    };
  }

  componentWillMount() {
    this.props.initMerchantList({
      current: this.state.options.current,
      pageSize: this.state.options.pageSize,
    });
  }

  onChange = value => {
    console.log(value);
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
        console.log('Received values of form: ', values);
        let param = {
          current: 1,
          pageSize: this.state.options.pageSize,
        };
        for (let item in values) {
          if (values[item] !== undefined && values[item] !== null) {
            switch (item) {
              case 'provider':
                param['keyword'] = values[item];
                break;
              case 'providerType':
                param['type'] = values[item] === '--全部--' ? '' : values[item];
                break;
              case 'status':
                param['status'] = values[item] === '2' ? '' : values[item];
                break;
              case 'area':
                param['province'] = values[item][0];
                param['city'] = values[item][1];
                param['region'] = values[item][2];
                break;
              // case 'contact':
              //     param['contact'] = values[item];
              //     break;
            }
          }
        }
        console.log('param: ' + JSON.stringify(param));
        this.props.initMerchantList(param);
        this.pageChange(1, this.state.options.pageSize);
      }
    });
  };
  //新增供应商
  add = () => {
    this.props.history.push('addMerchant/add/0');
  };
  //编辑供应商
  edit = id => {
    console.log('edit id: ' + id);
    this.props.history.push(`addMerchant/edit/${id}`);
  };
  changeStatus = param => {
    console.log('启用');
    this.props.modifyListStatus(param);
  };

  render() {
    const { getFieldDecorator, resetFields } = this.props.form;
    const { merchantList, initMerchantList } = this.props;
    const { providerType } = this.state;
    const options = window.address;
    const list = [
      '保安公司管理',
      {
        label: '保安公司管理',
        to: '/index/merchantManagement',
      },
    ];
    return (
      <Layout id="merchant_management">
        <Toolbar type={1} list={list} title="查询列表" />
        <Content className="content">
          <div>
            <Form
              style={{
                display: 'flex',
                padding: '0 1.6rem 1rem 1.6rem',
                position: 'relative',
              }}
              layout="inline"
              onSubmit={this.handleSubmit}>
              <FormItem label="保安公司">
                {getFieldDecorator('provider')(
                  <Input
                    onPressEnter={this.handleSubmit}
                    placeholder="请输入保安公司名称"
                    type="text"
                  />,
                )}
              </FormItem>
              <FormItem label="保安公司类型">
                {getFieldDecorator('providerType', {
                  initialValue: '--全部--',
                })(
                  <Select>
                    {providerType.map((item, i) => (
                      <Option key={i} value={item}>
                        {item}
                      </Option>
                    ))}
                  </Select>,
                )}
              </FormItem>
              <FormItem label="状态">
                {getFieldDecorator('status', {
                  initialValue: '2',
                })(
                  <Select>
                    <Option value={'2'}>--全部--</Option>
                    <Option value={'1'}>已启用</Option>
                    <Option value={'0'}>已停用</Option>
                  </Select>,
                )}
              </FormItem>
              <FormItem label="所在地区">
                {getFieldDecorator('area')(
                  <Cascader
                    changeOnSelect
                    placeholder="请选择所在地区"
                    options={options}
                    onChange={this.onChange}
                  />,
                )}
              </FormItem>
              {/*<FormItem label="联系方式">*/}
              {/*{getFieldDecorator('contact')(<Input*/}
              {/*placeholder="请输入联系方式"*/}
              {/*type="text"*/}
              {/*/>)}*/}
              {/*</FormItem>*/}
              <FormItem style={{ position: 'absolute', right: 0 }}>
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
                    resetFields(['provider', 'providerType', 'status', 'area']);
                  }}>
                  重置
                </Button>
                <Button icon="plus" type="primary" onClick={this.add}>
                  新增
                </Button>
              </FormItem>
            </Form>
          </div>
          <CustomTable
            options={this.state.options}
            merchantList={merchantList}
            goOrderDetail={this.goOrderDetail}
            edit={this.edit}
            changeStatus={this.changeStatus}
            initMerchantList={initMerchantList}
          />
        </Content>
      </Layout>
    );
  }
}
const MerchantManagementForm = Form.create()(MerchantManagement);
const mapStateToProps = state => {
  return {
    merchantList: getMerchantList(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initMerchantList: param => {
      dispatch(initMerchantList(param));
    },
    modifyListStatus: param => {
      dispatch(modifyListStatus(param));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MerchantManagementForm);
class CustomTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const columns = [
      {
        title: '保安公司',
        dataIndex: 'provider',
        key: 'provider',
      },
      {
        title: '保安公司类型',
        dataIndex: 'providerType',
        key: 'providerType',
      },
      {
        title: '所属地区',
        dataIndex: 'area',
        key: 'area',
      },
      {
        title: '联系方式',
        dataIndex: 'contact',
        key: 'contact',
      },
      {
        title: '启用状态',
        dataIndex: 'statusName',
        key: 'statusName',
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => {
          let strValue;
          switch (record.status) {
            case 0:
              strValue = '启用';
              break;
            case 1:
              strValue = '停用';
              break;
          }
          return (
            <span>
              <a
                onClick={() => {
                  console.log(
                    `编辑text: ${JSON.stringify(
                      text,
                    )}, record: ${JSON.stringify(record)}`,
                  );
                  this.props.edit(record.id);
                }}>
                编辑
              </a>
              <Divider type="vertical" />
              <a
                onClick={() => {
                  console.log(
                    `text: ${JSON.stringify(text)}, record: ${JSON.stringify(
                      record,
                    )}`,
                  );
                  if (record.status === 0) {
                    record.status = 1;
                  } else {
                    record.status = 0;
                  }

                  this.props.changeStatus(record);
                }}>
                {strValue}
              </a>
            </span>
          );
        },
      },
    ];
    const { merchantList } = this.props;
    const data = merchantList.dataSource.map((item, i) => {
      let statusName = item.supStatus === 0 ? '已停用' : '已启用';
      return {
        key: i,
        id: item.supId,
        provider: item.supName,
        providerType: item.supType,
        area: item.province + item.city + item.region,
        contact: item.supTel,
        status: item.supStatus,
        statusName: statusName,
      };
    });
    const options = {
      current: this.props.options.current,
      defaultPageSize: this.props.options.pageSize,
      pageSizeOptions: this.props.options.pageSizeOptions,
      total: merchantList.total,
      showTotal: total => `共 ${total} 条记录`,
      showSizeChanger: true,
      showQuickJumper: true,
      onChange: (page, pageSize) => {
        console.log(
          '页码改变的回调，参数是改变后的页码: ' +
            page +
            ',及每页条数: ' +
            pageSize,
        );
        this.props.options.pageSizeChange(page, pageSize);
        this.props.initMerchantList({
          current: page,
          pageSize: pageSize,
        });
      },
      onShowSizeChange: (current, size) => {
        this.props.options.pageSizeChange(current, size);
        this.props.initMerchantList({
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
