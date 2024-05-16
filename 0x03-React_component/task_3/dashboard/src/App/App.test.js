import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';

// configure({ adapter: new Adapter() });
describe('App component', () => {

    let originalAlert;

    beforeAll(() => {
      originalAlert = window.alert;
      window.alert = jest.fn();
    });
  
    afterAll(() => {
      window.alert = originalAlert;
    });
  
    it('calls logOut function and displays alert when pressing ctrl+h', () => {
      const logOutMock = jest.fn();
      const wrapper = shallow(<App logOut={logOutMock} />);
      const event = new KeyboardEvent('keydown', { ctrlKey: true, key: 'h' });
      document.dispatchEvent(event);
      expect(window.alert).toHaveBeenCalledWith('Logging you out');
      expect(logOutMock).toHaveBeenCalled();
    });

    it('renders without crashing', () => {
        shallow(<App />);  
    });

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
      const wrapper = shallow(<App isLoggedIn={false} />); // Use shallow instead of render
      const loginText = wrapper.find('Login'); // Find Login component in the shallow render
      expect(loginText).toHaveLength(1); // Assert that the Login component is rendered
  });

  it('does not render CourseList component when isLoggedIn is false', () => {
      const wrapper = shallow(<App isLoggedIn={false} />); // Use shallow instead of render
      const courseListTable = wrapper.find('CourseList'); // Find CourseList component in the shallow render
      expect(courseListTable).toHaveLength(0); // Assert that the CourseList component is not rendered
  });

  describe('when isLoggedIn is true', () => {
      it('does not render Login component', () => {
          const wrapper = shallow(<App isLoggedIn={true} />); // Use shallow instead of render
          const loginText = wrapper.find('Login'); // Find Login component in the shallow render
          expect(loginText).toHaveLength(0); // Assert that the Login component is not rendered
      });

      it('renders CourseList component', () => {
          const wrapper = shallow(<App isLoggedIn={true} />); // Use shallow instead of render
          const courseListTable = wrapper.find('CourseList'); // Find CourseList component in the shallow render
          expect(courseListTable).toHaveLength(1); // Assert that the CourseList component is rendered
      });
  });
});