// CourseList/CourseList.js
import React, { useEffect } from 'react';
import CourseListRow from './CourseListRow';
import { StyleSheet, css } from 'aphrodite';
import PropTypes from 'prop-types';
import CourseShape from './CourseShape';
import { connect } from 'react-redux';
import { getCoursesList } from '../selectors/courseSelector';
import { fetchCourseSuccess, selectCourse, unSelectCourse } from '../actions/courseActionCreators';

const styles = StyleSheet.create({
  table: {
    marginTop: '40px',
    border: `1px solid var(--border-table-color)`,
    borderCollapse: 'collapse',
    width: '95%',
  },
  th: {
    borderTop: `1px solid var(--border-table-color)`,
    borderBottom: `1px solid var(--border-table-color)`,
    textAlign: 'left',
    fontSize: '18px',
    ':nth-child(2n)': { // Applying style to every other th element
      textAlign: 'center',
    },
  },
  td: {
    textAlign: 'left',
  },
});

function CourseList({ listCourses = [], selectCourse, unSelectCourse, fetchCourseSuccess }) {
  useEffect(() => {
    fetchCourseSuccess();
  }, [fetchCourseSuccess]);

  const onChangeRow = (id, checked) => {
    if (checked) {
      selectCourse(id);
    } else {
      unSelectCourse(id);
    }
  };

  return (
    <table id="CourseList" className={css(styles.table)}>
      <thead>
        <CourseListRow textFirstCell="Available courses" isHeader={true} />
        <CourseListRow textFirstCell="Course name" textSecondCell="Credit" isHeader={true} />
      </thead>
      <tbody>
        {listCourses.length > 0 ? (
          listCourses.map((course) => (
            <CourseListRow
              key={course.id} // Assuming each course has a unique id
              textFirstCell={course.name}
              textSecondCell={course.credit.toString()}
              isHeader={false}
            />
          ))
        ) : (
          <tr>
            <td colSpan="2">No course available yet</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}



// CourseList.propTypes = {
//	listCourses: PropTypes.arrayOf(CourseShape)
// };

CourseList.propTypes = {
  listCourses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      credit: PropTypes.number.isRequired,
    })
  ),
};

// CourseList.defaultProps = {
//	listCourses: []
// };
// {listCourses && listCourses.length > 0 ? (//

const mapStateToProps = (state) => ({
  listCourses: getCoursesList(state),
});

const mapDispatchToProps = {
  fetchCourseSuccess,
  selectCourse,
  unSelectCourse,
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseList);