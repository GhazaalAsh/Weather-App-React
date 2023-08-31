import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherInfo from "./WeatherInfo";
import "./Weather.css";

export default function Weather(props) {
  const [city, setCity] = useState("");
  const [location, setLocation] = useState({ ready: false });
  const [weather, setWeather] = useState({ ready: false });
  const [mainWeather, setMainWeather] = useState({
    ready: false,
    mtemperature: null,
  }); // Initialize mtemperature as null

  useEffect(() => {
    console.log("Hi from useEffect", mainWeather.mtemperature);
  }, [mainWeather.mtemperature]);

  function displayWeather(response) {
    setWeather({
      ready: true,
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
      windDegree: response.data.wind.deg,
      date: new Date(response.data.dt * 1000),
      sunrise: new Date(response.data.sys.sunrise * 1000),
      sunset: new Date(response.data.sys.sunset * 1000),
    });
  }

  function displayMainWeather(response) {
    const mainTemperture = response.data.hourly.temperature_2m[0];

    setMainWeather({ ready: true, mtemperature: mainTemperture });
  }

  function Search() {
    const apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${props.defaultCity}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
  }

  function displayLoction(response) {
    const latitude = response.data.results[0].latitude;
    const longitude = response.data.results[0].longitude;

    setLocation({
      ready: true,
      latitude: latitude,
      longitude: longitude,
    });

    let mainURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&timeformat=unixtime`;
    console.log(mainURL);

    axios.get(mainURL).then(displayMainWeather);
  }

  function getGeolocation() {
    let locationUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`;
    console.log(locationUrl);
    axios
      .get(locationUrl)
      .then(displayLoction)
      .catch((error) => {
        console.error("Error fetching location data:", error);
      });
  }

  function getGeolocation(city) {
    let locationUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`;
    console.log(locationUrl);
    axios
      .get(locationUrl)
      .then(displayLoction)
      .catch((error) => {
        console.error("Error fetching location data:", error);
      });
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c"; // Replace with your API key
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
    getGeolocation(city); // Call getGeolocation after fetching weather data
  }

  return (
    <div className="Weather">
      {/* Header and form */}
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

      {/* Weather data and main temperature */}
      {weather.ready && (
        <div>
          <WeatherInfo info={weather} />
          {location.latitude} & {location.longitude}
          {mainWeather.ready && (
            <p>Main Temperature: {mainWeather.mtemperature}</p>
          )}
        </div>
      )}
    </div>
  );
}
