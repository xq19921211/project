/**
 * Created by xu.long on 2018/4/23.
 */
import './style.scss';

import {
  Button,
  Cascader,
  Form,
  Input,
  Layout,
  Pagination,
  Select,
  Table,
} from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { Toolbar } from '../../../../component/Toolbar/Toolbar';
import { initTenementCompanyList } from './action';
import { getTenementCompanyList } from './selector';

const { Content } = Layout;
const FormItem = Form.Item;

class TenementCompanyManagement extends React.Component {
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

  componentWillMount() {
    this.props.initTenementCompanyList({
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
  onChange = value => {
    console.log(value);
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
              case 'companyName':
                param['keyword'] = values[item];
                break;
              case 'area':
                param['province'] = values[item][0];
                param['city'] = values[item][1];
                param['region'] = values[item][2];
                break;
            }
          }
        }
        this.props.initTenementCompanyList(param);
        this.pageChange(1, this.state.options.pageSize);
      }
    });
  };
  //新增项目
  add = () => {
    this.props.history.push('addTenementCompany/add/0');
  };
  //编辑项目
  edit = id => {
    console.log('edit id: ' + id);
    this.props.history.push(`addTenementCompany/edit/${id}`);
  };

  render() {
    const { getFieldDecorator, resetFields } = this.props.form;
    const { tenementCompanyList, initTenementCompanyList } = this.props;
    const options = window.address;
    const list = [
      '物业管理',
      {
        label: '物业公司管理',
        to: '/index/tenementCompanyManagement',
      },
    ];
    return (
      <Layout id="tenement_company_management">
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
              <FormItem label="公司名称">
                {getFieldDecorator('companyName')(
                  <Input
                    onPressEnter={this.handleSubmit}
                    placeholder="请输入公司名称"
                    type="text"
                    style={{
                      width: '100%',
                      marginRight: '3%',
                    }}
                  />,
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
                    resetFields(['companyName', 'area', 'contact']);
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
            tenementCompanyList={tenementCompanyList}
            options={this.state.options}
            goCommodityDetail={this.goCommodityDetail}
            edit={this.edit}
            initTenementCompanyList={initTenementCompanyList}
          />
        </Content>
      </Layout>
    );
  }
}
const TenementCompanyManagementForm = Form.create()(TenementCompanyManagement);

const mapStateToProps = state => {
  return {
    tenementCompanyList: getTenementCompanyList(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initTenementCompanyList: param => {
      dispatch(initTenementCompanyList(param));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TenementCompanyManagementForm);

class CustomTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const columns = [
      {
        title: '公司名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '所在地区',
        dataIndex: 'region',
        key: 'region',
      },
      {
        title: '公司地址',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: '联系电话',
        dataIndex: 'contact',
        key: 'contact',
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
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
    const { tenementCompanyList } = this.props;
    const data = tenementCompanyList.dataSource.map((item, i) => {
      return {
        key: i,
        id: item.id,
        name: item.name,
        region:
          (item.province === null ? '' : item.province) + item.city + item.area,
        address: item.address,
        contact: item.phone,
        createTime: item.createTime,
      };
    });
    const options = {
      current: this.props.options.current,
      defaultPageSize: this.props.options.pageSize,
      pageSizeOptions: this.props.options.pageSizeOptions,
      total: tenementCompanyList.total,
      showTotal: total => `共 ${total} 条记录`,
      showSizeChanger: true,
      showQuickJumper: true,
      onChange: (page, pageSize) => {
        this.props.options.pageSizeChange(page, pageSize);
        this.props.initTenementCompanyList({
          current: page,
          pageSize: pageSize,
        });
      },
      onShowSizeChange: (current, size) => {
        this.props.options.pageSizeChange(current, size);
        this.props.initTenementCompanyList({
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
