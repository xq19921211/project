/**
 * Created by xu.long on 2018/5/12.
 */
import './style.scss';

import { Button, Cascader, Form, Input, Layout, Radio, Select } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { Toolbar } from '../../../../component/Toolbar/Toolbar';
import { init, initTenementDetail, submit } from './action';
import { getTenementDetail } from './selector';

const { Content } = Layout;
const FormItem = Form.Item;
const { TextArea } = Input;
class AddTenementCompany extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (this.props.match.params.action === 'edit') {
      this.props.initTenementDetail({ id: this.props.match.params.id });
    } else {
      this.props.init();
    }
  }
  componentWillUnmount() {
    this.props.init();
  }

  areaOnChange = e => {
    console.log(e);
  };
  handleSubmit = e => {
    e.preventDefault();
    let param;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        if (this.props.match.params.action === 'edit') {
          param = {
            id: this.props.match.params.id,
            action: this.props.match.params.action,
          };
        } else {
          param = {
            action: this.props.match.params.action,
          };
        }
        for (let item in values) {
          if (values[item] !== undefined && values[item] !== null) {
            switch (item) {
              case 'companyName':
                param['name'] = values[item];
                break;
              case 'area':
                param['province'] = values[item][0];
                param['city'] = values[item][1];
                param['area'] = values[item][2];
                break;
              case 'address':
                param['address'] = values[item];
                break;
              case 'contact':
                param['phone'] = values[item];
                break;
              case 'remark':
                param['note'] = values[item];
                break;
            }
          }
        }
        console.log('param: ' + JSON.stringify(param));
        this.props.submit(param);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { tenementDetail } = this.props;
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
    const options = window.address;
    const isEdit = this.props.match.params.action === 'edit';
    let ToolbarTitle = isEdit ? '编辑物业公司' : '新增物业公司';
    const list = [
      '物业管理',
      {
        label: '物业公司管理',
        to: '/index/tenementCompanyManagement',
      },
      {
        label: ToolbarTitle,
        to: `/index/addTenementCompany/${this.props.match.params.action}/${
          this.props.match.params.id
        }`,
      },
    ];
    return (
      <Layout id="add_tenement_company">
        <Toolbar type={1} list={list} title={ToolbarTitle} />
        <Content className="content">
          <div>
            <Form onSubmit={this.handleSubmit}>
              <FormItem {...formItemLayout} label="公司名称" required={true}>
                {getFieldDecorator('companyName', {
                  initialValue: tenementDetail.name,
                  rules: [
                    {
                      required: true,
                      message: '请输入公司名称',
                    },
                  ],
                })(
                  <Input
                    placeholder="请输入公司名称"
                    type="text"
                    style={{
                      width: '100%',
                      marginRight: '3%',
                    }}
                  />,
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="所在地区" required={true}>
                {getFieldDecorator(
                  'area',
                  this.props.match.params.action === 'edit'
                    ? {
                        initialValue: [
                          tenementDetail.province,
                          tenementDetail.city,
                          tenementDetail.area,
                        ],
                        rules: [
                          {
                            required: true,
                            message: '请输入所在地区',
                          },
                        ],
                      }
                    : {
                        rules: [
                          {
                            required: true,
                            message: '请输入所在地区',
                          },
                        ],
                      },
                )(
                  isEdit ? (
                    <Cascader
                      options={options}
                      onChange={this.areaOnChange}
                      style={{
                        width: '100%',
                        marginRight: '3%',
                      }}
                    />
                  ) : (
                    <Cascader
                      placeholder="请选择所在地区"
                      options={options}
                      onChange={this.areaOnChange}
                      style={{
                        width: '100%',
                        marginRight: '3%',
                      }}
                    />
                  ),
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="详细地址" required={true}>
                {getFieldDecorator('address', {
                  initialValue: tenementDetail.address,
                  rules: [
                    {
                      required: true,
                      message: '请输入详细地址',
                    },
                  ],
                })(
                  <Input
                    placeholder="请输入详细地址"
                    type="text"
                    style={{
                      width: '100%',
                      marginRight: '3%',
                    }}
                  />,
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="联系电话" required={true}>
                {getFieldDecorator('contact', {
                  initialValue: tenementDetail.phone,
                  rules: [
                    {
                      required: true,
                      message: '请输入联系电话',
                    },
                    {
                      message: '请输入正确的手机号码',
                      pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
                    },
                  ],
                })(
                  <Input
                    placeholder="请输入联系电话"
                    type="text"
                    style={{
                      width: '100%',
                      marginRight: '3%',
                    }}
                  />,
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="备注信息">
                {getFieldDecorator('remark', {
                  initialValue: tenementDetail.note,
                })(
                  <TextArea
                    rows={4}
                    placeholder="请输入备注信息"
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

const AddTenementCompanyForm = Form.create()(AddTenementCompany);
const mapStateToProps = state => {
  return {
    tenementDetail: getTenementDetail(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    init: () => {
      dispatch(init());
    },
    submit: param => {
      dispatch(submit(param));
    },
    initTenementDetail: param => {
      dispatch(initTenementDetail(param));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddTenementCompanyForm);
