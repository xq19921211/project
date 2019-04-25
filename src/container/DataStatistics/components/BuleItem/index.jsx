import './index.scss';

import React from 'react';

const BuleItem = ({ label, value = '-', className = '' }) => {
  const shouldShowLine = !value && parseFloat(value) !== parseFloat(0);

  return (
    <div className={`BuleItem ${className}`}>
      <span className="count">{shouldShowLine ? '-' : value}</span>
      <span className="desc">{label}</span>
    </div>
  );
};

export default BuleItem;
