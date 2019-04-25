import React from 'react';

class ModalTableSelect extends React.Component {
  constructor(props) {
    super(props);
  }
  static defaultProps = {
    selectedRowKeys: () => {},
    onSelectRowChange: () => {},
    width: 800,
    rowKey: row => String(row.id),
  };
  render() {
    const {
      visible,
      onCancel,
      onOk,
      title,
      width,
      columns,
      tableData,
      rowKey,
      rowSelection,
    } = this.props;
    const options = {
      current: this.state.options.current,
      defaultPageSize: this.state.options.pageSize,
      pageSizeOptions: this.state.options.pageSizeOptions,
      total: tableData.total,
      showTotal: total => `共 ${total} 条记录`,
      showSizeChanger: true,
      showQuickJumper: true,
      onChange: this.pageChange,
      onShowSizeChange: this.pageChange,
    };

    return (
      <Modal
        width={width}
        title={title}
        visible={visible}
        onCancel={onCancel}
        onOk={onOk}>
        <div>
          <Table
            columns={columns}
            dataSource={tableData.dataSource}
            pagination={false}
            rowKey={rowKey}
            rowSelection={rowSelection}
          />
          <Pagination style={{ marginTop: '15px' }} {...options} />
        </div>
      </Modal>
    );
  }
}
