/**
 * Created by xu.long on 2018/6/18.
 */

import './style.scss';

import {
  AutoComplete,
  Button,
  Cascader,
  Col,
  Divider,
  Form,
  Icon,
  Input,
  Layout,
  Pagination,
  Row,
  Select,
  Table,
} from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Toolbar } from '../../../../component/Toolbar/Toolbar';
import { dateFormat } from '../../../../util/util';
import { initMerchantList } from '../../MerchantManagement/RootContainer/action';
import { getMerchantList } from '../../MerchantManagement/RootContainer/selector';
import { initBuildTeamList, modifyListStatus } from './action';
import { getBuildTeamList } from './selector';

const { Content } = Layout;
const FormItem = Form.Item;
const InputGroup = Input.Group;
const Option = Select.Option;
class BuildTeamManagement extends React.Component {
  constructor(props) {
    super(props);
    this.pageChange = this.pageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onAutoCompleteSelect = this.onAutoCompleteSelect.bind(this);
    this.state = {
      options: {
        current: 1,
        pageSize: 10,
        pageSizeChange: this.pageChange,
        pageSizeOptions: ['10', '20', '100'],
      },
      supId: 0,
      dataSource: [],
      allDataSource: [],
    };
  }

  componentWillMount() {
    this.props.initBuildTeamList({
      current: this.state.options.current,
      pageSize: this.state.options.pageSize,
    });
    this.props.initMerchantList();
  }

  componentWillReceiveProps(nextProps) {
    // console.log('componentWillReceiveProps: ', JSON.stringify(nextProps));
    if (this.state.allDataSource.length < 1) {
      this.setState(
        Object.assign({}, this.state, {
          dataSource: nextProps.merchantList.dataSource.map((item, i) => {
            return item;
          }),
          allDataSource: nextProps.merchantList.dataSource.map((item, i) => {
            return item;
          }),
        }),
      );
    }
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
          // supId: this.state.supId
        };
        for (let item in values) {
          if (values[item] !== undefined && values[item] !== null) {
            switch (item) {
              case 'name':
                param['keyword'] = values[item];
                break;
              case 'supplier':
                param['supId'] = values[item];
                break;
              case 'status':
                param['status'] = values[item] === '2' ? '' : values[item];
                break;
            }
          }
        }
        console.log('param: ' + JSON.stringify(param));
        this.props.initBuildTeamList(param);
        this.pageChange(1, this.state.options.pageSize);
      }
    });
  };
  //新增供应商
  add = () => {
    this.props.history.push('addBuildTeam/add/0');
  };
  //编辑供应商
  edit = id => {
    console.log('edit id: ' + id);
    this.props.history.push(`addBuildTeam/edit/${id}`);
  };
  changeStatus = param => {
    console.log('启用');
    this.props.modifyListStatus(param);
  };
  handleSearch = value => {
    console.log('handleSearch: ' + value);
    let data = [];
    for (let i = 0; i < this.state.allDataSource.length; i++) {
      if (
        this.state.allDataSource[i].supName &&
        this.state.allDataSource[i].supName.indexOf(value) > -1
      ) {
        data.push(this.state.allDataSource[i]);
      }
    }
    let obj = Object.assign({}, this.state, {
      dataSource: !value ? this.state.allDataSource : data,
    });
    this.setState(obj);
  };

  onAutoCompleteSelect(value) {
    console.log('onSelect', value);
    let param = {
      current: this.state.options.current,
      pageSize: this.state.options.pageSize,
      supId: value,
    };
    this.setState(
      Object.assign({}, this.state, {
        supId: value,
      }),
      () => {
        console.log(`handleSearch state: ${JSON.stringify(this.state)}`);
      },
    );
  }

  render() {
    const { getFieldDecorator, resetFields } = this.props.form;
    const { buildTeamList, initBuildTeamList } = this.props;
    const { dataSource } = this.state;
    const options = window.address;
    const list = [
      '保安公司管理',
      {
        label: '保安队管理',
        to: '/index/buildTeamManagement',
      },
    ];
    return (
      <Layout id="build_team_management">
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
              <FormItem label="保安队名称">
                {getFieldDecorator('name')(
                  <Input
                    onPressEnter={this.handleSubmit}
                    placeholder="请输入保安队名称"
                    type="text"
                  />,
                )}
              </FormItem>
              <FormItem label="保安公司">
                {getFieldDecorator('supplier')(
                  <AutoComplete
                    dataSource={dataSource.map((item, i) => {
                      return (
                        <Option key={i} value={item.supId.toString()}>
                          {item.supName}
                        </Option>
                      );
                    })}
                    style={{
                      width: '100%',
                      marginRight: '3%',
                    }}
                    onSelect={this.onAutoCompleteSelect}
                    onSearch={this.handleSearch}
                    placeholder="请输入保安公司"
                  />,
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
                    resetFields(['name', 'supplier', 'status']);
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
            buildTeamList={buildTeamList}
            goOrderDetail={this.goOrderDetail}
            edit={this.edit}
            changeStatus={this.changeStatus}
            initBuildTeamList={initBuildTeamList}
          />
        </Content>
      </Layout>
    );
  }
}
const BuildTeamManagementForm = Form.create()(BuildTeamManagement);
const mapStateToProps = state => {
  return {
    buildTeamList: getBuildTeamList(state),
    merchantList: getMerchantList(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initBuildTeamList: param => {
      dispatch(initBuildTeamList(param));
    },
    modifyListStatus: param => {
      dispatch(modifyListStatus(param));
    },
    initMerchantList: param => {
      dispatch(initMerchantList(param));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BuildTeamManagementForm);
class CustomTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const columns = [
      {
        title: '保安队名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '保安队长',
        dataIndex: 'leader',
        key: 'leader',
      },
      {
        title: '保安公司',
        dataIndex: 'supplier',
        key: 'supplier',
      },
      {
        title: '新增时间',
        dataIndex: 'creatorTime',
        key: 'creatorTime',
      },
      {
        title: '状态',
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
                  this.props.edit(record.id);
                }}>
                编辑
              </a>
              <Divider type="vertical" />
              <a
                onClick={() => {
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
    const { buildTeamList } = this.props;
    const data = buildTeamList.dataSource.map((item, i) => {
      let statusName = parseInt(item.team_status) === 0 ? '已停用' : '已启用';
      return {
        key: i,
        id: item.team_id,
        name: item.team_name,
        leader: item.team_leader.map((ite, i) => {
          if (i !== 0) {
            return '、' + ite.oprName;
          } else {
            return ite.oprName;
          }
        }),
        supplier: item.sup_name,
        creatorTime: !item.create_time ? '' : item.create_time,
        status: parseInt(item.team_status),
        statusName: statusName,
      };
    });
    const options = {
      current: this.props.options.current,
      defaultPageSize: this.props.options.pageSize,
      pageSizeOptions: this.props.options.pageSizeOptions,
      total: buildTeamList.total,
      showTotal: total => `共 ${total} 条记录`,
      showSizeChanger: true,
      showQuickJumper: true,
      onChange: (page, pageSize) => {
        this.props.options.pageSizeChange(page, pageSize);
        this.props.initBuildTeamList({
          current: page,
          pageSize: pageSize,
        });
      },
      onShowSizeChange: (current, size) => {
        this.props.options.pageSizeChange(current, size);
        this.props.initBuildTeamList({
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
