/**
 * Created by xu.long on 2018/6/18.
 */
import './style.scss';
import {
  Button,
  Form,
  Icon,
  Input,
  Layout,
  Modal,
  Radio,
  Upload,
  message,
} from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { Toolbar } from '../../../../component/Toolbar/Toolbar';
import { init, initHomePictureDetail, submit } from './action';
import { getHomePictureDetail } from './selector';

const { Content } = Layout;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
class AddHomePicture extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      imageList: [],
    };
  }

  componentWillMount() {
    if (this.props.match.params.action === 'edit') {
      this.props.initHomePictureDetail({
        id: this.props.match.params.id,
      });
    } else {
      this.props.init();
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.homePictureDetail != this.props.homePictureDetail) {
      this.getFileList([
        {
          uid: -1,
          // name: 'xxx.png',
          status: 'done',
          url: nextProps.homePictureDetail.pic
            ? nextProps.homePictureDetail.pic.filepath
            : '',
          response: {
            data: nextProps.homePictureDetail.pic
              ? nextProps.homePictureDetail.pic.filepath
              : '',
          },
        },
      ]);
      this.props.form.setFieldsValue({ image: 'true' });
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    let param = {};
    if (this.props.match.params.action === 'edit') {
      param.id = this.props.match.params.id;
    }
    let imageList = this.state.imageList.map(item => {
      return !item.fileid ? item.response.data : item.fileid;
    });

    this.props.form.validateFields((err, values) => {
      if (err) return;
      param = {
        ...param,
        ...{
          imageurl: imageList.join(','),
          action: this.props.match.params.action,
          imagename: values.name,
          linkurl: values.link,
          sort: parseInt(values.rank),
          status: values.usingOrNot,
        },
      };
      this.props.submit(param);
    });
  };

  getFileList = fileList => {
    this.setState(Object.assign({}, this.state, { imageList: fileList }));
  };

  render() {
    const { setFieldsValue, getFieldDecorator } = this.props.form;
    const { homePictureDetail } = this.props;
    const { imageList } = this.state;
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
    const ToolbarTitle =
      this.props.match.params.action === 'edit'
        ? '编辑首页轮播图'
        : '新增首页轮播图';
    const list = [
      '系统设置',
      {
        label: '首页轮播图管理',
        to: '/index/homePictureManagement',
      },
      {
        label: ToolbarTitle,
        to: `/index/addHomePicture/${this.props.match.params.action}/${
          this.props.match.params.id
        }`,
      },
    ];
    return (
      <Layout id="add_home_picture">
        <Toolbar type={1} list={list} title={ToolbarTitle} />
        <Content className="content">
          <div>
            <Form onSubmit={this.handleSubmit}>
              <FormItem {...formItemLayout} label="图片名称" required={true}>
                {getFieldDecorator('name', {
                  initialValue:
                    this.props.match.params.action === 'edit'
                      ? homePictureDetail.imagename
                      : '',
                  rules: [
                    {
                      required: true,
                      message: '请输入图片名称',
                    },
                  ],
                })(
                  <Input
                    placeholder="请输入图片名称"
                    type="text"
                    style={{
                      width: '100%',
                      marginRight: '3%',
                    }}
                  />,
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="图片链接地址"
                required={true}>
                {getFieldDecorator('link', {
                  initialValue:
                    this.props.match.params.action === 'edit'
                      ? homePictureDetail.linkurl
                      : '',
                  rules: [
                    {
                      required: true,
                      message: '请输入图片链接地址',
                    },
                  ],
                })(
                  <Input
                    placeholder="请输入图片链接地址"
                    type="text"
                    style={{
                      width: '100%',
                      marginRight: '3%',
                    }}
                  />,
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="图片上传" required={true}>
                {getFieldDecorator('image', {
                  rules: [
                    {
                      required: true,
                      message: '请添加上传图片',
                    },
                  ],
                })(
                  <PicturesWall
                    setFieldsValue={setFieldsValue}
                    max={1}
                    getFileList={this.getFileList}
                    initFile={imageList}
                  />,
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="排序号" required={true}>
                {getFieldDecorator('rank', {
                  initialValue:
                    this.props.match.params.action === 'edit'
                      ? homePictureDetail.sort
                      : '',
                  rules: [
                    {
                      required: true,
                      message: '请输入排序号',
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
                      ? homePictureDetail.status
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

const AddHomePictureForm = Form.create()(AddHomePicture);

const mapStateToProps = state => {
  return {
    homePictureDetail: getHomePictureDetail(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    init: () => dispatch(init()),
    submit: param => dispatch(submit(param)),
    initHomePictureDetail: param => dispatch(initHomePictureDetail(param)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddHomePictureForm);

class PicturesWall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: [],
    };
  }
  handleCancel = () => this.setState({ previewVisible: false });

  componentWillReceiveProps(nextProps) {
    if (!this.state.fileList.length) {
      this.setState({ fileList: [...nextProps.initFile] });
    }
  }
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
        image: fileList.length > 0 ? 'true' : null,
      });
      this.props.getFileList(fileList, 'image');
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
