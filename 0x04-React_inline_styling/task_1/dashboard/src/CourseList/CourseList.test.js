// CourseList/CourseList.test.js
import React from 'react';
import { render } from '@testing-library/react';
import CourseList from './CourseList';
import { StyleSheetTestUtils } from 'aphrodite';

describe('CourseList component', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });
  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });
  
  it('renders CourseList component without crashing', () => {
    render(<CourseList listCourses={[]} />);
  });
  

  it('renders the 3 different rows', () => {
    const sampleCourses = [
      { id: 1, name: 'ES6', credit: 60 },
      { id: 2, name: 'Webpack', credit: 20 },
      { id: 3, name: 'React', credit: 40 }
    ]
    render(<CourseList listCourses={sampleCourses} />);
  });

  it('renders correctly with an empty listCourses array', () => {
    const { getByText } = render(<CourseList listCourses={[]} />);
    expect(getByText('No course available yet')).toBeInTheDocument();
  });

  it('renders correctly when listCourses is not provided', () => {
    render(<CourseList />);
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