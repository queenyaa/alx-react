import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import Notifications from './Notifications/Notifications';
import Header from './Header/Header';
import Login from './Login/Login';
import Footer from './Footer/Footer';

describe('App component', () => {
    it('contains the Notifications component', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find(Notifications)).toHaveLength(1);
    });

    it('contains the Header component', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find(Header)).toHaveLength(1);
    });

    it('contains the Login component', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find(Login)).toHaveLength(1);
    });

    it('contains the Footer component', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find(Footer)).toHaveLength(1);
    });

    it('renders Login component when isLoggedIn is false', () => {
        const { getByText } = render(<App isLoggedIn={false} />);
        const loginText = getByText('Log in to continue');
        expect(loginText).toBeInTheDocument();
      });
    
    it('does not render CourseList component when isLoggedIn is false', () => {
      const { queryByRole } = render(<App isLoggedIn={false} />);
      const courseListTable = queryByRole('table', { name: 'CourseList' });
      expect(courseListTable).not.toBeInTheDocument();
    });

    describe('when isLoggedIn is true', () => {
      it('does not render Login component', () => {
        const { queryByText } = render(<App isLoggedIn={true} />);
        const loginText = queryByText('Log in to continue');
      expect(loginText).not.toBeInTheDocument();
    });

    it('renders CourseList component', () => {
        const { getByRole } = render(<App isLoggedIn={true} />);
        const courseListTable = getByRole('table', { name: 'CourseList' });
        expect(courseListTable).toBeInTheDocument();
      });
  });
});