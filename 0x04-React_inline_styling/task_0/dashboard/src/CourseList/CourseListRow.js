import React from 'react';
import PropTypes from 'prop-types';

// const headerRowStyle = {
//    backgroundColor: '#deb5b545',
// };

// const rowStyle = {
//    backgroundColor: '#f5f5f5ab',
// };

function CourseListRow({ isHeader, textFirstCell, textSecondCell = null }) {
    const headerRowStyle = { backgroundColor: '#deb5b545' };
    const rowStyle = { backgroundColor: '#f5f5f5ab' };


    if (isHeader) {
        return (
            <tr style={headerRowStyle}>
                {textSecondCell ? (
                    <>
                        <th>{textFirstCell}</th>
                        <th>{textSecondCell}</th>
                    </>
                ) : (
                    <th colSpan={2}>{textFirstCell}</th>
                )}
            </tr>
        );
    } else {
        return (
            <tr style={rowStyle}>
                <td>{textFirstCell}</td>
                <td>{textSecondCell}</td>
            </tr>
        );
    }
}

CourseListRow.propTypes = {
    isHeader: PropTypes.bool.isRequired,
    textFirstCell: PropTypes.string.isRequired,
    textSecondCell: PropTypes.string,
};

// CourseListRow.defaultProps = {
//    textSecondCell: null,
// };

export default CourseListRow;