import { Button, Form, Input, Table } from 'antd';

import React from 'react';
import { connect } from 'react-redux';
import { getOrganizationList } from '../../../OrganizationManagement/RootContainer/selector';
import { initOrganizationList } from '../../../OrganizationManagement/RootContainer/action';

const FormItem = Form.Item;

class OrganizationList extends React.Component {
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
          managementRange: item.managerArea,
          children: this.combine(item.chrildren),
        });
      } else {
        result.push({
          key: item.id,
          id: item.id,
          name: item.name,
          managementRange: item.managerArea,
        });
      }
    });
    return result;
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
      onChange: this.props.onSelectRowChange,
      selectedRowKeys: this.props.selectedRowKeys,
    };
    const data = this.combine(this.props.organizationList.dataSource);
    return (
      <div>
        <Form layout="inline">
          <div>
            <FormItem label="部门名称">
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
        {data.length && (
          <Table
            defaultExpandAllRows={true}
            style={{ overflow: 'scroll', maxHeight: '50rem' }}
            columns={columns}
            dataSource={data}
            pagination={false}
            rowSelection={rowSelection}
          />
        )}
      </div>
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
)(Form.create()(OrganizationList));
