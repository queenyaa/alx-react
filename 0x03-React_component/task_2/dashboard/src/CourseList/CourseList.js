// CourseList/CourseList.js
import React from 'react';
import CourseListRow from './CourseListRow';
import './CourseList.css';

function CourseList({ listCourses }) {
  return (
    <table id="CourseList">
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
              textSecondCell={course.credit}
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

export default CourseList;