import { Button, Form, Input, Modal, Pagination, Table } from 'antd';
import React from 'react';
import { connect } from 'react-redux';

import * as proActions from '../../../TenementContainer/ProjectManagement/RootContainer/action';
import { getProjectList as getProjectListSelector } from '../../../TenementContainer/ProjectManagement/RootContainer/selector';

const FormItem = Form.Item;

class ProjectListModal extends React.Component {
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
      selectedRowKeys: nextProps.selectedRow.map(item => String(item.pjId)),
    };
  }
  componentDidMount() {
    this.getList();
  }

  getList = () => {
    let params = this.props.form.getFieldsValue();
    this.props.initProjectList({ ...this.state, ...params });
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
    const columns = [
      {
        title: '项目名称',
        dataIndex: 'pjName',
      },
      {
        title: '所属组织架构',
        dataIndex: 'departName',
      },
      {
        title: '项目地址',
        dataIndex: 'pjAddress',
      },
    ];
    const { getFieldDecorator, resetFields } = this.props.form;

    const { tableData, modal } = this.props;
    const onPaginationChange = (current, pageSize) => {
      this.setState({ current, pageSize }, () => this.getList());
    };
    const options = {
      current: tableData.current,
      pageSize: tableData.pageSize,
      total: tableData.total,
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
            <FormItem label="项目名称">
              {getFieldDecorator('name')(<Input />)}
            </FormItem>
            <FormItem label="事业部名称">
              {getFieldDecorator('departname')(<Input />)}
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
          dataSource={tableData.dataSource}
          pagination={false}
          rowKey={row => String(row.pjId)}
          rowSelection={rowSelection}
        />
        <Pagination style={{ marginTop: '15px' }} {...options} />
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    tableData: getProjectListSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initProjectList: params => dispatch(proActions.initProjectList(params)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form.create()(ProjectListModal));
