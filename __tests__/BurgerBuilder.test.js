import React from 'react';
// import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';

import { BurgerBuilder } from '../src/containers/BurgerBuilder/BurgerBuilder';
import BuildControls from '../src/components/Burger/BuildControls/BuildControls';

describe.skip('<BurgerBuilder />', () => {
  let wrapper;
  wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}} />);

  test('should be falsy if no ingredient', () => {
    wrapper.setProps({ ingredients: null });
    expect(wrapper.find(BuildControls)).toHaveLength(0);
  });

  test('should be truthy if there are ingredients', () => {
    wrapper.setProps({ ingredients: { salad: 0 } });
    expect(wrapper.find(BuildControls)).toBeTruthy();
  });
});
