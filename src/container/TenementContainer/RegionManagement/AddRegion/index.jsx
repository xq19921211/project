/**
 * Created by xu.long on 2018/5/12.
 */
import React from 'react';
import {
  Layout,
  Form,
  Input,
  Select,
  Radio,
  Icon,
  Modal,
  Button,
  Cascader,
  TimePicker,
  Table,
  Pagination,
} from 'antd';
import moment from 'moment';
import { Toolbar } from '../../../../component/Toolbar/Toolbar';
import './style.scss';
const { Content } = Layout;
const FormItem = Form.Item;
const InputGroup = Input.Group;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
class AddRegion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      regionSelectModalVisible: false,
      selectedRows: [],
    };
  }
  setRegionSelectModalVisible = regionSelectModalVisible => {
    console.log(`regionSelectModalVisible: ${regionSelectModalVisible}`);
    this.setState({ regionSelectModalVisible });
  };

  isOk = (regionSelectModalVisible, selectedRows) => {
    console.log(
      `regionSelectModalVisible: ${regionSelectModalVisible} and selectedRows: ${JSON.stringify(
        selectedRows,
      )}`,
    );
    this.setRegionSelectModalVisible(regionSelectModalVisible);
    this.setState({ selectedRows });
  };
  areaOnChange = e => {
    console.log(value);
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
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
    const options = [
      {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
          {
            value: 'hangzhou',
            label: 'Hangzhou',
            children: [
              {
                value: 'xihu',
                label: 'West Lake',
              },
            ],
          },
        ],
      },
      {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
          {
            value: 'nanjing',
            label: 'Nanjing',
            children: [
              {
                value: 'zhonghuamen',
                label: 'Zhong Hua Men',
              },
            ],
          },
        ],
      },
    ];
    return (
      <Layout id="add_region">
        <Toolbar
          type={1}
          list={['物业管理', '大区管理', '新增大区']}
          title="新增大区"
        />
        <Content className="content">
          <div>
            <Form onSubmit={this.handleSubmit}>
              <FormItem {...formItemLayout} label="大区名称" required={true}>
                {getFieldDecorator('regionName', {
                  rules: [
                    {
                      required: true,
                      message: '请输入大区名称',
                    },
                  ],
                })(
                  <Input
                    placeholder="请输入大区名称"
                    type="text"
                    style={{
                      width: '50%',
                      marginRight: '3%',
                    }}
                  />,
                )}
                <Button
                  icon="plus"
                  type="primary"
                  onClick={() => {
                    console.log('选择已有大区');
                    this.setRegionSelectModalVisible(true);
                  }}>
                  选择已有大区
                </Button>
                <RegionSelectModalForm
                  visible={this.state.regionSelectModalVisible}
                  onOk={this.isOk}
                  onCancel={this.setRegionSelectModalVisible}
                />
              </FormItem>
              <FormItem {...formItemLayout} label="所属公司">
                {getFieldDecorator('companyBelongTo')(
                  <InputGroup>
                    <Select defaultValue="请选择物业公司">
                      <Option value="All">全部</Option>
                      <Option value="Part">部分</Option>
                    </Select>
                  </InputGroup>,
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="管理范围">
                {getFieldDecorator('managementRange')(
                  <TextArea
                    rows={4}
                    placeholder="请输入管理范围"
                    type="text"
                    style={{
                      width: '100%',
                      marginRight: '3%',
                    }}
                  />,
                )}
              </FormItem>
              <div className="submit">
                <FormItem
                  style={{
                    paddingBottom: '2.4rem',
                    marginBottom: 0,
                  }}
                  {...formItemLayoutWithOutLabel}>
                  <Button type="primary" htmlType="submit">
                    提交
                  </Button>
                  <Button
                    style={{ marginLeft: '2rem' }}
                    type="default"
                    onClick={() => {
                      this.props.history.goBack();
                    }}>
                    返回
                  </Button>
                </FormItem>
              </div>
            </Form>
          </div>
        </Content>
      </Layout>
    );
  }
}

