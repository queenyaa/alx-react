import React from 'react';
import { shallow, mount } from 'enzyme';
import Footer from './Footer';
import { StyleSheetTestUtils } from 'aphrodite';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import uiReducer from '../reducers/uiReducer';
import { getFooterCopy } from '../utils/utils';

describe('Footer component', () => {
    beforeEach(() => {
        StyleSheetTestUtils.suppressStyleInjection();
    });
    afterEach(() => {
        StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
    });

    it('renders without crashing', () => {
        const store = createStore(uiReducer);
        const wrapper = mount(
          <Provider store={store}>
            <Footer />
          </Provider>
        );
        expect(wrapper).toBeDefined();
      });
    
      it('renders the correct text based on utility function', () => {
        const store = createStore(uiReducer);
        const wrapper = mount(
          <Provider store={store}>
            <Footer />
          </Provider>
        );
        const footerElement = wrapper.find('footer').getDOMNode();
        const expectedText = getFooterCopy();
        expect(footerElement.textContent).toContain(expectedText);
      });
    
      it('does not display the "Contact us" link when user is logged out', () => {
        const store = createStore(uiReducer);
        const wrapper = mount(
          <Provider store={store}>
            <Footer />
          </Provider>
        );
        expect(wrapper.find('a').exists()).toBe(false);
      });
    
      it('displays the "Contact us" link when user is logged in', () => {
        const loggedInUser = { email: 'test@example.com', password: 'password', isLoggedIn: true };
        const store = createStore(uiReducer, {
            isUserLoggedIn: true,
            user: loggedInUser,
        });
        const wrapper = mount(
          <Provider store={store}>
            <Footer user={loggedInUser} />
          </Provider>
        );
        const linkElement = wrapper.find('a[href="mailto:support@example.com"]');
        expect(linkElement.exists()).toBe(true);
        expect(linkElement.text()).toBe('Contact us');
      });
});