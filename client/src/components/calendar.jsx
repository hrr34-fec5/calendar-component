import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import React from 'react';

import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';


class Calendar extends React.Component {
  constructor(props) {
    super(props);
    let focusedInput = null;
    if (props.autoFocus) {
      focusedInput = START_DATE;
    } else if (props.autoFocusEndDate) {
      focusedInput = END_DATE;
    }

    this.state = {
      focusedInput,
      startDate: null,
      endDate: null,
      availableNights: this.props.availableNights,
      minimumNights: this.props.minimumNights
    };


  }

  onDatesChange({ startDate, endDate }) {
    console.log(`The Date changed, startDate -------> `, startDate)
    console.log(`The Date changed, endDate -------> `, endDate)
    // const { stateDateWrapper } = this.props; // Believe this is for internationalization
    this.setState({
      startDate: startDate,
      endDate: endDate,
    })
  }

  onFocusChange(focusedInput) {
    console.log(`The focused input is ----->`, focusedInput)
    this.setState({ focusedInput })
  }

  render() {
    console.log(`the props passed to calendar ----> `, this.props)
    return (
      <div>
        <h1> The calendar component </h1>
        {/* <DateRangePicker 
          startDate={this.state.startDate} // momentPropTypes.momentObj or null,
          startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
          endDate={this.state.endDate} // momentPropTypes.momentObj or null,
          endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
          onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
          focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
          onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
        /> */}
        <div>
          <DayPickerRangeController
            startDate={this.state.startDate} // momentPropTypes.momentObj or null,
            endDate={this.state.endDate} // momentPropTypes.momentObj or null,
            onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
            focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
            onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
          />
        </div>
      </div>
    )
  }
}

export default Calendar;
