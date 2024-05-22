import React from 'react';
import { shallow } from 'enzyme';
import BodySectionWithMarginBottom from './BodySectionWithMarginBottom';
import BodySection from './BodySection';
import { StyleSheetTestUtils } from 'aphrodite';

describe('<BodySectionWithMarginBottom />', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });
  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('renders correctly with BodySection component and props are passed correctly', () => {
    const title = "test title";
    const children = <p>test children node</p>;
    const wrapper = shallow(
      <BodySectionWithMarginBottom title={title}>
        {children}
      </BodySectionWithMarginBottom>
    );
    const bodySection = wrapper.find(BodySection);
    expect(bodySection.exists()).toBe(true);
    expect(bodySection.prop('title')).toEqual(title);
    expect(bodySection.contains(children)).toBe(true);
  });
});