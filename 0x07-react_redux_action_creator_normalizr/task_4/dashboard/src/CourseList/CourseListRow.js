import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

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
    },
    rowChecked: {
        backgroundColor: '#e6e4e4',
    },
});

class CourseListRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: false,
        };
    }

    toggleCheckbox = () => {
        this.setState((prevState) => ({
            isChecked: !prevState.isChecked,
        }));
    };

    render() {
        const { isHeader, textFirstCell, textSecondCell } = this.props;
        const { isChecked } = this.state;

        const rowClass = isHeader
            ? css(styles.headerRow)
            : css(styles.row, isChecked && styles.rowChecked);

        return (
            <tr className={rowClass}>
                {isHeader ? (
                    textSecondCell ? (
                        <>
                            <th className={css(styles.th)}>{textFirstCell}</th>
                            <th className={css(styles.th)}>{textSecondCell}</th>
                        </>
                    ) : (
                        <th className={css(styles.th)} colSpan={2}>
                            {textFirstCell}
                        </th>
                    )
                ) : (
                    <>
                        <td className={css(styles.td)}>
                            <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={this.toggleCheckbox}
                            />
                            {textFirstCell}
                        </td>
                        <td className={css(styles.td)}>{textSecondCell}</td>
                    </>
                )}
            </tr>
        );
    }
}

CourseListRow.propTypes = {
    isHeader: PropTypes.bool.isRequired,
    textFirstCell: PropTypes.string.isRequired,
    textSecondCell: PropTypes.string,
};

export default CourseListRow;