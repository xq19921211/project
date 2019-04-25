import './style.scss';

import {
  Button,
  Form,
  Icon,
  Input,
  Layout,
  Modal,
  Radio,
  Select,
  TreeSelect,
  Upload,
  message,
} from 'antd';
import { init, initCommodityClassifyDetail, submit } from './action';

/**
 * Created by xu.long on 2018/5/3.
 */
import React from 'react';
import { Toolbar } from '../../../../component/Toolbar/Toolbar';
import { connect } from 'react-redux';
import { getClassifyList } from '../RootContainer/selector';
import { getCommodityClassifyDetail } from './selector';
import { initClassifyList } from '../RootContainer/action';
// import {initTreeList} from '../../CommodityManagement/RootContainer/action';
// import {getTreeList} from '../../CommodityManagement/RootContainer/selector';
import { isEmpty } from '../../../../util/util';
const { Content } = Layout;
const FormItem = Form.Item;
const InputGroup = Input.Group;
const Option = Select.Option;
const RadioGroup = Radio.Group;
class AddCommodityClassify extends React.Component {
  receiveCount = 0;

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      workType: ['机动作业', '个体作业'],
      symbolImageList: [],
      options: {
        current: 1,
        pageSize: 10,
        pageSizeChange: this.pageChange,
        pageSizeOptions: ['10', '20', '100'],
      },
    };
  }

  componentWillMount() {
    if (this.props.match.params.action === 'edit') {
      this.props.initCommodityClassifyDetail({
        id: this.props.match.params.id,
      });
    } else {
      this.props.init();
    }
    // this.props.initTreeList();
    this.props.initClassifyList({ type: '一级分类' });
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps &&
      !isEmpty(nextProps.commodityClassifyDetail) &&
      nextProps.commodityClassifyDetail.pic &&
      this.receiveCount < 1
    ) {
      this.receiveCount++;
      this.setState(
        Object.assign({}, this.state, {
          symbolImageList: [nextProps.commodityClassifyDetail.pic],
        }),
        () => {
          this.props.form.setFieldsValue({ symbolImage: 'true' });
        },
      );
    }
  }

  componentWillUnmount() {
    this.props.init();
  }

  // covert = (data) => {
  //     let result = [];
  //     data.map((item, i) => {
  //         if (item.chrildren && item.chrildren.length > 0) {
  //             result = result.concat(this.covert(item.chrildren));
  //         } else {
  //             result.push(item);
  //         }
  //     });
  //     return result;
  // };

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
      let symbolImageList = this.state.symbolImageList.map((item, i) => {
        return !item.fileid ? item.response.data : item.fileid;
      });
      param = {
        cat_id: this.props.match.params.id,
        icon: symbolImageList.join(','),
        action: this.props.match.params.action,
      };
    } else {
      let symbolImageList = this.state.symbolImageList.map((item, i) => {
        return item.response.data;
      });
      param = {
        icon: symbolImageList.join(','),
        action: this.props.match.params.action,
      };
    }
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        // console.log('Received values of form: ', values + ' and param: ' + JSON.stringify(param));
        for (let item in values) {
          switch (item) {
            case 'preCommodityClassify':
              param['cat_pid'] = values[item];
              break;
            case 'classifyName':
              param['cat_name'] = values[item];
              break;
            case 'workType':
              param['work_type'] = values[item];
              break;
            case 'appRank':
              param['sort'] = values[item];
              break;
            case 'usingOrNot':
              param['status'] = values[item];
              break;
          }
        }
        console.log('param: ' + JSON.stringify(param));
        this.props.submit(param);
      }
    });
  };
  handleChange = value => {
    console.log(`selected ${value}`);
  };
  getFileList = fileList => {
    console.log('fileList: ', JSON.stringify(fileList));
    this.setState(Object.assign({}, this.state, { symbolImageList: fileList }));
  };
  combine = data => {
    let result = [];
    data.map((item, i) => {
      if (item.chrildren && item.chrildren.length > 0) {
        let statusName = item.menuStatus === 1 ? '已启用' : '已停用';
        result.push({
          key: this.count++,
          value: item.cat_id.toString(),
          label: item.cat_name,
          children: this.combine(item.chrildren),
        });
      } else {
        let statusName = item.menuStatus === 1 ? '已启用' : '已停用';
        result.push({
          key: this.count++,
          value: item.cat_id.toString(),
          label: item.cat_name,
        });
      }
    });
    return result;
  };

  render() {
    const { setFieldsValue, getFieldDecorator } = this.props.form;
    const { classifyList, commodityClassifyDetail } = this.props;
    const { workType, symbolImageList } = this.state;
    let treeData = this.combine(classifyList.dataSource);
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
    const list = [
      '商品管理',
      {
        label: '商品分类管理',
        to: '/index/commodityClassify',
      },
      {
        label: '新增商品分类',
        to: `/index/addCommodityClassify/${this.props.match.params.action}/${
          this.props.match.params.id
        }`,
      },
    ];
    return (
      <Layout id="add_commodity_classify">
        <Toolbar type={1} list={list} title="新增商品分类" />
        <Content className="content">
          <div>
            <Form onSubmit={this.handleSubmit}>
              <FormItem {...formItemLayout} label="上一级商品分类">
                {getFieldDecorator('preCommodityClassify', {
                  initialValue:
                    this.props.match.params.action === 'edit'
                      ? commodityClassifyDetail.cat_pid &&
                        parseInt(commodityClassifyDetail.cat_pid) !== 0
                        ? commodityClassifyDetail.cat_pid.toString()
                        : '0'
                      : '0',
                })(
                  <TreeSelect
                    style={{
                      minWidth: 200,
                      marginRight: '3%',
                    }}
                    // value={this.props.match.params.action === 'edit' ? parseInt(commodityClassifyDetail.cat_pid) !== 0?commodityClassifyDetail.cat_pid:'' : ''}
                    treeData={treeData}
                    placeholder="请选择商品分类"
                    onChange={this.handleChange}
                  />,
                  //     <Select onChange={this.handleChange}>
                  //     {classifyList.dataSource.map((item, i) =>
                  //         <Option key={i} value={item.cat_id}>{item.cat_name}</Option>
                  //     )}
                  // </Select>
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="分类名称：" required={true}>
                {getFieldDecorator('classifyName', {
                  initialValue:
                    this.props.match.params.action === 'edit'
                      ? commodityClassifyDetail.cat_name
                      : '',
                  rules: [
                    {
                      required: true,
                      message: '请输入商品的名称',
                    },
                  ],
                })(
                  <Input
                    placeholder="请输入分类名称"
                    type="text"
                    style={{
                      width: '100%',
                      marginRight: '3%',
                    }}
                  />,
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="作业类型" require={true}>
                {getFieldDecorator('workType', {
                  initialValue:
                    this.props.match.params.action === 'edit'
                      ? commodityClassifyDetail.work_type
                      : workType[0],
                  rules: [
                    {
                      required: true,
                      message: '作业类型',
                    },
                  ],
                })(
                  <RadioGroup onChange={this.onWorkChange}>
                    {workType.map((item, i) => (
                      <Radio key={i} value={item}>
                        {item}
                      </Radio>
                    ))}
                  </RadioGroup>,
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="App排序" required={true}>
                {getFieldDecorator('appRank', {
                  initialValue:
                    this.props.match.params.action === 'edit'
                      ? commodityClassifyDetail.sort
                      : '',
                  rules: [
                    {
                      required: true,
                      message: '请输入App排序',
                    },
                  ],
                })(
                  <Input
                    placeholder="请输入整数数字"
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
                      ? commodityClassifyDetail.status
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
              <FormItem
                {...formItemLayout}
                label="代表图标(App首页用)"
                required={true}>
                {getFieldDecorator('symbolImage', {
                  rules: [
                    {
                      required: true,
                      message: '请添加代表图标',
                    },
                  ],
                })(
                  <PicturesWall
                    type="symbolImage"
                    setFieldsValue={setFieldsValue}
                    max={1}
                    getFileList={this.getFileList}
                    initFile={symbolImageList}
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

const AddCommodityClassifyForm = Form.create()(AddCommodityClassify);

const mapStateToProps = state => {
  return {
    commodityClassifyDetail: getCommodityClassifyDetail(state),
    classifyList: getClassifyList(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    init: () => {
      dispatch(init());
    },
    initClassifyList: param => {
      dispatch(initClassifyList(param));
    },
    submit: param => {
      dispatch(submit(param));
    },
    initCommodityClassifyDetail: param => {
      dispatch(initCommodityClassifyDetail(param));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddCommodityClassifyForm);

class PicturesWall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.initFile) {
      if (this.state.fileList.length < 1) {
        if (nextProps.initFile.length > 0) {
          this.setState(
            Object.assign({}, this.state, {
              fileList: nextProps.initFile.map((item, i) => {
                return {
                  uid: -i,
                  status: 'done',
                  url: item.filepath,
                  thumbUrl: item.thumbpath,
                };
              }),
            }),
          );
        }
      }
    }
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  handleChange = ({ fileList }) => {
    this.setState({ fileList });
    if (fileList[0].status === 'done') {
      this.props.setFieldsValue({
        symbolImage: fileList.length > 0 ? 'true' : null,
      });
      this.props.getFileList(fileList, 'symbolImage');
    } else if (fileList[0].status === 'error') {
      message.error('上传图片失败');
    }
  };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传</div>
      </div>
    );
    return (
      <div className="clear_fix">
        <Upload
          accept="image/png, image/jpeg, image/gif, image/jpg"
          action={window.hempConfig.apiPath + '/upload'}
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}>
          {fileList.length >= this.props.max ? null : uploadButton}
        </Upload>
        <Modal
          wrapClassName="vertical-center-modal"
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
