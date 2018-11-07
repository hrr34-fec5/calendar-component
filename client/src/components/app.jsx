import React from 'react';
import axios from 'axios';
import 'react-dates/lib/css/_datepicker.css';
import Calendar from './calendar.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      availableNights: [],
      minimumNights: 1
    };
    this.getAvailableNights = this.getAvailableNights.bind(this);
  }

  getAvailableNights(listingId){
    axios.get(`http://localhost:3030/availableNights/${listingId}`)
    .then( (response) => { this.setState({availableNights: response.data}) })
    .catch( (error) => { console.log(`The error of the axios is: -------> `, error); })
  }

  componentDidMount(){

    const url = window.location.href.split('/');
    const id = Number(url[url.length - 1]);
    if (!isNaN(id) && id > 0 ) {
      this.getAvailableNights(id);
    } else {
      console.log(`No Listing present`)
    }
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
