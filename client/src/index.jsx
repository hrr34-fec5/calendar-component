import React from 'react';
import 'react-dates/lib/css/_datepicker.css';
import ReactDOM from 'react-dom';
import Calendar from './components/calendar.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      availableNights: [],
      minimumNights: 1
    };
    this.getAvailableNights = this.getAvailableNights.bind(this);
  }

  getAvailableNights(listingId){
    axios.get(`/availableNights/${listingId}`)
    .then( (response) => {
      // console.log(`This is the response of the axios GET: ------> `, response.data);
      // console.log(`This is the response.data of the axios GET: ------> `, response);
      this.setState({availableNights: response.data})
    })
    .catch( (error) => {
        console.log(`The error of the axios is: -------> `, error);
      })
  }

  componentDidMount(){
    let listingId = Math.round(Math.random()*100); // This pulls a listing at random;
    this.getAvailableNights(listingId);
  }
  
  render() {
    return (
      <div>
        <h1>Hello World</h1>
        <p> There are {this.state.availableNights.length} available nights </p>
        <p> The minimum nights for this listing is: {this.state.minimumNights ? this.state.minimumNights : 1 } </p>
        <Calendar {... this.state}/>
      </div>);
  }
}

ReactDOM.render(<App />, document.getElementById('app'));


export { app }