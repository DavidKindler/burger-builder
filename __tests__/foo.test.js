import React from 'react';
// import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import NavigationItems from '../src/components/Navigation/NavigationItems/NavigationItems.js';
import Foo from '../src/components/Navigation/NavigationItems/foo.js';
import NavigationItem from '../src/components/Navigation/NavigationItems/NavigationItem/NavigationItem.js';
// configure({ adapter: new Adapter() });

describe.skip('<NavigationItems />', () => {
  const wrapper = shallow(<Foo />);
  // const wrapper_mount = mount(<navigationItems />);
  // debugger;
  // const navItem = shallow(<NavigationItem />);
  it('should be truthy', () => {
    expect(wrapper.find('a')).toBeTruthy();
  });
  it('should not be logged in', () => {
    expect(wrapper.prop('isLoggedin')).toBeFalsy();
  });
  it('should render two items if not authenticated', () => {
    expect(wrapper.find('a')).toHaveLength(2);
  });

  it('should render three items if authenticated', () => {
    const wrapper = shallow(<Foo isLoggedin />);
    expect(wrapper.find('a')).toHaveLength(3);
  });
});
