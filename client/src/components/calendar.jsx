import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import React from 'react';
import moment from 'moment';

import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';


class Calendar extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      focusedInput: props.autoFocusEndDate ? 'endDate' : 'startDate',
      startDate: null,
      endDate: null,
      availableNights: this.props.availableNights,
      minimumNights: this.props.minimumNights,
      showInputs: true,
    };

    this.onDatesChange = this.onDatesChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
    this.isDayBlocked = this.isDayBlocked.bind(this);
  }
  
  onDatesChange({ startDate, endDate }) {
    this.setState({
      startDate: startDate,
      endDate: endDate,
    })
  }


  onFocusChange(focusedInput) {
    console.log(`The focused input is ----->`, focusedInput)
    this.setState({
      focusedInput: !focusedInput ? "startDate" : focusedInput
    })
  }

  isDayBlocked(selectedDate) {
    let numberOfAvailableNights = this.props.availableNights.length;
    for ( let night = 0; night < numberOfAvailableNights; night++) {
      let currentNight = moment(this.props.availableNights[night].startDate);
      if (selectedDate.isSame(moment(currentNight), "day")) {
        return false;
      }
      else if (currentNight.isAfter(selectedDate, "day")) {
        return true;
      }
    } 
    return true;
  }

  render() {
    return (
      <div>        
        <h1> The calendar component </h1>
        <DayPickerRangeController
          startDate={this.state.startDate} // momentPropTypes.momentObj or null,
          endDate={this.state.endDate} // momentPropTypes.momentObj or null,
          focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
          minimumNights={this.state.minimumNights} // PropTypes.number
          onDatesChange={this.onDatesChange} // PropTypes.func.isRequired,
          onFocusChange={this.onFocusChange} // PropTypes.func.isRequired,
          isDayBlocked={this.isDayBlocked}
          keepOpenOnDateSelect={true}
          noBorder={true}
          numberOfMonths={2}
        />
      </div>
    )
  }
}

export default Calendar;
