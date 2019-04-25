/**
 * Created by xu.long on 2018/5/12.
 */

import './style.scss';

import { Button, Form, Input, Layout, Pagination, Select, Table } from 'antd';
import React from 'react';
import { connect } from 'react-redux';

import { Toolbar } from '../../../../component/Toolbar/Toolbar';
import { dateFormat } from '../../../../util/util';
import { initOrganizationList } from './action';
import { getOrganizationList } from './selector';

const { Content } = Layout;
const FormItem = Form.Item;

class OrganizationManagement extends React.Component {
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
    this.props.initOrganizationList();
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
  onChange = value => {
    console.log(value);
  };
  //新增部门
  add = () => {
    this.props.history.push('addDepartment/add/0');
  };
  //编辑部门
  edit = id => {
    console.log('edit id: ' + id);
    this.props.history.push(`addDepartment/edit/${id}`);
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        let param = {};
        for (let item in values) {
          if (values[item]) {
            switch (item) {
              case 'departmentName':
                param['keyword'] = values[item];
                break;
              case 'companyBelongTo':
                param['company_id'] = values[item];
                break;
              case 'regionBelongTo':
                param['pid'] = values[item];
                break;
            }
          }
          console.log('item: ' + item);
        }
        this.props.initOrganizationList(param);
      }
    });
  };
  render() {
    const { getFieldDecorator, resetFields } = this.props.form;
    const { organizationList, initOrganizationList } = this.props;
    const list = [
      '物业管理',
      {
        label: '组织架构管理',
        to: '/index/organizationManagement',
      },
    ];
    return (
      <Layout id="organization_management">
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
              <FormItem label="部门名称">
                {getFieldDecorator('departmentName')(
                  <Input
                    onPressEnter={this.handleSubmit}
                    placeholder="请输入分类名称"
                    type="text"
                    style={{
                      width: '100%',
                      marginRight: '3%',
                    }}
                  />,
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
                    resetFields([
                      'departmentName',
                      'companyBelongTo',
                      'regionBelongTo',
                    ]);
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
            initOrganizationList={initOrganizationList}
            organizationList={organizationList}
            goCommodityDetail={this.goCommodityDetail}
            edit={this.edit}
          />
        </Content>
      </Layout>
    );
  }
}
const OrganizationManagementForm = Form.create()(OrganizationManagement);

const mapStateToProps = state => {
  return {
    organizationList: getOrganizationList(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initOrganizationList: param => {
      dispatch(initOrganizationList(param));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrganizationManagementForm);

class CustomTable extends React.Component {
  count = 0;
  constructor(props) {
    super(props);
  }
  combine = data => {
    let result = [];
    data.map((item, i) => {
      if (item.chrildren && item.chrildren.length > 0) {
        let statusName = item.status === 1 ? '启用' : '未启用';
        result.push({
          key: this.count++,
          id: item.id,
          departmentName: item.name,
          companyBelongTo: item.companyName,
          addedTime: !item.createTime ? '' : item.createTime,
          super_deptName: item.super_deptName,
          children: this.combine(item.chrildren),
        });
      } else {
        let statusName = item.status === 1 ? '启用' : '未启用';
        result.push({
          key: this.count++,
          id: item.id,
          departmentName: item.name,
          companyBelongTo: item.companyName,
          addedTime: !item.createTime ? '' : item.createTime,
          super_deptName: item.super_deptName,
        });
      }
    });
    return result;
  };
  render() {
    const columns = [
      {
        title: '事业部名称',
        dataIndex: 'departmentName',
        key: 'departmentName',
      },
      {
        title: '所属物业公司',
        dataIndex: 'companyBelongTo',
        key: 'companyBelongTo',
      },
      {
        title: '所属上一级架构',
        dataIndex: 'super_deptName',
        key: 'super_deptName',
      },
      {
        title: '新增时间',
        dataIndex: 'addedTime',
        key: 'addedTime',
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <a
              onClick={() => {
                console.log(
                  `编辑text: ${JSON.stringify(text)}, record: ${JSON.stringify(
                    record,
                  )}`,
                );
                this.props.edit(record.id);
              }}>
              修改
            </a>
          </span>
        ),
      },
    ];
    const { organizationList } = this.props;
    const data = this.combine(organizationList.dataSource);

    return (
      <div>
        <Table columns={columns} dataSource={data} pagination={false} />
      </div>
    );
  }
}
