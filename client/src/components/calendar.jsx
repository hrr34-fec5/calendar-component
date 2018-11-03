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
      startDayMinusOne: null,
      firstUnavailableNight: null,
      endDate: null,
      // availableNights: this.props.availableNights,
      minimumNights: this.props.minimumNights,
      showInputs: true,
    }

    this.onDatesChange = this.onDatesChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
    this.isDayBlocked = this.isDayBlocked.bind(this);
    this.clearDates = this.clearDates.bind(this)
    this.findFirstUnavailable = this.findFirstUnavailable.bind(this);
  }
  
  clearDates () {
    this.setState({startDate: null, endDate: null});
    this.onFocusChange(this.state.focusedInput);
  }

  findFirstUnavailable(startDate) {
    console.log(`The argument for findFirstUnavailable is -->`, startDate);
    let startDatePosition = 0
    for (let i = 0; i < this.props.availableNights.length; i++) {
      if (startDate.isSame(this.props.availableNights[i].startDate,'day')){
        startDatePosition = i;
        break;
      }
    }

    let searchDate = startDate.clone()
    // console.log(`The searchdate starts as --> `, searchDate);
    console.log(`the startDatePosition is --> `, startDatePosition)
    for (let j = startDatePosition; j < this.props.availableNights.length; j++) {
      // for each night in available nights (starting at the index of the start date)
      // currentNight = availablenights[index].startDate  
      console.log(`Am I iterating through indexes as expected?`,j)
      let currentNight = moment(this.props.availableNights[j].startDate);
      console.log(`currentNight is --> `, currentNight);
      console.log(`searchDate is --> `, searchDate);
      if (searchDate.isSame(currentNight, 'day')){
        console.log(`The days are the same -->`)
        // console.log(`The searchDate is --> `, searchDate);
        // console.log(`the currentNight is -->`, currentNight);
      } else {
        console.log(`The days are different -->`)
        // console.log(`The searchDate is --> `, searchDate);
        // console.log(`the currentNight is -->`, currentNight);
        this.setState({firstUnavailableNight: searchDate});
        console.log(`The state is now --> `, this.state);
        return;
      }
      searchDate.add(1, 'days')
    }
  }

  onDatesChange({ startDate, endDate }) {
    
    this.setState({
      startDate: startDate,
      endDate: endDate,
      startDayMinusOne: startDate.clone().add(-1, 'days'),
    })

    this.findFirstUnavailable(startDate)

  }


  onFocusChange(focusedInput) {
    console.log(`The focused input is ----->`, focusedInput)
    this.setState({
      focusedInput: !focusedInput ? "startDate" : focusedInput
    })
  }

  isDayBlocked(selectedDate) {
    // let numberOfAvailableNights = this.props.availableNights.length;
    // is the startDate in availablenights?
    

    if (this.state.startDayMinusOne) {
      if (selectedDate.isBefore(this.state.startDate, 'day')){
        // console.log(`the startDay_str is -->`, startDay_str);
        // console.log(`the startDate is --> `, this.state.startDate);
        // console.log(`selectedDate that is before start -->`, selectedDate._d);
        // console.log(`the startMinusOne is --> `, this.state.startDayMinusOne._d);
        return true;
      }
    }
    // is the night *after* the first unavailable?
  }

  render() {
    return (
      <div>        
        <h1> The calendar component </h1>
        <button onClick={this.clearDates}>Clear Dates</button>
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
