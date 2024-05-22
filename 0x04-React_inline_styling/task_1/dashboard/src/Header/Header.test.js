import React from 'react';
import { render } from '@testing-library/react';
import Header from './Header';
// import { StyleSheetTestUtils } from 'aphrodite';

// Mock the image import
jest.mock('./../assets/holbertonlogo.jpg', () => ({
    // Return a placeholder value for the image import
    default: 'holbertonlogo.jpg',
  }));

function toBeInTheDocument(element) {


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
});