// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;
const Adapter = require('@cfaester/enzyme-adapter-react-18').default;

import Enzyme from "enzyme";
// import Adapter from "enzyme-adapter-react-16";
import { render } from '@testing-library/jest-dom';
// import 'jest-enzyme';
import { StyleSheetTestUtils } from 'aphrodite';
import fetchMock from 'fetch-mock';

global.fetch = fetchMock.sandbox();
// Test to check if TextEncoder is polyfilled
// test('TextEncoder is polyfilled', () => {
//    expect(typeof TextEncoder).toBe('function');
//    const encoder = new TextEncoder();
//    expect(encoder).toBeDefined();
//    expect(typeof encoder.encode).toBe('function');
//  });

// StyleSheetTestUtils.suppressStyleInjection();

beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });
  
afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

global.URLSearchParams = require('url').URLSearchParams;
Enzyme.configure({ adapter: new Adapter() });
global.render = render;