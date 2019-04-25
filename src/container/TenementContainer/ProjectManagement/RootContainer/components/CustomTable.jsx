import { Divider, Pagination, Popconfirm, Table, Upload, message } from 'antd';
import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';

import { getRequestUrl } from '../../../../../util/request';
import { urlGenerator } from '../../../../../util/util';

const download = ({ projectid }) => {
  const a = document.createElement('a');
  a.href = urlGenerator(getRequestUrl('/excel/exportExcel'), { projectid });
  a.download = `eaq ${moment().format('YYYY-MM-DD HH:mm:ss')}`;
  document.body.append(a);
  a.click();
  document.body.removeChild(a);
  message.success('导出成功');
};

export class CustomTable extends React.Component {
  onUploadChange = info => {
    if (info.file.status === 'error') {
      return message.error('导入出错了！请重试');
    }
    if (info.file.status === 'done') {
      const SUCCESS_CODE = 0;
      if (info.file.response.code === SUCCESS_CODE) {
        message.success('导入成功');
      } else {
        message.error(info.file.response.message);
      }
    }
  };

  render() {
    const columns = [
      {
        title: '项目名称',
        dataIndex: 'projectName',
        key: 'projectName',
      },
      {
        title: '所属组织架构',
        dataIndex: 'departmentBelongTo',
        key: 'departmentBelongTo',
      },
      {
        title: '所属物业公司',
        dataIndex: 'tenementCompanyBelongTo',
        key: 'tenementCompanyBelongTo',
      },
      {
        title: '物业人员数量',
        dataIndex: 'tenementMemberAmount',
        key: 'tenementMemberAmount',
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <a onClick={() => this.props.goProjectDetail(record.id)}>查看</a>
            <Divider type="vertical" />
            <a onClick={() => this.props.edit(record.id)}>修改</a>
            <Divider type="vertical" />
            <Link
              to={{
                pathname: `/index/Schedule/${record.id}`,
                state: { sup_id: record.sup_id },
              }}>
              排班
            </Link>
            <Divider type="vertical" />
            <Popconfirm
              title="是否确认删除？"
              onConfirm={() => this.props.del(record.id)}
              okText="是"
              cancelText="否">
              <a>删除</a>
            </Popconfirm>
            <Divider type="vertical" />
            <Upload
              accept=".csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,"
              action={getRequestUrl('/excel/importExcel')}
              data={{ projectId: record.id }}
              showUploadList={false}
              // withCredentials={true}
              onChange={this.onUploadChange}>
              <a>导入</a>
            </Upload>
            <Divider type="vertical" />
            <a onClick={() => download({ projectid: record.id })}>导出</a>
          </span>
        ),
      },
    ];
    const { projectList } = this.props;
    const data = projectList.dataSource.map((item, i) => {
      return {
        key: i,
        id: item.pjId,
        projectName: item.pjName,
        departmentBelongTo: item.departName,
        // regionBelongTo: '华南大区',
        tenementCompanyBelongTo: item.companyName,
        tenementMemberAmount: item.customerCount,
        address: item.pjAddress,
      };
    });
    const options = {
      current: this.props.options.current,
      defaultPageSize: this.props.options.pageSize,
      pageSizeOptions: this.props.options.pageSizeOptions,
      total: projectList.total,
      showTotal: total => `共 ${total} 条记录`,
      showSizeChanger: true,
      showQuickJumper: true,
      onChange: (page, pageSize) => {
        this.props.options.pageSizeChange(page, pageSize);
        this.props.initProjectList({
          current: page,
          pageSize: pageSize,
        });
      },
      onShowSizeChange: (current, size) => {
        this.props.options.pageSizeChange(current, size);
        this.props.initProjectList({
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
