import { render, screen } from '@testing-library/react';
import { shallow } from 'enzyme';
import App from './App';
import React from 'react';

describe('App component', () => {
  test('renders the logo', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('img.App-logo').exists()).toBeTruthy();
  });

  test('renders the header with "School dashboard"', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('header.App-header').text()).toContain('School dashboard');
  });

  test('renders the login form with email and password inputs', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('input[type="email"]').exists()).toBeTruthy();
    expect(wrapper.find('input[type="password"]').exists()).toBeTruthy();
  });

  test('renders the footer with the correct copyright message', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('footer.App-footer').text()).toMatch(/© [0-9]{4} Holberton School/);
  });

  test('renders without crashing', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.exists()).toBeTruthy();
  });

  test('renders a header with the class App-header', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('header.App-header').exists()).toBeTruthy();
  });

  test('renders a div with the class App-body', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('div.App-body').exists()).toBeTruthy();
  });

  test('renders a footer with the class App-footer', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('footer.App-footer').exists()).toBeTruthy();
  });
});