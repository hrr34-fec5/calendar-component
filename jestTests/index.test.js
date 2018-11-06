import React from 'react';
import { shallow, mount } from 'enzyme';
import { App } from '../src/components/app';
import { wrap } from 'module';


describe(' Main app renders ', () => {
  test( 'render Hello World', () => {
    const wrapper = mount(<App />);
    // expect(wrapper.state().availableNights.length).toEqual(0);
    // expect(wrapper.state().minimumNights).toEqual(1);
    expect(wrapper.find('h1').text()).toEqual('Hello World');
  })
})