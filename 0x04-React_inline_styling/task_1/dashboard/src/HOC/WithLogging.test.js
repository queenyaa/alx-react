import React from 'react';
import { mount } from 'enzyme';
import WithLogging from './WithLogging';
import { StyleSheetTestUtils } from 'aphrodite';

// Mock console.log
const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation();

describe('WithLogging', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });
  
  afterEach(() => {
    mockConsoleLog.mockClear();
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('calls console.log with "Component" on mount and unmount with pure HTML', () => {
    const WrappedComponent = () => <div>Pure HTML</div>;
    const ComponentWithLogging = WithLogging(WrappedComponent);
    const wrapper = mount(<ComponentWithLogging />);
    wrapper.unmount();
    expect(mockConsoleLog).toHaveBeenCalledTimes(2);
    expect(mockConsoleLog.mock.calls[0][0]).toContain('Component');
    expect(mockConsoleLog.mock.calls[1][0]).toContain('Component');
  });

  it('calls console.log with the component name on mount and unmount with Login component', () => {
    const Login = () => <div>Login Component</div>;
    Login.displayName = 'Login';
    const ComponentWithLogging = WithLogging(Login);
    const wrapper = mount(<ComponentWithLogging />);
    wrapper.unmount();
    expect(mockConsoleLog).toHaveBeenCalledTimes(2);
    expect(mockConsoleLog.mock.calls[0][0]).toContain('Component Login is mounted');
    expect(mockConsoleLog.mock.calls[1][0]).toContain('Component Login is going to unmount');
  });
});