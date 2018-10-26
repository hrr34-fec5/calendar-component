import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from './components/calendar.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <h1>Hello World</h1>
      </div>);
  }
}

ReactDOM.render(<App />, document.getElementById('app'));


export { app }