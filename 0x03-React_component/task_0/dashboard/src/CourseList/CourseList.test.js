// CourseList/CourseList.test.js
import React from 'react';
import { render } from '@testing-library/react';
import CourseList from './CourseList';

describe('CourseList component', () => {
  it('renders CourseList component without crashing', () => {
    render(<CourseList />);
  });

  it('renders the 5 different rows', () => {
    const { getAllByRole } = render(<CourseList />);
    const rows = getAllByRole('row');
    expect(rows.length).toBe(5); // There should be 5 rows in total
  });

  it('renders correctly with an empty listCourses array', () => {
    const { getByText } = render(<CourseList listCourses={[]} />);
    expect(getByText('No course available yet')).toBeInTheDocument();
  });

  it('renders correctly when listCourses is not provided', () => {
    const { getByText } = render(<CourseList />);
    expect(getByText('No course available yet')).toBeInTheDocument();
  });

  it('renders listCourses correctly', () => {
    const listCourses = [
      { id: 1, name: 'ES6', credit: 60 },
      { id: 2, name: 'Webpack', credit: 20 },
    ];
    const { getByText } = render(<CourseList listCourses={listCourses} />);
    listCourses.forEach(course => {
      expect(getByText(course.name)).toBeInTheDocument();
      expect(getByText(course.credit.toString())).toBeInTheDocument();
    });
  });
});