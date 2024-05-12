import React from 'react';
import PropTypes from 'prop-types';

function CourseListRow({ isHeader, textFirstCell, textSecondCell }) {
    if (isHeader) {
        return (
            <tr>
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
            <tr>
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

CourseListRow.defaultProps = {
    textSecondCell: null,
};

export default CourseListRow;