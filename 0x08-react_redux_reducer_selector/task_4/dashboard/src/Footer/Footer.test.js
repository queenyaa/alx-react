import React from 'react';
import { shallow, mount } from 'enzyme';
import Footer from './Footer';
import { StyleSheetTestUtils } from 'aphrodite';
import { AppContext, defaultUser } from '../App/AppContext';
import { getFooterCopy } from '../utils/utils';

describe('Footer component', () => {
    beforeEach(() => {
        StyleSheetTestUtils.suppressStyleInjection();
    });
    afterEach(() => {
        StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
    });

    it('renders without crashing', () => {
        shallow(<Footer />);
    });

    it('renders the correct text based on utility function', () => {
        const wrapper = mount(
          <AppContext.Provider value={{ user: defaultUser }}>
            <Footer />
          </AppContext.Provider>
        );
        const footerElement = wrapper.find('footer').getDOMNode();
        const expectedText = getFooterCopy();
        expect(footerElement.textContent).toContain(expectedText);
      });

    it('does not display the "Contact us" link when user is logged out', () => {
        const wrapper = mount(
            <AppContext.Provider value={{ user: defaultUser }}>
                <Footer />
            </AppContext.Provider>
        );
        expect(wrapper.find('a').exists()).toBe(false);
    });

    it('displays the "Contact us" link when user is logged in', () => {
        const loggedInUser = { email: 'test@example.com', password: 'password', isLoggedIn: true };
        const wrapper = mount(
            <AppContext.Provider value={{ user: loggedInUser }}>
                <Footer />
            </AppContext.Provider>
        );
        expect(wrapper.find('a').text()).toBe('Contact us');
        expect(wrapper.find('a').prop('href')).toBe('mailto:support@example.com');
    });
});