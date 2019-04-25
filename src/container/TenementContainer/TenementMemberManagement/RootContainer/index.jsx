/**
 * Created by xu.long on 2018/5/12.
 */

import './style.scss';

import {
  Button,
  Cascader,
  Col,
  Divider,
  Form,
  Icon,
  Input,
  Layout,
  Modal,
  Pagination,
  Popconfirm,
  Row,
  Select,
  Table,
} from 'antd';
import React from 'react';
import { connect } from 'react-redux';

import { Toolbar } from '../../../../component/Toolbar/Toolbar';
import {
  deleteTenementMember,
  initTenementMemberList,
  modifyListStatus,
} from './action';
import { getTenementMemberList } from './selector';

const { Content } = Layout;
const FormItem = Form.Item;
const InputGroup = Input.Group;
const Option = Select.Option;
class TenementMemberManagement extends React.Component {
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

  onChange = value => {
    console.log(value);
  };

  goTenementMemberDetail = id => {
    this.props.history.push(`tenementMemberDetail/${id}`);
  };

  componentWillMount() {
    this.props.initTenementMemberList({
      current: this.state.options.current,
      pageSize: this.state.options.pageSize,
    });
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
          if (values[item]) {
            switch (item) {
              case 'keyword':
                param['keyword'] = values[item];
                break;
              // case 'realName':
              //     param['realName'] = values[item];
              //     break;
            }
          }
          console.log('item: ' + item);
        }
        console.log('param: ' + JSON.stringify(param));
        this.props.initTenementMemberList(param);
        this.pageChange(1, this.state.options.pageSize);
      }
    });
  };
  //新增物业人员
  add = () => {
    this.props.history.push('addTenementMember/add/0');
  };
  //编辑物业人员
  edit = id => {
    console.log('edit id: ' + id);
    this.props.history.push(`addTenementMember/edit/${id}`);
  };
  changeStatus = param => {
    console.log('启用');
    this.props.modifyListStatus(param);
  };
  //删除物业人员
  deleteTenementMember = param => {
    console.log('删除');
    this.props.deleteTenementMember(param);
    setTimeout(() => {
      this.props.initTenementMemberList({
        current: this.state.options.current,
        pageSize: this.state.options.pageSize,
      });
    }, 500);
  };

  render() {
    const { getFieldDecorator, resetFields } = this.props.form;
    const { tenementMemberList, initTenementMemberList } = this.props;
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
      '物业管理',
      {
        label: '物业人员管理',
        to: '/index/tenementMemberManagement',
      },
    ];
    return (
      <Layout id="tenement_member_management">
        <Toolbar type={1} list={list} title=" 查询列表" />
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
              <FormItem label="关键字查询">
                {getFieldDecorator('keyword')(
                  <Input
                    onPressEnter={this.handleSubmit}
                    placeholder="请输入账号/真实姓名"
                    type="text"
                  />,
                )}
              </FormItem>
              {/*<FormItem*/}
              {/*label="真实姓名">*/}
              {/*{getFieldDecorator('realName')(<Input*/}
              {/*placeholder="请输入真实姓名"*/}
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
                    resetFields(['keyword']);
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
            tenementMemberList={tenementMemberList}
            goTenementMemberDetail={this.goTenementMemberDetail}
            edit={this.edit}
            changeStatus={this.changeStatus}
            initTenementMemberList={initTenementMemberList}
            deleteTenementMember={this.deleteTenementMember}
          />
        </Content>
      </Layout>
    );
  }
}
const TenementMemberManagementForm = Form.create()(TenementMemberManagement);

const mapStateToProps = state => {
  return {
    tenementMemberList: getTenementMemberList(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initTenementMemberList: param => {
      dispatch(initTenementMemberList(param));
    },
    modifyListStatus: param => {
      dispatch(modifyListStatus(param));
    },
    deleteTenementMember: param => {
      dispatch(deleteTenementMember(param));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TenementMemberManagementForm);

class CustomTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const columns = [
      {
        title: '账号',
        dataIndex: 'account',
        key: 'account',
        width: 100,
      },
      {
        title: '真实姓名',
        dataIndex: 'realName',
        key: 'realName',
        width: 120,
      },
      {
        title: '手机号码',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
        width: 150,
      },
      {
        title: '可管理项目',
        dataIndex: 'project',
        key: 'project',
      },
      //     {
      //     title: '所属事业部',
      //     dataIndex: 'departmentBelongTo',
      //     key: 'departmentBelongTo',
      // }, {
      //     title: '所管理小区',
      //     dataIndex: 'managedHousingEstate',
      //     key: 'managedHousingEstate',
      // },
      {
        title: '账号状态',
        dataIndex: 'statusName',
        key: 'statusName',
        width: 100,
      },
      {
        title: '操作',
        key: 'action',
        width: 200,
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
              <Popconfirm
                title="是否确认删除？"
                onConfirm={() => this.props.deleteTenementMember(record)}
                okText="是"
                cancelText="否">
                <a href="#">删除</a>
              </Popconfirm>
              <Divider type="vertical" />
              <a onClick={() => this.props.goTenementMemberDetail(record.id)}>
                查看
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
                修改
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
    const { tenementMemberList } = this.props;
    const data = tenementMemberList.dataSource.map((item, i) => {
      let statusName = item.status === 0 ? '已停用' : '已启用';
      return {
        key: i,
        id: item.cusId,
        account: item.username,
        realName: item.name,
        phoneNumber: item.mobile,
        project: item.projects.map(item => item.pjName).join('、'),
        // departmentBelongTo: '武汉事业部',
        // managedHousingEstate: '望江花园',
        status: item.status,
        statusName: statusName,
      };
    });
    const options = {
      current: this.props.options.current,
      defaultPageSize: this.props.options.pageSize,
      pageSizeOptions: this.props.options.pageSizeOptions,
      total: tenementMemberList.total,
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
        this.props.initTenementMemberList({
          current: page,
          pageSize: pageSize,
        });
      },
      onShowSizeChange: (current, size) => {
        this.props.options.pageSizeChange(current, size);
        this.props.initTenementMemberList({
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
