import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../client/src/components/app.jsx';
import { wrap } from 'module';


describe('Main app renders', () => {
  test( 'Render Hello World', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.state().availableNights.length).toEqual(0);
    expect(wrapper.state().minimumNights).toEqual(1);
    expect(wrapper.find('h1').text()).toEqual('Hello World');
  })
  // test( 'What happens with test data' ) { 
    // Mock out the api call 
  // }
})