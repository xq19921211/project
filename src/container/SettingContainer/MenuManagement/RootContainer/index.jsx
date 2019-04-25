/**
 * Created by xu.long on 2018/6/18.
 */
import './style.scss';

import { Button, Divider, Form, Input, Layout, Select, Table } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { Toolbar } from '../../../../component/Toolbar/Toolbar';
import { initMenuList, modifyListStatus } from './action';
import { getMenuList } from './selector';

const { Content } = Layout;
const FormItem = Form.Item;
const InputGroup = Input.Group;
const Option = Select.Option;

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchMenuName: '',
    };
  }

  componentWillMount() {
    this.props.initMenuList();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let param = {};
        for (let item in values) {
          switch (item) {
            case 'status':
              param['status'] = values[item] === '2' ? '' : values[item];
              break;
          }
        }
        this.setState({ searchMenuName: values.name });
        this.props.initMenuList(param);
      }
    });
  };
  //新增菜单
  add = () => {
    this.props.history.push('addMenu/add/0');
  };
  //编辑菜单
  edit = id => {
    console.log('edit id: ' + id);
    this.props.history.push(`addMenu/edit/${id}`);
  };
  changeStatus = param => {
    console.log('下架');
    this.props.modifyListStatus(param);
  };

  render() {
    const { resetFields, getFieldDecorator } = this.props.form;
    const { menuList, initMenuList } = this.props;
    const list = [
      '系统设置',
      {
        label: '菜单管理',
        to: '/index/menuManagement',
      },
    ];
    return (
      <Layout id="commodity_classify">
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
              <FormItem label="菜单名称">
                {getFieldDecorator('name', {
                  initialValue: '',
                })(
                  <Input
                    onPressEnter={this.handleSubmit}
                    placeholder="请输入菜单名称"
                    type="text"
                    style={{
                      width: '100%',
                      marginRight: '3%',
                    }}
                  />,
                )}
              </FormItem>
              <FormItem label="状态">
                {getFieldDecorator('status', {
                  initialValue: '2',
                })(
                  <Select>
                    <Option value={'2'}>--全部--</Option>
                    <Option value={'1'}>已启用</Option>
                    <Option value={'0'}>已停用</Option>
                  </Select>,
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
                    resetFields(['name', 'status']);
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
            menuList={menuList}
            goCommodityDetail={this.goCommodityDetail}
            searchMenuName={this.state.searchMenuName}
            edit={this.edit}
            initMenuList={initMenuList}
            changeStatus={this.changeStatus}
          />
        </Content>
      </Layout>
    );
  }
}
const MenuForm = Form.create()(Menu);

const mapStateToProps = state => {
  return {
    menuList: getMenuList(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initMenuList: param => {
      dispatch(initMenuList(param));
    },
    modifyListStatus: param => {
      dispatch(modifyListStatus(param));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MenuForm);

class CustomTable extends React.Component {
  count = 0;
  expandedRowKeys = [];
  constructor(props) {
    super(props);
    this.state = {
      classifyList: [],
      expandedRowKeys: [],
    };
  }
  componentWillReceiveProps(nextProps) {
    const { menuList } = nextProps;
    if (menuList && menuList !== this.props.menuList && menuList.dataSource) {
      this.count = 0;
      const data = this.combine(menuList.dataSource);
      this.setState({
        expandedRowKeys: this.findExpandedRowKeys(data),
      });
    }
  }
  findExpandedRowKeys = list => {
    return list.reduce((expanded, next) => {
      if (next.children && next.children.length) {
        expanded.push(next.key);
        return [...expanded, ...this.findExpandedRowKeys(next.children)];
      }
      return expanded;
    }, []);
  };
  onExpandedRowsChange = expandedRowKeys => {
    this.setState({ expandedRowKeys });
  };
  combine = data => {
    let result = [];
    data.map((item, i) => {
      const key = this.count++;
      if (item.chrildren && item.chrildren.length > 0) {
        let statusName = item.menuStatus === 1 ? '已启用' : '已停用';
        result.push({
          key,
          id: item.menuId,
          name: item.menuName,
          menuAddress: item.menuUrl,
          order: item.menuSort,
          status: item.menuStatus,
          statusName: statusName,
          children: this.combine(item.chrildren),
        });
      } else {
        let statusName = item.menuStatus === 1 ? '已启用' : '已停用';
        result.push({
          key,
          id: item.menuId,
          name: item.menuName,
          menuAddress: item.menuUrl,
          order: item.menuSort,
          status: item.menuStatus,
          statusName: statusName,
        });
      }
    });
    return result;
  };
  filterByMenuName = (record, index) => {
    const { searchMenuName } = this.props;
    if (searchMenuName === '') return '';
    if (
      record.children &&
      record.children.length &&
      this.isChildrenIncludesMenuName(record.children, searchMenuName)
    ) {
      return '';
    }
    return record.name.includes(searchMenuName) ? '' : 'hide';
  };
  isChildrenIncludesMenuName = (list, name) => {
    return !!list.filter(item => item.name.includes(name)).length;
  };
  render() {
    const columns = [
      {
        title: '菜单名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '菜单地址',
        dataIndex: 'menuAddress',
        key: 'workType',
      },
      {
        title: '排序号',
        dataIndex: 'order',
        key: 'order',
        sorter: (a, b) => a.backEndOrder - b.backEndOrder,
      },
      {
        title: '状态',
        dataIndex: 'statusName',
        key: 'statusName',
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => {
          let strValue;
          switch (record.status) {
            case 1:
              strValue = '停用';
              break;
            case 0:
              strValue = '启用';
              break;
          }
          return (
            <span>
              <a
                onClick={() => {
                  this.props.edit(record.id);
                }}>
                编辑
              </a>
              <Divider type="vertical" />
              <a
                onClick={() => {
                  if (record.status === 0) {
                    record.status = 1;
                  } else {
                    record.status = 0;
                  }
                  this.props.changeStatus(record);
                }}>
                {strValue}
              </a>
            </span>
          );
        },
      },
    ];
    const { menuList } = this.props;
    this.count = 0;
    const data = this.combine(menuList.dataSource);
    return (
      <div>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          expandedRowKeys={this.state.expandedRowKeys}
          onExpandedRowsChange={this.onExpandedRowsChange}
          rowClassName={this.filterByMenuName}
        />
      </div>
    );
  }
}
