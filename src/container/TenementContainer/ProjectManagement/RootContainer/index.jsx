/**
 * Created by xu.long on 2018/5/12.
 */

import './style.scss';

import {
  Button,
  Cascader,
  Divider,
  Form,
  Input,
  Layout,
  Modal,
  Pagination,
  Popconfirm,
  Select,
  Table,
} from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Toolbar } from '../../../../component/Toolbar/Toolbar';
import { initProjectList, projectDel } from './action';
import { CustomTable } from './components/CustomTable';
import { getProjectList } from './selector';

const { Content } = Layout;
const FormItem = Form.Item;
const InputGroup = Input.Group;
const Option = Select.Option;

class ProjectManagement extends React.Component {
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

  onChange = value => {
    console.log(value);
  };
  goProjectDetail = id => {
    this.props.history.push(`projectDetail/${id}`);
  };

  componentWillMount() {
    this.props.initProjectList({
      current: this.state.options.current,
      pageSize: this.state.options.pageSize,
    });
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
        let param = {
          current: 1,
          pageSize: this.state.options.pageSize,
        };
        for (let item in values) {
          if (values[item]) {
            switch (item) {
              case 'projectName':
                param['name'] = values[item];
                break;
            }
          }
          console.log('item: ' + item);
        }
        console.log('param: ' + JSON.stringify(param));
        this.props.initProjectList(param);
        this.pageChange(1, this.state.options.pageSize);
      }
    });
  };
  //新增项目
  add = () => {
    this.props.history.push('addProject/add/0');
  };
  //编辑项目
  edit = id => {
    console.log('edit id: ' + id);
    this.props.history.push(`addProject/edit/${id}`);
  };
  // 删除项目
  del = id => {
    this.props.projectDel({
      id,
      current: this.state.options.current,
      pageSize: this.state.options.pageSize,
    });
  };

  render() {
    const { getFieldDecorator, resetFields } = this.props.form;
    const { projectList, initProjectList } = this.props;
    const list = [
      '物业管理',
      {
        label: '项目管理',
        to: '/index/projectManagement',
      },
    ];
    return (
      <Layout id="project_management">
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
              <FormItem label="项目名称">
                {getFieldDecorator('projectName')(
                  <Input
                    onPressEnter={this.handleSubmit}
                    placeholder="请输入项目名称"
                    type="text"
                    style={{
                      width: '100%',
                      marginRight: '3%',
                    }}
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
                    resetFields(['projectName']);
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
            projectList={projectList}
            goProjectDetail={this.goProjectDetail}
            initProjectList={initProjectList}
            edit={this.edit}
            del={this.del}
          />
        </Content>
      </Layout>
    );
  }
}
const ProjectManagementForm = Form.create()(ProjectManagement);

const mapStateToProps = state => {
  return {
    projectList: getProjectList(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initProjectList: param => {
      dispatch(initProjectList(param));
    },
    projectDel: param => {
      dispatch(projectDel(param));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectManagementForm);
