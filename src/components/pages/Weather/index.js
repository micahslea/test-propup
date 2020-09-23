import React from 'react';
import Axios from 'axios';
import './styles.css';
import DisplayWeather from '../Weather/DisplayWeather';
import Input from '../Weather/Input';

class Weather extends React.Component {

  //state
  state = {
    userPosition: {
      latitude: 35,
      longitude: 139
    },
    weather: {},
    regionInput: ""
  }

 componentDidMount() {
    if(this.props.region) {
      console.log("if")

     Axios.get(`http://api.weatherstack.com/current?access_key=ee2c00a09ba65e4467143d28625d3fa2&query=${this.props.region}&Units=F`).then(res => {
      console.log(res)
        let userWeather = {
          temperature: res.data.current.temperature,
          description: res.data.current.weather_descriptions[0],
          location: res.data.location.name,
          region: res.data.location.region,
          country: res.data.location.country,
          wind_speed: res.data.current.wind_speed,
          pressure: res.data.current.pressure,
          precip: res.data.current.precip,
          humidity: res.data.current.humidity,
          img: res.data.current.weather_icons
        }

        this.setState({ weather: userWeather });
      })
    } else if (navigator.geolocation) {
      var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };
       
     let success = (position) => {
       
        console.log("geolocation: " + position)
        console.log("lat and long: " + position.coords.latitude +" " + position.coords.longitude)
        //get the lat and long of your device
        let pos = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
        
        this.setState({ userPosition: pos });

        //Weather Api call
        Axios.get(`http://api.weatherstack.com/current?access_key=ee2c00a09ba65e4467143d28625d3fa2&query=${position.coords.latitude},${position.coords.longitude}&Units=F`).then(res => {

          let userWeather = {
            temperature: res.data.current.temperature,
            description: res.data.current.weather_descriptions[0],
            location: res.data.location.name,
            region: res.data.location.region,
            country: res.data.location.country,
            wind_speed: res.data.current.wind_speed,
            pressure: res.data.current.pressure,
            precip: res.data.current.precip,
            humidity: res.data.current.humidity,
            img: res.data.current.weather_icons
          }

          this.setState({ weather: userWeather });
        })
        
      }
      function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }
      navigator.geolocation.getCurrentPosition(success, error, options)
      
    }
  }

  //update the value of the the input field with state
  changeRegion = (value) => {
    
    this.setState({ regionInput: value })
    
  }

  //update the weather depending upon the value user entered
  changeLocation = (e) => {

    e.preventDefault()

    Axios.get(`http://api.weatherstack.com/current?access_key=ee2c00a09ba65e4467143d28625d3fa2&query=${this.state.regionInput}&Units=F`).then(res => {

      let userWeather = {
        temperature: res.data.current.temperature,
        description: res.data.current.weather_descriptions[0],
        location: res.data.location.name,
        region: res.data.location.region,
        country: res.data.location.country,
        wind_speed: res.data.current.wind_speed,
        pressure: res.data.current.pressure,
        precip: res.data.current.precip,
        humidity: res.data.current.humidity,
        img: res.data.current.weather_icons
      }

      this.setState({ weather: userWeather });

    })
  }

  render() {
    return (
      <div className="Weather">
        <div className="container">
          <Input changeRegion={this.changeRegion} changeLocation={this.changeLocation} />
          <DisplayWeather weather={this.state.weather} />
        </div>
      </div>
    );
  }
}

export default Weather;