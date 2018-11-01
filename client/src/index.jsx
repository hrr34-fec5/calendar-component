import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from './components/calendar.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      availableNights: [],
      minimumNights: undefined
    };
  }
  render() {
    return (
      <div>
        <h1>Hello World</h1>
        <p> There are {this.state.availableNights.length} available nights </p>
        <p> The minimum nights for this listing is: {this.state.minimumNights ? this.state.minimumNights : 0 } </p>
        <Calendar />
      </div>);
  }
}

ReactDOM.render(<App />, document.getElementById('app'));


export { app }