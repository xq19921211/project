/**
 * Created by xu.long on 2018/5/12.
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
  Cascader,
} from 'antd';
import { Toolbar } from '../../../../component/Toolbar/Toolbar';
import './style.scss';
const { Content } = Layout;
const FormItem = Form.Item;
const InputGroup = Input.Group;
const Option = Select.Option;

class RegionManagement extends React.Component {
  constructor(props) {
    super(props);
  }
  onChange = value => {
    console.log(value);
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Layout id="region_management">
        <Toolbar type={1} list={['物业管理', '大区管理']} title="查询表格" />
        <Content className="content">
          <div>
            <Form
              style={{
                display: 'flex',
                justifyContent: 'space-around',
              }}
              layout="inline"
              onSubmit={this.handleSubmit}>
              <FormItem
                style={{ flex: 1, textAlign: 'center' }}
                label="大区名称">
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
              <FormItem
                style={{ flex: 1, textAlign: 'center' }}
                label="所属公司">
                {getFieldDecorator('companyBelongTo')(
                  <InputGroup>
                    <Select defaultValue="全部">
                      <Option value="All">全部</Option>
                      <Option value="Part">部分</Option>
                    </Select>
                  </InputGroup>,
                )}
              </FormItem>
              <FormItem style={{ flex: 1, textAlign: 'center' }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginRight: '1rem' }}>
                  查询
                </Button>
                <Button
                  type="default"
                  htmlType="reset"
                  style={{ marginRight: '1rem' }}>
                  重置
                </Button>
                <Button
                  icon="plus"
                  type="primary"
                  onClick={() => {
                    this.props.history.push('addRegion');
                  }}>
                  新增
                </Button>
              </FormItem>
            </Form>
          </div>
          <CustomTable />
        </Content>
      </Layout>
    );
  }
}
export const RegionManagementForm = Form.create()(RegionManagement);

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
        title: '所属物业公司',
        dataIndex: 'companyBelongTo',
        key: 'companyBelongTo',
      },
      {
        title: '事业部数量',
        dataIndex: 'departmentAmount',
        key: 'departmentAmount',
      },
      {
        title: '项目数量',
        dataIndex: 'projectAmount',
        key: 'projectAmount',
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
            <a href="javascript:;">修改</a>
          </span>
        ),
      },
    ];

    const data = [
      {
        key: '1',
        regionName: '华东大区',
        companyBelongTo: '彩之云物业管理有限公司',
        departmentAmount: '8',
        projectAmount: '30',
        addedTime: '2016-09-21  08:50:08',
      },
      {
        key: '2',
        regionName: '华东大区',
        companyBelongTo: '彩之云物业管理有限公司',
        departmentAmount: '8',
        projectAmount: '30',
        addedTime: '2016-09-21  08:50:08',
      },
      {
        key: '3',
        regionName: '华东大区',
        companyBelongTo: '彩之云物业管理有限公司',
        departmentAmount: '8',
        projectAmount: '30',
        addedTime: '2016-09-21  08:50:08',
      },
      {
        key: '4',
        regionName: '华东大区',
        companyBelongTo: '彩之云物业管理有限公司',
        departmentAmount: '8',
        projectAmount: '30',
        addedTime: '2016-09-21  08:50:08',
      },
      {
        key: '5',
        regionName: '华东大区',
        companyBelongTo: '彩之云物业管理有限公司',
        departmentAmount: '8',
        projectAmount: '30',
        addedTime: '2016-09-21  08:50:08',
      },
      {
        key: '6',
        regionName: '华东大区',
        companyBelongTo: '彩之云物业管理有限公司',
        departmentAmount: '8',
        projectAmount: '30',
        addedTime: '2016-09-21  08:50:08',
      },
      {
        key: '7',
        regionName: '华东大区',
        companyBelongTo: '彩之云物业管理有限公司',
        departmentAmount: '8',
        projectAmount: '30',
        addedTime: '2016-09-21  08:50:08',
      },
      {
        key: '8',
        regionName: '华东大区',
        companyBelongTo: '彩之云物业管理有限公司',
        departmentAmount: '8',
        projectAmount: '30',
        addedTime: '2016-09-21  08:50:08',
      },
      {
        key: '9',
        regionName: '华东大区',
        companyBelongTo: '彩之云物业管理有限公司',
        departmentAmount: '8',
        projectAmount: '30',
        addedTime: '2016-09-21  08:50:08',
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
    return (
      <div>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          onRow={(record, index) => {
            return {
              onClick: () => {
                this.props.goCommodityDetail();
              }, // 点击行
              onMouseEnter: () => {}, // 鼠标移入行
            };
          }}
        />
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
