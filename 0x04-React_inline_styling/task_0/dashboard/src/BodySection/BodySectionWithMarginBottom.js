import React from 'react';
import PropTypes from 'prop-types';
import BodySection from './BodySection'; // Import the BodySection component
import './BodySectionWithMarginBottom.css'; // Import the CSS file for styling

const BodySectionWithMarginBottom = ({ title, children }) => {
  return (
    <div className="bodySectionWithMargin">
      <BodySection title={title}>{children}</BodySection>
    </div>
  );
};

BodySectionWithMarginBottom.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default BodySectionWithMarginBottom;