import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

// const headerRowStyle = {
//    backgroundColor: '#deb5b545',
// };

// const rowStyle = {
//    backgroundColor: '#f5f5f5ab',
// };

const styles = StyleSheet.create({
    headerRow: {
        backgroundColor: '#deb5b545',
    },
    row: {
        backgroundColor: '#f5f5f5ab',
    },
    th: {
        textAlign: 'left',
        borderBottom: '1px solid #ddd',
        padding: '8px',
    },
    td: {
        padding: '8px',
        textAlign: 'left',
        borderBottom: '1px solid #ddd',
    }
});

function CourseListRow({ isHeader, textFirstCell, textSecondCell = null }) {
    // const headerRowStyle = { backgroundColor: '#deb5b545' };
    // const rowStyle = { backgroundColor: '#f5f5f5ab' };

    if (isHeader) {
        return (
            <tr className={css(styles.headerRow)}>
                {textSecondCell ? (
                    <>
                        <th className={css(styles.th)}>{textFirstCell}</th>
                        <th className={css(styles.th)}>{textSecondCell}</th>
                    </>
                ) : (
                    <th className={css(styles.th)} colSpan={2}>{textFirstCell}</th>
                )}
            </tr>
        );
    } else {
        return (
            <tr className={css(styles.row)}>
                <td className={css(styles.td)}>{textFirstCell}</td>
                <td className={css(styles.td)}>{textSecondCell}</td>
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