import { Button, Form, Input, Modal, Table } from 'antd';
import React from 'react';
import { connect } from 'react-redux';

import { initOrganizationList } from '../../../TenementContainer/OrganizationManagement/RootContainer/action';
import { getOrganizationList } from '../../../TenementContainer/OrganizationManagement/RootContainer/selector';

const FormItem = Form.Item;

class OrganizationListModal extends React.Component {
  state = {
    selectedRowKeys: [],
    selectedRow: [],
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.selectedRowKeys.length) return null;
    return {
      selectedRow: nextProps.selectedRow,
      selectedRowKeys: nextProps.selectedRow.map(item => item.id),
    };
  }
  componentDidMount() {
    this.initOrganizationList();
  }

  initOrganizationList = () => {
    let params = this.props.form.getFieldsValue();
    this.props.initOrganizationList(params);
  };

  combine = data => {
    let result = [];
    data.map((item, i) => {
      if (item.chrildren && item.chrildren.length > 0) {
        result.push({
          key: item.id,
          id: item.id,
          name: item.name,
          managerArea: item.managerArea,
          children: this.combine(item.chrildren),
        });
      } else {
        result.push({
          key: item.id,
          id: item.id,
          name: item.name,
          managerArea: item.managerArea,
        });
      }
    });
    return result;
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
    const columns = [
      { title: '部门名称', dataIndex: 'name' },
      {
        title: '管理范围',
        dataIndex: 'managerArea',
      },
    ];

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
    const data = this.combine(this.props.organizationList.dataSource);
    return (
      <Modal
        visible={this.props.modal.visible}
        onCancel={this.hideModalAndReset}
        onOk={this.onModalOk}
        width="800px">
        <Form layout="inline">
          <div>
            <FormItem label="事业部名称">
              {getFieldDecorator('keyword')(<Input />)}
            </FormItem>
            <Button
              type="primary"
              onClick={this.initOrganizationList}
              style={{ marginRight: '10px' }}>
              查询
            </Button>
            <Button onClick={() => resetFields()}>重置</Button>
          </div>
        </Form>
        {data.length ? (
          <Table
            defaultExpandAllRows={true}
            style={{ overflow: 'scroll', maxHeight: '50rem' }}
            columns={columns}
            dataSource={data}
            pagination={false}
            rowSelection={rowSelection}
          />
        ) : null}
      </Modal>
    );
  }
}
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
)(Form.create()(OrganizationListModal));
