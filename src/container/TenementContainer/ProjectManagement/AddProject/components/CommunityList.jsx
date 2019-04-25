import {
  Button,
  Col,
  Divider,
  Form,
  Icon,
  Input,
  Layout,
  Modal,
  Pagination,
  Radio,
  Row,
  Select,
  Table,
} from 'antd';

import React from 'react';
import { connect } from 'react-redux';
import { initIceList as getIceList } from '../../../OrganizationManagement/AddDepartment/action';
import { getIceList as getIceListSelector } from '../../../OrganizationManagement/AddDepartment/selector';

const { Content } = Layout;
const FormItem = Form.Item;
const InputGroup = Input.Group;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const { TextArea } = Input;

class CommunityList extends React.Component {
  state = {
    pageIndex: 1,
    pageSize: 10,
    orgType: '小区',
  };
  componentDidMount() {
    this.getIceList();
  }
  getIceList = () => {
    let params = this.props.form.getFieldsValue();
    this.props.getIceList({ ...this.state, ...params });
  };

  render() {
    const { getFieldDecorator, getFieldValue, resetFields } = this.props.form;
    const { iceListTableInfo } = this.props;
    const columns = [
      { title: '项目名称', dataIndex: 'name' },
      {
        title: '项目地址',
        dataIndex: 'city',
        render: (_, { province, city, region }) =>
          province && city && region && `${province}${city}${region}`,
      },
    ];
    const onPaginationChange = (pageIndex, pageSize) => {
      this.setState({ pageIndex, pageSize }, () => this.getIceList());
    };
    const options = {
      current: iceListTableInfo.currentPage,
      pageSize: iceListTableInfo.pageSize,
      total: iceListTableInfo.totalRecord,
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
            <FormItem label="项目名称">
              {getFieldDecorator('key')(<Input />)}
            </FormItem>
            <Button
              type="primary"
              onClick={() =>
                this.setState({ pageIndex: 1 }, () => this.getIceList())
              }
              style={{ marginRight: '10px' }}>
              查询
            </Button>
            <Button onClick={() => resetFields()}>重置</Button>
          </div>
        </Form>
        <Table
          columns={columns}
          dataSource={iceListTableInfo.content}
          pagination={false}
          rowKey={row => String(row.orgUuid)}
          rowSelection={rowSelection}
        />
        <Pagination style={{ marginTop: '15px' }} {...options} />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    iceListTableInfo: getIceListSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getIceList: param => {
      dispatch(getIceList(param));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form.create()(CommunityList));
