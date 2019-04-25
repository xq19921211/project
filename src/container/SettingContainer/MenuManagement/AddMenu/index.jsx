/**
 * Created by xu.long on 2018/6/23.
 */
import React from 'react';
import {
  Layout,
  Form,
  Input,
  Radio,
  Modal,
  Button,
  Tree,
  TreeSelect,
} from 'antd';
import { Toolbar } from '../../../../component/Toolbar/Toolbar';
import './style.scss';
import { connect } from 'react-redux';
import { getMenuDetail } from './selector';
import { init, submit, initMenuDetail } from './action';
import { getMenuList } from '../RootContainer/selector';
import { initMenuList } from '../RootContainer/action';
const { Content } = Layout;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const TreeNode = Tree.TreeNode;
class AddMenu extends React.Component {
  count = 0;
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      allocateMenuModalVisible: false,
      selectedMenuRows: [],
    };
  }

  componentWillMount() {
    if (this.props.match.params.action === 'edit') {
      this.props.initMenuDetail({ id: this.props.match.params.id });
    } else {
      this.props.init();
    }
    this.props.initMenuList();
  }
  componentWillUnmount() {
    this.props.init();
  }

  covert = data => {
    let result = [];
    data.map((item, i) => {
      if (item.chrildren && item.chrildren.length > 0) {
        result = result.concat(this.covert(item.chrildren));
      } else {
        result.push(item);
      }
    });
    return result;
  };

  onChange = e => {
    console.log('onChange radio checked', e.target.value);
  };
  onWorkChange = e => {
    console.log('onWorkChange radio checked', e.target.value);
  };
  handleSubmit = e => {
    e.preventDefault();
    let param;
    if (this.props.match.params.action === 'edit') {
      param = {
        menuId: this.props.match.params.id,
        action: this.props.match.params.action,
      };
    } else {
      param = {
        action: this.props.match.params.action,
      };
    }
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        for (let item in values) {
          switch (item) {
            case 'preMenu':
              param['menuPid'] = values[item];
              break;
            case 'name':
              param['menuName'] = values[item];
              break;
            case 'menuAddress':
              param['menuUrl'] = values[item];
              break;
            case 'appRank':
              param['menuSort'] = values[item];
              break;
            case 'usingOrNot':
              param['menuStatus'] = values[item];
              break;
          }
        }
        this.props.submit(param);
      }
    });
  };
  handleChange = value => {
    console.log(`selected ${value}`);
  };
  setAllocateMenuModalVisible = allocateMenuModalVisible => {
    this.setState({ allocateMenuModalVisible });
  };
  menuIsOk = (modalVisible, selectedMenuRows) => {
    const { setFieldsValue } = this.props.form;
    this.setAllocateMenuModalVisible(modalVisible);
    this.setState({ selectedMenuRows });
    if (selectedMenuRows.length > 0) {
      setFieldsValue({
        preMenu: selectedMenuRows.length > 0 ? selectedMenuRows[0].title : '',
      });
    }
  };

  combine = data => {
    let result = [];
    data.map((item, i) => {
      if (item.chrildren && item.chrildren.length > 0) {
        result.push({
          key: this.count++,
          value: item.menuId.toString(),
          label: item.menuName,
          children: this.combine(item.chrildren),
        });
      } else {
        result.push({
          key: this.count++,
          value: item.menuId.toString(),
          label: item.menuName,
        });
      }
    });
    return result;
  };
  render() {
    const { setFieldsValue, getFieldDecorator } = this.props.form;
    const { menuList, menuDetail } = this.props;
    const treeData = this.combine(menuList.dataSource);
    treeData.unshift({
      key: 0,
      value: '0',
      label: '--第一级菜单--',
    });
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
        sm: { span: 4, offset: 8 },
      },
    };
    const isEdit = this.props.match.params.action === 'edit';
    const ToolbarTitle = isEdit ? '编辑菜单' : '新增菜单';
    const list = [
      '系统设置',
      {
        label: '菜单管理',
        to: '/index/menuManagement',
      },
      {
        label: ToolbarTitle,
        to: `/index/addMenu/${this.props.match.params.action}/${
          this.props.match.params.id
        }`,
      },
    ];
    return (
      <Layout id="add_menu">
        <Toolbar type={1} list={list} title={ToolbarTitle} />
        <Content className="content">
          <div>
            <Form onSubmit={this.handleSubmit}>
              <FormItem {...formItemLayout} label="上一级菜单">
                {getFieldDecorator('preMenu', {
                  initialValue:
                    this.props.match.params.action === 'edit'
                      ? String(menuDetail.menuPid)
                      : '0',
                })(
                  <TreeSelect
                    style={{ width: '50%', marginRight: 8 }}
                    dropdownStyle={{
                      maxHeight: 400,
                      overflow: 'auto',
                    }}
                    treeData={treeData}
                    placeholder="请选择商品类型"
                    treeDefaultExpandAll
                    onChange={this.handleChange}
                  />,
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="菜单名称" required={true}>
                {getFieldDecorator('name', {
                  initialValue:
                    this.props.match.params.action === 'edit'
                      ? menuDetail.menuName
                      : '',
                  rules: [
                    {
                      required: true,
                      message: '请输入菜单名称',
                    },
                  ],
                })(
                  <Input
                    placeholder="请输入菜单名称"
                    type="text"
                    style={{
                      width: '100%',
                      marginRight: '3%',
                    }}
                  />,
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="菜单地址：">
                {getFieldDecorator('menuAddress', {
                  initialValue:
                    this.props.match.params.action === 'edit'
                      ? menuDetail.menuUrl
                      : '',
                })(
                  <Input
                    placeholder="请输入菜单地址"
                    type="text"
                    style={{
                      width: '100%',
                      marginRight: '3%',
                    }}
                  />,
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="排序号" required={true}>
                {getFieldDecorator('appRank', {
                  initialValue:
                    this.props.match.params.action === 'edit'
                      ? menuDetail.menuSort
                      : '',
                  rules: [
                    {
                      required: true,
                      message: '请输入排序号',
                    },
                  ],
                })(
                  <Input
                    placeholder="排序号越大，菜单位置越靠前"
                    style={{
                      width: '100%',
                      marginRight: '3%',
                    }}
                  />,
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="是否启用" require={true}>
                {getFieldDecorator('usingOrNot', {
                  initialValue:
                    this.props.match.params.action === 'edit'
                      ? menuDetail.menuStatus
                      : 0,
                  rules: [
                    {
                      required: true,
                      message: '是否启用',
                    },
                  ],
                })(
                  <RadioGroup onChange={this.onChange}>
                    <Radio value={1}>启用</Radio>
                    <Radio value={0}>禁用</Radio>
                  </RadioGroup>,
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

const AddMenuForm = Form.create()(AddMenu);

const mapStateToProps = state => {
  return {
    menuDetail: getMenuDetail(state),
    menuList: getMenuList(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    init: () => {
      dispatch(init());
    },
    initMenuList: param => {
      dispatch(initMenuList(param));
    },
    submit: param => {
      dispatch(submit(param));
    },
    initMenuDetail: param => {
      dispatch(initMenuDetail(param));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddMenuForm);

class AllocateMenuModal extends React.Component {
  constructor(props) {
    super(props);
    this.convert = this.convert.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.state = {
      // expandedKeys: ['0-0-0', '0-0-1'],
      autoExpandParent: true,
      // checkedKeys: ['0-0-0'],
      selectedKeys: [],
    };
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {}

  componentDidUpdate() {}

  onExpand = expandedKeys => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };

  onSelect = (selectedKeys, info) => {
    console.log('onSelect', info);
    if (info.selectedNodes.length > 0) {
      let param = {
        id: info.selectedNodes[0].props.id,
        title: info.selectedNodes[0].props.title,
      };
      this.setState({ selectedKeys: [param] });
    } else {
      this.setState({ selectedKeys: [] });
    }
  };
  renderTreeNodes = data => {
    return data.map(item => {
      if (item.children.length > 0) {
        return (
          <TreeNode {...item}>{this.renderTreeNodes(item.children)}</TreeNode>
        );
      }
      return <TreeNode {...item} />;
    });
  };
  convert = data => {
    return data.map((item, i) => {
      //cat_id作为节点的key
      return {
        key: item.menuId,
        id: item.menuId,
        title: item.menuName,
        children: this.convert(item.chrildren),
      };
    });
  };

  render() {
    const { menuList } = this.props;
    const data = this.convert(menuList.dataSource);
    // const treeData = [{
    //     title: '0-0',
    //     key: '0-0',
    //     children: [{
    //         title: '0-0-0',
    //         key: '0-0-0',
    //         children: [
    //             {title: '0-0-0-0', key: '0-0-0-0'},
    //             {title: '0-0-0-1', key: '0-0-0-1'},
    //             {title: '0-0-0-2', key: '0-0-0-2'},
    //         ],
    //     }, {
    //         title: '0-0-1',
    //         key: '0-0-1',
    //         children: [
    //             {title: '0-0-1-0', key: '0-0-1-0'},
    //             {title: '0-0-1-1', key: '0-0-1-1'},
    //             {title: '0-0-1-2', key: '0-0-1-2'},
    //         ],
    //     }, {
    //         title: '0-0-2',
    //         key: '0-0-2',
    //     }],
    // }, {
    //     title: '0-1',
    //     key: '0-1',
    //     children: [
    //         {title: '0-1-0-0', key: '0-1-0-0'},
    //         {title: '0-1-0-1', key: '0-1-0-1'},
    //         {title: '0-1-0-2', key: '0-1-0-2'},
    //     ],
    // }, {
    //     title: '0-2',
    //     key: '0-2',
    // }];
    return (
      <div>
        <Modal
          width="90rem"
          wrapClassName="vertical-center-modal"
          visible={this.props.visible}
          onOk={() => this.props.onOk(false, this.state.selectedKeys)}
          onCancel={() => this.props.onCancel(false)}
          cancelText="取消"
          okText="确定">
          <Tree
            showLine
            onExpand={this.onExpand}
            expandedKeys={this.state.expandedKeys}
            autoExpandParent={this.state.autoExpandParent}
            // onCheck={this.onCheck}
            // checkedKeys={this.state.checkedKeys}
            onSelect={this.onSelect}
            // selectedKeys={this.state.selectedKeys}
          >
            {this.renderTreeNodes(data)}
          </Tree>
        </Modal>
      </div>
    );
  }
}
