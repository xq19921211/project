import './style.scss';

import {
  AutoComplete,
  Button,
  Divider,
  Form,
  Icon,
  Input,
  Layout,
  Pagination,
  Select,
  Table,
  Tree,
  TreeSelect,
} from 'antd';
import { Link, Route } from 'react-router-dom';
import { initCommodityList, modifyListStatus } from './action';

/**
 * Created by xu.long on 2018/4/22.
 */
import React from 'react';
import { Toolbar } from '../../../../component/Toolbar/Toolbar';
import { connect } from 'react-redux';
import { dateFormat } from '../../../../util/util';
import { getClassifyList } from '../../CommodityClassify/RootContainer/selector';
import { getCommodityList } from './selector';
import { getMerchantList } from '../../../MerchantContainer/MerchantManagement/RootContainer/selector';
import { initClassifyList } from '../../CommodityClassify/RootContainer/action';
import { initMerchantList } from '../../../MerchantContainer/MerchantManagement/RootContainer/action';
const { Header, Content } = Layout;
const TreeNode = Tree.TreeNode;
const FormItem = Form.Item;
const Option = Select.Option;

class CommodityManagement extends React.Component {
  constructor(props) {
    super(props);
    this.treeGenerator = this.treeGenerator.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.onAutoCompleteSelect = this.onAutoCompleteSelect.bind(this);
    this.state = {
      collapsed: false,
      loading: false,
      options: {
        current: 1,
        pageSize: 10,
        pageSizeChange: this.pageChange,
        pageSizeOptions: ['10', '20', '100'],
      },
      catId: 0,
      supId: 0,
      dataSource: [],
      allDataSource: [],
    };
  }

  //初始化
  componentWillMount() {
    this.props.initCommodityList({
      current: this.state.options.current,
      pageSize: this.state.options.pageSize,
    });
    // this.props.initTreeList();
    this.props.initMerchantList();
    this.props.initClassifyList({ type: '全部' });
  }

