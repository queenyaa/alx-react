// CourseList/CourseList.js
import React from 'react';
import CourseListRow from './CourseListRow';
// import './CourseList.css';
import { StyleSheet, css } from 'aphrodite';

function CourseList({ listCourses }) {
  return (
    <table id={css(styles.courseList)}>
      <thead>
        <CourseListRow textFirstCell="Available courses" isHeader={true} />
        <CourseListRow textFirstCell="Course name" textSecondCell="Credit" isHeader={true} />
      </thead>
      <tbody>
        {listCourses && listCourses.length > 0 ? (
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

const styles = StyleSheet.create({
  courseList: {
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

export default CourseList;