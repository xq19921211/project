/**
 * Created by xu.long on 2018/4/27.
 */

import './style.scss';

import {
  Button,
  Form,
  Icon,
  Input,
  InputNumber,
  Layout,
  Modal,
  Pagination,
  Radio,
  Table,
  TreeSelect,
  Upload,
  message,
} from 'antd';
import { init, initCommodityDetail } from '../CommodityDetail/action';
import { initUnit, submit } from './action';

import React from 'react';
import { Toolbar } from '../../../../component/Toolbar/Toolbar';
import { connect } from 'react-redux';
import { getClassifyList } from '../../CommodityClassify/RootContainer/selector';
import { getCommodityDetail } from '../CommodityDetail/selector';
import { getMerchantList } from '../../../MerchantContainer/MerchantManagement/RootContainer/selector';
import { getUnitList } from './selector';
import { initClassifyList } from '../../CommodityClassify/RootContainer/action';
import { initMerchantList } from '../../../MerchantContainer/MerchantManagement/RootContainer/action';
import { isEmpty } from '../../../../util/util';

const { Content } = Layout;
const FormItem = Form.Item;
const { TextArea } = Input;
const RadioGroup = Radio.Group;
class AddCommodity extends React.Component {
  count = 0;
  receiveCount = 0;

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.covert = this.covert.bind(this);
    this.state = {
      providerSelectModalVisible: false,
      selectedRows: [],
      firstImageList: [],
      commodityImageList: [],
      options: {
        current: 1,
        pageSize: 10,
        pageSizeChange: this.pageChange,
        pageSizeOptions: ['10', '20', '100'],
      },
      // unit: ['平米', '米', '棵', '立方米', '小时'],
      // classifyList: []
    };
  }

  //初始化
  componentWillMount() {
    if (this.props.match.params.action === 'edit') {
      this.props.initCommodityDetail({
        id: this.props.match.params.id,
        from: 'addCommodity',
      });
    } else {
      this.props.init();
    }
    this.props.initClassifyList({ data: { status: 1 } });
    this.props.initUnit();
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps &&
      !isEmpty(nextProps.commodityDetail) &&
      (nextProps.commodityDetail.homePic &&
        nextProps.commodityDetail.pics.length > 0) &&
      this.receiveCount < 1
    ) {
      this.receiveCount++;
      this.setState(
        Object.assign({}, this.state, {
          selectedRows: [nextProps.commodityDetail.supplier],
          firstImageList: [nextProps.commodityDetail.homePic],
          commodityImageList: nextProps.commodityDetail.pics,
        }),
        () => {
          this.props.form.setFieldsValue({
            commodityProvider: 'true',
          });
          this.props.form.setFieldsValue({ commodityImage: 'true' });
          this.props.form.setFieldsValue({ firstImage: 'true' });
        },
      );
    }
    // if (nextProps && nextProps.classifyList.length > 0 && this.state.classifyList.length < 1) {
    //     let temp = this.covert(nextProps.classifyList);
    //     this.setState(Object.assign({}, this.state, {
    //         classifyList: temp,
    //     }), () => {
    //     });
    // }
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
    let param;
    this.props.form.setFieldsValue({
      commodityImage: this.state.commodityImageList.length > 0 ? 'true' : null,
      firstImage: this.state.firstImageList.length > 0 ? 'true' : null,
    });
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (this.props.match.params.action === 'edit') {
          console.log('Received values of form: ', values);
          let homeImgList = this.state.firstImageList.map(item => {
            return !item.fileid
              ? item.response && item.response.data
                ? item.response.data
                : item
              : item.fileid.toString();
          });
          let imagesList = this.state.commodityImageList.map(item => {
            return !item.fileid
              ? item.response && item.response.data
                ? item.response.data
                : item
              : item.fileid.toString();
          });
          param = {
            id: this.props.match.params.id,
            homeImg: homeImgList.join(','),
            images: imagesList.join(','),
            supId: this.state.selectedRows[0].supId,
            action: this.props.match.params.action,
          };
        } else {
          console.log('Received values of form: ', values);
          let homeImgList = this.state.firstImageList.map(item => {
            return item.response && item.response.data
              ? item.response.data
              : item;
          });
          let imagesList = this.state.commodityImageList.map(item => {
            return item.response && item.response.data
              ? item.response.data
              : item;
          });
          param = Object.assign({}, param, {
            homeImg: homeImgList.join(','),
            images: imagesList.join(','),
            supId: this.state.selectedRows[0].supId,
            action: this.props.match.params.action,
          });
        }
        for (let item in values) {
          if (values[item] !== null || values[item] !== undefined) {
            switch (item) {
              case 'commodityName':
                param['name'] = values[item];
                break;
              case 'commodityUnitPrice':
                param['price'] = parseFloat(values[item]);
                break;
              case 'commodityDetailInfo':
                param['detail'] = values[item];
                break;
              case 'commodityUnit':
                param['unit'] = this.props.unitList[values[item]];
                break;
              case 'isHome':
                param['isHome'] = values[item];
                break;
              case 'commodityPromotionPrice':
                param['proPromotionPrice'] = parseFloat(values[item]);
                break;
              case 'commodityType':
                param['catId'] = values[item];
                break;
              case 'supplierSplitratio':
                param['supplierSplitratio'] = values[item] / 100;
                break;
            }
          }
          // console.log('item: ' + item);
        }
        console.log('param: ' + JSON.stringify(param));
        this.props.submit(param);
      }
    });
  };

  onChange = e => {
    console.log('radio checked', e.target.value);
  };

  setProviderSelectModalVisible = providerSelectModalVisible => {
    console.log(`providerSelectModalVisible: ${providerSelectModalVisible}`);
    this.setState({ providerSelectModalVisible });
    if (providerSelectModalVisible) {
      this.props.initMerchantList({
        current: this.state.options.current,
        pageSize: this.state.options.pageSize,
      });
    }
  };

  isOk = (providerSelectModalVisible, selectedRows) => {
    this.setProviderSelectModalVisible(providerSelectModalVisible);
    this.setState({ selectedRows });
  };
  getFileList = (fileList, type) => {
    if (type === 'firstImage') {
      this.setState(
        Object.assign({}, this.state, { firstImageList: fileList }),
      );
    } else {
      this.setState(
        Object.assign({}, this.state, { commodityImageList: fileList }),
      );
    }
  };
  generateUnitRadio = data => {
    return data.map((item, i) => {
      return (
        <Radio key={i} value={i}>
          {item}
        </Radio>
      );
    });
  };
  getUnitIndex = (value, data) => {
    for (let i = 0; i < data.length; i++) {
      if (value === data[i]) {
        return i;
      }
    }
  };
  handleChange = value => {
    console.log(`selected ${value}`);
  };

  combine = data => {
    let result = [];
    data.map(item => {
      if (item.chrildren && item.chrildren.length > 0) {
        result.push({
          key: this.count++,
          value: item.cat_id,
          label: item.cat_name,
          children: this.combine(item.chrildren),
        });
      } else {
        result.push({
          key: this.count++,
          value: item.cat_id,
          label: item.cat_name,
        });
      }
    });
    return result;
  };

  render() {
    const { setFieldsValue, getFieldDecorator } = this.props.form;
    const {
      merchantList,
      commodityDetail,
      initMerchantList,
      classifyList,
      unitList,
    } = this.props;
    const { selectedRows, firstImageList, commodityImageList } = this.state;
    const radioGroup = this.generateUnitRadio(unitList);
    const treeData = this.combine(classifyList.dataSource);
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 4, offset: 0 },
        sm: { span: 4, offset: 3 },
      },
    };
    const isEdit = this.props.match.params.action === 'edit';
    let ToolbarTitle = isEdit ? '编辑商品' : '新增商品';
    const list = [
      '商品管理',
      {
        label: '商品管理',
        to: '/index/commodityManagement',
      },
      {
        label: ToolbarTitle,
        to: `/index/addCommodity/${this.props.match.params.action}/${
          this.props.match.params.id
        }`,
      },
    ];
    return (
      <Layout id="add_commodity">
        <Toolbar type={1} list={list} title={ToolbarTitle} />
        <Content className="content">
          <Form onSubmit={this.handleSubmit}>
            <div className="title">商品信息</div>
            <div className="commodity_info">
              <FormItem {...formItemLayout} label="商品名称" required={true}>
                {getFieldDecorator('commodityName', {
                  validateTrigger: ['onChange', 'onBlur'],
                  initialValue: commodityDetail.name,
                  rules: [
                    {
                      required: true,
                      whitespace: true,
                      message: '请输入商品的名称',
                    },
                  ],
                })(
                  <Input
                    placeholder="请输入商品的名称"
                    style={{ width: '50%', marginRight: 8 }}
                  />,
                )}
              </FormItem>
              <FormItem {...formItemLayout} required={true} label="商品分类">
                {getFieldDecorator('commodityType', {
                  initialValue:
                    this.props.match.params.action === 'edit'
                      ? commodityDetail.catId
                      : treeData.length > 0
                        ? treeData[0].value
                        : '',
                  rules: [
                    {
                      required: true,
                      whitespace: true,
                      message: '请选择商品类型',
                    },
                  ],
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
                  //     <Select
                  //     style={{width: '50%', marginRight: 8}}
                  //     onChange={this.handleChange}>
                  //     {classifyList.dataSource.map((item, i) => <Option
                  //         value={item.cat_id}>{item.cat_name}</Option>)}
                  // </Select>
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="首页图片" required={true}>
                {getFieldDecorator('firstImage', {
                  rules: [
                    {
                      required: true,
                      whitespace: true,
                      message: '请添加首页图片',
                    },
                  ],
                })(
                  <PicturesWall
                    type="firstImage"
                    setFieldsValue={setFieldsValue}
                    getFileList={this.getFileList}
                    max={1}
                    initFile={firstImageList}
                  />,
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="商品图文介绍"
                required={true}>
                {getFieldDecorator('commodityImage', {
                  rules: [
                    {
                      required: true,
                      whitespace: true,
                      message: '请添加商品图片',
                    },
                  ],
                })(
                  <PicturesWall
                    type="commodityImage"
                    setFieldsValue={setFieldsValue}
                    getFileList={this.getFileList}
                    max={10}
                    initFile={commodityImageList}
                  />,
                )}
              </FormItem>
              <FormItem
                style={{
                  paddingBottom: '2.4rem',
                  marginBottom: 0,
                }}
                {...formItemLayout}
                label="详细信息"
                required={true}>
                {getFieldDecorator('commodityDetailInfo', {
                  initialValue: commodityDetail.detail,
                  rules: [
                    {
                      required: true,
                      whitespace: true,
                      message: '请输入商品的详细信息',
                    },
                  ],
                })(<TextArea placeholder="请输入商品的详细信息" rows={4} />)}
              </FormItem>
            </div>
            <div className="title">商品价格</div>
            <div className="commodity_price">
              <FormItem {...formItemLayout} label="商品单位" require={true}>
                {getFieldDecorator('commodityUnit', {
                  initialValue: !commodityDetail.unit
                    ? 0
                    : this.getUnitIndex(commodityDetail.unit, unitList),
                  rules: [
                    {
                      required: true,
                      message: '请选择商品单位',
                    },
                  ],
                })(
                  <RadioGroup onChange={this.onChange}>
                    {radioGroup}
                  </RadioGroup>,
                )}
              </FormItem>

              <FormItem {...formItemLayout} label="商品单价" required={true}>
                {getFieldDecorator('commodityUnitPrice', {
                  initialValue: commodityDetail.price,
                  rules: [
                    {
                      required: true,
                      message: '请输入商品的单价',
                    },
                  ],
                })(
                  <Input
                    placeholder="请输入商品单价、为数字"
                    style={{ width: '50%', marginRight: 8 }}
                  />,
                )}
              </FormItem>
              <FormItem
                style={{
                  paddingBottom: '2.4rem',
                  marginBottom: 0,
                }}
                {...formItemLayout}
                label="促销单价">
                {getFieldDecorator('commodityPromotionPrice', {
                  initialValue: commodityDetail.proPromotionPrice,
                  rules: [
                    {
                      required: true,
                      message: '请输入商品的促销单价',
                    },
                  ],
                })(
                  <Input
                    placeholder="请输入商品促销单价、为数字"
                    style={{ width: '50%', marginRight: 8 }}
                  />,
                )}
              </FormItem>
            </div>
            <div className="title">供应商分成</div>
            <div className="commodity_price">
              <FormItem
                style={{
                  paddingBottom: '2.4rem',
                  marginBottom: 0,
                }}
                {...formItemLayout}
                label="供应商分成比例">
                {getFieldDecorator('supplierSplitratio', {
                  initialValue: (
                    commodityDetail.supplierSplitratio * 100
                  ).toFixed(2),
                  rules: [
                    {
                      required: true,
                      message: '请输入供应商分成比例',
                    },
                  ],
                })(
                  <InputNumber
                    min={0}
                    max={100}
                    step={1}
                    placeholder="请填写"
                    style={{
                      width: '50%',
                      marginRight: 8,
                    }}
                  />,
                )}
                %
              </FormItem>
            </div>
            <div className="title">保安公司选择</div>
            <div className="commodity_provider">
              <FormItem
                style={{
                  paddingBottom: '2.4rem',
                  marginBottom: 0,
                }}
                {...formItemLayout}
                label="商品保安公司"
                required={true}>
                {getFieldDecorator('commodityProvider', {
                  rules: [
                    {
                      required: true,
                      whitespace: true,
                      message: '请添加商品保安公司',
                    },
                  ],
                })(
                  <Input
                    placeholder="请添加商品保安公司"
                    style={{ display: 'none' }}
                  />,
                )}
                <Button
                  type="dashed"
                  onClick={() => this.setProviderSelectModalVisible(true)}
                  style={{ width: '20rem' }}>
                  <Icon type="plus" />
                  选择
                </Button>
                {selectedRows.map((item, i) => {
                  // setFieldsValue({commodityProvider: 'true'});
                  return (
                    <span
                      key={i}
                      style={{
                        marginLeft: '1.5rem',
                        display: 'inline-block',
                        height: '32px',
                        lineHeight: '32px',
                        padding: '0 20px',
                        backgroundColor: '#2692fc',
                        borderRadius: '3px',
                        color: '#ffffff',
                      }}>
                      {!item.provider ? item.supName : item.provider}
                    </span>
                  );
                })}
                <ProviderSelectModalForm
                  options={this.state.options}
                  merchantList={merchantList}
                  setFieldsValue={setFieldsValue}
                  visible={this.state.providerSelectModalVisible}
                  onOk={this.isOk}
                  onCancel={this.setProviderSelectModalVisible}
                  initMerchantList={initMerchantList}
                  selectedRowKeys={
                    this.props.match.params.action === 'edit'
                      ? commodityDetail.supplier &&
                        commodityDetail.supplier.supId
                        ? [commodityDetail.supplier.supId]
                        : []
                      : []
                  }
                />
              </FormItem>
            </div>
            <div className="title">展示规则</div>
            <div className="display_rule">
              <FormItem {...formItemLayout} label="是否推荐至首页">
                {getFieldDecorator('isHome', {
                  initialValue:
                    commodityDetail.isHome === undefined
                      ? 0
                      : commodityDetail.isHome,
                })(
                  <RadioGroup onChange={this.onChange}>
                    <Radio value={1}>是</Radio>
                    <Radio value={0}>否</Radio>
                  </RadioGroup>,
                )}
              </FormItem>
              {/*<FormItem*/}
              {/*style={{paddingBottom: '2.4rem', marginBottom: 0}}*/}
              {/*{...formItemLayout}*/}
              {/*label='首页排序号'*/}
              {/*required={false}*/}
              {/*>*/}
              {/*{getFieldDecorator('rankNumber')(*/}
              {/*<Input placeholder="请输入商品首页排序号" style={{width: '50%', marginRight: 8}}/>*/}
              {/*)}*/}
              {/*</FormItem>*/}
            </div>
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
        </Content>
      </Layout>
    );
  }
}
const AddCommodityForm = Form.create()(AddCommodity);
const mapStateToProps = state => {
  return {
    merchantList: getMerchantList(state),
    commodityDetail: getCommodityDetail(state),
    classifyList: getClassifyList(state),
    unitList: getUnitList(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    submit: param => {
      dispatch(submit(param));
    },
    initMerchantList: param => {
      dispatch(initMerchantList(param));
    },
    initCommodityDetail: param => {
      dispatch(initCommodityDetail(param));
    },
    init: () => {
      dispatch(init());
    },
    initClassifyList: param => {
      dispatch(initClassifyList(param));
    },
    initUnit: param => {
      dispatch(initUnit(param));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddCommodityForm);

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
                  fileid: item.fileid,
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

  handleCancel = () => {
    console.log('handleCancel');
    this.setState({ previewVisible: false });
  };

  handlePreview = file => {
    console.log('handlePreview');
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  handleChange = ({ fileList }) => {
    this.setState({ fileList }, () => {
      if (fileList.length < 1) {
        switch (this.props.type) {
          case 'firstImage':
            // this.props.setFieldsValue({firstImage : null});
            this.props.getFileList(fileList, 'firstImage');
            break;
          case 'commodityImage':
            // this.props.setFieldsValue({commodityImage: null});
            this.props.getFileList(fileList, 'commodityImage');
            break;
        }
      } else {
        if (fileList[0].status === 'done') {
          switch (this.props.type) {
            case 'firstImage':
              this.props.setFieldsValue({ firstImage: 'true' });
              this.props.getFileList(fileList, 'firstImage');
              break;
            case 'commodityImage':
              this.props.setFieldsValue({
                commodityImage: 'true',
              });
              this.props.getFileList(fileList, 'commodityImage');
              break;
          }
        } else if (fileList[0].status === 'error') {
          message.error('上传图片失败');
        }
      }
    });
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
          // customRequest={()=>{
          //     console.log('adfadsfdasfasdf');
          // }}
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

class ProviderSelectModal extends React.Component {
  count = 0;
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      selectedRowKeys: [], // Check here to configure the default column
      selectedRows: [],
    };
  }

  componentWillMount() {}

  componentWillReceiveProps(nextProps) {
    if (this.count < 1) {
      if (
        nextProps &&
        nextProps.selectedRowKeys.length > 0 &&
        this.state.selectedRowKeys.length < 1
      ) {
        this.count++;
        this.setState(
          Object.assign({}, this.state, {
            selectedRowKeys: nextProps.selectedRowKeys,
          }),
        );
      }
    }
  }

  componentDidUpdate() {}

  onSelectChange = (selectedRowKeys, selectedRows) => {
    console.log(
      'selectedRowKeys changed: ',
      selectedRowKeys +
        ' selectedRows changed: ' +
        JSON.stringify(selectedRows),
    );
    this.setState({ selectedRowKeys, selectedRows });
    this.props.setFieldsValue({
      commodityProvider: selectedRows.length > 0 ? 'true' : null,
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    e.stopPropagation();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let param = {
          current: 1,
          pageSize: this.props.options.pageSize,
        };
        for (let item in values) {
          if (values[item] !== null || values[item] !== undefined) {
            switch (item) {
              case 'providerName':
                param['keyword'] = values[item];
                break;
            }
          }
          console.log('item: ' + item);
        }
        console.log('param: ' + JSON.stringify(param));
        this.props.initMerchantList(param);
        this.props.options.pageSizeChange(1, this.props.options.pageSize);
      }
    });
  };
  initMerchantList = temp => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let param = {
          current: temp.current,
          pageSize: temp.pageSize,
        };
        for (let item in values) {
          if (values[item] !== null || values[item] !== undefined) {
            switch (item) {
              case 'providerName':
                param['keyword'] = values[item];
                break;
            }
          }
          console.log('item: ' + item);
        }
        console.log('param: ' + JSON.stringify(param));
        this.props.initMerchantList(param);
      }
    });
  };
  render() {
    const { getFieldDecorator, resetFields } = this.props.form;
    const { merchantList } = this.props;
    const { selectedRowKeys } = this.state;
    return (
      <div>
        <Modal
          maskClosable={false}
          width="90rem"
          wrapClassName="vertical-center-modal"
          visible={this.props.visible}
          onOk={() => this.props.onOk(false, this.state.selectedRows)}
          onCancel={() => this.props.onCancel(false)}
          cancelText="取消"
          okText="确定">
          <div>
            <Form layout="inline" onSubmit={this.handleSubmit}>
              <FormItem label="保安公司名称">
                {getFieldDecorator('providerName')(
                  <Input
                    onPressEnter={this.handleSubmit}
                    placeholder="请输入保安公司名称"
                    type="text"
                    style={{
                      width: '100%',
                      marginRight: '3%',
                    }}
                  />,
                )}
              </FormItem>
              <FormItem>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginRight: '1rem' }}>
                  查询
                </Button>
                <Button
                  type="default"
                  onClick={() => {
                    resetFields(['providerName']);
                  }}>
                  重置
                </Button>
              </FormItem>
            </Form>
            <CustomTable
              options={this.props.options}
              merchantList={merchantList}
              onSelectChange={this.onSelectChange}
              initMerchantList={this.initMerchantList}
              selectedRowKeys={selectedRowKeys}
            />
          </div>
        </Modal>
      </div>
    );
  }
}
const ProviderSelectModalForm = Form.create()(ProviderSelectModal);

class CustomTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: this.props.selectedRowKeys,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      this.setState(
        Object.assign({}, this.state, {
          selectedRowKeys: nextProps.selectedRowKeys,
        }),
      );
    }
  }
  render() {
    const columns = [
      {
        title: '保安公司名称',
        dataIndex: 'provider',
        key: 'provider',
      },
      {
        title: '覆盖规则',
        dataIndex: 'rule',
        key: 'rule',
      },
    ];
    const { merchantList } = this.props;
    const data = merchantList.dataSource.map(item => {
      return {
        key: item.supId,
        supId: item.supId,
        provider: item.supName,
        rule:
          !item.coverRules.length > 0
            ? '未指定覆盖规则'
            : item.coverRules.map((ite, i) => {
                if (i === 0) {
                  return ite.org_name;
                } else {
                  return '、' + ite.org_name;
                }
              }),
      };
    });
    const options = {
      current: this.props.options.current,
      defaultPageSize: this.props.options.pageSize,
      pageSizeOptions: this.props.options.pageSizeOptions,
      total: merchantList.total,
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
        this.props.initMerchantList({
          current: page,
          pageSize: pageSize,
        });
      },
      onShowSizeChange: (current, size) => {
        this.props.options.pageSizeChange(current, size);
        this.props.initMerchantList({
          current: current,
          pageSize: size,
        });
      },
    };
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedRowKeys,
        });
        this.props.onSelectChange(selectedRowKeys, selectedRows);
      },
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
