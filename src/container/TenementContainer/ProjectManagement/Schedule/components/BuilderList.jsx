import {
  Button,
  Form,
  Input,
  Layout,
  Pagination,
  Radio,
  Select,
  Table,
} from 'antd';
import React from 'react';
import { connect } from 'react-redux';

import { initBuilderList } from '../../../../MerchantContainer/BuilderManagement/RootContainer/action';
import { getBuilderList } from '../../../../MerchantContainer/BuilderManagement/RootContainer/selector';

const FormItem = Form.Item;

class BuilderList extends React.Component {
  state = {
    pageIndex: 1,
    pageSize: 10,
  };
  componentDidMount() {
    this.getList();
  }
  getList = () => {
    let params = this.props.form.getFieldsValue();
    this.props.initBuilderList({ ...this.state, ...params });
  };

  render() {
    const { getFieldDecorator, resetFields } = this.props.form;
    const { builderList } = this.props;
    const columns = [
      { title: '用户名称', dataIndex: 'username' },
      { title: '真实姓名', dataIndex: 'oprName' },
      { title: '保安队', dataIndex: 'teamName' },
    ];
    const onPaginationChange = (pageIndex, pageSize) => {
      this.setState({ pageIndex, pageSize }, () => this.getList());
    };
    const options = {
      current: builderList.current,
      pageSize: builderList.pageSize,
      total: builderList.total,
      showTotal: total => `共 ${total} 条记录`,
      showSizeChanger: true,
      showQuickJumper: true,
      onChange: onPaginationChange,
      onShowSizeChange: onPaginationChange,
    };
    const rowSelection = {
      type: 'radio',
      onChange: this.props.onSelectRowChange,
      selectedRowKeys: this.props.selectedRowKeys,
    };

    return (
      <div>
        <Form layout="inline">
          <div>
            <FormItem label="用户名称">
              {getFieldDecorator('keyword')(<Input />)}
            </FormItem>
            <Button
              type="primary"
              onClick={() =>
                this.setState({ pageIndex: 1 }, () => this.getList())
              }
              style={{ marginRight: '10px' }}>
              查询
            </Button>
            <Button onClick={() => resetFields()}>重置</Button>
          </div>
        </Form>
        <Table
          columns={columns}
          dataSource={builderList.dataSource}
          pagination={false}
          rowKey={row => String(row.oprUuid)}
          rowSelection={rowSelection}
        />
        <Pagination style={{ marginTop: '15px' }} {...options} />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    builderList: getBuilderList(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initBuilderList: param => {
      dispatch(initBuilderList(param));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form.create()(BuilderList));
