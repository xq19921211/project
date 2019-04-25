/*
 * @Author: LiaoYingLong
 * @Date: 2018-10-15 17:45:19
 * @Last Modified by: LiaoYingLong
 * @Last Modified time: 2018-10-24 14:21:17
 */

import '../Statistics/style.scss';
import './index.scss';

import { Icon, Layout, Modal } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ModalContainer from '../../../component/ModalContainer';
import * as actions from '../Overview/action';
import FifthCard from '../Overview/components/FifthCard';
import FirstCard from '../Overview/components/FirstCard';
import FourthCard from '../Overview/components/FourthCard';
import SecondCard from '../Overview/components/SecondCard';
import ThirdCard from '../Overview/components/ThirdCard';
import OrganizationListModal from './components/OrganizationListModal';

const { Content } = Layout;

class BusinessData extends React.Component {
  state = {
    selectedRow: [],
  };
  componentDidMount() {
    this.props.resetStore();
  }
  onOrganizationListModalOk = selectedRow => {
    this.setState({ selectedRow });
  };
  render() {
    const organization = this.state.selectedRow[0] || {};
    return (
      <Layout id="statistics">
        <Content className="content">
          <ModalContainer>
            {modal => (
              <React.Fragment>
                <div className="mb24 select-button">
                  <span onClick={modal.show}>
                    <h2>{organization.name || '暂未选择事业部'}</h2>
                    <Icon type="caret-down" theme="outlined" />
                  </span>
                </div>
                <OrganizationListModal
                  modal={modal}
                  selectedRow={this.state.selectedRow}
                  onModalOk={this.onOrganizationListModalOk}
                />
              </React.Fragment>
            )}
          </ModalContainer>
          <FirstCard departId={organization.id} immediateCheck={false} />
          <SecondCard departId={organization.id} immediateCheck={false} />
          <ThirdCard departId={organization.id} immediateCheck={false} />
          <FourthCard departId={organization.id} immediateCheck={false} />
          <FifthCard departId={organization.id} immediateCheck={false} />
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
)(BusinessData);
