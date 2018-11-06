import React from 'react';
import { shallow, mount } from 'enzyme';
import Calendar from '../client/src/components/calendar';
import { wrap } from 'module';


describe('Calendar app renders', () => {
  test( 'Render The Calendar Component', () => {
    const wrapper = shallow(<Calendar />);
    expect(wrapper.find('h1').text()).toEqual(' The calendar component ');
  })
  // test( 'What happens with test data' ) { 
    // Mock out the api call 
  // }
})