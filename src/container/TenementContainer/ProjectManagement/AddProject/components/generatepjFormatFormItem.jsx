import { Button, Col, Form, Icon, Input, Row, Select, message } from 'antd';

import React from 'react';

const FormItem = Form.Item;

export default ({
  keys,
  getFieldDecorator,
  remove,
  add,
  pjFormatList,
  getFieldValue,
  setFieldsValue,
}) => {
  const distributionRatioRule = {
    rules: [
      {
        required: true,
        validator: (rule, value, callback, source, options) => {
          if (String(value).trim() === '') return callback('请输入');
          const currnetKey = rule.field.split('.')[1];
          const index = rule.field.match(/\[(\d+)\]/)[1];
          const pjFormatList = getFieldValue('pjFormatList');
          const currentRow = pjFormatList[index];

          const sum =
            Number(currentRow.supplierRate) +
            Number(currentRow.platformRate) +
            Number(currentRow.operatorRate);

          if (sum !== 100) {
            return callback(`分成比例总和需要等于100%`);
          }
          pjFormatList.splice(index, 1, currentRow);
          setFieldsValue({ pjFormatList });
          callback();
        },
      },
    ],
  };

  return (
    <div style={{ padding: '0 30px' }}>
      <Row
        gutter={10}
        style={{
          height: '40px',
          lineHeight: '40px',
          textAlign: 'center',
          backgroundColor: '#f1f1f1',
          marginBottom: '10px',
        }}>
        <Col span={3}>规格名称</Col>
        <Col span={4}>最小单位</Col>
        <Col span={4}>岗位单价(元)</Col>
        <Col span={7}>分配比例</Col>
        <Col span={4}>打卡频次</Col>
      </Row>
      {keys.map(k => {
        return (
          <Row key={k} style={{ marginBottom: '10px' }} gutter="10">
            <Col span={4}>
              {getFieldDecorator(`pjFormatList[${k}].id`, {
                initialValue: (pjFormatList[k] || {}).id || 0,
              })}
              {getFieldDecorator(`pjFormatList[${k}].name`, {
                initialValue: (pjFormatList[k] || {}).name,
              })(<Input />)}
            </Col>
            <Col span={4}>
              {getFieldDecorator(`pjFormatList[${k}].unit`, {
                initialValue: (pjFormatList[k] || {}).unit || '岗位全时段',
              })(
                <Select>
                  <Select.Option value="1小时">1小时</Select.Option>
                  <Select.Option value="2小时">2小时</Select.Option>
                  <Select.Option value="4小时">4小时</Select.Option>
                  <Select.Option value="岗位全时段">岗位全时段</Select.Option>
                </Select>,
              )}
            </Col>
            <Col span={4}>
              {getFieldDecorator(`pjFormatList[${k}].price`, {
                initialValue: (pjFormatList[k] || {}).price,
              })(<Input />)}
            </Col>
            <Col span={7}>
              <FormItem style={{ display: 'inline-block', width: '33%' }}>
                {getFieldDecorator(`pjFormatList[${k}].supplierRate`, {
                  initialValue: (pjFormatList[k] || {}).supplierRate,
                  ...distributionRatioRule,
                })(<Input placeholder="供应商比例" style={{ width: '70%' }} />)}
                &nbsp;%
              </FormItem>
              <FormItem style={{ display: 'inline-block', width: '33%' }}>
                {getFieldDecorator(`pjFormatList[${k}].platformRate`, {
                  initialValue: (pjFormatList[k] || {}).platformRate,
                  ...distributionRatioRule,
                })(<Input placeholder="平台比例" style={{ width: '70%' }} />)}
                &nbsp;%
              </FormItem>
              <FormItem style={{ display: 'inline-block', width: '33%' }}>
                {getFieldDecorator(`pjFormatList[${k}].operatorRate`, {
                  initialValue: (pjFormatList[k] || {}).operatorRate,
                  ...distributionRatioRule,
                })(<Input placeholder="员工比例" style={{ width: '70%' }} />)}
                &nbsp;%
              </FormItem>
            </Col>
            <Col span={4}>
              每隔&nbsp;
              {getFieldDecorator(`pjFormatList[${k}].signFrequency`, {
                initialValue: (pjFormatList[k] || {}).signFrequency,
              })(<Input style={{ width: '50%' }} />)}
              &nbsp;小时/次
            </Col>
            <Col span={1}>
              {keys.length > 1 ? (
                <Icon
                  className="dynamic-delete-button"
                  type="minus-circle-o"
                  disabled={keys.length === 1}
                  onClick={() => remove(k)}
                />
              ) : null}
            </Col>
          </Row>
        );
      })}
      <Row type="flex" justify="center">
        <Col span={5}>
          <Button type="dashed" onClick={add} style={{ width: '50%' }}>
            <Icon type="plus" /> 增加
          </Button>
        </Col>
      </Row>
    </div>
  );
};
