import React from 'react'
import Pic from "./images/forecast.png";

export default function DisplayWeather(props) {
    console.log(props.weatherData);
    
    const { temperature, description, location, region, country, wind_speed, pressure, precip, humidity, img } = props.weather;

    return (
        <div className="user-weather">
            <div className="row">
                <div className="col-md-3 weather-temp">
                    <h1>{temperature}<sup>o</sup>F , {description}</h1>
                    <h4>{location}</h4>
                    <p>{region} , {country}</p>
                </div>

                <div className="col-md-1" id="weathericon">
                    <img className="mainImg" src={img} alt="weather-img" />
                </div>
            </div>

            <div className="row">
                <div className="col-md-3 weather-info">
                    <p><b>Wind Speed</b> (mph)</p>
                    <h2>{wind_speed}</h2>
                </div>

                <div className="col-md-3 weather-info">
                    <p><b>Preassure</b> (millibars)</p>
                    <h2>{pressure}</h2>
                </div>

                <div className="col-md-3 weather-info">
                    <p><b>Precipitation</b> (in)</p>
                    <h2>{precip}</h2>
                </div>

                <div className="col-md-3 weather-info">
                    <p><b>Humidity</b> (%)</p>
                    <h2>{humidity}</h2>
                </div>

            </div>
        </div>
    )
}