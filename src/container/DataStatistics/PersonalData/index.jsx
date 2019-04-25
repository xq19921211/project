/*
 * @Author: LiaoYingLong
 * @Date: 2018-10-15 17:45:41
 * @Last Modified by: LiaoYingLong
 * @Last Modified time: 2018-10-25 10:58:18
 */

import '../Statistics/style.scss';
import './index.scss';

import { Icon, Layout, Modal } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ModalContainer from '../../../component/ModalContainer';
import * as actions from './action';
import BuilderListModal from './components/BuilderListModal';
import FirstCard from './components/FirstCard';
import FourthCard from './components/FourthCard';
import SecondCard from './components/SecondCard';
import ThirdCard from './components/ThirdCard';

const { Content } = Layout;

class PersonalData extends React.Component {
  state = {
    selectedRow: [],
  };
  componentDidMount() {
    this.props.resetStore();
  }
  onBuilderListModalOk = selectedRow => {
    this.setState({ selectedRow });
  };
  render() {
    const person = this.state.selectedRow[0] || {};

    return (
      <Layout id="statistics" className="ProjectData">
        <Content className="content">
          <ModalContainer>
            {modal => (
              <React.Fragment>
                <div className=" select-button">
                  <span onClick={modal.show}>
                    <h2>
                      {person.oprName || '暂未选择人员'}
                      <br />
                      <span style={{ fontSize: '14px' }}>
                        {person.teamName || '-'}
                      </span>
                    </h2>
                    <Icon
                      type="caret-down"
                      theme="outlined"
                      style={{ transform: 'translateY(-15px)' }}
                    />
                  </span>
                </div>
                <BuilderListModal
                  modal={modal}
                  selectedRow={this.state.selectedRow}
                  onModalOk={this.onBuilderListModalOk}
                />
              </React.Fragment>
            )}
          </ModalContainer>
          <FirstCard oprId={person.oprId} />
          <SecondCard oprId={person.oprId} />
          <ThirdCard oprId={person.oprId} />
          <FourthCard oprId={person.oprId} />
        </Content>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    resetStore: bindActionCreators(actions.resetStore, dispatch),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PersonalData);
