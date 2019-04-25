/**
 * Created by xu.long on 2018/4/22.
 */

import './style.scss';

import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import React from 'react';
import { dateFormat } from '../../util/util';

export class Toolbar extends React.Component {
  constructor(props) {
    super(props);
  }

  typeToDisplay = (type, data) => {
    const { title } = this.props;
    let result;
    switch (type) {
      case 1:
        result = <div className="type_one_content">{title}</div>;
        break;
      case 2:
        let statusName;
        switch (data.status) {
          //已下架
          case 0:
            statusName = '已下架';
            break;
          //待上架
          case 1:
            statusName = '待上架';
            break;
          //已上架
          case 2:
            statusName = '已上架';
            break;
          default:
            statusName = '已下架';
            break;
        }
        result = (
          <div className="type_two_content">
            <div style={{ height: '13rem', lineHeight: '13rem' }}>
              <img
                src={
                  !data.homePic ? './image/default.png' : data.homePic.filepath
                }
              />
            </div>
            <div>
              <div className="title">{data.name}</div>
              <div className="info">
                <div className="left_info">
                  <div>
                    <span>商品ID：</span>
                    <span>{data.id}</span>
                  </div>
                  <div>
                    <span>商品品类：</span>
                    <span style={{ color: 'blue' }}>
                      {!data.category ? '' : data.category.cat_name}
                    </span>
                  </div>
                  <div>
                    <span>供应商：</span>
                    <span>{!data.supplier ? '' : data.supplier.supName}</span>
                  </div>
                </div>
                <div className="right_info">
                  <div>
                    <span>创建人：</span>
                    <span>{data.creatorName}</span>
                  </div>
                  <div>
                    <span>创建时间：</span>
                    <span>
                      {dateFormat(
                        new Date(data.createTime),
                        'yyyy-MM-dd hh:mm:ss',
                      )}
                    </span>
                  </div>
                  <div>
                    <span>上架时间：</span>
                    <span>
                      {dateFormat(
                        new Date(data.updateTime),
                        'yyyy-MM-dd hh:mm:ss',
                      )}
                    </span>
                  </div>
                </div>
                {data.supplierSplitratio && (
                  <div>
                    <span>供应商分成比例：</span>
                    <span>{(data.supplierSplitratio * 100).toFixed(2)}%</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              {/*<div className="operate">*/}
              {/*<Button type="primary">编辑</Button>*/}
              {/*</div>*/}
              <div className="key">
                <div className="status">
                  <div>状态</div>
                  <div
                    style={{
                      marginTop: '1rem',
                      fontSize: '2rem',
                    }}>
                    {statusName}
                  </div>
                  <div />
                </div>
                <div className="price">
                  <div>单价</div>
                  <div
                    style={{
                      display: 'inline-block',
                      marginTop: '1rem',
                    }}>
                    <span
                      style={{
                        fontSize: '2rem',
                        color: 'red',
                      }}>
                      {data.proPromotionPrice}
                      元/平米
                    </span>
                  </div>
                  <del
                    style={{
                      display: 'inline-block',
                      marginLeft: '0.5rem',
                      marginTop: '1rem',
                    }}>
                    <span>
                      {data.price}
                      元/平米
                    </span>
                  </del>
                </div>
              </div>
            </div>
          </div>
        );
        break;
    }
    return result;
  };

  render() {
    const { type, list, data } = this.props;
    const breadcrumbList = list.map((item, i) => {
      if (i > 0) {
        return (
          <Breadcrumb.Item key={'_breadcrumb' + i}>
            <Link to={item.to}>{item.label}</Link>
          </Breadcrumb.Item>
        );
      } else {
        return (
          <Breadcrumb.Item key={'_breadcrumb' + i}>{item}</Breadcrumb.Item>
        );
      }
    });
    const content = this.typeToDisplay(type, data);
    return (
      <div id="toolbar">
        <Breadcrumb>{breadcrumbList}</Breadcrumb>
        {content}
      </div>
    );
  }
}
