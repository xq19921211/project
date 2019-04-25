/*
 * @Author: LiaoYingLong
 * @Date: 2018-10-15 17:45:19
 * @Last Modified by: LiaoYingLong
 * @Last Modified time: 2018-10-24 11:49:03
 */

import '../Statistics/style.scss';

import { Layout } from 'antd';
import React from 'react';

import FifthCard from './components/FifthCard';
import FirstCard from './components/FirstCard';
import FourthCard from './components/FourthCard';
import SecondCard from './components/SecondCard';
import ThirdCard from './components/ThirdCard';

const { Content } = Layout;

export default function() {
  return (
    <Layout id="statistics">
      <Content className="content">
        <FirstCard immediateCheck />
        <SecondCard immediateCheck />
        <ThirdCard immediateCheck />
        <FourthCard immediateCheck />
        <FifthCard immediateCheck />
      </Content>
    </Layout>
  );
}
