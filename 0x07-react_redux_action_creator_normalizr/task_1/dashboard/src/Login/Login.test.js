import React from 'react';
import { shallow } from 'enzyme';
import Login from './Login';
import { StyleSheetTestUtils } from 'aphrodite';

describe('Login component', () => {
    beforeEach(() => {
        StyleSheetTestUtils.suppressStyleInjection();
    });
    afterEach(() => {
        StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
    });

    // it('renders without crashing', () => {
    //    shallow(<Login />);
    // });

    it('renders without crashing', () => {
      const mockLogIn = jest.fn();
      shallow(<Login logIn={() => mockLogIn} />);
    });

    it('renders 2 input and 2 label tags', () => {
        const wrapper = shallow(<Login />);
        expect(wrapper.find('input[type="email"]')).toHaveLength(1);
        expect(wrapper.find('input[type="password"]')).toHaveLength(1);
        expect(wrapper.find('label')).toHaveLength(2);
      });
    
      it('submit button is disabled by default', () => {
        const wrapper = shallow(<Login />);
        expect(wrapper.find('input[type="submit"]').props().disabled).toBe(true);
      });
    
      it('submit button is enabled after changing the value of the two inputs', () => {
        const wrapper = shallow(<Login />);
        
        // Simulate changing the email input
        wrapper.find('input[type="email"]').simulate('change', { target: { value: 'test@example.com' } });
        // Simulate changing the password input
        wrapper.find('input[type="password"]').simulate('change', { target: { value: 'password' } });
    
        // Update the wrapper to reflect the state change
        wrapper.update();
    
        // Check if the submit button is enabled
        expect(wrapper.find('input[type="submit"]').props().disabled).toBe(false);
      });
});