export const AddRegionForm = Form.create()(AddRegion);

class RegionSelectModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [], // Check here to configure the default column
      selectedRows: [],
    };
  }
  onSelectChange = (selectedRowKeys, selectedRows) => {
    console.log(
      'selectedRowKeys changed: ',
      selectedRowKeys +
        ' selectedRows changed: ' +
        JSON.stringify(selectedRows),
    );
    this.setState({ selectedRowKeys, selectedRows });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Modal
          width="90rem"
          wrapClassName="vertical-center-modal"
          visible={this.props.visible}
          onOk={() => this.props.onOk(false, this.state.selectedRows)}
          onCancel={() => this.props.onCancel(false)}
          cancelText="取消"
          okText="确定">
          <div>
            <Form layout="inline" onSubmit={this.handleSubmit}>
              <FormItem label="大区名称">
                {getFieldDecorator('regionName')(
                  <Input
                    placeholder="请输入大区名称"
                    type="text"
                    style={{
                      width: '100%',
                      marginRight: '3%',
                    }}
                  />,
                )}
              </FormItem>
              <FormItem>
                <Button type="primary" style={{ marginRight: '1rem' }}>
                  查询
                </Button>
                <Button type="default">重置</Button>
              </FormItem>
            </Form>
            <CustomTable onSelectChange={this.onSelectChange} />
          </div>
        </Modal>
      </div>
    );
  }
}
const RegionSelectModalForm = Form.create()(RegionSelectModal);

class CustomTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const columns = [
      {
        title: '大区名称',
        dataIndex: 'regionName',
        key: 'regionName',
      },
      {
        title: '管理范围',
        dataIndex: 'managementRange',
        key: 'managementRange',
      },
    ];

    const data = [
      {
        key: '1',
        regionName: '华东大区',
        managementRange: '负责管理上海、浙江、江苏省的业务范围',
      },
      {
        key: '2',
        regionName: '华东大区',
        managementRange: '负责管理上海、浙江、江苏省的业务范围',
      },
      {
        key: '3',
        regionName: '华东大区',
        managementRange: '负责管理上海、浙江、江苏省的业务范围',
      },
      {
        key: '4',
        regionName: '华东大区',
        managementRange: '负责管理上海、浙江、江苏省的业务范围',
      },
      {
        key: '5',
        regionName: '华东大区',
        managementRange: '负责管理上海、浙江、江苏省的业务范围',
      },
      {
        key: '6',
        regionName: '华东大区',
        managementRange: '负责管理上海、浙江、江苏省的业务范围',
      },
      {
        key: '7',
        regionName: '华东大区',
        managementRange: '负责管理上海、浙江、江苏省的业务范围',
      },
      {
        key: '8',
        regionName: '华东大区',
        managementRange: '负责管理上海、浙江、江苏省的业务范围',
      },
    ];
    const options = {
      defaultPageSize: 4,
      pageSizeOptions: ['4', '5', '6'],
      total: 40,
      showSizeChanger: true,
      showQuickJumper: true,
      onChange: (page, pageSize) => {
        console.log(
          '页码改变的回调，参数是改变后的页码: ' +
            page +
            ',及每页条数: ' +
            pageSize,
        );
      },
      onShowSizeChange: (current, size) => {},
    };
    // const { selectedRowKeys } = this.state;
    const rowSelection = {
      // selectedRowKeys,
      onChange: this.props.onSelectChange,
      type: 'radio',
    };
    return (
      <div>
        <Table
          style={{ overflow: 'scroll', maxHeight: '50rem' }}
          columns={columns}
          dataSource={data}
          pagination={false}
          rowSelection={rowSelection}
        />
        <Pagination
          style={{
            marginTop: '2rem',
          }}
          {...options}
        />
      </div>
    );
  }
}
