import {
  Button,
  Form,
  Input,
  Layout,
  Modal,
  Pagination,
  Radio,
  Select,
  Table,
} from 'antd';
import React from 'react';
import { connect } from 'react-redux';

import { initBuilderList } from '../../../MerchantContainer/BuilderManagement/RootContainer/action';
import { getBuilderList } from '../../../MerchantContainer/BuilderManagement/RootContainer/selector';

const FormItem = Form.Item;

class BuilderList extends React.Component {
  state = {
    current: 1,
    pageSize: 10,
    selectedRowKeys: [],
    selectedRow: [],
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.selectedRowKeys.length) return null;
    return {
      selectedRow: nextProps.selectedRow,
      selectedRowKeys: nextProps.selectedRow.map(item => item.oprUuid),
    };
  }

  componentDidMount() {
    this.getList();
  }
  getList = () => {
    let params = this.props.form.getFieldsValue();
    this.props.initBuilderList({ ...this.state, ...params });
  };

  hideModalAndReset = () => {
    this.props.modal.hide();
    this.setState({ selectedRowKeys: [], selectedRow: [] });
  };

  onModalOk = () => {
    this.props.onModalOk(this.state.selectedRow);
    this.hideModalAndReset();
  };

  render() {
    const { getFieldDecorator, resetFields } = this.props.form;
    const { builderList, modal } = this.props;
    const columns = [
      { title: '姓名', dataIndex: 'oprName' },
      { title: '用户名', dataIndex: 'username' },
      { title: '施工队名称', dataIndex: 'teamName' },
    ];
    const onPaginationChange = (current, pageSize) => {
      this.setState({ current, pageSize }, () => this.getList());
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
      onChange: (key, row) => {
        this.setState({
          selectedRowKeys: key,
          selectedRow: row,
        });
      },
      selectedRowKeys: this.state.selectedRowKeys,
    };

    return (
      <Modal
        visible={modal.visible}
        onCancel={this.hideModalAndReset}
        onOk={this.onModalOk}
        width="800px">
        <Form layout="inline">
          <div>
            <FormItem label="用户名称">
              {getFieldDecorator('keyword')(
                <Input placeholder="请输入姓名或oa账号" />,
              )}
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
      </Modal>
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
