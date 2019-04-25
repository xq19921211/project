/**
 * Created by xu.long on 2018/6/18.
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
import { connect } from 'react-redux';
import { getRoleDetail } from './selector';
import { init, submit, initRoleDetail } from './action';
const { Content } = Layout;
const FormItem = Form.Item;
const InputGroup = Input.Group;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
class AddRole extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (this.props.match.params.action === 'edit') {
      this.props.initRoleDetail({ id: this.props.match.params.id });
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
            roleId: this.props.match.params.id,
            action: this.props.match.params.action,
          };
        } else {
          param = {
            action: this.props.match.params.action,
          };
        }
        for (let item in values) {
          switch (item) {
            case 'roleName':
              param['roleName'] = values[item];
              break;
            case 'remark':
              param['roleNote'] = values[item];
              break;
            case 'usingOrNot':
              param['roleStatus'] = values[item];
              break;
          }
        }
        console.log('param: ' + JSON.stringify(param));
        this.props.submit(param);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { roleDetail } = this.props;
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
    const ToolbarTitle = isEdit ? '编辑角色' : '新增角色';
    const list = [
      '系统设置',
      {
        label: '角色管理',
        to: '/index/roleManagement',
      },
      {
        label: ToolbarTitle,
        to: `/index/addRole/${this.props.match.params.action}/${
          this.props.match.params.id
        }`,
      },
    ];
    return (
      <Layout id="add_role">
        <Toolbar type={1} list={list} title={ToolbarTitle} />
        <Content className="content">
          <div>
            <Form onSubmit={this.handleSubmit}>
              <FormItem {...formItemLayout} label="角色名称" required={true}>
                {getFieldDecorator('roleName', {
                  initialValue: roleDetail.roleName ? roleDetail.roleName : '',
                  rules: [
                    {
                      required: true,
                      message: '请输入角色名称',
                    },
                  ],
                })(
                  <Input
                    placeholder="请输入角色名称"
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
                  initialValue: roleDetail.roleNote ? roleDetail.roleNote : '',
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
              <FormItem {...formItemLayout} label="是否启用" require={true}>
                {getFieldDecorator('usingOrNot', {
                  initialValue:
                    this.props.match.params.action === 'edit'
                      ? roleDetail.roleStatus
                        ? roleDetail.roleStatus
                        : 0
                      : 0,
                  rules: [{ required: true, message: '是否启用' }],
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

const AddRoleForm = Form.create()(AddRole);
const mapStateToProps = state => {
  return {
    roleDetail: getRoleDetail(state),
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
    initRoleDetail: param => {
      dispatch(initRoleDetail(param));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddRoleForm);
