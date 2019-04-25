/*
 * @Author: LiaoYingLong
 * @Date: 2018-10-15 17:45:41
 * @Last Modified by: LiaoYingLong
 * @Last Modified time: 2018-10-25 11:53:32
 */

import '../Statistics/style.scss';
import './index.scss';

import { Icon, Layout, Modal } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ModalContainer from '../../../component/ModalContainer';
import * as actions from './action';
import FirstCard from './components/FirstCard';
import ProjectListModal from './components/ProjectListModal';
import SecondCard from './components/SecondCard';
import ThirdCard from './components/ThirdCard';

const { Content } = Layout;

class ProjectData extends React.Component {
  state = {
    selectedRow: [],
  };

  componentDidMount() {
    this.props.resetStore();
  }

  onProjectModalOk = selectedRow => {
    this.setState({ selectedRow });
  };

  render() {
    let project = this.state.selectedRow[0] || {};

    return (
      <Layout id="statistics" className="ProjectData">
        <Content className="content">
          <ModalContainer>
            {modal => (
              <React.Fragment>
                <div className=" select-button">
                  <span onClick={modal.show}>
                    <h2>
                      {project.pjName || '暂未选择项目'}
                      <br />
                      <span style={{ fontSize: '14px' }}>
                        {project.departName || '-'}
                      </span>
                    </h2>
                    <Icon
                      type="caret-down"
                      theme="outlined"
                      style={{ transform: 'translateY(-15px)' }}
                    />
                  </span>
                </div>

                <ProjectListModal
                  modal={modal}
                  selectedRow={this.state.selectedRow}
                  onModalOk={this.onProjectModalOk}
                />
              </React.Fragment>
            )}
          </ModalContainer>
          <FirstCard projectId={project.pjId} />
          <SecondCard projectId={project.pjId} />
          <ThirdCard projectId={project.pjId} />
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
)(ProjectData);
