// CourseList/CourseList.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import CourseList from './CourseList';
import { StyleSheetTestUtils } from 'aphrodite';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { getCourseList } from '../selectors/courseSelector';
import { getCoursesList } from '../actions/courseActionCreators';
import { fetchCourseSuccess, selectCourse, unSelectCourse } from '../actions/courseActionCreators';
import { SELECT_COURSE, UNSELECT_COURSE, FETCH_COURSE_SUCCESS } from '../actions/courseActionTypes';
import { thunk } from 'redux-thunk';


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('CourseList component', () => {
  let store;
  let wrapper;

  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
    store = mockStore({
      listCourses: [
        { id: 1, name: 'ES6', credit: 60 },
        { id: 2, name: 'Webpack', credit: 20 },
        { id: 3, name: 'React', credit: 40 }
      ]
    });
  });
  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });
  
  it('renders CourseList component without crashing', () => {
    render(
      <Provider store={store}>
        <CourseList listCourses={[]} />
      </Provider>
    );
    expect(screen.getByText('No course available yet')).toBeInTheDocument();
  });
  

  it('renders the 3 different rows', () => {
    const sampleCourses = [
      { id: 1, name: 'ES6', credit: 60 },
      { id: 2, name: 'Webpack', credit: 20 },
      { id: 3, name: 'React', credit: 40 }
    ]
    render(
      <Provider store={store}>
        <CourseList listCourses={sampleCourses} />
      </Provider>
    );
  });

  it('renders correctly with an empty listCourses array', () => {
    const { getByText } = render(
      <Provider store={store}>
        <CourseList listCourses={[]} />
      </Provider>
    );
    expect(getByText('No course available yet')).toBeInTheDocument();
  });

  it('renders correctly when listCourses is not provided', () => {
    render(
      <Provider store={store}>
        <CourseList />
      </Provider>
    );
  });

  it('renders listCourses correctly', () => {

    const { getByText } = render(
      <Provider store={store}>
        <CourseList />
      </Provider>
    );
    const someCourses = store.getState().listCourses.entites || [];
    someCourses.forEach(listCourses => {
      expect(getByText(listCourses.name)).toBeInTheDocument();
      expect(getByText(listCourses.credit.toString())).toBeInTheDocument();
    });
  });
});