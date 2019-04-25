/*
 * @Author: LiaoYingLong
 * @Date: 2018-06-23 13:28:35
 * @Last Modified by: LiaoYingLong
 * @Last Modified time: 2018-07-21 21:11:06
 */

import './style.scss';

import FifthCard from './components/FifthCard';
import FourthCard from './components/FourthCard';
import HeaderCardList from './components/HeaderCardList';
import { Layout } from 'antd';
import React from 'react';
import SecondCard from './components/SecondCard';
import ThirdCard from './components/ThirdCard';

const { Content } = Layout;

export default function() {
  return (
    <Layout id="statistics">
      <Content className="content">
        <HeaderCardList />
        <SecondCard />
        <ThirdCard />
        <FourthCard />
        <FifthCard />
      </Content>
    </Layout>
  );
}
