/**
 * Created by xu.long on 2018/6/18.
 */
import React from 'react';
import {
  Layout,
  Form,
  Input,
  Button,
  Select,
  Table,
  Pagination,
  Row,
  Col,
  AutoComplete,
} from 'antd';
import { Toolbar } from '../../../../component/Toolbar/Toolbar';
import './style.scss';
import { connect } from 'react-redux';
import { getBuildTeamList } from '../../BuildTeamManagement/RootContainer/selector';
import { initBuildTeamList } from '../../BuildTeamManagement/RootContainer/action';
import { initMerchantList } from '../../../MerchantContainer/MerchantManagement/RootContainer/action';
import { getMerchantList } from '../../../MerchantContainer/MerchantManagement/RootContainer/selector';
import { dateFormat } from '../../../../util/util';
const { Content } = Layout;
const FormItem = Form.Item;
const InputGroup = Input.Group;
const Option = Select.Option;
class CoverRuleManagement extends React.Component {
  constructor(props) {
    super(props);
    this.pageChange = this.pageChange.bind(this);
    this.onAutoCompleteSelect = this.onAutoCompleteSelect.bind(this);
    this.state = {
      options: {
        current: 1,
        pageSize: 10,
        pageSizeChange: this.pageChange,
        pageSizeOptions: ['10', '20', '100'],
      },
      supId: 0,
      dataSource: [],
      allDataSource: [],
    };
  }

  componentWillMount() {
    this.props.initBuildTeamList({
      current: this.state.options.current,
      pageSize: this.state.options.pageSize,
    });
    this.props.initMerchantList();
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

  goCoverRuleDetail = id => {
    this.props.history.push(`coverRuleDetail/${id}`);
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
        };
        for (let item in values) {
          switch (item) {
            case 'teamName':
              param['keyword'] = values[item];
              break;
            case 'supplier':
              param['supId'] = values[item];
              break;
          }
        }
        console.log('param: ' + JSON.stringify(param));
        this.props.initBuildTeamList(param);
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
    });
    this.setState(obj);
  };

  onAutoCompleteSelect(value) {
    console.log('onSelect', value);
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

  render() {
    const { getFieldDecorator, resetFields } = this.props.form;
    const { buildTeamList, initBuildTeamList } = this.props;
    const { dataSource } = this.state;
    const list = [
      '保安公司管理',
      {
        label: '覆盖规则',
        to: '/index/coverRuleManagement',
      },
    ];
    return (
      <Layout id="cover_rule_management">
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
              <FormItem label="保安队名称">
                {getFieldDecorator('teamName')(
                  <Input
                    onPressEnter={this.handleSubmit}
                    placeholder="请输入保安队名称"
                    type="text"
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
                    resetFields(['teamName', 'supplier']);
                  }}>
                  重置
                </Button>
              </FormItem>
            </Form>
          </div>
          <CustomTable
            options={this.state.options}
            buildTeamList={buildTeamList}
            goCoverRuleDetail={this.goCoverRuleDetail}
            initBuildTeamList={initBuildTeamList}
          />
        </Content>
      </Layout>
    );
  }
}
const CoverRuleManagementForm = Form.create()(CoverRuleManagement);

const mapStateToProps = state => {
  return {
    buildTeamList: getBuildTeamList(state),
    merchantList: getMerchantList(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initBuildTeamList: param => {
      dispatch(initBuildTeamList(param));
    },
    initMerchantList: param => {
      dispatch(initMerchantList(param));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CoverRuleManagementForm);

class CustomTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const columns = [
      {
        title: '保安队名称',
        dataIndex: 'teamName',
        key: 'teamName',
      },
      {
        title: '保安公司',
        dataIndex: 'supplier',
        key: 'supplier',
      },
      {
        title: '覆盖项目',
        dataIndex: 'project',
        key: 'project',
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <a
              onClick={() => {
                console.log(`action: ${JSON.record}`);
                this.props.goCoverRuleDetail(record.id);
              }}>
              详情
            </a>
          </span>
        ),
      },
    ];
    const { buildTeamList } = this.props;
    const data = buildTeamList.dataSource.map((item, i) => {
      return {
        key: i,
        id: item.team_id,
        teamName: item.team_name,
        supplier: item.sup_name,
        project: item.coverRules.map((ite, i) => {
          if (ite) {
            if (i !== 0) {
              return '、' + ite.org_name;
            } else {
              return ite.org_name;
            }
          }
        }),
      };
    });
    const options = {
      current: this.props.options.current,
      defaultPageSize: this.props.options.pageSize,
      pageSizeOptions: this.props.options.pageSizeOptions,
      total: buildTeamList.total,
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
        this.props.initBuildTeamList({
          current: page,
          pageSize: pageSize,
        });
      },
      onShowSizeChange: (current, size) => {
        this.props.options.pageSizeChange(current, size);
        this.props.initBuildTeamList({
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
