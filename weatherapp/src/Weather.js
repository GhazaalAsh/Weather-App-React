import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";

export default function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});
  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
    console.log(apiUrl);
  }
  function displayWeather(response) {
    setWeather({
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      description: response.data.weather[0].description,
      icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      mintemperature: response.data.main.temp_min,
      maxtemperature: response.data.main.temp_max,
      feelsLike: response.data.main.feels_like,
      pressure: response.data.main.pressure,
      cityName: response.data.name,
      country: response.data.sys.country,
    });
  }
  function updateCity(event) {
    setCity(event.target.value);
  }
  let form = (
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="search"
          className="form-control"
          placeholder="Search for a city..."
          id="search-input"
          autoComplete="off"
          onChange={updateCity}
        />
        <button className="btn btn-outline-secondary" type="submit">
          Search
        </button>
        <button
          className="btn btn-outline-secondary addMore"
          type="button"
          id="currentLocation"
          title="Current Location"
        >
          <i className="fa-solid fa-location-dot"></i>
        </button>
      </div>
    </form>
  );
  let header = (
    <div className="header">
      <div className="row">
        <div className="col-2">
          <a href="./">Paris</a>
        </div>
        <div className="col-2">
          <a href="./">London</a>
        </div>
        <div className="col-2">
          <a href="./">New York</a>
        </div>
      </div>
    </div>
  );
  return (
    <div className="Weather">
      {header}
      {form}
      <div className="row">
        <div className="col-4 MainTemperature">
          <img src={weather.icon} alt={weather.description} />
          <span className="tempNumb">{Math.round(weather.temperature)}</span>
          <span className="unit">
            <a href="./">°C</a>
            <span className="colorChange">|</span>
            <a href="./">°F</a>
          </span>
        </div>
        <div className="col-4 handleSpace">
          {" "}
          <ul>
            <li>Humidity: {weather.humidity} %</li>
            <li>
              Wind: {Math.round(weather.wind)}km/h
              <span className="windDegree"></span>
            </li>
            <li>
              <span className="description">{weather.description}</span>
            </li>
          </ul>
        </div>
        <div className="col-4 handleSpace">
          <ul>
            <li>
              {weather.cityName}, {weather.country}
            </li>
          </ul>
        </div>
      </div>
      <div className="row">
        <div className="col-4">
          {" "}
          <ul>
            <li>L: {Math.round(weather.mintemperature)} °C</li>
            <li>H: {Math.round(weather.maxtemperature)} °C</li>
          </ul>
        </div>
        <div className="col-4 handleSpace">
          Feels Like {Math.round(weather.feelsLike)} °C
        </div>
        <div className="col-4 handleSpace">Pressure: {weather.pressure} mb</div>
      </div>
    </div>
  );
}
