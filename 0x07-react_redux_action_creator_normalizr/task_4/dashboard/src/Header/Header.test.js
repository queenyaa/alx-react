import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Header from './Header';
import { StyleSheetTestUtils } from 'aphrodite';
import { AppContext } from './../App/AppContext';

// Mock the image import
jest.mock('./../assets/holbertonlogo.jpg', () => ({
    // Return a placeholder value for the image import
    default: 'holbertonlogo.jpg',
  }));

function toBeInTheDocument(element) {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });
  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

    if (element === null || element === undefined) {
      throw new Error(`Received ${element}`);
    }
    if (!element.parentElement) {
      throw new Error('Element must be attached to the document');
    }
  }

describe('Header component', () => {
    it('renders without crashing', () => {
        render(<Header />);
    });

    it('renders img and h1 tags', () => {
        // Render the Header component
        const { getByRole, getByText } = render(<Header />);

        // Find the img element by its role
        const logoImg = getByRole('img');

        // Find the h1 element by its text content
        const headingElement = getByText('School dashboard');

        // Assert that both img and h1 tags are rendered
        // toBeInTheDocument(logoImg);
        // toBeInTheDocument(headingElement);
        expect(logoImg).toBeInTheDocument();
        expect(headingElement).toBeInTheDocument();
    });

    it('does not render logout section with default context value', () => {
      const { queryByTestId } = render(<Header />);
      const logoutSection = queryByTestId('logoutSection');
      expect(logoutSection).toBeNull();
    });
  
    it('renders logout section when user is logged in', () => {
      const user = {
        email: 'test@example.com',
        isLoggedIn: true,
      };
      const { getByTestId } = render(
        <AppContext.Provider value={{ user }}>
          <Header />
        </AppContext.Provider>
      );
      const logoutSection = getByTestId('logoutSection');
      expect(logoutSection).toBeInTheDocument();
    });

  
    it('calls logOut function when logout link is clicked', () => {
      const logOut = jest.fn();
      const user = {
        email: 'test@example.com',
        isLoggedIn: true,
      };
  
      const { getByTestId } = render(
        <AppContext.Provider value={{ user, logOut }}>
          <Header />
        </AppContext.Provider>
      );
  
      const logoutSection = getByTestId('logoutSection');
      fireEvent.click(logoutSection);
      expect(logOut).toHaveBeenCalled();
    });
});