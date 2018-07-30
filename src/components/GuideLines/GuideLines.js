import './GuideLines.css';

import React from 'react';

class GuideLines extends React.PureComponent {
  render() {
    const guideLines = this.props.lines.map((x, index) => (
      <div key={index} className="GuideLine" style={{ left: x }} />
    ));
    return <div>{guideLines}</div>;
  }
}

export default GuideLines;
