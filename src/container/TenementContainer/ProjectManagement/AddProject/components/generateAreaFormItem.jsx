import { Button, Col, Form, Icon, Input, Row, Select } from 'antd';
import React from 'react';

const FormItem = Form.Item;

export default ({
  keys,
  getFieldDecorator,
  remove,
  add,
  areasList,
  unitList,
}) => {
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
        <Col span={5}>区域名称</Col>
        <Col span={5}>数量</Col>
        <Col span={5}>计量单位</Col>
        <Col span={5}>区域备注</Col>
      </Row>
      {keys.map(k => {
        return (
          <Row key={k} style={{ marginBottom: '10px' }}>
            <Col span={4}>
              {getFieldDecorator(`areasList[${k}].id`, {
                initialValue: (areasList[k] || {}).id || 0,
              })}
              {getFieldDecorator(`areasList[${k}].name`, {
                initialValue: (areasList[k] || {}).name,
              })(<Input placeholder="北大门广场区域(示例)" />)}
            </Col>
            <Col span={4} offset={1}>
              {getFieldDecorator(`areasList[${k}].count`, {
                initialValue: (areasList[k] || {}).count,
              })(<Input placeholder="1288.00(示例)" />)}
            </Col>
            <Col span={4} offset={1}>
              {getFieldDecorator(`areasList[${k}].unit`, {
                initialValue: (areasList[k] || {}).unit || '1',
              })(
                <Select>
                  {unitList.map((item, i) => (
                    <Select.Option value={item}>{item}</Select.Option>
                  ))}
                </Select>,
              )}
            </Col>

            <Col span={4} offset={1}>
              {getFieldDecorator(`areasList[${k}].note`, {
                initialValue: (areasList[k] || {}).note,
              })(<Input placeholder="默认可不填写" />)}
            </Col>

            <Col span={1} offset={1}>
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
