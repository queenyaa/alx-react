import React from 'react';
import PropTypes from 'prop-types';
import BodySection from './BodySection'; // Import the BodySection component
// import './BodySectionWithMarginBottom.css'; // Import the CSS file for styling
import { StyleSheet, css } from 'aphrodite';

const BodySectionWithMarginBottom = ({ title, children }) => {
  return (
    <div className={css(styles.bodySectionWithMargin)}>
      <BodySection title={title}>{children}</BodySection>
    </div>
  );
};

BodySectionWithMarginBottom.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const styles = StyleSheet.create({
  bodySectionWithMargin: {
    marginBottom: '40px',
  },
});

export default BodySectionWithMarginBottom;