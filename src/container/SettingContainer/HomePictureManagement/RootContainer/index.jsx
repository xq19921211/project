/**
 * Created by xu.long on 2018/6/18.
 */
import './style.scss';
import {
  Button,
  Divider,
  Form,
  Input,
  Layout,
  Pagination,
  Select,
  Table,
} from 'antd';

import React from 'react';
import { connect } from 'react-redux';
import { Toolbar } from '../../../../component/Toolbar/Toolbar';
import { dateFormat } from '../../../../util/util';
import { initHomePictureList, modifyListStatus } from './action';
import { getHomePictureList } from './selector';

const { Content } = Layout;
const FormItem = Form.Item;
class HomePictureManagement extends React.Component {
  constructor(props) {
    super(props);
    this.pageChange = this.pageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    this.props.initHomePictureList({
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
              case 'name':
                param['keyword'] = values[item];
                break;
            }
          }
        }
        this.props.initHomePictureList(param);
        this.pageChange(1, this.state.options.pageSize);
      }
    });
  };
  //新增首页轮播图
  add = () => {
    this.props.history.push('addHomePicture/add/0');
  };
  //编辑首页轮播图
  edit = id => {
    this.props.history.push(`addHomePicture/edit/${id}`);
  };
  changeStatus = param => {
    this.props.modifyListStatus(param);
  };

  render() {
    const { getFieldDecorator, resetFields } = this.props.form;
    const { homePictureList, initHomePictureList } = this.props;
    const list = [
      '系统设置',
      {
        label: '首页轮播图',
        to: '/index/homePictureManagement',
      },
    ];
    return (
      <Layout id="home_picture_management">
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
              <FormItem label="图片名称">
                {getFieldDecorator('name')(
                  <Input
                    onPressEnter={this.handleSubmit}
                    placeholder="请输入图片名称"
                    type="text"
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
                    resetFields(['name']);
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
            homePictureList={homePictureList}
            edit={this.edit}
            changeStatus={this.changeStatus}
            initHomePictureList={initHomePictureList}
          />
        </Content>
      </Layout>
    );
  }
}
const HomePictureManagementForm = Form.create()(HomePictureManagement);
const mapStateToProps = state => {
  return {
    homePictureList: getHomePictureList(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initHomePictureList: param => {
      dispatch(initHomePictureList(param));
    },
    modifyListStatus: param => {
      dispatch(modifyListStatus(param));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePictureManagementForm);
class CustomTable extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const columns = [
      {
        title: '图片',
        dataIndex: 'picture',
        key: 'picture',
      },
      {
        title: '图片名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '链接地址',
        dataIndex: 'link',
        key: 'link',
      },
      {
        title: '排序号',
        dataIndex: 'rank',
        key: 'rank',
      },
      {
        title: '添加人',
        dataIndex: 'user',
        key: 'user',
        render(text, record) {
          return record.user.realname;
        },
      },
      {
        title: '新增时间',
        dataIndex: 'createTime',
        key: 'createTime',
      },
      {
        title: '启用状态',
        dataIndex: 'statusName',
        key: 'statusName',
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => {
          let strValue = {
            0: '启用',
            1: '停用',
          }[record.status];
          return (
            <span>
              <a
                onClick={() => {
                  this.props.edit(record.id);
                }}>
                编辑
              </a>
              <Divider type="vertical" />
              <a
                onClick={() => {
                  record.status = record.status === 0 ? 1 : 0;
                  this.props.changeStatus(record);
                }}>
                {strValue}
              </a>
            </span>
          );
        },
      },
    ];
    const { homePictureList } = this.props;
    const data = homePictureList.dataSource.map((item, i) => {
      let statusName = item.status === 0 ? '已停用' : '已启用';
      return {
        key: i,
        id: item.id,
        picture: (
          <img
            style={{ width: '40px', height: '40px' }}
            src={!item.pic ? './image/default.png' : item.pic.filepath}
          />
        ),
        name: item.imagename,
        link: item.linkurl,
        rank: item.sort,
        creator: item.supStatus,
        createTime: !item.updatetime ? '' : item.updatetime,
        status: item.status,
        statusName: statusName,
        user: item.user,
      };
    });

    const options = {
      current: this.props.options.current,
      defaultPageSize: this.props.options.pageSize,
      pageSizeOptions: this.props.options.pageSizeOptions,
      total: homePictureList.total,
      showTotal: total => `共 ${total} 条记录`,
      showSizeChanger: true,
      showQuickJumper: true,
      onChange: (page, pageSize) => {
        this.props.options.pageSizeChange(page, pageSize);
        this.props.initHomePictureList({
          current: page,
          pageSize: pageSize,
        });
      },
      onShowSizeChange: (current, size) => {
        this.props.options.pageSizeChange(current, size);
        this.props.initHomePictureList({
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
