/**
 * Created by xu.long on 27/03/2018.
 */

import './style.scss';

import { Button, Checkbox, Form, Icon, Input, message } from 'antd';
import { getConfig, login } from './action';

import { DEADLINE } from '../../util/util';
import React from 'react';
import { connect } from 'react-redux';
import { getLoginResult } from './selector';
import moment from 'moment';

const FormItem = Form.Item;
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount() {
    this.props.getConfig();
  }
  // shouldComponentUpdate(nextProps, nextState){
  //     console.log('shouldComponentUpdate');
  //     if((this.state && nextState && this.state !== nextState) ||
  //     this.props && nextProps && this.props !== nextProps){
  //         return true;
  //     }else{
  //         return false;
  //     }
  // }
  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceivePorps');
  }
  componentWillUpdate(nextProps, nextState) {
    console.log('componentWillUpdate');
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
  }

  handleSubmit = e => {
    e.preventDefault();
    // if (moment().isAfter(DEADLINE)) {
    //     message.error('请续费后再操作！');
    //     return;
    // }
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        // this.props.history.push('index');
        this.props.login(values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div id="login">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <h1 className="title">e安全管理后台</h1>
          {/*<div className="tip"><span></span></div>*/}
          <FormItem>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入您的账户！' }],
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="账户"
              />,
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入您的密码！' }],
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="password"
                placeholder="密码"
              />,
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox style={{ color: '#ffffff' }}>自动登录</Checkbox>)}
            {/*<a className="login-form-forgot" href="">忘记密码</a>*/}
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button">
              登录
            </Button>
            {/*或 <a href="">马上注册!</a>*/}
          </FormItem>
        </Form>
      </div>
    );
  }
}
const LoginForm = Form.create()(Login);

const mapStateToProps = state => {
  return {
    status: getLoginResult(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: userInfo => {
      dispatch(login(userInfo));
    },
    getConfig: () => {
      dispatch(getConfig());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginForm);
