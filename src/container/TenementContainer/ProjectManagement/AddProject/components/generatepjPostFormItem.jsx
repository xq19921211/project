import {
  Button,
  Col,
  Form,
  Icon,
  Input,
  Row,
  Select,
  TimePicker,
  TreeSelect,
} from 'antd';

import React from 'react';
import moment from 'moment';

const FormItem = Form.Item;
const format = 'HH:mm';
const combine = data => {
  let result = [];
  data.map((item, i) => {
    if (item.chrildren && item.chrildren.length > 0) {
      result.push({
        key: item.cat_id,
        value: item.cat_id,
        title: item.cat_name,
        children: this.combine(item.chrildren),
      });
    } else {
      result.push({
        key: item.cat_id,
        value: item.cat_id,
        title: item.cat_name,
      });
    }
  });
  return result;
};
export default ({
  keys,
  getFieldDecorator,
  remove,
  add,
  treeList,
  setFieldsValue,
  getFieldValue,
  pjPostList,
}) => {
  const onCatIdChange = (index, catName) => {
    const pjPostList = getFieldValue('pjPostList');
    pjPostList[index].catName = catName.pop();
    setFieldsValue({ pjPostList });
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
        <Col span={3}>岗位名称</Col>
        <Col span={4}>岗位属性</Col>
        <Col span={4}>班次属性</Col>
        <Col span={6}>岗位时间</Col>
        <Col span={7}>每月上班天数</Col>
      </Row>
      {keys.map(k => {
        return (
          <Row key={k} style={{ marginBottom: '10px' }}>
            <Col span={3}>
              {getFieldDecorator(`pjPostList[${k}].id`, {
                initialValue: (pjPostList[k] || {}).id || 0,
              })}
              {getFieldDecorator(`pjPostList[${k}].name`, {
                initialValue: (pjPostList[k] || {}).name,
              })(<Input />)}
            </Col>
            <Col span={3} offset={1}>
              {getFieldDecorator(`pjPostList[${k}].catId`, {
                initialValue: (pjPostList[k] || {}).catId,
              })(
                <TreeSelect
                  treeData={combine(treeList)}
                  onChange={(_, catName) => onCatIdChange(k, catName)}
                />,
              )}
              {getFieldDecorator(`pjPostList[${k}].catName`, {
                initialValue: (pjPostList[k] || {}).catName,
              })}
            </Col>
            <Col span={3} offset={1}>
              {getFieldDecorator(`pjPostList[${k}].type`, {
                initialValue: (pjPostList[k] || {}).type || 1,
              })(
                <Select>
                  <Select.Option value={1}>白班</Select.Option>
                  <Select.Option value={2}>中班</Select.Option>
                  <Select.Option value={3}>夜班</Select.Option>
                </Select>,
              )}
            </Col>
            <Col span={6} offset={1}>
              {getFieldDecorator(`pjPostList[${k}].startTime`, {
                initialValue:
                  pjPostList[k] && pjPostList[k].startTime
                    ? moment(pjPostList[k].startTime)
                    : '',
              })(<TimePicker format={format} placeholder="开始时间" />)}
              -
              {getFieldDecorator(`pjPostList[${k}].endTime`, {
                initialValue:
                  pjPostList[k] && pjPostList[k].endTime
                    ? moment(pjPostList[k].endTime)
                    : '',
              })(<TimePicker format={format} placeholder="结束时间" />)}
            </Col>
            <Col span={3} offset={1}>
              {getFieldDecorator(`pjPostList[${k}].workDay`, {
                initialValue: (pjPostList[k] || {}).workDay,
              })(<Input />)}
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