  componentWillReceiveProps(nextProps) {
    // console.log('componentWillReceiveProps: ', JSON.stringify(nextProps));
    if (this.state.allDataSource.length < 1) {
      this.setState(
        Object.assign({}, this.state, {
          dataSource: nextProps.merchantList.dataSource.map((item, i) => {
            return item;
          }),
          allDataSource: nextProps.merchantList.dataSource.map((item, i) => {
            return item;
          }),
        }),
      );
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(`${JSON.stringify(this.state)} ${JSON.stringify(prevState)}`);
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  //新增商品
  add = () => {
    this.setState({ loading: true });
    // window.location.assign('index/addCommodity');
    this.props.history.push(`addCommodity/add/0`);
  };
  //编辑商品
  edit = id => {
    console.log('edit id: ' + id);
    this.props.history.push(`addCommodity/edit/${id}`);
  };
  //进入商品详情
  goCommodityDetail = id => {
    this.props.history.push(`commodityDetail/${id}`);
  };
  //下架
  changeStatus = param => {
    console.log('下架');
    this.props.modifyListStatus(param);
  };
  onExpand = (expandedKeys, info) => {
    console.log('expanded', expandedKeys, info);
  };
  onSelect = (selectedKeys, info) => {
    //取节点的key，也就即cat_id
    console.log('selected', selectedKeys, info);
    this.setState(
      Object.assign({}, this.state, {
        catId: parseInt(selectedKeys[0]),
      }),
    );
    let param = {
      catId: parseInt(selectedKeys[0]),
      current: this.state.options.current,
      pageSize: this.state.options.pageSize,
    };
    this.props.initCommodityList(param);
  };
  treeGenerator = data => {
    return data.map((item, i) => {
      //cat_id作为节点的key
      return (
        <TreeNode title={item.cat_name} key={item.cat_id}>
          {this.treeGenerator(item.chrildren)}
        </TreeNode>
      );
    });
  };
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
        let param = {
          current: 1,
          pageSize: this.state.options.pageSize,
          supId: this.state.supId,
        };
        for (let item in values) {
          switch (item) {
            case 'commodityName':
              param['name'] = values[item];
              break;
            case 'supplier':
              param['supId'] = values[item];
              break;
            case 'commodityType':
              param['catId'] = values[item];
              break;
          }
        }
        console.log('param: ' + JSON.stringify(param));
        this.props.initCommodityList(param);
        this.pageChange(1, this.state.options.pageSize);
      }
    });
  };
  handleSearch = value => {
    console.log('handleSearch: ' + value);
    let data = [];
    for (let i = 0; i < this.state.allDataSource.length; i++) {
      if (
        this.state.allDataSource[i].supName &&
        this.state.allDataSource[i].supName.indexOf(value) > -1
      ) {
        data.push(this.state.allDataSource[i]);
      }
    }
    let obj = Object.assign({}, this.state, {
      dataSource: !value ? this.state.allDataSource : data,
      // catId: parseInt(value)
    });
    this.setState(obj);
  };

  onAutoCompleteSelect(value) {
    let param = {
      current: this.state.options.current,
      pageSize: this.state.options.pageSize,
      supId: value,
    };
    this.setState(
      Object.assign({}, this.state, {
        supId: value,
      }),
      () => {
        console.log(`handleSearch state: ${JSON.stringify(this.state)}`);
      },
    );
  }

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
    const { classifyList, initCommodityList, merchantList } = this.props;
    const { dataSource } = this.state;
    // const dataSource = merchantList.dataSource.map((item, i)=>{
    //     return item.supName;
    // });
    const treeData = this.combine(classifyList.dataSource);
    // const nodes = this.treeGenerator(treeList);
    const list = [
      '商品管理',
      {
        label: '商品管理',
        to: '/index/commodityManagement',
      },
    ];
    return (
      <Layout id="commodity_management">
        <Toolbar type={1} list={list} title="查询列表" />
        <Content className="content">
          {/*<div className="left_content">*/}
          {/*<div style={{textAlign: 'center'}}>*/}
          {/*<Button*/}
          {/*icon="plus"*/}
          {/*loading={this.state.loading}*/}
          {/*type="primary"*/}
          {/*onClick={() => {*/}
          {/*this.add();*/}
          {/*}}*/}
          {/*>新增商品</Button>*/}
          {/*</div>*/}
          {/*<div style={{padding: '2.5rem'}}>*/}
          {/*<Tree*/}
          {/*showLine*/}
          {/*onExpand={this.onExpand}*/}
          {/*onSelect={this.onSelect}*/}
          {/*>*/}
          {/*{nodes}*/}
          {/*</Tree>*/}
          {/*</div>*/}
          {/*</div>*/}
          <div className="right_content">
            <div>
              <Form
                style={{
                  display: 'flex',
                  padding: '0 1.6rem 1rem 1.6rem',
                  position: 'relative',
                }}
                layout="inline"
                onSubmit={this.handleSubmit}>
                <FormItem label="商品名称：">
                  {getFieldDecorator('commodityName')(
                    <Input
                      onPressEnter={this.handleSubmit}
                      placeholder="请输入商品名称"
                      type="text"
                      style={{
                        width: '100%',
                        marginRight: '3%',
                      }}
                    />,
                  )}
                </FormItem>
                <FormItem label="保安公司">
                  {getFieldDecorator('supplier')(
                    <AutoComplete
                      dataSource={dataSource.map((item, i) => {
                        return (
                          <Option key={i} value={item.supId.toString()}>
                            {item.supName}
                          </Option>
                        );
                      })}
                      style={{
                        width: '100%',
                        marginRight: '3%',
                      }}
                      onSelect={this.onAutoCompleteSelect}
                      onSearch={this.handleSearch}
                      placeholder="请输入保安公司"
                    />,
                  )}
                </FormItem>
                <FormItem label="商品类型">
                  {getFieldDecorator('commodityType')(
                    <TreeSelect
                      style={{
                        minWidth: 200,
                        marginRight: '3%',
                      }}
                      dropdownStyle={{
                        maxHeight: 400,
                        overflow: 'auto',
                        minWidth: 200,
                      }}
                      treeData={treeData}
                      placeholder="请选择商品类型"
                      onChange={this.handleChange}
                    />,
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
                      resetFields([
                        'commodityName',
                        'supplier',
                        'commodityType',
                      ]);
                    }}>
                    重置
                  </Button>
                  <Button
                    icon="plus"
                    type="primary"
                    onClick={() => {
                      this.add();
                    }}>
                    新增
                  </Button>
                </FormItem>
              </Form>
              <CustomTable
                options={this.state.options}
                commodityList={this.props.commodityList}
                goCommodityDetail={this.goCommodityDetail}
                changeStatus={this.changeStatus}
                edit={this.edit}
                initCommodityList={initCommodityList}
              />
            </div>
          </div>
        </Content>
      </Layout>
    );
  }
}
const CommodityManagementForm = Form.create()(CommodityManagement);

