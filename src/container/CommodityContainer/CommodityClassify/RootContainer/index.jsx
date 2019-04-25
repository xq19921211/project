import './style.scss';

import {
  Button,
  Form,
  Input,
  Layout,
  Pagination,
  Select,
  Table,
  TreeSelect,
} from 'antd';
import { clone, dateFormat } from '../../../../util/util';

/**
 * Created by xu.long on 2018/4/23.
 */
import React from 'react';
import { Toolbar } from '../../../../component/Toolbar/Toolbar';
import { connect } from 'react-redux';
import { getClassifyList } from './selector';
import { getTreeList } from '../../CommodityManagement/RootContainer/selector';
import { initClassifyList } from './action';
import { initTreeList } from '../../CommodityManagement/RootContainer/action';

const { Content } = Layout;
const FormItem = Form.Item;
const InputGroup = Input.Group;
const Option = Select.Option;

class CommodityClassify extends React.Component {
  count = 0;
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
    this.props.initClassifyList({});
    this.props.initTreeList();
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
        let param = { data: {} };
        for (let item in values) {
          if (values[item] !== undefined && values[item] !== null) {
            switch (item) {
              case 'classifyName':
                param.data['keyword'] = values[item];
                break;
              case 'workType':
                if (values[item] !== 0) {
                  param.data['worktype'] = values[item];
                }
                break;
              case 'status':
                param.data['status'] = values[item] === '2' ? '' : values[item];
                break;
            }
          }
        }
        console.log('param: ' + JSON.stringify(param));
        this.props.initClassifyList(param);
      }
    });
  };
  //新增商品分类
  add = () => {
    this.props.history.push('addCommodityClassify/add/0');
  };
  //编辑商品分类
  edit = id => {
    console.log('edit id: ' + id);
    this.props.history.push(`addCommodityClassify/edit/${id}`);
  };
  combine = data => {
    let result = [];
    data.map((item, i) => {
      if (item.chrildren && item.chrildren.length > 0) {
        let statusName = item.menuStatus === 1 ? '已启用' : '已停用';
        result.push({
          key: this.count++,
          value: item.cat_id,
          label: item.cat_name,
          children: this.combine(item.chrildren),
        });
      } else {
        let statusName = item.menuStatus === 1 ? '已启用' : '已停用';
        result.push({
          key: this.count++,
          value: item.cat_id,
          label: item.cat_name,
        });
      }
    });
    return result;
  };
  handleChange = value => {
    console.log(`selected ${value}`);
  };
  render() {
    const { resetFields, getFieldDecorator } = this.props.form;
    const { classifyList, initClassifyList, treeList } = this.props;
    const treeData = this.combine(treeList);
    const list = [
      '商品管理',
      {
        label: '商品分类管理',
        to: '/index/commodityClassify',
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
              <FormItem label="商品分类">
                {getFieldDecorator('classifyName')(
                  <TreeSelect
                    style={{
                      minWidth: 200,
                      marginRight: '3%',
                    }}
                    treeData={treeData}
                    placeholder="请选择商品分类"
                    onChange={this.handleChange}
                  />,
                )}
              </FormItem>
              <FormItem label="作业类型">
                {getFieldDecorator('workType', {
                  initialValue: 0,
                })(
                  <Select>
                    <Option value={0}>--全部--</Option>
                    <Option value={'机动作业'}>机动作业</Option>
                    <Option value={'个体作业'}>个体作业</Option>
                  </Select>,
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
                    resetFields(['classifyName', 'workType', 'status']);
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
            options={this.state.options}
            classifyList={classifyList}
            goCommodityDetail={this.goCommodityDetail}
            edit={this.edit}
            initClassifyList={initClassifyList}
          />
        </Content>
      </Layout>
    );
  }
}
const CommodityClassifyForm = Form.create()(CommodityClassify);

const mapStateToProps = state => {
  return {
    classifyList: getClassifyList(state),
    treeList: getTreeList(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initClassifyList: param => {
      dispatch(initClassifyList(param));
    },
    initTreeList: param => {
      dispatch(initTreeList(param));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommodityClassifyForm);

class CustomTable extends React.Component {
  count = 0;
  constructor(props) {
    super(props);
    // this.combine = this.combine.bind(this);
    this.state = {
      classifyList: [],
    };
  }

  componentWillMount() {
    // this.props.initClassifyList({current: 1, pageSize: 10});
  }
  componentWillReceiveProps(nextProps) {}
  combine = data => {
    let result = [];
    data.map((item, i) => {
      if (item.chrildren && item.chrildren.length > 0) {
        let statusName = item.status === 1 ? '已启用' : '已停用';
        result.push({
          key: this.count++,
          id: item.cat_id,
          name: item.cat_name,
          workType: item.work_type,
          backEndOrder: item.sort,
          time: !item.create_time ? '' : item.create_time,
          status: status,
          statusName: statusName,
          children: this.combine(item.chrildren),
        });
      } else {
        let statusName = item.status === 1 ? '已启用' : '已停用';
        result.push({
          key: this.count++,
          id: item.cat_id,
          name: item.cat_name,
          workType: item.work_type,
          backEndOrder: item.sort,
          time: !item.create_time ? '' : item.create_time,
          status: status,
          statusName: statusName,
        });
      }
    });
    return result;
  };
  render() {
    const columns = [
      {
        title: '商品分类',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '作业类型',
        dataIndex: 'workType',
        key: 'workType',
      },
      {
        title: '后台排序',
        dataIndex: 'backEndOrder',
        key: 'backEndOrder',
        sorter: (a, b) => a.backEndOrder - b.backEndOrder,
      },
      {
        title: '新增时间',
        dataIndex: 'time',
        key: 'time',
      },
      {
        title: '状态',
        dataIndex: 'statusName',
        key: 'statusName',
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <a
              onClick={() => {
                this.props.edit(record.id);
              }}>
              修改
            </a>
          </span>
        ),
      },
    ];
    const { classifyList } = this.props;
    const data = this.combine(classifyList.dataSource);
    // const data = classifyList.dataSource.map((item, i) => {
    //     let statusName = item.status === 1 ? '已启用' : '已停用';
    //     return {
    //         key: i,
    //         id: item.cat_id,
    //         name: item.cat_name,
    //         workType: item.work_type,
    //         backEndOrder: item.sort,
    //         time: item.create_time,
    //         status: status,
    //         statusName: statusName
    //     };
    // });
    const options = {
      // defaultPageSize: this.props.options.pageSize,
      // pageSizeOptions: this.props.options.pageSizeOptions,
      total: classifyList.total,
      showTotal: total => `共 ${total} 条记录`,
      // showSizeChanger: true,
      // showQuickJumper: true,
      // onChange: (page, pageSize) => {
      //     console.log('页码改变的回调，参数是改变后的页码: ' + page + ',及每页条数: ' + pageSize);
      //     this.props.initClassifyList({data: {current: page, pageSize: pageSize}});
      // },
      // onShowSizeChange: (current, size) => {
      //     console.log('pageSize 变化的回调: ' + current + ',及每页条数: ' + size);
      //     this.props.options.pageSizeChange(current, size);
      //     this.props.initClassifyList({data: {current: current, pageSize: size}});
      // }
    };
    return (
      <div>
        <Table columns={columns} dataSource={data} pagination={false} />
        {/*<Pagination*/}
        {/*style={{*/}
        {/*float: 'right',*/}
        {/*marginTop: '2rem'*/}
        {/*}}*/}
        {/*{...options}*/}
        {/*/>*/}
      </div>
    );
  }
}
