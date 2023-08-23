import React from "react";
import FormattedDate from "./FormattedDate";
import SunRelatedTimes from "./SunRelatedTimes";

export default function WeatherInfo(props) {
  function calculateWindDegree(windDegree) {
    if (windDegree <= 23 || windDegree >= 337) {
      return "N";
    } else if (windDegree >= 24 && windDegree <= 68) {
      return "NE";
    } else if (windDegree >= 69 && windDegree <= 113) {
      return "E";
    } else if (windDegree >= 114 && windDegree <= 158) {
      return "SE";
    } else if (windDegree >= 159 && windDegree <= 203) {
      return "S";
    } else if (windDegree >= 204 && windDegree <= 248) {
      return "SW";
    } else if (windDegree >= 249 && windDegree <= 293) {
      return "W";
    } else {
      return "NW";
    }
  }
  return (
    <div className="props.infoInfo">
      <div className="row">
        <div className="col-5 MainTemperature">
          <img src={props.info.icon} alt={props.info.description} />
          <span className="tempNumb">{Math.round(props.info.temperature)}</span>
          <span className="unit">
            <a href="./">°C</a>
            <span className="colorChange">|</span>
            <a href="./">°F</a>
          </span>
        </div>
        <div className="col-3 handleSpace">
          {" "}
          <ul>
            <li>Humidity: {props.info.humidity} %</li>
            <li>
              Wind: {Math.round(props.info.wind)} km/h{" "}
              <span className="windDegree">
                {calculateWindDegree(props.info.windDegree)}
              </span>
            </li>
            <li>
              <span className="description text-capitalize">
                {props.info.description}
              </span>
            </li>
          </ul>
        </div>
        <div className="col-4 handleSpace">
          <ul>
            <li>
              {props.info.cityName}, {props.info.country}
            </li>
            <li>
              <FormattedDate date={props.info.date} />
            </li>
            <li className="SunRelatedTimes">
              Sunrise: <SunRelatedTimes Time={props.info.sunrise} />
            </li>
            <li className="SunRelatedTimes">
              Sunset: <SunRelatedTimes Time={props.info.sunset} />
            </li>
          </ul>
        </div>
      </div>
      <div className="row">
        <div className="col-4">
          {" "}
          <ul>
            <li>L: {Math.round(props.info.mintemperature)} °C</li>
            <li>H: {Math.round(props.info.maxtemperature)} °C</li>
          </ul>
        </div>
        <div className="col-4 handleSpace">
          Feels Like {Math.round(props.info.feelsLike)} °C
        </div>
        <div className="col-4 handleSpace">
          Pressure: {props.info.pressure} mb
        </div>
      </div>
    </div>
  );
}