const mapStateToProps = state => {
  return {
    commodityList: getCommodityList(state),
    classifyList: getClassifyList(state),
    merchantList: getMerchantList(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initCommodityList: param => {
      dispatch(initCommodityList(param));
    },
    initClassifyList: param => {
      dispatch(initClassifyList(param));
    },
    modifyListStatus: param => {
      dispatch(modifyListStatus(param));
    },
    initMerchantList: param => {
      dispatch(initMerchantList(param));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommodityManagementForm);

class CustomTable extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // this.props.initCommodityList();
  }

  render() {
    const columns = [
      {
        title: '商品信息',
        dataIndex: 'information',
        key: 'information',
      },
      {
        title: '商品类别',
        dataIndex: 'category',
        key: 'category',
      },
      {
        title: '保安公司',
        dataIndex: 'supplier',
        key: 'supplier',
      },
      {
        title: '添加时间',
        dataIndex: 'time',
        key: 'time',
        // defaultSortOrder: 'descend',
        // sorter: (a, b) => a.time - b.time,
      },
      {
        title: '单价（元）',
        dataIndex: 'price',
        key: 'price',
      },
      {
        title: '促销价（元）',
        dataIndex: 'promotionPrice',
        key: 'promotionPrice',
      },
      {
        title: '状态',
        dataIndex: 'statusName',
        key: 'statusName',
        filters: [
          {
            text: '已上架',
            value: 'release',
          },
          {
            text: '已下架',
            value: 'notRelease',
          },
          {
            text: '待上架',
            value: 'being',
          },
        ],
        onFilter: (value, record) => {
          let strValue;
          switch (value) {
            case 'release':
              strValue = '已上架';
              break;
            case 'being':
              strValue = '待上架';
              break;
            case 'notRelease':
              strValue = '已下架';
              break;
          }
          // console.log(`value: ${value}, record: ${JSON.stringify(record)}, result: ${record.statusName.indexOf(strValue)}`);
          return record.statusName.indexOf(strValue) === 0;
        },
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => {
          let strValue;
          switch (record.status) {
            case 2:
              strValue = '下架';
              break;
            case 1:
            case 0:
              strValue = '上架';
              break;
          }
          return (
            <span>
              <a
                onClick={() => {
                  // console.log(`编辑text: ${JSON.stringify(text)}, record: ${JSON.stringify(record)}`);
                  this.props.goCommodityDetail(record.id);
                }}>
                详情
              </a>
              <Divider type="vertical" />
              <a
                onClick={() => {
                  // console.log(`编辑text: ${JSON.stringify(text)}, record: ${JSON.stringify(record)}`);
                  this.props.edit(record.id);
                }}>
                编辑
              </a>
              <Divider type="vertical" />
              <a
                onClick={() => {
                  // console.log(`下架text: ${JSON.stringify(text)}, record: ${JSON.stringify(record)}`);
                  if (record.status === 2) {
                    //已上架的下一个状态为已下架
                    record.status = 0;
                  } else {
                    //等待上架和已下架的下一个状态为上架
                    record.status = 2;
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
    const { commodityList } = this.props;
    const data = commodityList.dataSource.map((item, i) => {
      let statusName;
      switch (item.status) {
        //已下架
        case 0:
          statusName = '已下架';
          break;
        //待上架
        case 1:
          statusName = '待上架';
          break;
        //已上架
        case 2:
          statusName = '已上架';
          break;
        default:
          statusName = '已下架';
          break;
      }
      return {
        key: i,
        id: item.id,
        information: (
          <div>
            <img
              style={{
                width: '40px',
                height: '40px',
                position: 'absolute',
                borderRadius: '4px',
              }}
              src={
                !item.homePic ? './image/default.png' : item.homePic.filepath
              }
            />
            <span
              style={{
                paddingLeft: '46px',
                display: 'inline-block',
                height: '40px',
              }}>
              {item.name}
            </span>
          </div>
        ),
        category: item.catName ? item.catName : '',
        supplier: item.supName,
        time: !item.createTime ? '' : item.createTime,
        price: !item.price ? '' : item.price.toFixed(2),
        promotionPrice: !item.proPromotionPrice
          ? ''
          : item.proPromotionPrice.toFixed(2),
        status: item.status,
        statusName: statusName,
      };
      // return {
      //     key: i,
      //     id: i,
      //     information: '单元大堂、共用楼道清理深圳市绿源清洁公司',
      //     category: '日常清洁',
      //     time: '2016-06-16-14:03',
      //     price: '10.00/平',
      //     status: statusName
      // };
    });
    // const data = [{
    //     key: '1',
    //     information: '单元大堂、共用楼道清理深圳市绿源清洁公司',
    //     category: '日常清洁',
    //     time: '2016-06-16-14:03',
    //     price: '10.00/平',
    //     status: '已上架'
    // }, {
    //     key: '2',
    //     information: '单元大堂、共用楼道清理深圳市绿源清洁公司',
    //     category: '日常清洁',
    //     time: '2016-06-16-14:03',
    //     price: '10.00/平',
    //     status: '已上架'
    // }, {
    //     key: '3',
    //     information: '单元大堂、共用楼道清理深圳市绿源清洁公司',
    //     category: '日常清洁',
    //     time: '2016-06-16-14:03',
    //     price: '10.00/平',
    //     status: '已上架'
    // }, {
    //     key: '4',
    //     information: '单元大堂、共用楼道清理深圳市绿源清洁公司',
    //     category: '日常清洁',
    //     time: '2016-06-16-14:03',
    //     price: '10.00/平',
    //     status: '已上架'
    // }, {
    //     key: '5',
    //     information: '单元大堂、共用楼道清理深圳市绿源清洁公司',
    //     category: '日常清洁',
    //     time: '2016-06-16-14:03',
    //     price: '10.00/平',
    //     status: '已上架'
    // }, {
    //     key: '6',
    //     information: '单元大堂、共用楼道清理深圳市绿源清洁公司',
    //     category: '日常清洁',
    //     time: '2016-06-16-14:03',
    //     price: '10.00/平',
    //     status: '已上架'
    // }, {
    //     key: '7',
    //     information: '单元大堂、共用楼道清理深圳市绿源清洁公司',
    //     category: '日常清洁',
    //     time: '2016-06-16-14:03',
    //     price: '10.00/平',
    //     status: '已上架'
    // }];
    const options = {
      current: this.props.options.current,
      defaultPageSize: this.props.options.pageSize,
      pageSizeOptions: this.props.options.pageSizeOptions,
      total: commodityList.total,
      showTotal: total => `共 ${total} 条记录`,
      showSizeChanger: true,
      showQuickJumper: true,
      onChange: (page, pageSize) => {
        console.log(
          '页码改变的回调，参数是改变后的页码: ' +
            page +
            ',及每页条数: ' +
            pageSize,
        );
        this.props.options.pageSizeChange(page, pageSize);
        this.props.initCommodityList({
          current: page,
          pageSize: pageSize,
        });
      },
      onShowSizeChange: (current, size) => {
        this.props.options.pageSizeChange(current, size);
        this.props.initCommodityList({
          current: current,
          pageSize: size,
        });
      },
    };
    return (
      <div>
        <Table columns={columns} dataSource={data} pagination={false} />
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
