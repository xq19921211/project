import { Col, Icon, Row } from 'antd';

import React from 'react';

export default () => (
  <React.Fragment>
    <Row
      type="flex"
      justify="center"
      align="middle"
      style={{ height: '150px', fontSize: '80px' }}>
      <Icon type="info-circle" theme="outlined" style={{ color: '#A1A1A1' }} />
    </Row>
    <Row
      type="flex"
      justify="center"
      align="middle"
      style={{ color: '#A1A1A1' }}>
      项目岗位信息和规格信息为空，请先设置！
    </Row>
  </React.Fragment>
);
