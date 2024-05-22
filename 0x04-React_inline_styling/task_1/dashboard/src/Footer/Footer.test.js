import React from 'react';
import { shallow } from 'enzyme';
import Footer from './Footer';
import { StyleSheetTestUtils } from 'aphrodite';

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

    it('renders the text "© {currentYear} Holberton School main dashboard"', () => {
        const wrapper = shallow(<Footer />);
        const expectedText = `© ${new Date().getFullYear()} Holberton School main dashboard`;
        expect(wrapper.text()).toContain(expectedText);
    });
});