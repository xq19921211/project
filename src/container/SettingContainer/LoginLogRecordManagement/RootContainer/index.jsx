/**
 * Created by xu.long on 2018/6/18.
 */
import React from 'react';
import {
  Layout,
  Form,
  Input,
  Button,
  Select,
  Table,
  Pagination,
  Row,
  Col,
} from 'antd';
import { Toolbar } from '../../../../component/Toolbar/Toolbar';
import './style.scss';
import { connect } from 'react-redux';
import { getLogRecordList } from './selector';
import { initLogRecordList } from './action';
import { dateFormat } from '../../../../util/util';
const { Content } = Layout;
const FormItem = Form.Item;
const InputGroup = Input.Group;
const Option = Select.Option;
class LoginLogRecordManagement extends React.Component {
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
    this.props.initLogRecordList({
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
          switch (item) {
            case 'name':
              param['keyword'] = values[item];
              break;
            case 'operator':
              param['operator'] = values[item];
              break;
          }
        }
        console.log('param: ' + JSON.stringify(param));
        this.props.initLogRecordList(param);
        this.pageChange(1, this.state.options.pageSize);
      }
    });
  };

  render() {
    const { getFieldDecorator, resetFields } = this.props.form;
    const { logRecordList, initLogRecordList } = this.props;
    const list = [
      '系统设置',
      {
        label: '登录日志',
        to: '/index/loginLogRecordManagement',
      },
    ];
    return (
      <Layout id="login_log_record_management">
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
              <FormItem label="操作名称">
                {getFieldDecorator('name')(
                  <Input
                    onPressEnter={this.handleSubmit}
                    placeholder="请输入操作名称"
                    type="text"
                  />,
                )}
              </FormItem>
              <FormItem label="操作人">
                {getFieldDecorator('operator')(
                  <Input
                    onPressEnter={this.handleSubmit}
                    placeholder="请输入操作人"
                    type="text"
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
                    resetFields(['name', 'operator']);
                  }}>
                  重置
                </Button>
              </FormItem>
            </Form>
          </div>
          <CustomTable
            options={this.state.options}
            logRecordList={logRecordList}
            initLogRecordList={initLogRecordList}
          />
        </Content>
      </Layout>
    );
  }
}
const LoginLogRecordManagementForm = Form.create()(LoginLogRecordManagement);

const mapStateToProps = state => {
  return {
    logRecordList: getLogRecordList(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initLogRecordList: param => {
      dispatch(initLogRecordList(param));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginLogRecordManagementForm);

class CustomTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const columns = [
      {
        title: '操作名称',
        dataIndex: 'action',
        key: 'action',
      },
      {
        title: '操作结果',
        dataIndex: 'result',
        key: 'result',
      },
      {
        title: '操作人',
        dataIndex: 'operator',
        key: 'operator',
      },
      {
        title: '操作时间',
        dataIndex: 'operateTime',
        key: 'operateTime',
      },
    ];
    const { logRecordList } = this.props;
    const data = logRecordList.dataSource.map((item, i) => {
      return {
        key: i,
        id: item.id,
        action: item.action,
        param: item.param,
        // result: item.description,
        result: item.description ? JSON.parse(item.description).message : '',
        operator: item.username,
        operateTime: !item.logintime ? '' : item.logintime,
      };
    });
    const options = {
      current: this.props.options.current,
      defaultPageSize: this.props.options.pageSize,
      pageSizeOptions: this.props.options.pageSizeOptions,
      total: logRecordList.total,
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
        this.props.initLogRecordList({
          current: page,
          pageSize: pageSize,
        });
      },
      onShowSizeChange: (current, size) => {
        this.props.options.pageSizeChange(current, size);
        this.props.initLogRecordList({
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
