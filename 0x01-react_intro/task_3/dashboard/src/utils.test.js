import { getFullYear, getFooterCopy, getLatestNotification } from './utils';
import { act, render, screen } from '@testing-library/react';
import App from './App';
import Notifications from './Notifications';

describe('getFullYear', () => {
  test('returns the current year', () => {
    const currentYear = new Date().getFullYear();
    expect(getFullYear()).toEqual(currentYear);
  });
});

describe('getFooterCopy', () => {
  test('returns the correct footer string', () => {
    const currentYear = new Date().getFullYear();
    const expectedString = `© ${currentYear} Holberton School main dashboard`;
    expect(getFooterCopy()).toEqual(expectedString);
  });
});

describe("getLatestNotification", function () {
    it("shold return correct string element", function () {
      const element = "<strong>Urgent requirement</strong> - complete by EOD";
      expect(getLatestNotification()).toEqual(element);
    });
});