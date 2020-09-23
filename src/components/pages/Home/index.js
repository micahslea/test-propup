import React, { Component } from "react";
import "../Home/styles.css";
import "react-bulma-components/dist/react-bulma-components.min.css";
import pic1 from '../Home/images/pool.jpg';
import pic2 from '../Home/images/events2.jpg';
import pic3 from '../Home/images/property.jpg';
import Typical from 'react-typical';
import Book from '../Book';
import Location from '../../location/Location'
import LoginString from "../Login/LoginStrings";
import firebase from "../../../auth"
import { GoogleComponent } from 'react-google-location';



class Home extends Component {
  componentDidMount() {
    if (!localStorage.getItem(LoginString.ID)) {
      this.props.history.push("/");
    }
  }
  constructor(props) {
    super(props);
    this.state = {
        place: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
   
  }
 
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
    console.log(event.target.value);
   
  }

  handleSubmit(event){
    event.preventDefault();
    let placeArray = []
  
    placeArray.push(this.state.place.place.split(","));
    
    console.log(placeArray[0][0])
      this.props.history.push("/Renter/" + placeArray[0][0] + "/" + placeArray[0][1])
}

 

render(){
  return(
    <>
    <div className="hero is-desktop">     
      <form className="searchbar animate__animated animate__pulse" onSubmit={this.handleSubmit}>
        <div className="columns is-desktop">            
          <div className="column">
            <label className="label">&nbsp;&nbsp;&nbsp;&nbsp;Choose a Location:</label>
            <div className="container">
        <GoogleComponent
        
        apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
        language={'en'}
        country={'country:us'}
        coordinates={true}
        locationBoxStyle={'custom-style'}
        locationListStyle={'custom-style-list'}
        onChange={(e) => { this.setState({ place: e }) }} />
      </div>
          </div>

          <div className="column" id="book">
            <label className="label" id="depart">Departure and Arrival Dates:</label>
              <Book />
          </div>
            
          <div className="column">
            <div className="field">
              <div className="control">
              <label className="label">&nbsp;&nbsp;&nbsp;&nbsp;Add Guests:</label>                    
                <select className="box" name="guestNum">
                  <option>Select #</option>
                  <option value="1">1 Guest</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9+ Guests</option>
                </select>                    
              </div>
            </div>
          </div>

          <div className="column">
            <button className="submitbutton" type="submit">Get Results</button>
          </div>        
        </div>
      </form>
    </div> 
    
    <div className="content-blocks is-mobile">
      <div className="columns is-desktop">
        <div className="column is-one-third"><a href="/Results">
          <h2 className="left"><u>Find Your Dream Vacation</u></h2>
          <img src={ pic1 } alt="Rent Me" /></a>
        </div>
  
        <div className="column is-one-third">
            <a aria-label="Eventful" 
              style={{ cursor: 'pointer' }}
              onClick={() => {
              window.open("https://jaswhitehead.github.io/PropUpEvents/", "Popup", "width=530, height=850, top=100")
            }} >
          <h2 className="center" id="things"><u>Discover Things To Do</u></h2>
          <img src={ pic2 } alt="Find Events" /></a>
        </div>
        <div className="column is-one-third"><a href="/Signup">
          <h2 className="right"><u>List Your Property</u></h2>
          <img src={ pic3 } alt="List a property" /></a>
        </div>
      </div>
    </div>
    

    <div className="container is-centered">        
      <p className="typed"><strong>PropUp Allows Me To:&nbsp;</strong> 
        <Typical
        loop={Infinity}
        wrapper="b"
        steps={[
          'Find the perfect vacation spot 🏄‍♂️',
          800,
          'Get the price I am willing to pay 💵',
          800,
          'Watch amazing events during my stay 👀',          
          800, 
          'Get fair market value from my listings 💰',
          800,                   
        ]}
        />
      </p>  
    </div>
  </>
  )
};
}


export default Home;