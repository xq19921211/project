/**
 * Created by xu.long on 2018/6/18.
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
  Modal,
  AutoComplete,
  Popconfirm,
} from 'antd';
import { Toolbar } from '../../../../component/Toolbar/Toolbar';
import './style.scss';
import { connect } from 'react-redux';
import { getBuilderList } from './selector';
import { initBuilderList, modifyListStatus, deleteBuilder} from './action';
import { initBuildTeamList } from '../../../MerchantContainer/BuildTeamManagement/RootContainer/action';
import { getBuildTeamList } from '../../../MerchantContainer/BuildTeamManagement/RootContainer/selector';
import { dateFormat } from '../../../../util/util';
const { Content } = Layout;
const FormItem = Form.Item;
const InputGroup = Input.Group;
const Option = Select.Option;
class BuilderManagement extends React.Component {
  constructor(props) {
    super(props);
    this.pageChange = this.pageChange.bind(this);
    this.onAutoCompleteSelect = this.onAutoCompleteSelect.bind(this);
    this.state = {
      options: {
        current: 1,
        pageSize: 10,
        pageSizeChange: this.pageChange,
        pageSizeOptions: ['10', '20', '100'],
      },
      team_id: 0,
      dataSource: [],
      allDataSource: [],
    };
  }

  componentWillMount() {
    this.props.initBuilderList({
      current: this.state.options.current,
      pageSize: this.state.options.pageSize,
    });
    this.props.initBuildTeamList();
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

  goBuilderDetail = id => {
    this.props.history.push(`builderDetail/${id}`);
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
          team_id: this.state.team_id,
        };
        for (let item in values) {
          switch (item) {
            case 'keyword':
              param['keyword'] = values[item];
              break;
            case 'team':
              param['team_id'] = values[item];
              break;
            case 'status':
              param['status'] = values[item] === '2' ? '' : values[item];
              break;
          }
        }
        console.log('param: ' + JSON.stringify(param));
        this.props.initBuilderList(param);
        this.pageChange(1, this.state.options.pageSize);
      }
    });
  };
  //新增保安公司管理员
  add = () => {
    this.props.history.push('addBuilder/add/0');
  };
  //编辑保安公司管理员
  edit = id => {
    console.log('edit id: ' + id);
    this.props.history.push(`addBuilder/edit/${id}`);
  };
  changeStatus = param => {
    console.log('启用');
    this.props.modifyListStatus(param);
  };
  //删除保安人员
  deleteBuilder = param => {
    console.log('删除');
    this.props.deleteBuilder(param);
    setTimeout(()=>{
       this.props.initBuilderList({
        current: this.state.options.current,
        pageSize: this.state.options.pageSize,
      });
    },500)
  };
  handleSearch = value => {
    console.log('handleSearch: ' + value);
    let data = [];
    for (let i = 0; i < this.state.allDataSource.length; i++) {
      if (
        this.state.allDataSource[i].team_name &&
        this.state.allDataSource[i].team_name.indexOf(value) > -1
      ) {
        data.push(this.state.allDataSource[i]);
      }
    }
    let obj = Object.assign({}, this.state, {
      dataSource: !value ? this.state.allDataSource : data,
      // catId: parseInt(value)
    });
    this.setState(obj);
  };


  onAutoCompleteSelect(value) {
    console.log('onSelect', value);
    let param = {
      current: this.state.options.current,
      pageSize: this.state.options.pageSize,
      team_id: value,
    };
    this.setState(
      Object.assign({}, this.state, {
        team_id: value,
      }),
      () => {
        console.log(`handleSearch state: ${JSON.stringify(this.state)}`);
      },
    );
  }

  render() {
    const { getFieldDecorator, resetFields } = this.props.form;
    const { builderList, initBuilderList } = this.props;
    const { dataSource } = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 12 },
        sm: { offset: 5, span: 4 },
      },
      wrapperCol: {
        xs: { span: 12 },
        sm: { span: 10 },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 4, offset: 0 },
        sm: { span: 3, offset: 9 },
      },
    };
    const list = [
      '保安公司管理',
      {
        label: '保安队人员管理',
        to: '/index/builderManagement',
      },
    ];
    return (
      <Layout id="builder_management">
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
              <FormItem label="真实姓名">
                {getFieldDecorator('keyword')(
                  <Input
                    onPressEnter={this.handleSubmit}
                    placeholder="请输入真实姓名"
                    type="text"
                  />,
                )}
              </FormItem>
              <FormItem label="保安队">
                {getFieldDecorator('team')(
                  <AutoComplete
                    dataSource={dataSource.map((item, i) => {
                      return (
                        <Option key={i} value={item.team_id.toString()}>
                          {item.team_name}
                        </Option>
                      );
                    })}
                    style={{
                      width: '100%',
                      marginRight: '3%',
                    }}
                    onSelect={this.onAutoCompleteSelect}
                    onSearch={this.handleSearch}
                    placeholder="请输入保安队"
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
                    resetFields(['keyword', 'team', 'status']);
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
            builderList={builderList}
            goBuilderDetail={this.goBuilderDetail}
            initBuilderList={initBuilderList}
            edit={this.edit}
            changeStatus={this.changeStatus}
            deleteBuilder={this.deleteBuilder}
          />
        </Content>
      </Layout>
    );
  }
}
const BuilderManagementForm = Form.create()(BuilderManagement);

const mapStateToProps = state => {
  return {
    builderList: getBuilderList(state),
    // roleList: getRoleList(state)
    merchantList: getBuildTeamList(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initBuilderList: param => {
      dispatch(initBuilderList(param));
    },
    // initRoleList: (param) => {
    //
    //     dispatch(initRoleList(param));
    // }
    modifyListStatus: param => {
      dispatch(modifyListStatus(param));
    },
    deleteBuilder: param => {
      dispatch(deleteBuilder(param));
    },
    initBuildTeamList: param => {
      dispatch(initBuildTeamList(param));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BuilderManagementForm);

class CustomTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // roleSettingModalVisible: false,
      selectedRows: [],
    };
  }

  render() {
    const columns = [
      {
        title: '用户名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '真实姓名',
        dataIndex: 'realName',
        key: 'realName',
      },
      {
        title: '保安队',
        dataIndex: 'team_name',
        key: 'team_name',
      },
      {
        title: '最后登录时间',
        dataIndex: 'latestLoaded',
        key: 'latestLoaded',
      },
      {
        title: '状态',
        dataIndex: 'statusName',
        key: 'statusName',
        filters: [
          {
            text: '已启用',
            value: 'start',
          },
          {
            text: '已停用',
            value: 'stop',
          },
        ],
        onFilter: (value, record) => {
          let strValue = value === 'start' ? '已启用' : '已停用';
          console.log(
            `value: ${value}, record: ${JSON.stringify(
              record,
            )}, result: ${record.statusName.indexOf(strValue)}`,
          );
          return record.statusName.indexOf(strValue) === 0;
        },
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
            default:
              strValue = '停用';
              break;
          }
          return (
            <span>
              <Popconfirm title="是否确认删除？" onConfirm={() => this.props.deleteBuilder(record)} okText="是" cancelText="否">
                <a href="#">删除</a>
              </Popconfirm>
              <Divider type="vertical" />
              <a onClick={() => this.props.goBuilderDetail(record.id)}>详情</a>
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
              <Divider type="vertical" />
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
            </span>
          );
        },
      },
    ];
    const { builderList } = this.props;
    const data = builderList.dataSource.map((item, i) => {
      let statusName = item.oprStatus === 0 ? '已停用' : '已启用';
      return {
        key: i,
        id: item.oprId,
        name: item.username,
        realName: item.oprName,
        team_name: item.teamName,
        latestLoaded: !item.lastTime ? '' : item.lastTime,
        status: item.oprStatus,
        statusName: statusName,
      };
    });
    const options = {
      current: this.props.options.current,
      defaultPageSize: this.props.options.pageSize,
      pageSizeOptions: this.props.options.pageSizeOptions,
      total: builderList.total,
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
        this.props.initBuilderList({
          current: page,
          pageSize: pageSize,
        });
      },
      onShowSizeChange: (current, size) => {
        this.props.options.pageSizeChange(current, size);
        this.props.initBuilderList({
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
