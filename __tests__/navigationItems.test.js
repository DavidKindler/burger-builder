import React from 'react';
// import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import NavigationItems from '../src/components/Navigation/NavigationItems/NavigationItems.js';
// import Foo from '../src/components/Navigation/NavigationItems/foo.js';
import NavigationItem from '../src/components/Navigation/NavigationItems/NavigationItem/NavigationItem.js';
// configure({ adapter: new Adapter() });

describe.skip('<NavigationItems />', () => {
  let wrapper = shallow(<NavigationItems />);
  // const wrapper_mount = mount(<navigationItems />);
  // debugger;
  // const navItem = shallow(<NavigationItem />);
  test('should be truthy', () => {
    expect(wrapper.find(NavigationItem)).toBeTruthy();
  });
  test('should not be logged in', () => {
    expect(wrapper.prop('isLoggedin')).toBeFalsy();
  });
  test('should render two items if not authenticated', () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  test('should render three items if authenticated', () => {
    // const wrapper = shallow(<NavigationItems isLoggedin />);
    wrapper.setProps({ isLoggedin: true });
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });

  test('should render a Logout link if authenticated', () => {
    // wrapper = shallow(<NavigationItems isLoggedin />);
    wrapper.setProps({ isLoggedIn: true });
    expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toBeTruthy();
  });
});
